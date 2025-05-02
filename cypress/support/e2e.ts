import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(selector: string): Chainable<JQuery<HTMLElement>>
      ensureSampleFiles(): void
    }
  }
}

// Add custom commands here
Cypress.Commands.add('getByTestId', (selector: string) => {
  return cy.get(`[data-testid="${selector}"]`)
})

// Ensure sample files exist before tests
Cypress.Commands.add('ensureSampleFiles', () => {
  // Use Cypress task to check and generate sample files
  cy.task('ensureSampleFiles')
}) 