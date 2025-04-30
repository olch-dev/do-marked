'use client';

import { getMarkdownFile } from '@/lib/github';
import { parseMarkdown } from '@/lib/markdown';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface PostPageProps {
  params: {
    path: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const file = await getMarkdownFile(decodeURIComponent(params.path));
  const { content, metadata } = parseMarkdown(file.content);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-block mb-8 text-blue-600 hover:underline"
      >
        ← Back to posts
      </Link>
      <article className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100">
        <h1 className="text-4xl font-bold mb-4">{metadata.title || file.name.replace('.md', '')}</h1>
        {metadata.date && (
          <p className="text-gray-600 dark:text-gray-400">{new Date(metadata.date).toLocaleDateString()}</p>
        )}
        <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
} 