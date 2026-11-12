'use client';
// GameBar.tsx — barre de jeu intégrée : Accueil, Retour, titre, manche, son.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { PixelIcon } from './PixelIcon';
import { LanguageSwitch } from './LanguageSwitch';

export interface GameBarProps {
  icon?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  soundOff?: boolean;
  onToggleSound?: () => void;
}

import { useT } from '../i18n';

export function GameBar({ icon, title, subtitle, right, soundOff, onToggleSound }: GameBarProps) {
  const [t] = useT();
  const router = useRouter();
  return (
    <nav className="game-bar" data-testid="chrome" aria-label={t('bar.nav')}>
      <div className="game-bar-left">
        <Link href="/" className="pixel-btn" aria-label={t('bar.home')} data-testid="nav-home">
          <PixelIcon name="home" />
        </Link>
        <button
          type="button"
          className="pixel-btn"
          aria-label={t('bar.back')}
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
        <LanguageSwitch />
        {right}
        {onToggleSound && (
          <button
            type="button"
            className="pixel-btn"
            onClick={onToggleSound}
            aria-label={soundOff ? t('bar.sound.on') : t('bar.sound.off')}
            data-testid="sound-toggle"
          >
            <PixelIcon name={soundOff ? 'soundOff' : 'soundOn'} />
          </button>
        )}
      </div>
    </nav>
  );
}
