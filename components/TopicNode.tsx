'use client';

import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Topic } from '@/types';
import ResourcePanel from './ResourcePanel';

interface TopicNodeProps {
  data: {
    topic: Topic;
    color: string;
  };
}

function TopicNode({ data }: TopicNodeProps) {
  const { topic, color } = data;
  const [showResources, setShowResources] = useState(false);

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 border-green-300',
    Intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Advanced: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div
        className="px-4 py-3 rounded-lg border-2 shadow-lg bg-white hover:shadow-xl transition-shadow cursor-pointer min-w-[200px]"
        style={{ borderColor: color }}
        onClick={() => setShowResources(true)}
      >
        <div className="flex flex-col gap-2">
          <div className="font-semibold text-gray-800">{topic.name}</div>
          <div className="text-xs text-gray-600">{topic.description}</div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-xs px-2 py-1 rounded-full border ${
                difficultyColors[topic.difficulty]
              }`}
            >
              {topic.difficulty}
            </span>
            <span className="text-xs text-gray-500">
              {topic.resources.length} resource{topic.resources.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />

      {showResources && (
        <ResourcePanel
          topic={topic}
          color={color}
          onClose={() => setShowResources(false)}
        />
      )}
    </>
  );
}

export default memo(TopicNode);
