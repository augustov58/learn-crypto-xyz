'use client';

import React, { useState, useEffect } from 'react';
import { Topic } from '@/types';

interface ResourcePanelProps {
  topic: Topic;
  color: string;
  onClose: () => void;
}

export default function ResourcePanel({ topic, color, onClose }: ResourcePanelProps) {
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());

  // Load completed resources from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`completed-${topic.id}`);
    if (stored) {
      try {
        const completed = JSON.parse(stored);
        setCompletedResources(new Set(completed));
      } catch (e) {
        console.error('Error loading completed resources:', e);
      }
    }
  }, [topic.id]);

  // Save to localStorage whenever completedResources changes
  useEffect(() => {
    localStorage.setItem(`completed-${topic.id}`, JSON.stringify(Array.from(completedResources)));
  }, [completedResources, topic.id]);

  const toggleResourceComplete = (resourceId: string) => {
    setCompletedResources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }
      return newSet;
    });
  };

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
  const bgColor = isDarkMode ? '#0a0a0a' : '#ffffff';

  const completedCount = completedResources.size;
  const totalCount = topic.resources.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      style={{ backgroundColor: bgColor }}
    >
      {/* Header with close button and topic info */}
      <div
        className="sticky top-0 z-10 border-b-4"
        style={{ borderColor: color, backgroundColor: bgColor }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">{topic.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">{topic.description}</p>
              <div className="mt-4 flex items-center gap-4">
                <span
                  className={`text-sm px-4 py-2 rounded-full border ${
                    difficultyColors[topic.difficulty]
                  }`}
                >
                  {topic.difficulty}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Progress: {completedCount} / {totalCount} completed ({progressPercentage.toFixed(0)}%)
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-3 w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${progressPercentage}%`,
                    backgroundColor: color
                  }}
                />
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-4xl font-bold leading-none ml-6"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      {/* Resources list */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Learning Resources ({totalCount})
        </h2>

        <div className="space-y-4">
          {topic.resources.map((resource) => {
            const isCompleted = completedResources.has(resource.id);

            return (
              <div
                key={resource.id}
                className={`p-5 border-2 rounded-lg transition-all ${
                  isCompleted
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="flex-shrink-0 pt-1">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => toggleResourceComplete(resource.id)}
                      className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 cursor-pointer"
                      aria-label={`Mark ${resource.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
                    />
                  </div>

                  {/* Icon */}
                  <span className="text-3xl flex-shrink-0">{resourceIcons[resource.type]}</span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-semibold text-lg hover:underline ${
                          isCompleted
                            ? 'text-gray-600 dark:text-gray-400 line-through'
                            : 'text-gray-800 dark:text-gray-100'
                        }`}
                      >
                        {resource.title}
                      </a>
                      <span
                        className={`text-xs px-3 py-1 rounded-full border whitespace-nowrap ${
                          difficultyColors[resource.difficulty]
                        }`}
                      >
                        {resource.difficulty}
                      </span>
                    </div>
                    {resource.description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{resource.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                        {resource.type}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new URL(resource.url).hostname}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>💡 Tip:</strong> Check off resources as you complete them to track your progress.
            Click on any resource title to open it in a new tab. Your progress is automatically saved!
          </p>
        </div>
      </div>
    </div>
  );
}
