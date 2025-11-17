'use client';

import React from 'react';
import { Category, DifficultyLevel } from '@/types';

interface FilterPanelProps {
  categories: Category[];
  selectedCategory: string | 'All';
  selectedDifficulty: DifficultyLevel | 'All';
  onCategoryChange: (category: string | 'All') => void;
  onDifficultyChange: (difficulty: DifficultyLevel | 'All') => void;
}

export default function FilterPanel({
  categories,
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}: FilterPanelProps) {
  const difficulties: Array<DifficultyLevel | 'All'> = [
    'All',
    'Beginner',
    'Intermediate',
    'Advanced',
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Difficulty Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Difficulty Level
            </label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => onDifficultyChange(difficulty)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedDifficulty === difficulty
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Legend */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
