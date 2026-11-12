// Multijoueur — statut d'un signalement (vote des autres joueurs, délai de 20 s).
import { describe, expect, it } from 'vitest';
import { flagStatus, FLAG_REVIEW_MS, type FlagRec } from '../src/server/multi/room';

const flag = (votes: Record<string, boolean>): FlagRec => ({ id: 'x', round: 0, playerId: 'a', input: 'coucou', at: 1_000, votes });

describe('flagStatus', () => {
  it('reste ouvert tant que des joueurs peuvent encore voter', () => {
    expect(flagStatus(flag({ b: true }), 4, 2_000)).toBe('open');
  });
  it('accepté si la majorité des votes est pour', () => {
    expect(flagStatus(flag({ b: true, c: true, d: false }), 4, 2_000)).toBe('accepted');
  });
  it('refusé en cas d\'égalité ou sans vote', () => {
    expect(flagStatus(flag({ b: true, c: false }), 3, 2_000)).toBe('refused');
    expect(flagStatus(flag({}), 3, 1_000 + FLAG_REVIEW_MS)).toBe('refused');
  });
  it('se clôt à la fin du délai, même avec des votes incomplets', () => {
    expect(flagStatus(flag({ b: true }), 4, 1_000 + FLAG_REVIEW_MS)).toBe('accepted');
  });
});
