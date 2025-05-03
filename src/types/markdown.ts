export interface MarkdownFile {
  name: string;
  path: string;
  content: string;
  title: string;
  date: string;
  labels: string[];
  readingTime: {
    minutes: number;
    text: string;
  };
}

export interface Heading {
  level: number;
  text: string;
  id: string;
} 