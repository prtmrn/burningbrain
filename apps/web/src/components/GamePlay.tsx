'use client';

// ─────────────────────────────────────────────────────────────
// GamePlay.tsx — une partie, quel que soit le mode (Hot ou Brain), le thème
// et le type (partie du jour ou illimité). Charge la banque du thème, choisit
// les questions (graine du jour ou tirage sans remise), monte la session.
// ─────────────────────────────────────────────────────────────
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  assembleBank,
  dateLoc,
  dayNumber,
  drawThemed,
  nextResetMs,
  seedDaily,
  type GameMode,
  type LoadedBank,
  type PlayerPreferences,
  type ReducerContext,
  type SessionMeta,
} from '@hotbrain/engine';
import { hotbrainConfig, configFor, type GameSetup } from '../config';
import { translate, useT, type Lang } from '../i18n';

const themeName = (id: string, lang: Lang): string => translate(`theme.${id}`, lang);
import { GameSetupScreen } from './GameSetupScreen';
import type { GameConfig } from '@hotbrain/engine';
import { createLocalStorageKV, type EnumerableKV } from '../state/local-storage-kv';
import { dailyStatus, getStats } from '../state/stats-store';
import { loadHistory } from '../state/history-store';
import { loadPrefs } from '../state/prefs-store';
import { usePrefs } from '../hooks/usePrefs';
import { useDiveSession } from '../hooks/useDiveSession';
import { browserClocks } from '../hooks/useClock';
import { SessionScreen } from './SessionScreen';
import { BrainSessionScreen } from './BrainSessionScreen';
import { GameBar } from './GameBar';
import { Embers } from './Embers';
import type { ThemeInfo } from '../themes';

export type PlayKindUI = 'daily' | 'unlimited';

interface PlaySeed {
  id: string;
  seed: number;
  setup?: GameSetup;
}
const playKey = (mode: GameMode, theme: string): string => `hotbrain:play-session:v1:${mode}:${theme}`;

function newSeed(): number {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] as number;
}
function readPlaySeed(kv: EnumerableKV, mode: GameMode, theme: string): PlaySeed {
  try {
    const raw = kv.getItem(playKey(mode, theme));
    if (raw) {
      const j = JSON.parse(raw) as PlaySeed;
      if (typeof j.id === 'string' && typeof j.seed === 'number') return j;
    }
  } catch {
    /* stockage illisible : nouvelle session */
  }
  const fresh: PlaySeed = { id: `u-${Date.now()}`, seed: newSeed() };
  try {
    kv.setItem(playKey(mode, theme), JSON.stringify(fresh));
  } catch {
    /* stockage plein ou privé */
  }
  return fresh;
}
function savePlaySetup(kv: EnumerableKV, mode: GameMode, theme: string, setup: GameSetup): void {
  const cur = readPlaySeed(kv, mode, theme);
  try {
    kv.setItem(playKey(mode, theme), JSON.stringify({ ...cur, setup }));
  } catch {
    /* ignoré */
  }
}
function forgetPlaySeed(kv: EnumerableKV, mode: GameMode, theme: string): void {
  try {
    kv.setItem(playKey(mode, theme), '');
  } catch {
    /* ignoré */
  }
}

export function resetLabel(nowWall: number, lang: Lang = 'fr'): string {
  const ms = nextResetMs(nowWall, hotbrainConfig) - nowWall;
  const h = Math.floor(ms / 3_600_000);
  const m = Math.ceil((ms % 3_600_000) / 60_000);
  return translate('reset.next', lang, { h, m });
}

export function GamePlay(props: { theme: ThemeInfo; mode: GameMode; kind: PlayKindUI }) {
  const [t, lang] = useT();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted)
    return (
      <main className="summary">
        <p className="muted">{t('loading')}</p>
      </main>
    );
  return <GamePlayClient {...props} />;
}

function GamePlayClient({ theme, mode, kind }: { theme: ThemeInfo; mode: GameMode; kind: PlayKindUI }) {
  const [t, lang] = useT();
  const kv = useMemo(() => createLocalStorageKV(window.localStorage), []);
  usePrefs(kv);
  const [bank, setBank] = useState<LoadedBank | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-accent', theme.accent);
    return () => {
      root.style.removeProperty('--theme-accent');
    };
  }, [theme.accent]);

  useEffect(() => {
    let on = true;
    fetch('/content/manifest.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<Record<string, { contentVersion: number }>>;
      })
      .then((m) => {
        const key = lang === 'fr' ? theme.id : `${theme.id}-${lang}`;
        const v = m[key]?.contentVersion;
        if (v === undefined) throw new Error('theme-notyet');
        return fetch(`/content/${key}.v${v}.json`);
      })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((j: unknown) => {
        // La banque traduite garde les mêmes ids : on rétablit le nom du thème pour le moteur.
        if (on) setBank({ ...assembleBank(j, lang === 'fr' ? theme.id : `${theme.id}-${lang}`), theme: theme.id });
      })
      .catch((e: unknown) => {
        if (on) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      on = false;
    };
  }, [theme.id, lang]);

  const modeLabel = mode === 'hot' ? t('mode.boiling') : t('mode.brain');
  if (error || !bank) {
    return (
      <>
        <GameBar icon={theme.icon} title={`${modeLabel} · ${themeName(theme.id, lang)}`} />
        <main className="summary panel-screen">
          <p>{error === 'theme-notyet' ? t('theme.notyet', { label: themeName(theme.id, lang) }) : (error ?? t('loading'))}</p>
        </main>
      </>
    );
  }

  if (kind === 'daily') {
    const nowWall = Date.now();
    const today = dateLoc(nowWall, hotbrainConfig.timezone);
    if (dailyStatus(kv, mode, theme.id, today, hotbrainConfig) === 'played') {
      return (
        <>
          <GameBar icon={theme.icon} title={`${modeLabel} · ${themeName(theme.id, lang)}`} subtitle={t('session.daily')} />
          <Embers heat={0.2} />
          <main className="summary panel-screen" data-testid="daily-played">
            <h1>{t('daily.played.title.short')}</h1>
            <p>{t('daily.played.body', { mode: modeLabel })}</p>
            <p data-testid="reset-countdown">{resetLabel(nowWall, lang)}</p>
            <p>{t('daily.best', { score: getStats(kv, today).bestScore })}</p>
            <p>
              <a href={mode === 'hot' ? '/boiling/play' : '/brain/play'}>
                <button type="button" className="big">{t('home.classic')}</button>
              </a>
            </p>
          </main>
        </>
      );
    }
  }
  return <SessionGate kv={kv} bank={bank} theme={theme} mode={mode} kind={kind} />;
}

/** D-40 : la partie classique commence par le choix des réglages. */
function SessionGate(props: { kv: EnumerableKV; bank: LoadedBank; theme: ThemeInfo; mode: GameMode; kind: PlayKindUI }) {
  const [, gateLang] = useT();
  const { kv, theme, mode, kind } = props;
  const [setup, setSetup] = useState<GameSetup | null>(() =>
    kind === 'unlimited' ? (readPlaySeed(kv, mode, theme.id).setup ?? null) : null,
  );
  if (kind === 'daily') return <Session {...props} config={hotbrainConfig} />;
  if (!setup) {
    return (
      <GameSetupScreen
        mode={mode}
        themeLabel={themeName(theme.id, gateLang)}
        themeIcon={theme.icon}
        onStart={(s) => {
          savePlaySetup(kv, mode, theme.id, s);
          setSetup(s);
        }}
      />
    );
  }
  return <Session {...props} config={configFor(mode, setup)} />;
}

function Session({
  kv,
  bank,
  theme,
  mode,
  kind,
  config,
}: {
  kv: EnumerableKV;
  bank: LoadedBank;
  theme: ThemeInfo;
  mode: GameMode;
  kind: PlayKindUI;
  config: GameConfig;
}) {
  const [t, lang] = useT();
  const router = useRouter();
  const nowWall = useMemo(() => Date.now(), []);
  const today = dateLoc(nowWall, hotbrainConfig.timezone);
  const day = dayNumber(nowWall, hotbrainConfig);
  const history = useMemo(() => loadHistory(kv), [kv]);
  const play = useMemo(() => (kind === 'unlimited' ? readPlaySeed(kv, mode, theme.id) : null), [kv, kind, mode, theme.id]);
  const unlimitedCount =
    history.filter((c) => c.playKind === 'unlimited' && c.mode === mode && c.theme === theme.id).length + 1;

  const meta: SessionMeta = useMemo(
    () =>
      play
        ? { playKind: 'unlimited', theme: theme.id, date: play.id, dayNumber: unlimitedCount, sessionSeed: play.seed }
        : { playKind: 'daily', theme: theme.id, date: today, dayNumber: day },
    [play, theme.id, today, day, unlimitedCount],
  );
  const promptIds = useMemo(
    () =>
      play
        ? drawThemed(theme.id, mode, bank as never, history, play.seed, config)
        : seedDaily(theme.id, mode, day, bank as never, config),
    [play, theme.id, mode, bank, history, day, config],
  );
  const prefs: PlayerPreferences = loadPrefs(kv);
  const content: Omit<ReducerContext, 'persistCompletion' | 'persistCurrentAnswers'> = useMemo(
    () => ({
      config,
      prefs,
      contentVersion: bank.contentVersion,
      prompt: (s) => {
        const p = bank.prompts.find((x) => x.id === promptIds[s.roundIndex]);
        if (!p) throw new Error(`question manquante au round ${s.roundIndex}`);
        return p;
      },
      sheet: (s) => {
        const sh = bank.sheets.get(promptIds[s.roundIndex] as string);
        if (!sh) throw new Error(`feuille manquante au round ${s.roundIndex}`);
        return sh;
      },
      sheetIndex: (s) => {
        const idx = bank.indexes.get(promptIds[s.roundIndex] as string);
        if (!idx) throw new Error(`index manquant au round ${s.roundIndex}`);
        return idx;
      },
      allSheets: () => promptIds.map((id) => bank.sheets.get(id) as never),
    }),
    [bank, promptIds, prefs, config],
  );
  const clocks = useMemo(browserClocks, []);
  const session = useDiveSession({ kv, clocks, mode, meta, content });
  const dayLabel = kind === 'daily' ? t('session.day', { day }) : t('session.classic');
  const exit = (): void => {
    if (kind === 'unlimited') forgetPlaySeed(kv, mode, theme.id);
    router.push('/');
  };

  return mode === 'hot' ? (
    <SessionScreen
      session={session}
      bank={bank}
      promptIds={promptIds}
      streak={getStats(kv, today).currentStreak}
      dayLabel={dayLabel}
      themeLabel={themeName(theme.id, lang)}
      themeIcon={theme.icon}
      muted={prefs.muted}
      config={config}
      onExit={exit}
    />
  ) : (
    <BrainSessionScreen
      session={session}
      bank={bank}
      promptIds={promptIds}
      themeLabel={themeName(theme.id, lang)}
      themeIcon={theme.icon}
      dayLabel={dayLabel}
      muted={prefs.muted}
      config={config}
      onExit={exit}
    />
  );
}
