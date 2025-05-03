const fs = require('fs');
const path = require('path');
const { format, addDays } = require('date-fns');

const SAMPLE_DIR = path.join(process.cwd(), 'src/sample-files');
const LABELS = ['react', 'typescript', 'nextjs', 'tailwind', 'javascript', 'webdev', 'tutorial', 'guide'];

function generateRandomLabels(): string[] {
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 labels
  const shuffled = [...LABELS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateContent(title: string, labels: string[]): string {
  return `---
title: ${title}
labels: [${labels.join(', ')}]
---

# ${title}

This is a sample post about ${labels.join(' and ')}.

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Main Content

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

### Subsection

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Conclusion

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Code Example

\`\`\`typescript
function example() {
  console.log('Hello, World!');
}
\`\`\`

## List Example

- First item
- Second item
- Third item

1. Numbered item
2. Another numbered item
3. Yet another numbered item

## Final Thoughts

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
`;
}

function generateSampleFiles() {
  // Create sample directory if it doesn't exist
  if (!fs.existsSync(SAMPLE_DIR)) {
    fs.mkdirSync(SAMPLE_DIR, { recursive: true });
  }

  // Generate 100 sample files starting from 2025-05-01
  const startDate = new Date('2025-05-01');
  
  for (let i = 0; i < 100; i++) {
    const date = addDays(startDate, -i); // One file per day, going back in time
    const formattedDate = format(date, 'yyyy-MM-dd');
    const title = `Sample Post ${i + 1}`;
    const labels = generateRandomLabels();
    const content = generateContent(title, labels);
    const filename = `${formattedDate}-sample-post-${i + 1}.md`;
    const filepath = path.join(SAMPLE_DIR, filename);
    
    fs.writeFileSync(filepath, content);
  }

  console.log('Generated 100 sample markdown files in', SAMPLE_DIR);
}

generateSampleFiles(); 