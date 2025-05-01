'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MarkdownFile } from '@/lib/github';
import LabelFilter from './LabelFilter';

interface TimelineProps {
  files: MarkdownFile[];
}

export default function Timeline({ files }: TimelineProps) {
  const [filteredFiles, setFilteredFiles] = useState<MarkdownFile[]>(files);
  
  // Sort files by date in descending order (newest first)
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="relative">
      {/* Label Filter Section */}
      <div className="sticky top-0 z-10 bg-white py-4 mb-8">
        <LabelFilter 
          files={files} 
          onFilterChange={setFilteredFiles} 
        />
      </div>
      
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
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{file.title || file.name.replace('.md', '')}</h2>
                  {file.labels && file.labels.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {file.labels.map(label => (
                        <span
                          key={label}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 