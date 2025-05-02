describe('Post Page', () => {
  beforeEach(() => {
    // Load fixture data
    cy.fixture('2025-05-01-sample-post-1.md').as('post1')
    cy.fixture('2025-05-02-sample-post-2.md').as('post2')

    // Visit the home page first with error handling
    cy.visit('/', {
      failOnStatusCode: true,
      onBeforeLoad(win) {
        win.onerror = (message, source, lineno, colno, error) => {
          console.error('Error:', message, 'at', source, 'line', lineno, 'col', colno)
          return false
        }
      }
    })

    // Wait for the page to load and data to be available
    cy.get('h1').should('contain', 'Less is more')

    // Click on the first post
    cy.get('[data-testid="timeline-item-container"]')
      .first()
      .find('a')
      .click()
  })

  it('displays the post title', () => {
    cy.get('h1').should('contain', 'Sample Post 1')
  })

  it('displays the post content', () => {
    cy.get('article').should('contain', 'This is a sample post')
  })

  it('displays post content correctly', () => {
    // Wait for the post content to be rendered
    cy.get('article', { timeout: 10000 })
      .should('exist')
    
    // Check that the post has a title
    cy.contains('Sample Post 1')
      .should('exist')
    
    // Check that the post has content
    cy.contains('This is a sample post')
      .should('exist')
    
    // Check that the post has reading time
    cy.contains('min read')
      .should('exist')
  })

  it('renders markdown content correctly', () => {
    // Check that markdown elements are rendered properly
    cy.get('.prose').should('exist')
    
    // Check headings (h1, h2, h3 are present in the sample)
    cy.get('.prose h1').should('contain', 'Sample Post 1')
    cy.get('.prose h2').should('contain', 'Introduction')
    cy.get('.prose h3').should('contain', 'Subsection')
    
    // Check paragraphs
    cy.get('.prose p').should('contain', 'Lorem ipsum dolor sit amet')
    
    // Check lists (both ordered and unordered are present)
    cy.get('.prose ul li').should('contain', 'First item')
    cy.get('.prose ol li').should('contain', 'Numbered item')
    
    // Check code blocks
    cy.get('.prose pre').should('contain', 'function example()')
    cy.get('.prose code').should('contain', 'console.log')
  })

  it('displays post metadata correctly', () => {
    // Check title
    cy.get('h1').should('contain', 'Sample Post 1')
    
    // Check reading time
    cy.get('.text-gray-500').should('contain', 'min read')
  })

  it('has working navigation buttons', () => {
    // Check previous button is disabled on first post
    cy.get('button').contains('Previous').should('not.be.disabled')
    
    // Check next button is enabled on first post
    cy.get('button').contains('Next').should('be.disabled')
    
    // Click next button to go to second post
    cy.get('button').contains('Previous').click()
    
    // Verify navigation to second post
    // OLCH print url
    cy.url().then(url => {
      console.log('Current URL:', url)
    })
    cy.url().should('include', '/posts/2025-04-30-sample-post-2.md')
    
    // Check previous button is enabled on second post
    cy.get('button').contains('Previous').should('not.be.disabled')
    
    // Check next button is disabled on second post
    cy.get('button').contains('Next').should('not.be.disabled')
  })

  it('displays table of contents', () => {
    // Check table of contents exists
    cy.get('[data-testid="table-of-contents"]').should('exist')
    
    // Check it contains headings
    cy.get('[data-testid="table-of-contents"] a').should('have.length.gt', 0)
  })
})