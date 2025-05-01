'use client';

import { useState } from 'react';
import { MarkdownFile } from '@/lib/github';

interface LabelFilterProps {
  files: MarkdownFile[];
  onFilterChange: (filteredFiles: MarkdownFile[]) => void;
}

export default function LabelFilter({ files, onFilterChange }: LabelFilterProps) {
  // Get all unique labels from files
  const allLabels = Array.from(
    new Set(files.flatMap(file => file.labels || []))
  ).sort();

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const handleLabelToggle = (label: string) => {
    const newSelectedLabels = selectedLabels.includes(label)
      ? selectedLabels.filter(l => l !== label)
      : [...selectedLabels, label];

    setSelectedLabels(newSelectedLabels);

    // Filter files based on selected labels
    const filteredFiles = newSelectedLabels.length === 0
      ? files
      : files.filter(file => 
          file.labels?.some(label => newSelectedLabels.includes(label))
        );

    onFilterChange(filteredFiles);
  };

  if (allLabels.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3">
        {allLabels.map(label => (
          <button
            key={label}
            onClick={() => handleLabelToggle(label)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedLabels.includes(label)
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
} 