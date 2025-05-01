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
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`pl-${(heading.level - 1) * 4} hover:text-blue-500`}
            >
              <a
                href={`#${heading.id}`}
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