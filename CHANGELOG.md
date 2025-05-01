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

### Fixed
- Resolved async Client Component error by properly separating server and client components
- Fixed invalid component import issues by configuring proper path aliases
- Fixed markdown header rendering by properly configuring showdown options
- Fixed main title styling to ensure proper bold text display 