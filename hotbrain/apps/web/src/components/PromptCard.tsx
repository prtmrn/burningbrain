// ─────────────────────────────────────────────────────────────
// PromptCard.tsx — carte du prompt courant (présentation pure)
// ─────────────────────────────────────────────────────────────

export interface PromptCardProps {
  label: string;
  text: string;
}

export function PromptCard({ label, text }: PromptCardProps) {
  return (
    <section className="prompt-card" data-testid="prompt-card">
      <div className="prompt-label">{label}</div>
      <div className="prompt-text">{text}</div>
    </section>
  );
}
