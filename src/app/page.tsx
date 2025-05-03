import { getMarkdownFiles, setLocalMode } from '@/lib/github';
import Timeline from '@/components/Timeline';
import { RateLimitError } from '@/lib/rate-limiter';

export default async function Home() {
  try {
    // Check if local mode is enabled via environment variable
    const isLocalMode = process.env.LOCAL_MODE === 'true';
    setLocalMode(isLocalMode);
    
    const files = await getMarkdownFiles();
    
    return (
      <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
        <h1 className="text-4xl font-bold mb-8">Less is more</h1>
        <Timeline files={files} />
      </main>
    );
  } catch (error) {
    if (error instanceof RateLimitError) {
      return (
        <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
          <h1 className="text-4xl font-bold mb-4">Rate Limit Exceeded</h1>
          <p className="text-red-600 mb-4">{error.message}</p>
          <p className="text-gray-600">Please try again later.</p>
        </main>
      );
    }
    throw error;
  }
}
