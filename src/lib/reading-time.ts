const WORDS_PER_MINUTE = 200; // Average reading speed

export interface ReadingTime {
  minutes: number;
  text: string;
}

export function calculateReadingTime(content: string): ReadingTime {
  // Remove code blocks
  const contentWithoutCode = content.replace(/```[\s\S]*?```/g, '');
  
  // Remove HTML tags
  const contentWithoutHtml = contentWithoutCode.replace(/<[^>]*>/g, '');
  
  // Remove markdown syntax
  const contentWithoutMarkdown = contentWithoutHtml
    .replace(/#{1,6}\s/g, '') // Headings
    .replace(/\*\*|\*|__|_/g, '') // Bold/italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/!\[([^\]]+)\]\([^)]+\)/g, '') // Images
    .replace(/>\s/g, '') // Blockquotes
    .replace(/\n/g, ' ') // Newlines
    .replace(/\s+/g, ' ') // Multiple spaces
    .trim();

  // Count words
  const wordCount = contentWithoutMarkdown.split(/\s+/).length;
  
  // Calculate reading time
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  
  // Format text
  const text = minutes === 1 ? '1 min read' : `${minutes} min read`;
  
  return { minutes, text };
} 