'use client';

import Link from 'next/link';
import showdown from 'showdown';
import { MarkdownFile } from '@/lib/github';

interface PostContentProps {
  content: string;
  title: string;
  date?: string;
  previousPost?: MarkdownFile | null;
  nextPost?: MarkdownFile | null;
}

export default function PostContent({ content, title, date, previousPost, nextPost }: PostContentProps) {
  const converter = new showdown.Converter({
    tables: true,
    headerLevelStart: 1,
    requireSpaceBeforeHeadingText: true,
    ghCompatibleHeaderId: true,
    strikethrough: true,
    simpleLineBreaks: true,
    tasklists: true,
    disableForced4SpacesIndentedSublists: true,
    parseImgDimensions: true,
    simplifiedAutoLink: true,
    excludeTrailingPunctuationFromURLs: true,
    literalMidWordUnderscores: true,
    openLinksInNewWindow: true
  });

  showdown.setFlavor('github');
  const htmlContent = converter.makeHtml(content);

  return (
    <main>
      <div className="mb-8">
        <Link href="/" className="text-blue-500 hover:text-blue-700">← Back to posts</Link>
      </div>
      
      <article>
        {date && <p className="text-gray-500 mb-4">{new Date(date).toLocaleDateString()}</p>}
        <div 
          className="markdown-content prose max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </article>

      <div className="mt-12 pt-8 border-t">
        <div className="flex justify-between">
          {previousPost && (
            <Link 
              href={`/posts/${encodeURIComponent(previousPost.path)}`}
              className="text-blue-500 hover:text-blue-700"
            >
              ← {previousPost.title || previousPost.name.replace('.md', '')}
            </Link>
          )}
          {nextPost && (
            <Link 
              href={`/posts/${encodeURIComponent(nextPost.path)}`}
              className="text-blue-500 hover:text-blue-700"
            >
              {nextPost.title || nextPost.name.replace('.md', '')} →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
} 
