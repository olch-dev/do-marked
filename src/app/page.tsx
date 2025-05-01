import { getMarkdownFiles } from '@/lib/github';
import Timeline from '@/components/Timeline';

export default async function Home() {
  const files = await getMarkdownFiles();
  
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Olch</h1>
      <Timeline files={files} />
    </main>
  );
}
