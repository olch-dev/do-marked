# Olch

A modern web application that displays and renders markdown files from a GitHub repository.

## Features

- List markdown files from a GitHub repository directory
- View rendered markdown content with proper formatting
- Clean and responsive user interface
- Server-side rendering for optimal performance

## Technology Stack

- Next.js 14 (React framework)
- Tailwind CSS (Styling)
- GitHub API (File fetching)
- Marked (Markdown rendering)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

Set the following environment variables:
- `GITHUB_OWNER`: GitHub repository owner
- `GITHUB_REPO`: GitHub repository name
- `GITHUB_REPO_DIR`: (Optional) Directory in the repository containing markdown files
- `GITHUB_TOKEN`: (Optional) GitHub personal access token for higher rate limits

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
