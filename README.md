# Less is more

A simple blog that displays markdown files from a GitHub repository in a timeline format.

## Features

- Timeline view of markdown files (newest first)
- Automatic date extraction from filenames (YYYY-MM-DD)
- Title extraction from markdown content
- Label filtering (AND condition - shows posts with ALL selected labels)
- Table of contents for posts
- Local development mode with sample files
- Virtual scrolling for efficient rendering of large lists
- Sample data generation for testing
- Reading time estimates for each post
- End-to-end testing with Cypress

## Getting Started

### Prerequisites

- Node.js 18+
- GitHub API token (for production mode)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your GitHub token:
   ```
   GITHUB_TOKEN=your_github_token
   ```

### Running the Application

#### Production Mode (GitHub)
```bash
npm run dev
```

#### Local Development Mode
```bash
# Generate sample data (optional)
npm run generate:samples

# Start the development server
npm run dev:local
```

In local mode, the application will use sample markdown files from the `src/sample-files` directory instead of fetching from GitHub.

### Sample Data Generation

The project includes a script to generate sample markdown files for testing:

```bash
npm run generate:samples
```

This will create 100 markdown files in `src/sample-files` with:
- Sequential dates (one per day, going back from today)
- Random labels from a predefined set
- Consistent content structure
- Proper frontmatter
- Reading time estimates

Generated files follow this structure:
```markdown
---
title: Sample Post Title
labels: [react, typescript, nextjs]
---

# Sample Post Title

Content with various sections...
```

## Development

### Adding Sample Files

1. Create markdown files in `src/sample-files`
2. Files should be named with the format `YYYY-MM-DD-title.md`
3. The first h1 heading in the file will be used as the title
4. Add labels in the frontmatter:
   ```yaml
   ---
   labels: [label1, label2, label3]
   ---
   ```

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
   - Extracts labels from frontmatter
   - Calculates reading time estimates
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

## Configuration

### Required Environment Variables
- `GITHUB_OWNER`: GitHub repository owner (username or organization)
- `GITHUB_REPO`: GitHub repository name

### Optional Environment Variables
- `GITHUB_REPO_DIR`: Directory in the repository containing markdown files (default: root directory)
- `GITHUB_TOKEN`: GitHub personal access token (optional, for higher rate limits)

## Markdown File Format

Markdown files can include the following frontmatter properties:

```yaml
---
title: Your Post Title
date: YYYY-MM-DD
labels: [label1, label2, label3]
---
```

### Frontmatter Properties

- `title`: The title of your post (optional)
  - If not provided, it will be extracted from the first h1 heading in the content
  - If no h1 heading is found, the filename (without .md) will be used

- `date`: The publication date (optional)
  - If not provided, it will be extracted from the filename if it matches YYYY-MM-DD
  - If no date is found, January 1st, 1970 will be used as default

- `labels`: Array of labels for filtering (optional)
  - Labels are displayed next to the post title
  - Can be used to filter posts in the main view
  - Example: `labels: [tutorial, markdown, basics]`

## Error Handling

The application provides detailed error messages to help with debugging:

1. **Content Validation Errors**
   - Shows the filename where the error occurred
   - Includes specific validation failure details
   - Example: `File "example.md": Missing required frontmatter field: title`

2. **Environment Configuration**
If you see the error "Missing required environment variables", make sure you have:
   - Created a `.env.local` file in the project root
   - Set both `GITHUB_OWNER` and `GITHUB_REPO` variables
   - Restarted the development server after making changes

3. **Local Mode Errors**
   - Shows detailed file information for validation errors
   - Includes proper error propagation
   - Maintains consistent error message formatting

## Testing

The project uses Cypress for end-to-end testing. Tests are located in the `cypress/e2e` directory.

### Test Setup

The test environment includes:

1. **Custom Commands** (`cypress/support/e2e.ts`)
   - `getByTestId`: Helper to select elements by data-testid
   - `ensureSampleFiles`: Ensures sample files exist before tests run

2. **Cypress Plugins** (`cypress/plugins/index.ts`)
   - Custom tasks for Node.js environment
   - Sample file generation when needed
   - File system operations

3. **Sample Files**
   - Generated on-demand when tests start
   - Not stored in source control
   - Created in `src/sample-files` directory

### Running Tests

```bash
# Start the development server in local mode
npm run dev:local

# In a separate terminal, run Cypress
npm run cypress:open
```

### Test Structure

- `home.cy.ts`: Tests the home page functionality
  - Navigation to posts
  - Timeline rendering
  - Local mode support

- `post.cy.ts`: Tests the post page functionality
  - Post content rendering
  - Navigation between posts
  - Table of contents
  - Reading time display

### Test IDs

The application uses `data-testid` attributes to make elements easily selectable in tests. Here are the main test IDs used:

- `post-content`: Main container for post content
- `post-layout`: Grid layout container
- `table-of-contents-container`: Container for the table of contents
- `table-of-contents`: Table of contents component
- `table-of-contents-title`: Table of contents heading
- `table-of-contents-nav`: Navigation element in table of contents
- `table-of-contents-list`: List of headings
- `table-of-contents-item-{id}`: Individual heading items
- `table-of-contents-link-{id}`: Links to headings
- `post-main-content`: Main content area
- `post-header`: Header section with title and metadata
- `post-title-container`: Container for title and home link
- `home-link`: Link to home page
- `post-title`: Post title
- `reading-time`: Reading time estimate

## License

MIT

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
 