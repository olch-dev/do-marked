# Olch

A modern web application that displays and renders markdown files from a GitHub repository.

## Features

- List markdown files from a GitHub repository directory in a timeline format
- Automatic date extraction from filenames and frontmatter
- Title extraction from markdown content
- View rendered markdown content with proper formatting
- Clean and responsive user interface
- Server-side rendering for optimal performance

## Technology Stack

- Next.js 14 (React framework)
- Tailwind CSS (Styling)
- GitHub API (File fetching)
- React Markdown (Markdown rendering)
- Octokit (GitHub API client)

## Architecture

The application is built with a clear separation of concerns:

1. **GitHub Integration** (`src/lib/github.ts`)
   - Handles authentication using GITHUB_TOKEN
   - Fetches markdown files from the repository
   - Extracts dates from filenames and frontmatter
   - Extracts titles from markdown content
   - Manages GitHub API rate limits
   - Requires GITHUB_TOKEN for authenticated requests

2. **Markdown Rendering** (`src/components/Markdown.tsx`)
   - Uses react-markdown to render markdown content
   - Handles markdown syntax and formatting
   - Receives pre-fetched markdown content
   - No direct interaction with GitHub API

3. **Environment Management** (`src/lib/env.ts`)
   - Centralizes environment variable validation
   - Provides type-safe access to configuration
   - Ensures required variables are present
   - Manages GITHUB_TOKEN and other GitHub-related variables

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your GitHub configuration:
   ```bash
   # Required
   GITHUB_OWNER=your-github-username
   GITHUB_REPO=your-repo-name
   
   # Optional
   GITHUB_REPO_DIR=posts  # Directory in the repository containing markdown files
   GITHUB_TOKEN=your-github-token  # For higher rate limits
   ```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Required Environment Variables
- `GITHUB_OWNER`: GitHub repository owner (username or organization)
- `GITHUB_REPO`: GitHub repository name

### Optional Environment Variables
- `GITHUB_REPO_DIR`: Directory in the repository containing markdown files (default: root directory)
- `GITHUB_TOKEN`: GitHub personal access token (optional, for higher rate limits)

## Error Handling

If you see the error "Missing required environment variables", make sure you have:
1. Created a `.env.local` file in the project root
2. Set both `GITHUB_OWNER` and `GITHUB_REPO` variables
3. Restarted the development server after making changes

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
 