import { mount } from '@cypress/react'
import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

// Add custom commands here
Cypress.Commands.add('mount', mount) 