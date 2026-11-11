'use client';
// /themes/[theme]/brain — Brain illimité sur un thème au choix.
import { useParams } from 'next/navigation';
import { GamePlay } from '../../../../components/GamePlay';
import { GameBar } from '../../../../components/GameBar';
import { themeById } from '../../../../themes';

export default function ThemeBrainPage() {
  const params = useParams<{ theme: string }>();
  const theme = themeById(params.theme);
  if (!theme)
    return (
      <>
        <GameBar title="Thème inconnu" />
        <main className="summary panel-screen"><p>Ce thème n'existe pas.</p></main>
      </>
    );
  return <GamePlay theme={theme} mode="brain" kind="unlimited" />;
}
