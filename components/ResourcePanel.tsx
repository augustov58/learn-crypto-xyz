'use client';

import React from 'react';
import { Topic } from '@/types';

interface ResourcePanelProps {
  topic: Topic;
  color: string;
  onClose: () => void;
}

export default function ResourcePanel({ topic, color, onClose }: ResourcePanelProps) {
  const resourceIcons = {
    article: '📄',
    video: '🎥',
    course: '🎓',
    documentation: '📚',
    tutorial: '🛠️',
    book: '📖',
  };

  const difficultyColors = {
    Beginner: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700',
    Intermediate: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700',
    Advanced: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700',
  };

  // Check if dark mode is active
  const isDarkMode = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  const panelBgColor = isDarkMode ? '#1f2937' : '#ffffff';

  return (
    <div
      className="fixed inset-0 bg-black/70 dark:bg-black/85 flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div
        className="rounded-lg shadow-2xl w-full max-w-[95vw] lg:max-w-[85vw] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: panelBgColor }}
      >
        <div
          className="sticky top-0 p-6 border-b-4 z-10"
          style={{ borderColor: color, backgroundColor: panelBgColor }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{topic.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{topic.description}</p>
              <div className="mt-3">
                <span
                  className={`text-sm px-3 py-1 rounded-full border ${
                    difficultyColors[topic.difficulty]
                  }`}
                >
                  {topic.difficulty}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold leading-none"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Learning Resources ({topic.resources.length})
          </h3>
          <div className="space-y-4">
            {topic.resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{resourceIcons[resource.type]}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100 hover:underline">
                        {resource.title}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border whitespace-nowrap ${
                          difficultyColors[resource.difficulty]
                        }`}
                      >
                        {resource.difficulty}
                      </span>
                    </div>
                    {resource.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{resource.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                        {resource.type}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new URL(resource.url).hostname}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>💡 Tip:</strong> Click on any resource to open it in a new tab. Work
              through resources in order for the best learning experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
