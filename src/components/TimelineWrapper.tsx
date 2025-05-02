'use server';

import { getMarkdownFiles } from '@/lib/github';
import Timeline from './Timeline';
 
export default async function TimelineWrapper() {
  const files = await getMarkdownFiles();
  return <Timeline files={files} />;
} 