import { getMarkdownFile, getMarkdownFiles } from '@/lib/github';
import { parseMarkdown } from '@/lib/markdown';
import PostContent from '@/components/PostContent';
import { RateLimitError } from '@/lib/rate-limiter';

// Revalidate the page every hour
export const revalidate = 3600;

interface PostPageProps {
  params: {
    path: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const [file, files] = await Promise.all([
      getMarkdownFile(params.path),
      getMarkdownFiles(),
    ]);

    const { content } = parseMarkdown(file.content);

    return (
      <main className="min-h-screen p-8">
        <PostContent
          content={content}
          files={files}
          currentPath={params.path}
          currentFile={file}
        />
      </main>
    );
  } catch (error) {
    if (error instanceof RateLimitError) {
      return (
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Rate Limit Exceeded</h1>
          <p className="text-red-600 mb-4">{error.message}</p>
          <p className="text-gray-600">Please try again later.</p>
        </main>
      );
    }
    throw error;
  }
} 