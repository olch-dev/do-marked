'use client';

import { useCallback, useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'
import { MarkdownFile } from '@/lib/github'
import TimelineItem from './TimelineItem'

interface TimelineProps {
  files: MarkdownFile[]
}

export default function Timeline({ files }: TimelineProps) {
  const sortedFiles = useMemo(() => {
    return [...files].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })
  }, [files])

  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const file = sortedFiles[index]
    return (
      <div style={style} data-testid="timeline-item-container">
        <TimelineItem file={file} style={style} />
      </div>
    )
  }, [sortedFiles])

  if (sortedFiles.length === 0) {
    return <div>No posts available</div>
  }

  return (
    <List
      data-testid="timeline-list"
      height={600}
      itemCount={sortedFiles.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  )
} 