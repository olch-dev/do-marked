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

  it('has navigation buttons', () => {
    cy.get('button').contains('Previous').should('exist')
    cy.get('button').contains('Next').should('exist')
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
})