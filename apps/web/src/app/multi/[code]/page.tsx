import { MultiRoom } from '../../../components/MultiRoom';

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <MultiRoom code={code} />;
}
