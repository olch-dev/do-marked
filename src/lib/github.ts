import { Octokit } from 'octokit';
import { getEnv } from './env';

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