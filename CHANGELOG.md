# Changelog

## [Unreleased]

### Added
- Initialized Next.js project with TypeScript and Tailwind CSS
- Set up project structure for Olch
- Created README with project documentation
- Implemented GitHub API integration for fetching markdown files
- Created markdown rendering utility with support for frontmatter
- Built main page listing all markdown files
- Created individual post page with markdown rendering
- Added responsive styling with Tailwind CSS
- Improved error handling in GitHub API integration
- Added error page for graceful error handling
- Added loading state for better user experience
- Added support for specifying a directory in the GitHub repository
- Added Tailwind Typography plugin for better markdown styling
- Improved markdown rendering configuration
- Environment variable validation with detailed error messages
- Comprehensive documentation for environment variables in README.md
- New `env.ts` utility for centralized environment variable management
- Added side-by-side view of rendered and raw markdown content
- Added timeline view for posts with dates
- Added automatic date extraction from filenames and frontmatter
- Added title extraction from markdown content
- Added label-based filtering of posts
- Added support for labels in markdown frontmatter
- Local development mode with `--local` flag
- Sample files support for local development
- Updated README with local mode documentation

### Changed
- Improved README.md structure and clarity
- Enhanced error handling for missing environment variables
- Updated technology stack documentation
- Clarified architecture and separation of concerns in documentation
- Better explained the role of each component in the system
- Corrected documentation regarding GitHub authentication requirements
- Updated architecture section to accurately reflect GITHUB_TOKEN usage
- Fixed component import issues by properly configuring path aliases
- Updated Next.js configuration to support absolute imports with @ alias
- Improved component architecture by separating server and client components
- Switched from react-markdown to showdown for markdown rendering
- Enhanced showdown configuration for better GitHub-flavored markdown support
- Updated post page layout to show both rendered and raw markdown content
- Enhanced main title styling with bold text and proper color contrast
- Moved markdown rendering to client-side for better performance and reactivity
- Improved markdown styling by properly configuring CSS reset in globals.css
- Updated main page to show posts in a timeline format
- Improved date display with better formatting
- Enhanced post titles with content-based extraction
- Updated markdown file format documentation
- Renamed project from "Olch" to "Less is more"
- Improved README structure and content

## [0.1.0] - 2024-03-20

### Added
- Initial release
- Timeline view of markdown files
- Automatic date extraction from filenames
- Title extraction from markdown content
- Label filtering
- Table of contents for posts

### Fixed
- Resolved async Client Component error by properly separating server and client components
- Fixed invalid component import issues by configuring proper path aliases
- Fixed markdown header rendering by properly configuring showdown options
- Fixed main title styling to ensure proper bold text display
- Fixed markdown heading and list item styling by properly configuring CSS reset
- Fixed date handling for files without dates by using January 1st, 1970 as default
- Fixed label handling to ensure it's always an array 