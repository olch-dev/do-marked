'use client';

import Link from 'next/link';
import showdown from 'showdown';

interface PostContentProps {
  content: string;
  title: string;
  date?: string;
}

export default function PostContent({ content, title, date }: PostContentProps) {
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
      <Link href="/">← Back to posts</Link>
      <article>
        {date && <p>{new Date(date).toLocaleDateString()}</p>}
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </article>
    </main>
  );
} 
