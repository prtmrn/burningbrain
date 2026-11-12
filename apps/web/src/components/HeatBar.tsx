'use client';

// ─────────────────────────────────────────────────────────────
// HeatBar.tsx — thermomètre horizontal, affiché sur mobile à la place du
// thermomètre vertical (masqué par CSS sous 720 px).
// ─────────────────────────────────────────────────────────────

export function HeatBar({ score, max }: { score: number; max: number }) {
  const ratio = Math.max(0, Math.min(1, score / max));
  return (
    <div className="heat-bar" data-testid="heat-bar" role="img" aria-label={`Température : ${score} sur ${max} °C`}>
      <div className="heat-bar-track">
        <div className="heat-bar-fill" style={{ width: `${ratio * 100}%` }} />
      </div>
      <span className="heat-bar-label">{score} / {max} °C</span>
    </div>
  );
}
