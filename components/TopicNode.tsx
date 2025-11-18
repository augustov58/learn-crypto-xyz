'use client';

import React, { memo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Handle, Position } from 'reactflow';
import { Topic } from '@/types';
import ResourcePanel from './ResourcePanel';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useFavorites } from '@/hooks/useFavorites';

interface TopicNodeProps {
  data: {
    topic: Topic;
    color: string;
    highlighted?: boolean;
  };
}

function TopicNode({ data }: TopicNodeProps) {
  const { topic, color, highlighted } = data;
  const [showResources, setShowResources] = useState(false);
  const isDarkMode = useDarkMode();
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(topic.id);

  const difficultyColors = {
    Beginner: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700',
    Intermediate: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700',
    Advanced: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700',
  };

  const bgColor = isDarkMode ? '#1f2937' : '#ffffff';

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div
        className={`px-4 py-3 rounded-lg border-2 shadow-lg hover:shadow-xl transition-all cursor-pointer min-w-[200px] ${
          highlighted ? 'ring-4 ring-blue-400 ring-opacity-50 scale-105' : ''
        }`}
        style={{ borderColor: highlighted ? '#3B82F6' : color, backgroundColor: bgColor }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div
              className="font-semibold text-gray-800 dark:text-gray-100 flex-1 cursor-pointer"
              onClick={() => setShowResources(true)}
            >
              {topic.name}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(topic.id);
              }}
              className="flex-shrink-0 text-yellow-400 hover:text-yellow-500 transition-colors"
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className="w-5 h-5"
                fill={favorited ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
          </div>
          <div
            className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
            onClick={() => setShowResources(true)}
          >
            {topic.description}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-xs px-2 py-1 rounded-full border ${
                difficultyColors[topic.difficulty]
              }`}
            >
              {topic.difficulty}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {topic.resources.length} resource{topic.resources.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />

      {showResources &&
        typeof document !== 'undefined' &&
        createPortal(
          <ResourcePanel
            key={topic.id}
            topic={topic}
            color={color}
            onClose={() => setShowResources(false)}
          />,
          document.body
        )}
    </>
  );
}

export default memo(TopicNode);
