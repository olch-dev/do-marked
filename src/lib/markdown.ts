import { marked } from 'marked';
import matter from 'gray-matter';

// Configure marked options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert line breaks to <br>
  pedantic: false, // Don't be pedantic
});

export interface ParsedMarkdown {
  content: string;
  metadata: Record<string, any>;
}

export async function parseMarkdown(markdown: string): Promise<ParsedMarkdown> {
  const { content, data } = matter(markdown);
  const rendered = await marked(content);
  return {
    content: rendered,
    metadata: data,
  };
} 