# Changelog

All notable changes to this project will be documented in this file.

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
- Added sample files with overlapping labels
- Implemented AND condition for label filtering
- Added date sorting (newest first) to timeline
- Added caching for GitHub API responses
- Implemented in-memory cache for development
- Added page revalidation every hour
- Optimized API calls with caching
- Added reading time estimates
  - Calculate based on word count
  - Display in timeline and post view
  - Handle markdown syntax and code blocks
  - Format display text
- Basic Cypress test for post navigation
- Local mode support in Cypress tests
- Testing documentation in README

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
- Updated label filtering to show posts with ALL selected labels
- Enhanced timeline sorting to display newest posts first
- Optimized GitHub API calls with caching
- Improved performance with in-memory caching
- Enhanced page revalidation strategy
- Improved timeline layout
  - Moved reading time to the right side
  - Placed labels below title
  - Enhanced spacing and alignment
- Optimized reading time calculation
  - Pre-calculate during file loading
  - Store in file object
  - Consistent calculation across views
- Simplified Cypress test to focus on core functionality
- Added proper waiting for timeline items to render
- Improved documentation with testing section

### Fixed
- Fixed reading time display in timeline
- Fixed content parsing for reading time calculation
- Resolved async Client Component error by properly separating server and client components
- Fixed invalid component import issues by configuring proper path aliases
- Fixed markdown header rendering by properly configuring showdown options
- Fixed main title styling to ensure proper bold text display
- Fixed markdown heading and list item styling by properly configuring CSS reset
- Fixed date handling for files without dates by using January 1st, 1970 as default
- Fixed label handling to ensure it's always an array 

## [0.5.0] - 2024-03-20

### Added
- Added virtual scrolling for timeline
- Added sample data generation script
- Added label filtering functionality
- Added table of contents for posts

### Changed
- Improved performance with windowing
- Enhanced markdown parsing
- Updated UI components

## [0.4.0] - 2024-03-19

### Added
- Added GitHub API integration
- Added local development mode
- Added markdown file parsing
- Added date extraction from filenames

### Changed
- Improved error handling
- Enhanced file loading
- Updated documentation

## [0.3.0] - 2024-03-18

### Added
- Added Next.js 14 setup
- Added Tailwind CSS configuration
- Added basic layout components
- Added environment configuration

### Changed
- Improved project structure
- Enhanced development setup
- Updated dependencies

## [0.2.0] - 2024-03-17

### Added
- Added project initialization
- Added basic documentation
- Added license file
- Added git configuration

### Changed
- Improved README
- Enhanced project structure
- Updated documentation

## [0.1.0] - 2024-03-16

### Added
- Initial project setup
- Basic project structure
- Initial documentation
- License file

## [Release 5] - Virtual Scrolling and Sample Data

### Added
- Sample data generation script for testing
  - Generates 100 markdown files with dates, labels, and content
  - Random label assignment from predefined set
  - Sequential dates for easy testing
  - Consistent content structure with headings, lists, and code blocks
- Added ts-node for running TypeScript scripts
- Added date-fns for date formatting

### Fixed
- Tailwind CSS configuration and setup
  - Properly configured PostCSS
  - Added typography plugin for markdown styling
  - Fixed module resolution issues
- Removed unsupported Geist font, replaced with Inter
- Fixed Next.js configuration file format (TypeScript to JavaScript)

### Changed
- Updated development scripts
  - Added `generate:samples` command
  - Removed turbopack flag from dev commands 