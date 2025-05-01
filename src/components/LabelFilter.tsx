'use client';

interface LabelButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function LabelButton({ label, isSelected, onClick }: LabelButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm transition-colors ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

interface LabelFilterProps {
  labels: string[];
  selectedLabels: string[];
  onLabelToggle: (label: string) => void;
}

export default function LabelFilter({ labels, selectedLabels, onLabelToggle }: LabelFilterProps) {
  if (labels.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {labels.map(label => (
        <LabelButton
          key={label}
          label={label}
          isSelected={selectedLabels.includes(label)}
          onClick={() => onLabelToggle(label)}
        />
      ))}
    </div>
  );
} 