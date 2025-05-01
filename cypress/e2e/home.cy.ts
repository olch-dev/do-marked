describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Wait for the page to load and data to be available
    cy.get('h1').should('contain', 'Less is more')
    cy.wait(1000) // Wait for data to load
  })

  it('displays the main title', () => {
    cy.get('h1').should('contain', 'Less is more')
  })

  it('displays timeline items', () => {
    // Debug: Log the page content
    cy.get('body').then(($body) => {
      cy.log('Page content:', $body.html())
    })
    
    // Check for timeline items
    cy.get('[data-testid="timeline-item"]', { timeout: 10000 })
      .should('exist')
      .should('have.length.gt', 0)
  })

  it('displays reading time for posts', () => {
    cy.get('[data-testid="timeline-item"]', { timeout: 10000 })
      .first()
      .should('contain', 'min read')
  })

  it('filters posts by labels', () => {
    // Get the first label and its text
    cy.get('[data-testid="label"]', { timeout: 10000 })
      .first()
      .then(($label) => {
        const labelText = $label.text().trim()
        
        // Debug: Log the label text
        cy.log('Selected label:', labelText)
        
        // Click the label
        cy.wrap($label).click()
        
        // Wait for the re-render
        cy.wait(1000)
        
        // Debug: Log the filtered items
        cy.get('[data-testid="timeline-item"]').then(($items) => {
          cy.log('Filtered items:', $items.length)
        })
        
        // Check that all visible timeline items contain the selected label
        cy.get('[data-testid="timeline-item"]').each(($item) => {
          cy.wrap($item).should('contain', labelText)
        })
      })
  })
}) 