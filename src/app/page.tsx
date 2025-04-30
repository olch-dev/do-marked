import Link from 'next/link';
import { getMarkdownFiles } from '@/lib/github';

export default async function Home() {
  const files = await getMarkdownFiles();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Markdown Blog</h1>
      <div className="space-y-4">
        {files.map((file) => (
          <Link
            key={file.path}
            href={`/posts/${encodeURIComponent(file.path)}`}
            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold">{file.name.replace('.md', '')}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
