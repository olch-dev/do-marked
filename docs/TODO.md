# TODO

This document tracks planned improvements and features for the project.

## High Priority

### Performance Optimizations
- [ ] Optimize Timeline component
  - [ ] Add windowing optimization for label filtering
  - [ ] Implement lazy loading for post content
  - [ ] Add memoization for expensive computations
- [ ] Enhance PostContent component
  - [ ] Add suspense boundaries for better loading states
  - [ ] Implement progressive loading for long posts

### User Experience
- [ ] Add search functionality
  - [ ] Search by title
  - [ ] Search by content
  - [ ] Search by labels
- [ ] Implement dark mode
  - [ ] System preference detection
  - [ ] Manual toggle
  - [ ] Persist preference

### Core Features
- [ ] Add keyboard navigation
  - [ ] Navigate between posts (j/k)
  - [ ] Quick search (/)
  - [ ] Close post (Esc)
- [ ] Add share functionality
  - [ ] Copy link button
  - [ ] Social media sharing

## Medium Priority

### Developer Experience
- [ ] Add testing infrastructure
  - [ ] Set up Jest/Vitest
  - [ ] Add component tests
  - [ ] Add utility function tests
- [ ] Add Storybook
  - [ ] Configure with TypeScript
  - [ ] Add stories for all components
  - [ ] Add documentation
- [ ] Improve code quality
  - [ ] Add Husky pre-commit hooks
  - [ ] Configure ESLint rules
  - [ ] Add Prettier
  - [ ] Add commit message linting

### Content Management
- [ ] Add post categories
  - [ ] Category hierarchy
  - [ ] Category-based navigation
  - [ ] Category filters
- [ ] Enhance metadata
  - [ ] Author information
  - [ ] Cover images
  - [ ] Related posts

## Low Priority

### Infrastructure
- [ ] Add distributed caching
  - [ ] Redis/Memcached integration
  - [ ] Cache invalidation strategy
  - [ ] Cache analytics
- [ ] Add monitoring
  - [ ] Error tracking (Sentry)
  - [ ] Analytics (Plausible/Umami)
  - [ ] Health checks
- [ ] Add API improvements
  - [ ] Rate limiting
  - [ ] Request caching
  - [ ] API documentation

### Documentation
- [ ] Add contributing guidelines
- [ ] Add architecture documentation
- [ ] Add API documentation
- [ ] Add development guides

## Completed ✓

### User Experience
- [x] Add reading time estimates
  - [x] Calculate based on word count
  - [x] Display in timeline and post view
  - [x] Handle markdown syntax and code blocks
  - [x] Format display text

## Notes

### Priority Levels
- **High**: Immediate impact on user experience or performance
- **Medium**: Important for developer experience and maintainability
- **Low**: Nice to have, scaling preparation

### Implementation Guidelines
1. Each feature should have its own branch
2. Update CHANGELOG.md for each feature
3. Add tests where applicable
4. Update documentation
5. Create a pull request 