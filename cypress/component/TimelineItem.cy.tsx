import { TimelineItem } from '@/components/TimelineItem'
import { MarkdownFile } from '@/lib/github'

describe('TimelineItem', () => {
  const mockFile: MarkdownFile = {
    path: '2024-03-20-test.md',
    content: '# Test Post\n\nThis is a test post.',
    title: 'Test Post',
    date: new Date('2024-03-20'),
    labels: ['test', 'cypress'],
    readingTime: {
      minutes: 2,
      text: '2 min read'
    }
  }

  it('renders correctly', () => {
    cy.mount(<TimelineItem file={mockFile} />)
    
    cy.get('[data-testid="timeline-item"]').should('exist')
    cy.get('[data-testid="timeline-item"]').should('contain', 'Test Post')
    cy.get('[data-testid="timeline-item"]').should('contain', '2 min read')
    cy.get('[data-testid="timeline-item"]').should('contain', 'test')
    cy.get('[data-testid="timeline-item"]').should('contain', 'cypress')
  })
}) 