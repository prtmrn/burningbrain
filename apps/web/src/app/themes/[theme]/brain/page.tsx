'use client';
// /themes/[theme]/brain — Brain illimité sur un thème au choix.
import { useParams } from 'next/navigation';
import { useT } from '../../../../i18n';
import { GamePlay } from '../../../../components/GamePlay';
import { GameBar } from '../../../../components/GameBar';
import { themeById } from '../../../../themes';

export default function ThemeBrainPage() {
  const [tr] = useT();
  const params = useParams<{ theme: string }>();
  const theme = themeById(params.theme);
  if (!theme)
    return (
      <>
        <GameBar title={tr('themes.unknown')} />
        <main className="summary panel-screen"><p>{tr('themes.unknown.body')}</p></main>
      </>
    );
  return <GamePlay theme={theme} mode="brain" kind="unlimited" />;
}
