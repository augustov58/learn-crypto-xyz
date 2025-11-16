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
    Beginner: 'bg-green-100 text-green-800 border-green-300',
    Intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Advanced: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 p-6 border-b-4 bg-white z-10"
          style={{ borderColor: color }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{topic.name}</h2>
              <p className="text-gray-600 mt-2">{topic.description}</p>
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
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Learning Resources ({topic.resources.length})
          </h3>
          <div className="space-y-4">
            {topic.resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{resourceIcons[resource.type]}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-gray-800 hover:underline">
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
                      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {resource.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new URL(resource.url).hostname}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Click on any resource to open it in a new tab. Work
              through resources in order for the best learning experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
