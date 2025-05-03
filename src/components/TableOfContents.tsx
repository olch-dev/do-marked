'use client';

import { Heading } from '@/lib/markdown';

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <div data-testid="table-of-contents" className="mb-8 p-4 rounded-lg" style={{ backgroundColor: 'var(--toc-bg)' }}>
      <h2 data-testid="table-of-contents-title" className="text-lg font-semibold mb-4" style={{ color: 'var(--toc-title)' }}>Table of Contents</h2>
      <nav data-testid="table-of-contents-nav">
        <ul data-testid="table-of-contents-list" className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              data-testid={`table-of-contents-item-${heading.id}`}
              className={`pl-${(heading.level - 1) * 4}`}
            >
              <a
                href={`#${heading.id}`}
                data-testid={`table-of-contents-link-${heading.id}`}
                className="block hover:text-blue-500 dark:hover:text-blue-400"
                style={{ color: 'var(--toc-text)' }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 