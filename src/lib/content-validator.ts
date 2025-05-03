import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Create a JSDOM instance for DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Maximum file size in bytes (1MB)
const MAX_FILE_SIZE = 1024 * 1024;

// Maximum content length after rendering (2MB)
const MAX_RENDERED_SIZE = 2 * 1024 * 1024;

// Required frontmatter fields
const REQUIRED_FRONTMATTER: string[] = [];

// Allowed frontmatter fields
const ALLOWED_FRONTMATTER = ['title', 'date', 'labels'];

// Custom error class for content validation
export class ContentValidationError extends Error {
  constructor(message: string, filename?: string) {
    super(filename ? `File "${filename}": ${message}` : message);
    this.name = 'ContentValidationError';
  }
}

// Validate file size
export function validateFileSize(content: string, filename?: string): void {
  if (content.length > MAX_FILE_SIZE) {
    throw new ContentValidationError(
      `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024}KB`,
      filename
    );
  }
}

// Validate frontmatter
export function validateFrontmatter(frontmatter: Record<string, any>, filename?: string): void {
  // Check required fields
  for (const field of REQUIRED_FRONTMATTER) {
    if (!(field in frontmatter)) {
      throw new ContentValidationError(`Missing required frontmatter field: ${field}`, filename);
    }
  }

  // Check for unknown fields
  for (const field of Object.keys(frontmatter)) {
    if (!ALLOWED_FRONTMATTER.includes(field)) {
      throw new ContentValidationError(`Unknown frontmatter field: ${field}`, filename);
    }
  }

  // Validate field types
  if (frontmatter.title && typeof frontmatter.title !== 'string') {
    throw new ContentValidationError('Title must be a string', filename);
  }

  if (frontmatter.date && !isValidDate(frontmatter.date)) {
    throw new ContentValidationError('Invalid date format in frontmatter', filename);
  }

  if (frontmatter.labels && !Array.isArray(frontmatter.labels)) {
    throw new ContentValidationError('Labels must be an array', filename);
  }
}

// Validate rendered content size
export function validateRenderedSize(content: string, filename?: string): void {
  const rendered = marked(content);
  const sanitized = purify.sanitize(rendered);
  
  if (sanitized.length > MAX_RENDERED_SIZE) {
    throw new ContentValidationError(
      `Rendered content exceeds maximum limit of ${MAX_RENDERED_SIZE / 1024}KB`,
      filename
    );
  }
}

// Sanitize markdown content
export function sanitizeContent(content: string): string {
  const rendered = marked(content);
  return purify.sanitize(rendered, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'em', 'strong', 'code',
      'pre', 'blockquote', 'ul', 'ol', 'li',
      'a', 'img', 'hr', 'table', 'thead',
      'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],
    FORBID_TAGS: ['style', 'script'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick']
  });
}

// Helper function to validate date format
function isValidDate(date: string): boolean {
  if (typeof date !== 'string') return false;
  const timestamp = Date.parse(date);
  return !isNaN(timestamp);
} 