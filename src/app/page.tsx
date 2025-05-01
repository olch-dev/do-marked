import { getMarkdownFiles, setLocalMode } from '@/lib/github';
import Timeline from '@/components/Timeline';

export default async function Home() {
  // Check if local mode is enabled via environment variable
  const isLocalMode = process.env.LOCAL_MODE === 'true';
  setLocalMode(isLocalMode);
  
  const files = await getMarkdownFiles();
  
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Less is more</h1>
      <Timeline files={files} />
    </main>
  );
}
