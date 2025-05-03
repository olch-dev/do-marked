'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MarkdownFile } from '@/lib/github';
import { extractHeadings } from '@/lib/markdown';
import TableOfContents from './TableOfContents';
import MarkdownContent from './MarkdownContent';
import { useTheme } from '@/context/ThemeContext';

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

interface PostHeaderProps {
  readingTime: string;
  title: string;
}

function PostHeader({ readingTime, title }: PostHeaderProps) {
  return (
    <header data-testid="post-header" className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div data-testid="post-title-container" className="flex items-center gap-4">
          <a
            href="/"
            data-testid="home-link"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-200 ease-in-out transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:shadow-sm focus:transition-all focus:duration-200 rounded px-2 py-1"
            aria-label="Return to home page"
          >
            ← Home
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span 
            data-testid="reading-time" 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 ease-in-out"
            aria-label={`Reading time: ${readingTime}`}
          >
            {readingTime}
          </span>
        </div>
      </div>
    </header>
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
          <PostHeader readingTime={currentFile.readingTime.text} title={currentFile.title} />
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
 