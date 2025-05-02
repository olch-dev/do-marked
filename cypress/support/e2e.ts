import './commands'
import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

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
  const sampleDir = join(process.cwd(), 'src/sample-files')
  if (!existsSync(sampleDir) || !existsSync(join(sampleDir, '2025-05-01-sample-post-1.md'))) {
    console.log('Generating sample files...')
    execSync('npm run generate:samples', { stdio: 'inherit' })
  }
}) 