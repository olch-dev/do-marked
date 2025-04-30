import matter from 'gray-matter';

export interface ParsedMarkdown {
  content: string;
  metadata: Record<string, any>;
}

export function parseMarkdown(markdown: string): ParsedMarkdown {
  const { content, data } = matter(markdown);
  return {
    content,
    metadata: data,
  };
} 