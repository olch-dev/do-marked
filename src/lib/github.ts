import { Octokit } from 'octokit';
import { getEnv } from './env';
import matter from 'gray-matter';

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
  date: string;
  title?: string;
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

export async function getMarkdownFiles(): Promise<MarkdownFile[]> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: dir,
    });

    if (!Array.isArray(data)) {
      throw new Error('Expected an array of files');
    }

    const markdownFiles = data.filter(file => 
      file.type === 'file' && file.name.endsWith('.md')
    );

    if (markdownFiles.length === 0) {
      console.warn(`No markdown files found in the repository directory: ${dir}`);
      return [];
    }

    const filesWithContent = await Promise.all(
      markdownFiles.map(async (file) => {
        try {
          const { data } = await octokit.rest.repos.getContent({
            owner,
            repo,
            path: file.path,
          });

          if ('content' in data) {
            const content = Buffer.from(data.content, 'base64').toString('utf-8');
            const { data: frontmatter } = matter(content);
            
            // Try to get date from frontmatter, then from filename, or use default
            const date = frontmatter.date || extractDateFromFilename(file.name) || '1970-01-01';
            
            // Try to get title from frontmatter, then from content
            const title = frontmatter.title || extractTitleFromContent(content) || file.name.replace('.md', '');
            
            return {
              name: file.name,
              path: file.path,
              content,
              date,
              title,
            };
          }

          throw new Error('Failed to get file content');
        } catch (error) {
          console.error(`Error fetching content for ${file.path}:`, error);
          return null;
        }
      })
    );

    return filesWithContent.filter((file): file is MarkdownFile => file !== null);
  } catch (error) {
    console.error('Error fetching markdown files:', error);
    if (error instanceof Error && error.message.includes('Not Found')) {
      throw new Error(`Repository or directory not found: ${owner}/${repo}/${dir}`);
    }
    throw error;
  }
}

export async function getMarkdownFile(path: string): Promise<MarkdownFile> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    if ('content' in data) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      const { data: frontmatter } = matter(content);
      
      // Try to get date from frontmatter, then from filename, or use default
      const date = frontmatter.date || extractDateFromFilename(data.name) || '1970-01-01';
      
      // Try to get title from frontmatter, then from content
      const title = frontmatter.title || extractTitleFromContent(content) || data.name.replace('.md', '');
      
      return {
        name: data.name,
        path: data.path,
        content,
        date,
        title,
      };
    }

    throw new Error('Failed to get file content');
  } catch (error) {
    console.error(`Error fetching file ${path}:`, error);
    if (error instanceof Error && error.message.includes('Not Found')) {
      throw new Error(`File not found: ${path}`);
    }
    throw error;
  }
} 