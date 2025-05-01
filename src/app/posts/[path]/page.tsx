import { getMarkdownFile } from '@/lib/github';
import { parseMarkdown } from '@/lib/markdown';
import PostContent from '@/components/PostContent';

interface PostPageProps {
  params: {
    path: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  // Decode the path and remove any leading slashes
  const decodedPath = decodeURIComponent(params.path).replace(/^\/+/, '');
  const file = await getMarkdownFile(decodedPath);
  const { content, metadata } = parseMarkdown(file.content);

  return (
    <PostContent 
      content={content}
      title={metadata.title || file.name.replace('.md', '')}
      date={metadata.date}
    />
  );
} 