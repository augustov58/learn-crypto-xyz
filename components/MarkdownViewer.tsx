'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRouter } from 'next/navigation';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            <span className="text-xl">←</span>
            Back to Topics
          </button>
        </div>
      </div>

      {/* Markdown Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <article className="prose prose-gray dark:prose-invert max-w-none
          prose-headings:font-bold
          prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8
          prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-2
          prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-4
          prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-3
          prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
          prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
          prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-1
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-pink-600 dark:prose-code:text-pink-400
          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
          prose-table:border-collapse prose-table:w-full
          prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600
          prose-td:p-3 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600
          prose-hr:border-gray-300 dark:prose-hr:border-gray-700 prose-hr:my-8
          prose-img:rounded-lg prose-img:shadow-md
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
