'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Topic, Category, DifficultyLevel } from '@/types';

interface SearchCommandProps {
  topics: Topic[];
  categories: Category[];
  onTopicSelect?: (topicId: string) => void;
  onFilterChange?: (filters: { searchQuery: string; category: string; difficulty: DifficultyLevel | 'All' }) => void;
}

interface SearchResult {
  topic: Topic;
  matchScore: number;
  matchedFields: string[];
}

export default function SearchCommand({
  topics,
  categories,
  onTopicSelect,
  onFilterChange,
}: SearchCommandProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Search logic
  const searchResults = useMemo<SearchResult[]>(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    const results: SearchResult[] = [];

    topics.forEach((topic) => {
      const matchedFields: string[] = [];
      let score = 0;

      // Name match (highest weight)
      if (topic.name.toLowerCase().includes(query)) {
        matchedFields.push('name');
        score += 10;
        if (topic.name.toLowerCase().startsWith(query)) {
          score += 5; // Boost for prefix match
        }
      }

      // Description match
      if (topic.description.toLowerCase().includes(query)) {
        matchedFields.push('description');
        score += 3;
      }

      // Resource title match
      topic.resources.forEach((resource) => {
        if (resource.title.toLowerCase().includes(query)) {
          matchedFields.push('resource');
          score += 2;
        }
        if (resource.description?.toLowerCase().includes(query)) {
          score += 1;
        }
        // Tag match
        if (resource.tags?.some((tag) => tag.toLowerCase().includes(query))) {
          matchedFields.push('tag');
          score += 2;
        }
      });

      // Category match
      const category = categories.find((c) => c.id === topic.category);
      if (category?.name.toLowerCase().includes(query)) {
        matchedFields.push('category');
        score += 2;
      }

      if (score > 0) {
        results.push({ topic, matchScore: score, matchedFields });
      }
    });

    // Sort by score (highest first)
    return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);
  }, [searchQuery, topics, categories]);

  const handleSelectTopic = useCallback(
    (topicId: string) => {
      if (onTopicSelect) {
        onTopicSelect(topicId);
      }
      setIsOpen(false);
      setSearchQuery('');
      setSelectedIndex(0);
    },
    [onTopicSelect]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearchQuery('');
        setSelectedIndex(0);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
        e.preventDefault();
        handleSelectTopic(searchResults[selectedIndex].topic.id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchResults, selectedIndex, handleSelectTopic]);

  // Global keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Reset selected index when search query changes
  const prevQueryRef = React.useRef(searchQuery);
  React.useEffect(() => {
    if (prevQueryRef.current !== searchQuery) {
      prevQueryRef.current = searchQuery;
      setSelectedIndex(0);
    }
  }, [searchQuery]);

  // Notify parent of filter changes
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        searchQuery,
        category: 'All',
        difficulty: 'All',
      });
    }
  }, [searchQuery, onFilterChange]);

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 px-1 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
        aria-label="Open search"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden sm:inline">Search topics...</span>
        <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => {
          setIsOpen(false);
          setSearchQuery('');
        }}
        aria-hidden="true"
      />

      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, resources, categories..."
              className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
              autoFocus
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setSearchQuery('');
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() && searchResults.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                No topics found matching &quot;{searchQuery}&quot;
              </div>
            ) : searchQuery.trim() ? (
              <ul role="listbox" className="py-2">
                {searchResults.map((result, index) => {
                  const category = categories.find((c) => c.id === result.topic.category);
                  const isSelected = index === selectedIndex;

                  return (
                    <li
                      key={result.topic.id}
                      role="option"
                      aria-selected={isSelected}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={() => handleSelectTopic(result.topic.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {highlightMatch(result.topic.name, searchQuery)}
                            </h3>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: category?.color + '20',
                                color: category?.color,
                              }}
                            >
                              {category?.name}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                            {highlightMatch(result.topic.description, searchQuery)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {result.topic.resources.length} resource
                              {result.topic.resources.length !== 1 ? 's' : ''}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {result.topic.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                Start typing to search topics, resources, and categories...
              </div>
            )}
          </div>

          {/* Footer hint */}
          {searchQuery.trim() && searchResults.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
              <span>
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </span>
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↑↓</kbd> navigate
                <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↵</kbd> select
                <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd> close
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

