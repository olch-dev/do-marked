describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Wait for the page to load and data to be available
    cy.get('h1').should('contain', 'Less is more')
    
    // Wait for data to load and check the page content
    cy.get('body').then(($body) => {
      cy.log('Initial page content:', $body.html())
    })
    
    // Wait for timeline items to appear
    cy.get('[data-testid="timeline-item-container"]', { timeout: 20000 })
      .should('exist')
      .should('have.length.gt', 0)
      .then(($items) => {
        cy.log('Found timeline items:', $items.length)
      })
  })

  it('displays the main title', () => {
    cy.get('h1').should('contain', 'Less is more')
  })

  it('displays timeline items', () => {
    // Debug: Log the page content
    cy.get('body').then(($body) => {
      cy.log('Current page content:', $body.html())
    })
    
    // Check for timeline items
    cy.get('[data-testid="timeline-item-container"]', { timeout: 20000 })
      .should('exist')
      .should('have.length.gt', 0)
      .then(($items) => {
        cy.log('Timeline items found:', $items.length)
        cy.log('First item content:', $items.first().html())
      })
  })

  it('displays reading time for posts', () => {
    cy.get('[data-testid="timeline-item-container"]', { timeout: 20000 })
      .first()
      .should('contain', 'min read')
  })

  it('filters posts by labels', () => {
    // Get the first label and its text
    cy.get('[data-testid="label"]', { timeout: 20000 })
      .first()
      .then(($label) => {
        const labelText = $label.text().trim()
        
        // Debug: Log the label text
        cy.log('Selected label:', labelText)
        
        // Click the label
        cy.wrap($label).click()
        
        // Wait for the re-render
        cy.wait(2000)
        
        // Debug: Log the filtered items
        cy.get('[data-testid="timeline-item-container"]').then(($items) => {
          cy.log('Filtered items:', $items.length)
          cy.log('First filtered item:', $items.first().html())
        })
        
        // Check that all visible timeline items contain the selected label
        cy.get('[data-testid="timeline-item-container"]').each(($item) => {
          cy.wrap($item).should('contain', labelText)
        })
      })
  })
}) 