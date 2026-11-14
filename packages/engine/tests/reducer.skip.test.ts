// Boiling : « Passer la question » — même effet qu'un délai (0 point), puis question suivante.
import { describe, expect, it } from 'vitest';
import { createHotSession, gameReducer, type GameEvent } from '../src/domain/reducer';
import type { HotDiveState } from '../src/domain/types';
import { dailyMeta, hotBank, hotPromptIds, makeContext, makeDrive } from './fixtures';

function setup() {
  const drive = makeDrive();
  const ctx = makeContext(hotBank, hotPromptIds, drive);
  const R = (s: HotDiveState, ev: GameEvent): HotDiveState => gameReducer(s, ev, ctx) as HotDiveState;
  let s = createHotSession(dailyMeta);
  s = R(s, { type: 'START_SESSION', now: 0 });
  s = R(s, { type: 'TICK', now: 3_000 }); // fin de l'aperçu : saisie
  return { R, s };
}

describe('reducer hot — passer la question', () => {
  it("SKIP_ROUND pendant la saisie : 0 point, feedback, sans réponse", () => {
    const { R, s } = setup();
    expect(s.phase).toBe('answering');
    const after = R(s, { type: 'SKIP_ROUND', now: 5_000 });
    expect(after.phase).toBe('feedback');
    expect(after.results).toHaveLength(1);
    expect(after.results[0]!.tier).toBeNull();
    expect(after.results[0]!.score).toBe(0);
  });

  it('SKIP_ROUND hors saisie (aperçu) : ignoré', () => {
    const drive = makeDrive();
    const ctx = makeContext(hotBank, hotPromptIds, drive);
    const R = (s: HotDiveState, ev: GameEvent): HotDiveState => gameReducer(s, ev, ctx) as HotDiveState;
    let s = createHotSession(dailyMeta);
    s = R(s, { type: 'START_SESSION', now: 0 });
    expect(s.phase).toBe('preview');
    expect(R(s, { type: 'SKIP_ROUND', now: 1_000 })).toBe(s);
  });
});
