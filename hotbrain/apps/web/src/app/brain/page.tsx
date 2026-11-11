'use client';
// /brain — galerie des quatre états du cerveau (aperçu design, non lié depuis l'accueil).
import { BrainStage } from '../../components/BrainStage';

export default function BrainGallery() {
  return (
    <main className="summary">
      <h1>Le cerveau, de calme à fusion</h1>
      <div className="theme-grid">
        {[0.05, 0.35, 0.7, 0.95].map((h) => (
          <div key={h} style={{ '--heat': String(h) } as React.CSSProperties}>
            <BrainStage heat={h} />
          </div>
        ))}
      </div>
    </main>
  );
}
