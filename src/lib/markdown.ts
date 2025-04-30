import { marked } from 'marked';
import matter from 'gray-matter';

export interface ParsedMarkdown {
  content: string;
  metadata: Record<string, any>;
}

export async function parseMarkdown(markdown: string): Promise<ParsedMarkdown> {
  const { content, data } = matter(markdown);
  return {
    content: await marked(content),
    metadata: data,
  };
} 