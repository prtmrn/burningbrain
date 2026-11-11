'use client';
// GameBar.tsx — barre de jeu intégrée : Accueil, Retour, titre, manche, son.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { PixelIcon } from './PixelIcon';

export interface GameBarProps {
  icon?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  soundOff?: boolean;
  onToggleSound?: () => void;
}

export function GameBar({ icon, title, subtitle, right, soundOff, onToggleSound }: GameBarProps) {
  const router = useRouter();
  return (
    <nav className="game-bar" data-testid="chrome" aria-label="Navigation du jeu">
      <div className="game-bar-left">
        <Link href="/" className="pixel-btn" aria-label="Accueil" data-testid="nav-home">
          <PixelIcon name="home" />
        </Link>
        <button
          type="button"
          className="pixel-btn"
          aria-label="Retour"
          data-testid="nav-back"
          onClick={() => (window.history.length > 1 ? router.back() : router.push('/'))}
        >
          <PixelIcon name="back" />
        </button>
      </div>
      <div className="game-bar-title">
        {icon && <span aria-hidden="true">{icon}</span>}
        <strong>{title}</strong>
        {subtitle && <span className="game-bar-sub">{subtitle}</span>}
      </div>
      <div className="game-bar-right">
        {right}
        {onToggleSound && (
          <button
            type="button"
            className="pixel-btn"
            onClick={onToggleSound}
            aria-label={soundOff ? 'Activer le son' : 'Couper le son'}
            data-testid="sound-toggle"
          >
            <PixelIcon name={soundOff ? 'soundOff' : 'soundOn'} />
          </button>
        )}
      </div>
    </nav>
  );
}
