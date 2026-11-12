'use client';

import { useT } from '../i18n';

// ─────────────────────────────────────────────────────────────
// ShareButton.tsx — copie de la thermo-colonne anti-spoiler (§C.4)
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';

export interface ShareButtonProps {
  text: string;
}

export function ShareButton({ text }: ShareButtonProps) {
  const [t] = useT();
  const [copied, setCopied] = useState(false);

  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Repli : textarea + execCommand (vieux navigateurs / permissions)
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2_000);
  };

  return (
    <button type="button" onClick={copy} data-testid="share-button">
      {copied ? t('share.copied') : t('share.button')}
    </button>
  );
}
