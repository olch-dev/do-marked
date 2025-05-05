import { marked } from 'marked';
import { extractHeadings } from '@/lib/markdown';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Add IDs to headings in the content
  const headings = extractHeadings(content);
  let processedContent = content;
  
  headings.forEach(heading => {
    const headingRegex = new RegExp(`^(#{${heading.level}})\\s+${heading.text}$`, 'm');
    processedContent = processedContent.replace(
      headingRegex,
      `$1 <span id="${heading.id}">${heading.text}</span>`
    );
  });

  const html = marked(processedContent, {
    gfm: true,
    breaks: true
  });

  return (
    <article 
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
} 