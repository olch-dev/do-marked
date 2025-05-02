'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MarkdownFile } from '@/lib/github';
import { extractHeadings } from '@/lib/markdown';
import TableOfContents from './TableOfContents';
import MarkdownContent from './MarkdownContent';

interface NavigationButtonsProps {
  currentIndex: number;
  totalFiles: number;
  onPrevious: () => void;
  onNext: () => void;
}

function NavigationButtons({ currentIndex, totalFiles, onPrevious, onNext }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={currentIndex === totalFiles - 1}
        className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
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
  currentFile: MarkdownFile;
}

export default function PostContent({ content, files, currentPath, currentFile }: PostContentProps) {
  const router = useRouter();
  const [headings, setHeadings] = useState<Array<{ level: number; text: string; id: string }>>([]);
  const currentIndex = useMemo(() => 
    files.findIndex(file => file.path === currentPath),
    [files, currentPath]
  );

  useEffect(() => {
    setHeadings(extractHeadings(content));
  }, [content]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      router.push(`/posts/${encodeURIComponent(files[currentIndex - 1].path)}`);
    }
  }, [currentIndex, files, router]);

  const handleNext = useCallback(() => {
    if (currentIndex < files.length - 1) {
      router.push(`/posts/${encodeURIComponent(files[currentIndex + 1].path)}`);
    }
  }, [currentIndex, files, router]);

  return (
    <div data-testid="post-content" className="max-w-4xl mx-auto">
      <div data-testid="post-layout" className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div data-testid="table-of-contents-container" className="md:col-span-1">
          <TableOfContents headings={headings} />
        </div>
        <div data-testid="post-main-content" className="md:col-span-3">
          <div data-testid="post-header" className="flex justify-between items-center mb-8">
            <div data-testid="post-title-container" className="flex items-center gap-4">
              <a
                href="/"
                data-testid="home-link"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Home
              </a>
            </div>
            <span data-testid="reading-time" className="text-sm text-gray-500">{currentFile.readingTime.text}</span>
          </div>
          <MarkdownContent content={content} />
          <NavigationButtons
            currentIndex={currentIndex}
            totalFiles={files.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
} 
 