'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MarkdownFile } from '@/lib/github';
import { extractHeadings } from '@/lib/markdown';
import TableOfContents from './TableOfContents';

interface NavigationButtonsProps {
  currentIndex: number;
  totalFiles: number;
  onPrevious: () => void;
  onNext: () => void;
}

function NavigationButtons({ currentIndex, totalFiles, onPrevious, onNext }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={currentIndex === totalFiles - 1}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

interface PostContentProps {
  content: string;
  files: MarkdownFile[];
  currentPath: string;
}

export function PostContent({ content, files, currentPath }: PostContentProps) {
  const router = useRouter();
  const [headings, setHeadings] = useState<{ level: number; text: string; id: string }[]>([]);
  const currentFile = files.find(f => f.path === currentPath);

  const currentIndex = useMemo(() => 
    files.findIndex(file => file.path === currentPath),
    [files, currentPath]
  );

  const previousFile = useMemo(() => 
    currentIndex > 0 ? files[currentIndex - 1] : null,
    [currentIndex, files]
  );

  const nextFile = useMemo(() => 
    currentIndex < files.length - 1 ? files[currentIndex + 1] : null,
    [currentIndex, files]
  );

  const handlePrevious = useCallback(() => {
    if (previousFile) {
      router.push(`/posts/${encodeURIComponent(previousFile.path)}`);
    }
  }, [previousFile, router]);

  const handleNext = useCallback(() => {
    if (nextFile) {
      router.push(`/posts/${encodeURIComponent(nextFile.path)}`);
    }
  }, [nextFile, router]);

  useEffect(() => {
    const newHeadings = extractHeadings(content);
    setHeadings(newHeadings);
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{currentFile?.title}</h1>
        <span className="text-sm text-gray-500">{currentFile?.readingTime.text}</span>
      </div>

      <NavigationButtons
        currentIndex={currentIndex}
        totalFiles={files.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <TableOfContents headings={headings} />
        </div>

        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </div>
    </div>
  );
} 
