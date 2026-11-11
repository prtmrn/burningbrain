import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles/tokens.css';

export const metadata: Metadata = {
  title: 'HotBrain',
  description: 'Le quiz quotidien qui fait monter le mercure.',
};

// Daltonien / basse-énergie appliqués AVANT hydratation (spec §A.6) :
// script inline bloquant lisant hotbrain:prefs:v1 ; parse invalide → rien.
const PRE_HYDRATION = `(function(){try{var raw=window.localStorage.getItem('hotbrain:prefs:v1');if(!raw)return;var env=JSON.parse(raw);var p=env&&typeof env==='object'&&env.data?env.data:env;if(p){if(p.colorblind)document.documentElement.classList.add('colorblind');if(p.lowPower)document.documentElement.classList.add('low-power');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Pixelify+Sans:wght@500;700&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: PRE_HYDRATION }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
