import { mount } from 'cypress/react'
import '@testing-library/cypress/add-commands'

// Add custom commands here
Cypress.Commands.add('mount', mount) 