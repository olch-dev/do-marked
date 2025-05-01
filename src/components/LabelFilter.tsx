'use client';

interface LabelFilterProps {
  labels: string[];
  selectedLabels: string[];
  onLabelToggle: (label: string) => void;
}

export default function LabelFilter({ labels, selectedLabels, onLabelToggle }: LabelFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map(label => (
        <button
          key={label}
          onClick={() => onLabelToggle(label)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedLabels.includes(label)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
} 