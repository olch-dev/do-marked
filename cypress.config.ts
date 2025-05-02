import { defineConfig } from 'cypress'
import webpackPreprocessor from '@cypress/webpack-preprocessor'
import webpackConfig from './webpack.config'
import plugins from './cypress/plugins'

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    supportFile: 'cypress/support/component.ts',
    indexHtmlFile: 'cypress/support/component-index.html',
    setupNodeEvents(on, config) {
      on('file:preprocessor', webpackPreprocessor(webpackConfig))
      return config
    },
  },
  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false,
    bail: 1,
    setupNodeEvents(on, config) {
      plugins(on, config)
      return config
    },
  },
}) 