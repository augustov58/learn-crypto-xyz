import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import path from 'path';
import { cache } from 'react';
import { promises as fs } from 'fs';
import MarkdownViewer from '@/components/MarkdownViewer';

const resourcesDir = path.join(process.cwd(), 'public', 'resources');

type PageProps = {
  params: { slug: string };
};

const getResourceContent = cache(async (slug: string) => {
  const filePath = path.join(resourcesDir, `${slug}.md`);

  try {
    await fs.access(filePath);
  } catch {
    notFound();
  }

  const content = await fs.readFile(filePath, 'utf-8');
  const headingMatch = content.match(/^#\s+(.*)$/m);
  const title = headingMatch?.[1]?.trim() ?? slug.replace(/-/g, ' ');

  return {
    content,
    title,
    description: `In-depth resource for ${title}`,
  };
});

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(resourcesDir);
    return files
      .filter((file) => file.endsWith('.md') && file !== 'README.md')
      .map((file) => ({
        slug: file.replace('.md', ''),
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resource = await getResourceContent(params.slug);
  return {
    title: `${resource.title} – Learn Crypto`,
    description: resource.description,
  };
}

export default async function ResourcePage({ params }: PageProps) {
  const resource = await getResourceContent(params.slug);
  return <MarkdownViewer content={resource.content} />;
}

