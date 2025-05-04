import { Octokit } from 'octokit';
import { getEnv } from './env';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { parseMarkdown, extractHeadings } from './markdown';
import { calculateReadingTime } from './reading-time';
import { rateLimit, RateLimitError } from './rate-limiter';

const { owner, repo, dir, token } = getEnv();

const octokit = new Octokit({
  auth: token,
  request: {
    timeout: 5000,
  },
});

export interface MarkdownFile {
  name: string;
  path: string;
  content: string;
  title: string;
  date: string;
  labels: string[];
  readingTime: {
    minutes: number;
    text: string;
  };
}

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 60 * 60;

// In-memory cache for development
const cache = new Map<string, { data: any; timestamp: number }>();

function getCacheKey(path: string) {
  return `${owner}/${repo}/${path}`;
}

async function getCachedContent(path: string) {
  const cacheKey = getCacheKey(path);
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 1000) {
    return cached.data;
  }

  // Apply rate limiting
  await rateLimit(`github:${owner}:${repo}:${path}`);

  const { data } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path,
  });

  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
}

function extractDateFromFilename(filename: string): string | null {
  // Try to match YYYY-MM-DD pattern
  const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    return dateMatch[1];
  }
  return null;
}

function extractTitleFromContent(content: string): string | null {
  // Try to find the first h1 heading
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  return null;
}

let isLocalMode = false; // Default to GitHub mode

export function setLocalMode(enabled: boolean) {
  isLocalMode = enabled;
}

async function getLocalFiles(): Promise<MarkdownFile[]> {
  const sampleDir = path.join(process.cwd(), 'src', 'sample-files');
  const files = fs.readdirSync(sampleDir);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(sampleDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { content: markdownContent, metadata } = parseMarkdown(content);
      const readingTime = calculateReadingTime(markdownContent);
      
      return {
        name: file,
        path: file,
        content: markdownContent,
        title: metadata.title || extractTitleFromContent(markdownContent) || file.replace('.md', ''),
        date: metadata.date || extractDateFromFilename(file) || new Date().toISOString(),
        labels: metadata.labels || [],
        readingTime,
      };
    });
}

async function getLocalFile(filePath: string): Promise<MarkdownFile> {
  const sampleDir = path.join(process.cwd(), 'src', 'sample-files');
  const fullPath = path.join(sampleDir, filePath);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  const { content: markdownContent, metadata } = parseMarkdown(content);
  const readingTime = calculateReadingTime(markdownContent);
  
  return {
    name: path.basename(filePath),
    path: filePath,
    content: markdownContent,
    title: metadata.title || extractTitleFromContent(markdownContent) || path.basename(filePath, '.md'),
    date: metadata.date || extractDateFromFilename(path.basename(filePath)) || new Date().toISOString(),
    labels: metadata.labels || [],
    readingTime,
  };
}

export async function getMarkdownFiles(): Promise<MarkdownFile[]> {
  if (isLocalMode) {
    return getLocalFiles();
  }

  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: dir,
    });

    if (!Array.isArray(data)) {
      throw new Error('Expected directory content');
    }

    const markdownFiles = data.filter(item => 
      item.type === 'file' && 
      item.name.endsWith('.md')
    );

    return Promise.all(
      markdownFiles.map(async (file) => {
        const content = await getCachedContent(file.path);
        if (!('content' in content)) {
          throw new Error('No content found in file');
        }
        const decodedContent = Buffer.from(content.content, 'base64').toString('utf-8');
        const { content: markdownContent, metadata } = parseMarkdown(decodedContent);
        const readingTime = calculateReadingTime(markdownContent);

        return {
          name: file.name,
          path: file.path,
          content: markdownContent,
          title: metadata.title || extractTitleFromContent(markdownContent) || file.name.replace('.md', ''),
          date: metadata.date || extractDateFromFilename(file.name) || new Date().toISOString(),
          labels: metadata.labels || [],
          readingTime,
        };
      })
    );
  } catch (error) {
    console.error('Error fetching markdown files:', error);
    return [];
  }
}

export async function getMarkdownFile(path: string): Promise<MarkdownFile> {
  if (isLocalMode) {
    return getLocalFile(path);
  }

  try {
    const content = await getCachedContent(path);
    if (!('content' in content)) {
      throw new Error('No content found in file');
    }
    const decodedContent = Buffer.from(content.content, 'base64').toString('utf-8');
    const { content: markdownContent, metadata } = parseMarkdown(decodedContent);
    const readingTime = calculateReadingTime(markdownContent);

    return {
      name: path.split('/').pop() || '',
      path,
      content: markdownContent,
      title: metadata.title || extractTitleFromContent(markdownContent) || path.split('/').pop()?.replace('.md', '') || '',
      date: metadata.date || extractDateFromFilename(path.split('/').pop() || '') || new Date().toISOString(),
      labels: metadata.labels || [],
      readingTime,
    };
  } catch (error) {
    console.error(`Error fetching file ${path}:`, error);
    throw error;
  }
} 