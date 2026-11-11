// Embers.tsx — braises qui montent et lueur chaude au bas de l'écran ;
// leur nombre et l'intensité suivent la chaleur (0 → 1).
export function Embers({ heat }: { heat: number }) {
  const h = Math.max(0, Math.min(1, heat));
  const n = 8 + Math.round(h * 26);
  return (
    <div className="embers" aria-hidden="true">
      <div className="heat-glow" />
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${(i * 53) % 100}%`,
            animationDuration: `${(5 + (i % 5) * 1.3).toFixed(1)}s`,
            animationDelay: `${((i * 0.7) % 6).toFixed(1)}s`,
            width: `${3 + (i % 3)}px`,
            height: `${3 + (i % 3)}px`,
          }}
        />
      ))}
    </div>
  );
}
