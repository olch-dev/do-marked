import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface MarkdownFile {
  name: string;
  path: string;
  content: string;
}

export async function getMarkdownFiles(): Promise<MarkdownFile[]> {
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;

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

  const filesWithContent = await Promise.all(
    markdownFiles.map(async (file) => {
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
    })
  );

  return filesWithContent;
}

export async function getMarkdownFile(path: string): Promise<MarkdownFile> {
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;

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
} 