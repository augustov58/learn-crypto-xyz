import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import MarkdownViewer from '@/components/MarkdownViewer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'public', 'resources', `${slug}.md`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  // Read the markdown content
  const content = fs.readFileSync(filePath, 'utf-8');

  return <MarkdownViewer content={content} />;
}

// Generate static params for known markdown files
export async function generateStaticParams() {
  const resourcesDir = path.join(process.cwd(), 'public', 'resources');

  try {
    const files = fs.readdirSync(resourcesDir);
    const markdownFiles = files
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .map(file => ({
        slug: file.replace('.md', ''),
      }));

    return markdownFiles;
  } catch (error) {
    return [];
  }
}
