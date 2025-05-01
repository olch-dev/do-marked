import { getMarkdownFile, getMarkdownFiles } from '@/lib/github';
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
  
  // Get the current file
  const currentFile = await getMarkdownFile(decodedPath);
  
  // Get all files to find previous and next
  const allFiles = await getMarkdownFiles();
  
  // Sort files by date
  const sortedFiles = [...allFiles].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
  
  // Find current file index
  const currentIndex = sortedFiles.findIndex(file => file.path === decodedPath);
  
  // Get previous and next files
  const previousPost = currentIndex > 0 ? sortedFiles[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedFiles.length - 1 ? sortedFiles[currentIndex + 1] : null;
  
  const { content, metadata } = parseMarkdown(currentFile.content);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <PostContent 
        content={content}
        title={metadata.title || currentFile.name.replace('.md', '')}
        date={metadata.date}
        previousPost={previousPost}
        nextPost={nextPost}
      />
    </div>
  );
} 