'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MarkdownFile } from '@/lib/github';
import LabelFilter from './LabelFilter';

interface TimelineProps {
  files: MarkdownFile[];
}

export default function Timeline({ files }: TimelineProps) {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  
  // Get all unique labels from all files
  const allLabels = Array.from(
    new Set(files.flatMap(file => file.labels))
  ).sort();

  // Filter files that match ALL selected labels
  const filteredFiles = selectedLabels.length > 0
    ? files.filter(file => 
        selectedLabels.every(label => file.labels.includes(label))
      )
    : files;

  // Sort files by date in descending order (newest first)
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="relative">
      {/* Label Filter Section */}
      <div className="sticky top-0 z-10 bg-white py-4 mb-8">
        <LabelFilter
          labels={allLabels}
          selectedLabels={selectedLabels}
          onLabelToggle={(label) => {
            setSelectedLabels(prev => 
              prev.includes(label)
                ? prev.filter(l => l !== label)
                : [...prev, label]
            );
          }}
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