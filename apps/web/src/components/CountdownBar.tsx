// ─────────────────────────────────────────────────────────────
// CountdownBar.tsx — barre de temps restant du round (30 s hot)
// ─────────────────────────────────────────────────────────────

export interface CountdownBarProps {
  remainingMs: number;
  totalMs: number;
  urgentBelowMs?: number;
}

export function CountdownBar({ remainingMs, totalMs, urgentBelowMs = 5_000 }: CountdownBarProps) {
  const clamped = Math.max(0, Math.min(totalMs, remainingMs));
  const pct = (clamped / totalMs) * 100;
  return (
    <div className="countdown-wrap">
    <div
      className={`countdown${clamped <= urgentBelowMs ? ' urgent' : ''}`}
      role="progressbar"
      aria-label="Temps restant"
      aria-valuemin={0}
      aria-valuemax={Math.round(totalMs / 1_000)}
      aria-valuenow={Math.ceil(clamped / 1_000)}
      aria-valuetext={`${Math.ceil(clamped / 1_000)} secondes restantes`}
      data-testid="countdown"
    >
      <div className="countdown-fill" data-testid="countdown-fill" style={{ width: `${pct}%` }} />
    </div>
    <span className={`countdown-num${clamped <= urgentBelowMs ? ' urgent' : ''}`} aria-hidden="true">
      {Math.ceil(clamped / 1_000)}
    </span>
    </div>
  );
}
