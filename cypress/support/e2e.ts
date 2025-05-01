import '@testing-library/cypress/add-commands'

// Add custom commands here
Cypress.Commands.add('getByTestId', (selector: string) => {
  return cy.get(`[data-testid="${selector}"]`)
}) 