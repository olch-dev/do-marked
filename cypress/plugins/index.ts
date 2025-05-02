import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('task', {
    ensureSampleFiles() {
      const sampleDir = join(process.cwd(), 'src/sample-files')
      if (!existsSync(sampleDir) || !existsSync(join(sampleDir, '2025-05-01-sample-post-1.md'))) {
        console.log('Generating sample files...')
        execSync('npm run generate:samples', { stdio: 'inherit' })
      }
      return null
    }
  })
} 