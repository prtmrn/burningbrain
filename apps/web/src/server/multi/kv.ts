// ─────────────────────────────────────────────────────────────
// server/multi/kv.ts — stockage du multijoueur (Upstash Redis via REST).
// Variables : UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (ou les
// noms KV_REST_API_URL / KV_REST_API_TOKEN posés par l'intégration Vercel).
// Sans ces variables : repli mémoire (développement local uniquement ;
// en production, les salons seraient perdus d'une instance à l'autre).
// ─────────────────────────────────────────────────────────────

export type Arg = string | number;
export interface Kv {
  cmd(args: Arg[]): Promise<unknown>;
}

const ROOM_TTL_S = 6 * 60 * 60;
export { ROOM_TTL_S };

function upstash(url: string, token: string): Kv {
  return {
    async cmd(args) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(args),
        cache: 'no-store',
      });
      const j = (await res.json()) as { result?: unknown; error?: string };
      if (j.error) throw new Error(`kv: ${j.error}`);
      return j.result;
    },
  };
}

type MemStore = { strings: Map<string, string>; hashes: Map<string, Map<string, string>> };

function memory(): Kv {
  const g = globalThis as unknown as { __bbMulti?: MemStore };
  g.__bbMulti ??= { strings: new Map(), hashes: new Map() };
  const s = g.__bbMulti;
  const hash = (k: string): Map<string, string> => {
    let h = s.hashes.get(k);
    if (!h) {
      h = new Map();
      s.hashes.set(k, h);
    }
    return h;
  };
  return {
    async cmd(args) {
      const [op, k, a, b] = args.map(String) as [string, string, string?, string?];
      switch (op.toUpperCase()) {
        case 'SET': s.strings.set(k, a as string); return 'OK';
        case 'GET': return s.strings.get(k) ?? null;
        case 'DEL': s.strings.delete(k); s.hashes.delete(k); return 1;
        case 'EXPIRE': return 1;
        case 'HSET': hash(k).set(a as string, b as string); return 1;
        case 'HSETNX': {
          const h = hash(k);
          if (h.has(a as string)) return 0;
          h.set(a as string, b as string);
          return 1;
        }
        case 'HGET': return hash(k).get(a as string) ?? null;
        case 'HLEN': return hash(k).size;
        case 'HGETALL': {
          const out: string[] = [];
          for (const [f, v] of hash(k)) out.push(f, v);
          return out;
        }
        default: throw new Error(`kv mémoire : commande ${op} non gérée`);
      }
    },
  };
}

export function getKv(): Kv {
  const url = process.env['UPSTASH_REDIS_REST_URL'] ?? process.env['KV_REST_API_URL'];
  const token = process.env['UPSTASH_REDIS_REST_TOKEN'] ?? process.env['KV_REST_API_TOKEN'];
  return url && token ? upstash(url, token) : memory();
}

export async function getJson<T>(kv: Kv, key: string): Promise<T | null> {
  const raw = await kv.cmd(['GET', key]);
  if (typeof raw !== 'string') return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setJson(kv: Kv, key: string, value: unknown): Promise<void> {
  await kv.cmd(['SET', key, JSON.stringify(value), 'EX', ROOM_TTL_S]);
}

export async function hgetallJson<T>(kv: Kv, key: string): Promise<Record<string, T>> {
  const flat = (await kv.cmd(['HGETALL', key])) as unknown[] | null;
  const out: Record<string, T> = {};
  if (!Array.isArray(flat)) return out;
  for (let i = 0; i + 1 < flat.length; i += 2) {
    try {
      out[String(flat[i])] = JSON.parse(String(flat[i + 1])) as T;
    } catch {
      /* entrée illisible : ignorée */
    }
  }
  return out;
}
