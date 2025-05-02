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

  it('displays posts in chronological order (newest first)', () => {
    // Wait for timeline items to be rendered
    cy.get('[data-testid="timeline-item-container"]', { timeout: 10000 })
      .should('exist')
      .should('have.length.gt', 0)
    
    // Get all dates from the timeline
    const dates: Date[] = []
    cy.get('[data-testid="timeline-item-container"]')
      .each(($item) => {
        cy.wrap($item)
          .find('.text-gray-500')
          .first()
          .invoke('text')
          .then((dateText) => {
            dates.push(new Date(dateText))
          })
      })
      .then(() => {
        // Verify dates are in descending order
        for (let i = 1; i < dates.length; i++) {
          expect(dates[i].getTime()).to.be.lte(dates[i - 1].getTime())
        }
      })
  })

  it('displays and links post titles correctly', () => {
    // Wait for timeline items to be rendered
    cy.get('[data-testid="timeline-item-container"]', { timeout: 10000 })
      .should('exist')
      .should('have.length.gt', 0)
    
    // Check each post has a title and link
    cy.get('[data-testid="timeline-item-container"]')
      .each(($item) => {
        // Verify title exists and is not empty
        cy.wrap($item)
          .find('a')
          .should('exist')
          .should('not.be.empty')
          .should('have.attr', 'href')
          .and('match', /^\/posts\//)
      })
  })

  it('displays post labels correctly', () => {
    // Wait for timeline items to be rendered
    cy.get('[data-testid="timeline-item-container"]', { timeout: 10000 })
      .should('exist')
      .should('have.length.gt', 0)
    
    // Check each post has at least one label
    cy.get('[data-testid="timeline-item-container"]')
      .each(($item) => {
        cy.wrap($item)
          .find('.bg-gray-100.text-gray-600')
          .should('exist')
          .should('not.be.empty')
      })
  })

  it('displays timeline visual elements correctly', () => {
    // Wait for timeline items to be rendered
    cy.get('[data-testid="timeline-item-container"]', { timeout: 10000 })
      .should('exist')
      .should('have.length.gt', 0)
    
    // Check each timeline item has the blue dot and timeline line
    cy.get('[data-testid="timeline-item-container"]')
      .each(($item) => {
        // Verify blue dot exists
        cy.wrap($item)
          .find('.bg-blue-500')
          .should('exist')
          .should('have.class', 'rounded-full')
          .should('have.class', 'w-3')
          .should('have.class', 'h-3')
        
        // Verify timeline line exists by checking the visual effect
        cy.wrap($item)
          .find('.bg-blue-500')
          .should('have.css', 'left', '16px') // 16px = 4rem = left-4
      })
  })

  it('verifies post title and reading time layout', () => {
    // Wait for timeline items to be rendered
    cy.get('[data-testid="timeline-item-container"]', { timeout: 10000 })
      .should('exist')
      .should('have.length.gt', 0)
    
    // Check the layout of the first post
    cy.get('[data-testid="timeline-item-container"]')
      .first()
      .within(() => {
        // Verify title and reading time are in the same line with reading time on the right
        cy.get('.flex.justify-between.items-center')
          .should('exist')
          .should('contain', 'Sample Post 1')
          .should('contain', 'min read')
        
        // Verify labels are below the title
        cy.get('.flex.flex-wrap.gap-2')
          .should('exist')
          .should('be.visible')
      })
  })
}) 