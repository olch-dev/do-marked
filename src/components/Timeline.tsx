'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { MarkdownFile } from '@/lib/github';
import LabelFilter from './LabelFilter';

interface TimelineItemProps {
  file: MarkdownFile;
  style: React.CSSProperties;
}

function TimelineItem({ file, style }: TimelineItemProps) {
  const formattedDate = file.date ? new Date(file.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  return (
    <div style={style} className="relative pl-8" data-testid="timeline-item">
      <div className="absolute left-4 top-0 w-3 h-3 rounded-full bg-blue-500"></div>
      <div className="flex gap-4">
        {formattedDate && (
          <div className="w-32 text-sm text-gray-500">
            {formattedDate}
          </div>
        )}
        <Link
          href={`/posts/${encodeURIComponent(file.path)}`}
          className="flex-1 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{file.title || file.name.replace('.md', '')}</h2>
              <span className="text-sm text-gray-500">{file.readingTime.text}</span>
            </div>
            {file.labels && file.labels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {file.labels.map(label => (
                  <span
                    key={label}
                    data-testid="label"
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
  );
}

interface TimelineProps {
  files: MarkdownFile[];
}

export default function Timeline({ files }: TimelineProps) {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [listHeight, setListHeight] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const allLabels = useMemo(() => 
    Array.from(new Set(files.flatMap(file => file.labels))).sort(),
    [files]
  );

  const sortedFiles = useMemo(() => 
    [...files]
      .filter(file => selectedLabels.length === 0 || selectedLabels.every(label => file.labels.includes(label)))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [files, selectedLabels]
  );

  const itemSize = 120; // Estimated height of each timeline item

  const renderItem = ({ index, style }: ListChildComponentProps) => (
    <div data-testid="timeline-item-container">
      <TimelineItem
        file={sortedFiles[index]}
        style={style}
      />
    </div>
  );

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const headerHeight = 80; // Approximate height of the header (including padding)
        const viewportHeight = window.innerHeight;
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const availableHeight = viewportHeight - containerTop - headerHeight;
        setListHeight(Math.max(availableHeight, 300)); // Minimum height of 300px
      }
    };

    // Initial height calculation
    updateHeight();

    // Update height on window resize
    window.addEventListener('resize', updateHeight);

    // Cleanup
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div ref={containerRef} className="relative">
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
      
      <List
        height={listHeight}
        itemCount={sortedFiles.length}
        itemSize={itemSize}
        width="100%"
      >
        {renderItem}
      </List>
    </div>
  );
} 