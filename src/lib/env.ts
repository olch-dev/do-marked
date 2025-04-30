export function validateEnv() {
  const requiredEnvVars = {
    GITHUB_OWNER: process.env.GITHUB_OWNER,
    GITHUB_REPO: process.env.GITHUB_REPO,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}. ` +
      'Please set them in your .env.local file.'
    );
  }
}

export function getEnv() {
  validateEnv();
  return {
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    dir: process.env.GITHUB_REPO_DIR || '',
    token: process.env.GITHUB_TOKEN,
  };
} 