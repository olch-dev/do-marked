import { MarkdownFile } from '@/lib/github';
import Link from 'next/link';

interface TimelineItemProps {
  file: MarkdownFile;
}

function TimelineItem({ file }: TimelineItemProps) {
  const formattedDate = file.date ? new Date(file.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  return (
    <div className="relative pl-8">
      <div className="absolute left-4 top-0 w-3 h-3 rounded-full bg-blue-500"></div>
      <div className="flex gap-4">
        {formattedDate && (
          <div className="w-32 text-sm text-gray-500">
            {formattedDate}
          </div>
        )}
        <Link
          href={`/posts/${encodeURIComponent(file.path)}`}
          className="flex-1 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-500">{file.title || file.name.replace('.md', '')}</h2>
              <span className="text-sm text-gray-500">{file.readingTime.text}</span>
            </div>
            {file.labels && file.labels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {file.labels.map(label => (
                  <span
                    key={label}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
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

export default TimelineItem; 