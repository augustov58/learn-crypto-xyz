'use client';

import { useState } from 'react';
import MindMap from '@/components/MindMap';
import FilterPanel from '@/components/FilterPanel';
import { topics, categories } from '@/data/crypto-topics';
import { DifficultyLevel } from '@/types';

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    DifficultyLevel | 'All'
  >('All');
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Learn Crypto</h1>
          <p className="text-blue-100 mt-1">
            Interactive learning paths for cryptocurrency and blockchain technology
          </p>
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
      <div className="flex-1 bg-gray-50">
        <MindMap
          topics={topics}
          categories={categories}
          selectedDifficulty={selectedDifficulty}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-gray-600 text-center">
            Click on any topic to view curated learning resources •{' '}
            <span className="font-semibold">{topics.length} topics</span> •{' '}
            <span className="font-semibold">
              {topics.reduce((acc, topic) => acc + topic.resources.length, 0)} resources
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
