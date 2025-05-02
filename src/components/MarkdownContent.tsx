import { marked } from 'marked';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const html = marked(content, {
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