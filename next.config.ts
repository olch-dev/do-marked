import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GITHUB_OWNER: process.env.GITHUB_OWNER,
    GITHUB_REPO: process.env.GITHUB_REPO,
    GITHUB_REPO_DIR: process.env.GITHUB_REPO_DIR,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    };
    return config;
  },
};

export default nextConfig;
