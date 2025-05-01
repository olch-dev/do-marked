describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the main title', () => {
    cy.get('h1').should('contain', 'Less is more')
  })

  it('displays timeline items', () => {
    cy.get('[data-testid="timeline-item"]').should('exist')
  })

  it('displays reading time for posts', () => {
    cy.get('[data-testid="timeline-item"]').first().should('contain', 'min read')
  })

  it('filters posts by labels', () => {
    // Get the first label and its text
    cy.get('[data-testid="label"]').first().then(($label) => {
      const labelText = $label.text().trim()
      
      // Click the label
      cy.wrap($label).click()
      
      // Wait for the re-render
      cy.wait(1000)
      
      // Check that all visible timeline items contain the selected label
      cy.get('[data-testid="timeline-item"]').each(($item) => {
        cy.wrap($item).should('contain', labelText)
      })
    })
  })
}) 