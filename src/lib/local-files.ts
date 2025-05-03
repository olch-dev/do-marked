import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { extractHeadings } from './markdown';
import { calculateReadingTime } from './reading-time';
import { validateFileSize, validateFrontmatter, validateRenderedSize, sanitizeContent, ContentValidationError } from './content-validator';
import { MarkdownFile } from '@/types/markdown';

let isLocalMode = false;

export function setLocalMode(enabled: boolean) {
  isLocalMode = enabled;
}

export async function getMarkdownFiles(): Promise<MarkdownFile[]> {
  const sampleDir = path.join(process.cwd(), 'src', 'sample-files');
  if (!fs.existsSync(sampleDir)) {
    return [];
  }

  const files = fs.readdirSync(sampleDir);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      try {
        const filePath = path.join(sampleDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Validate file size
        validateFileSize(content, file);
        
        const { data: frontmatter, content: markdownContent } = matter(content);
        
        // Validate frontmatter
        validateFrontmatter(frontmatter, file);
        
        // Validate rendered content size
        validateRenderedSize(markdownContent, file);
        
        // Sanitize content
        const sanitizedContent = sanitizeContent(markdownContent);
        
        const headings = extractHeadings(sanitizedContent);
        const title = headings.find(h => h.level === 1)?.text || file.replace('.md', '');
        
        // Extract date from filename (YYYY-MM-DD) or use default
        const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/);
        const date = dateMatch ? dateMatch[1] : '1970-01-01';
        
        return {
          name: file,
          path: file,
          content: sanitizedContent,
          title,
          date,
          labels: frontmatter.labels || [],
          readingTime: calculateReadingTime(sanitizedContent)
        };
      } catch (error) {
        if (error instanceof ContentValidationError) {
          throw error; // The error already includes the filename
        }
        throw new Error(`Error processing file "${file}": ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    })
    .filter((file): file is MarkdownFile => file !== null);
}

export async function getMarkdownFile(filePath: string): Promise<MarkdownFile> {
  const fullPath = path.join(process.cwd(), 'src', 'sample-files', filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const content = fs.readFileSync(fullPath, 'utf-8');
  
  try {
    // Validate file size
    validateFileSize(content, filePath);
    
    const { data: frontmatter, content: markdownContent } = matter(content);
    
    // Validate frontmatter
    validateFrontmatter(frontmatter, filePath);
    
    // Validate rendered content size
    validateRenderedSize(markdownContent, filePath);
    
    // Sanitize content
    const sanitizedContent = sanitizeContent(markdownContent);
    
    const headings = extractHeadings(sanitizedContent);
    const title = headings.find(h => h.level === 1)?.text || filePath.replace('.md', '');
    
    // Extract date from filename (YYYY-MM-DD) or use default
    const dateMatch = filePath.match(/^(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1] : '1970-01-01';
    
    return {
      name: filePath,
      path: filePath,
      content: sanitizedContent,
      title,
      date,
      labels: frontmatter.labels || [],
      readingTime: calculateReadingTime(sanitizedContent)
    };
  } catch (error) {
    if (error instanceof ContentValidationError) {
      throw error; // The error already includes the filename
    }
    throw new Error(`Error processing file "${filePath}": ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 