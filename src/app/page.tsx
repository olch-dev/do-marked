import { getMarkdownFiles, setLocalMode } from '@/lib/github';
import Timeline from '@/components/Timeline';
import TimelineWrapper from '@/components/TimelineWrapper';

export default async function Home() {
  // Check if local mode is enabled via environment variable
  const isLocalMode = process.env.LOCAL_MODE === 'true';
  setLocalMode(isLocalMode);
  
  const files = await getMarkdownFiles();
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <h1 className="text-4xl font-bold mb-8">Less is more</h1>
      <TimelineWrapper>
        <Timeline files={files} />
      </TimelineWrapper>
      </main>
  );
}
