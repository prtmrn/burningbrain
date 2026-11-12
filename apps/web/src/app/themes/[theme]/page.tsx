'use client';
// /themes/[theme] — Hot illimité sur un thème au choix.
import { useParams } from 'next/navigation';
import { useT } from '../../../i18n';
import { GamePlay } from '../../../components/GamePlay';
import { GameBar } from '../../../components/GameBar';
import { themeById } from '../../../themes';

export default function ThemeHotPage() {
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
  return <GamePlay theme={theme} mode="hot" kind="unlimited" />;
}
