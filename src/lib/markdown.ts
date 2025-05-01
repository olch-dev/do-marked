import matter from 'gray-matter';

export interface ParsedMarkdown {
  content: string;
  metadata: Record<string, any>;
}

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export function parseMarkdown(markdown: string): ParsedMarkdown {
  const { content, data } = matter(markdown);
  return {
    content,
    metadata: data,
  };
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Create a URL-friendly ID by converting to lowercase and replacing spaces with hyphens
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    headings.push({ level, text, id });
  }

  return headings;
} 