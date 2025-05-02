import { getMarkdownFile, getMarkdownFiles } from '@/lib/github';
import { parseMarkdown } from '@/lib/markdown';
import { PostContent } from '@/components/PostContent';

// Revalidate the page every hour
export const revalidate = 3600;

interface PostPageProps {
  params: {
    path: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
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
      />
    </main>
  );
} 