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
    <div data-testid="table-of-contents" className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h2 data-testid="table-of-contents-title" className="text-lg font-semibold mb-4">Table of Contents</h2>
      <nav data-testid="table-of-contents-nav">
        <ul data-testid="table-of-contents-list" className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              data-testid={`table-of-contents-item-${heading.id}`}
              className={`pl-${(heading.level - 1) * 4} hover:text-blue-500`}
            >
              <a
                href={`#${heading.id}`}
                data-testid={`table-of-contents-link-${heading.id}`}
                className="text-gray-700 hover:text-blue-500"
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