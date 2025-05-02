describe('Home Page', () => {
  beforeEach(() => {
    // Load fixture data
    cy.fixture('2025-05-01-sample-post-1.md').as('post1')
    cy.fixture('2025-05-02-sample-post-2.md').as('post2')
    
    // Visit the page with error handling and local mode
    cy.visit('/', {
      failOnStatusCode: true,
      qs: { local: 'true' },
      onBeforeLoad(win) {
        win.onerror = (message, source, lineno, colno, error) => {
          console.error('Error:', message, 'at', source, 'line', lineno, 'col', colno)
          return false
        }
      }
    })
    
    // Wait for the page to load and data to be available
    cy.get('h1').should('contain', 'Less is more')
  })

  it('can navigate to a post', () => {
    // Wait for timeline items to be rendered
    cy.get('[data-testid="timeline-item-container"]', { timeout: 10000 })
      .should('exist')
      .should('have.length.gt', 0)
    
    // Click on the first post
    cy.get('[data-testid="timeline-item-container"]')
      .first()
      .find('a')
      .click()
    
    // Check we're on a post page
    cy.url().should('include', '/posts/')
  })

  it('displays reading time for each post', () => {
    // Wait for timeline items to be rendered
    cy.get('[data-testid="timeline-item-container"]', { timeout: 10000 })
      .should('exist')
      .should('have.length.gt', 0)
    
    // Check that each post has a reading time
    cy.get('[data-testid="timeline-item-container"]')
      .each(($item) => {
        cy.wrap($item)
          .find('.text-gray-500')
          .should('contain', 'min read')
      })
  })
}) 