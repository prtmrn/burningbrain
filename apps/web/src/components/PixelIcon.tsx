// PixelIcon.tsx — icônes pixel 8 × 8 (maison, flèche retour, son).
const ICONS: Record<string, string[]> = {
  home: ['...##...', '..####..', '.######.', '########', '.##..##.', '.##..##.', '.##..##.', '.######.'],
  back: ['...#....', '..##....', '.#######', '########', '.#######', '..##....', '...#....', '........'],
  soundOn: ['...#..#.', '..##.#..', '####..#.', '####..#.', '####..#.', '..##.#..', '...#..#.', '........'],
  soundOff: ['...#....', '..##.#.#', '####..#.', '####.#.#', '####....', '..##....', '...#....', '........'],
};

export function PixelIcon({ name, size = 20 }: { name: keyof typeof ICONS | string; size?: number }) {
  const rows = ICONS[name] ?? [];
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) => (ch === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" /> : null)),
      )}
    </svg>
  );
}
