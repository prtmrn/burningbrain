'use client';
import { GamePlay } from '../../../components/GamePlay';
import { themeById } from '../../../themes';

export default function Page() {
  return <GamePlay theme={themeById('general')!} mode="brain" kind="unlimited" />;
}
