'use client';

import { useState, useCallback } from 'react';
import MindMap from '@/components/MindMap';
import FilterPanel from '@/components/FilterPanel';
import ThemeToggle from '@/components/ThemeToggle';
import SearchCommand from '@/components/SearchCommand';
import AuthModal from '@/components/auth/AuthModal';
import UserMenu from '@/components/auth/UserMenu';
import { useAuth } from '@/hooks/useAuth';
import { topics, categories } from '@/data/crypto-topics';
import { DifficultyLevel } from '@/types';

export default function Home() {
  const { user } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    DifficultyLevel | 'All'
  >('All');
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedTopicId, setHighlightedTopicId] = useState<string | undefined>();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleTopicSelect = useCallback((topicId: string) => {
    setHighlightedTopicId(topicId);
    // Find the topic node and scroll to it (handled by ReactFlow fitView)
    setTimeout(() => setHighlightedTopicId(undefined), 2000);
  }, []);

  const handleSearchFilterChange = useCallback(
    (filters: { searchQuery: string; category: string; difficulty: DifficultyLevel | 'All' }) => {
      setSearchQuery(filters.searchQuery);
      if (filters.category !== 'All') {
        setSelectedCategory(filters.category);
      }
      if (filters.difficulty !== 'All') {
        setSelectedDifficulty(filters.difficulty);
      }
    },
    []
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Learn Crypto</h1>
              <p className="text-blue-100 dark:text-blue-200 mt-1">
                Interactive learning paths for cryptocurrency and blockchain technology
              </p>
            </div>
            <div className="flex items-center gap-3">
              <SearchCommand
                topics={topics}
                categories={categories}
                onTopicSelect={handleTopicSelect}
                onFilterChange={handleSearchFilterChange}
              />
              <ThemeToggle />
              {user ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <FilterPanel
        categories={categories}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        onCategoryChange={setSelectedCategory}
        onDifficultyChange={setSelectedDifficulty}
      />

      {/* Mind Map */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        <MindMap
          topics={topics}
          categories={categories}
          selectedDifficulty={selectedDifficulty}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          highlightedTopicId={highlightedTopicId}
        />
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Click on any topic to view curated learning resources •{' '}
            <span className="font-semibold">{topics.length} topics</span> •{' '}
            <span className="font-semibold">
              {topics.reduce((acc, topic) => acc + topic.resources.length, 0)} resources
            </span>
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
