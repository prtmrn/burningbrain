// Multijoueur — classement pur (somme des points, égalité par nom).
import { describe, expect, it } from 'vitest';
import { rankingOf, type AnswerRec } from '../src/server/multi/room';

const a = (playerId: string, round: number, score: number): AnswerRec => ({
  round, playerId, input: 'x', answer: 'x', tier: 't1', score, at: 0,
});

describe('rankingOf', () => {
  it('additionne les points et trie du plus haut au plus bas', () => {
    const players = [{ id: 'p1', name: 'Ana' }, { id: 'p2', name: 'Bob' }, { id: 'p3', name: 'Cé' }];
    const rows = rankingOf(players, [a('p1', 0, 10), a('p2', 0, 60), a('p2', 1, 30), a('p3', 0, 10)]);
    expect(rows.map((r) => [r.name, r.score, r.answers])).toEqual([
      ['Bob', 90, 2],
      ['Ana', 10, 1],
      ['Cé', 10, 1],
    ]);
  });
  it('un joueur sans réponse reste classé à 0', () => {
    const rows = rankingOf([{ id: 'p1', name: 'Ana' }], []);
    expect(rows[0]).toMatchObject({ score: 0, answers: 0 });
  });
});
