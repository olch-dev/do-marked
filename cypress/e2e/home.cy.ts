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
    // Click on a label
    cy.get('[data-testid="label"]').first().click()
    
    // Verify that the filtered posts contain the selected label
    cy.get('[data-testid="timeline-item"]').each(($item) => {
      cy.wrap($item).should('contain', 'react')
    })
  })
}) 