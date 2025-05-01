'use client';

import Link from 'next/link';
import showdown from 'showdown';
import { useEffect, useState } from 'react';

interface PostContentProps {
  content: string;
  title: string;
  date?: string;
}

export default function PostContent({ content, title, date }: PostContentProps) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Enable all features by default
    showdown.setFlavor('github');
    const converter = new showdown.Converter({
      ghCompatibleHeaderId: true,
      parseImgDimensions: true,
      strikethrough: true,
      tables: true,
      tasklists: true,
      smoothLivePreview: true,
      prefixHeaderId: false,
      disableForced4SpacesIndentedSublists: true,
      ghMentions: true,
      openLinksInNewWindow: true,
      emoji: true,
      underline: true,
      metadata: true,
    });
    // Set options that need to be explicitly set
    converter.setOption('simpleLineBreaks', true);
    converter.setOption('headerLevelStart', 1);
    converter.setOption('requireSpaceBeforeHeadingText', true);
    
    const html = converter.makeHtml(content);
    setHtmlContent(html);
  }, [content]);

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <Link
        href="/"
        className="inline-block mb-8 text-blue-600 hover:underline"
      >
        ← Back to posts
      </Link>
      <article className="grid grid-cols-2 gap-8">
        <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            <strong>{title}</strong>
          </h1>
          {date && (
            <p className="text-gray-600 dark:text-gray-400">{new Date(date).toLocaleDateString()}</p>
          )}
          <div 
            className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
        <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">Raw Markdown</h2>
          <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
            {content}
          </pre>
        </div>
      </article>
    </main>
  );
} 