'use client';

import React, { memo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Handle, Position } from 'reactflow';
import { Topic } from '@/types';
import ResourcePanel from './ResourcePanel';
import { useDarkMode } from '@/hooks/useDarkMode';

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
        onClick={() => setShowResources(true)}
      >
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-gray-800 dark:text-gray-100">{topic.name}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{topic.description}</div>
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
