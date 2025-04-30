import { Octokit } from 'octokit';

const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

if (!GITHUB_OWNER || !GITHUB_REPO) {
  throw new Error('GITHUB_OWNER and GITHUB_REPO environment variables are required');
}

// We can safely assert these as string since we've checked they exist
const owner = GITHUB_OWNER as string;
const repo = GITHUB_REPO as string;

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: {
    timeout: 5000,
  },
});

export interface MarkdownFile {
  name: string;
  path: string;
  content: string;
}

export async function getMarkdownFiles(): Promise<MarkdownFile[]> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: '',
    });

    if (!Array.isArray(data)) {
      throw new Error('Expected an array of files');
    }

    const markdownFiles = data.filter(file => 
      file.type === 'file' && file.name.endsWith('.md')
    );

    if (markdownFiles.length === 0) {
      console.warn('No markdown files found in the repository');
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
            return {
              name: file.name,
              path: file.path,
              content,
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
      throw new Error(`Repository not found: ${owner}/${repo}`);
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
      return {
        name: data.name,
        path: data.path,
        content,
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