// Multijoueur — calendrier serveur d'un salon (pur).
import { describe, expect, it } from 'vitest';
import { makeCode, phaseAt, type RoomTiming } from '../src/server/multi/phase';

const T: RoomTiming = { rounds: 3, previewMs: 3000, roundMs: 30000, startAt: 10_000 };

describe('phaseAt', () => {
  it('lobby tant qu\'il n\'y a pas de départ', () => {
    expect(phaseAt({ ...T, startAt: null }, 99_999)).toEqual({ kind: 'lobby' });
  });
  it('compte à rebours avant startAt', () => {
    expect(phaseAt(T, 9_000)).toEqual({ kind: 'countdown', startsAt: 10_000 });
  });
  it('aperçu puis saisie de la manche 0', () => {
    expect(phaseAt(T, 11_000)).toEqual({ kind: 'preview', round: 0, endsAt: 13_000 });
    expect(phaseAt(T, 14_000)).toEqual({ kind: 'answering', round: 0, endsAt: 43_000 });
  });
  it('enchaîne les manches et finit', () => {
    expect(phaseAt(T, 43_000)).toEqual({ kind: 'preview', round: 1, endsAt: 46_000 });
    expect(phaseAt(T, 10_000 + 3 * 33_000)).toEqual({ kind: 'done' });
  });
});

describe('makeCode', () => {
  it('5 caractères, sans caractères ambigus', () => {
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 50; i++) {
      const c = makeCode(rand);
      expect(c).toHaveLength(5);
      expect(c).toMatch(/^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{5}$/);
    }
  });
});

describe('fin anticipée (Brain : objectif atteint)', () => {
  it('une partie terminée par l\'objectif est en phase done, même pendant une manche', () => {
    expect(phaseAt({ ...T, endedAt: 12_000 }, 13_000)).toEqual({ kind: 'done' });
  });
  it('sans fin anticipée, le calendrier normal s\'applique', () => {
    expect(phaseAt({ ...T, endedAt: null }, 11_000)).toEqual({ kind: 'preview', round: 0, endsAt: 13_000 });
  });
});
