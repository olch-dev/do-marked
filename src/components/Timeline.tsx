'use client';

import Link from 'next/link';
import { MarkdownFile } from '@/lib/github';

interface TimelineProps {
  files: MarkdownFile[];
}

export default function Timeline({ files }: TimelineProps) {
  console.log('Files received:', files);
  
  // Sort files by date in descending order (newest first)
  const sortedFiles = [...files].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      
      <div className="space-y-8">
        {sortedFiles.map((file) => (
          <div key={file.path} className="relative pl-8">
            {/* Timeline dot */}
            <div className="absolute left-4 top-0 w-3 h-3 rounded-full bg-blue-500"></div>
            
            <div className="flex gap-4">
              {file.date && (
                <div className="w-32 text-sm text-gray-500">
                  {new Date(file.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              )}
              <Link
                href={`/posts/${encodeURIComponent(file.path)}`}
                className="flex-1 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-semibold">{file.title || file.name.replace('.md', '')}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 