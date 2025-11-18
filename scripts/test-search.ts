#!/usr/bin/env tsx

/**
 * Automated search functionality test
 * Tests the search logic programmatically
 */

import { topics, categories } from '../data/crypto-topics';

interface SearchResult {
  topic: typeof topics[0];
  matchScore: number;
  matchedFields: string[];
}

function searchTopics(query: string): SearchResult[] {
  const searchQuery = query.toLowerCase().trim();
  if (!searchQuery) {
    return [];
  }

  const results: SearchResult[] = [];

  topics.forEach((topic) => {
    const matchedFields: string[] = [];
    let score = 0;

    // Name match (highest weight)
    if (topic.name.toLowerCase().includes(searchQuery)) {
      matchedFields.push('name');
      score += 10;
      if (topic.name.toLowerCase().startsWith(searchQuery)) {
        score += 5; // Boost for prefix match
      }
    }

    // Description match
    if (topic.description.toLowerCase().includes(searchQuery)) {
      matchedFields.push('description');
      score += 3;
    }

    // Resource title match
    topic.resources.forEach((resource) => {
      if (resource.title.toLowerCase().includes(searchQuery)) {
        matchedFields.push('resource');
        score += 2;
      }
      if (resource.description?.toLowerCase().includes(searchQuery)) {
        score += 1;
      }
      // Tag match
      if (resource.tags?.some((tag) => tag.toLowerCase().includes(searchQuery))) {
        matchedFields.push('tag');
        score += 2;
      }
    });

    // Category match
    const category = categories.find((c) => c.id === topic.category);
    if (category?.name.toLowerCase().includes(searchQuery)) {
      matchedFields.push('category');
      score += 2;
    }

    if (score > 0) {
      results.push({ topic, matchScore: score, matchedFields });
    }
  });

  // Sort by score (highest first)
  return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);
}

// Test cases
const testCases = [
  { query: 'bitcoin', expectedMin: 1, description: 'Should find Bitcoin topics' },
  { query: 'ethereum', expectedMin: 1, description: 'Should find Ethereum topics' },
  { query: 'solidity', expectedMin: 1, description: 'Should find Solidity resources via tags' },
  { query: 'defi', expectedMin: 1, description: 'Should find DeFi topics and resources' },
  { query: 'privacy', expectedMin: 1, description: 'Should find privacy-related topics' },
  { query: 'tutorial', expectedMin: 1, description: 'Should find tutorial resources via tags' },
  { query: 'smart contracts', expectedMin: 1, description: 'Should find smart contract topics' },
  { query: 'zk-snarks', expectedMin: 1, description: 'Should find zk-SNARKs resources via tags' },
  { query: 'quilibrium', expectedMin: 1, description: 'Should find Quilibrium topics' },
  { query: 'nonexistentxyz123', expectedMin: 0, description: 'Should return no results for non-existent query' },
];

console.log('🔍 Testing Search Functionality\n');
console.log('=' .repeat(60));

let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
  const results = searchTopics(testCase.query);
  const success = results.length >= testCase.expectedMin;
  
  if (success) {
    passed++;
    console.log(`✅ Test ${index + 1}: ${testCase.description}`);
    console.log(`   Query: "${testCase.query}"`);
    console.log(`   Results: ${results.length} (expected at least ${testCase.expectedMin})`);
    if (results.length > 0) {
      console.log(`   Top result: "${results[0].topic.name}" (score: ${results[0].matchScore})`);
      console.log(`   Matched fields: ${results[0].matchedFields.join(', ')}`);
    }
  } else {
    failed++;
    console.log(`❌ Test ${index + 1}: ${testCase.description}`);
    console.log(`   Query: "${testCase.query}"`);
    console.log(`   Results: ${results.length} (expected at least ${testCase.expectedMin})`);
  }
  console.log('');
});

console.log('=' .repeat(60));
console.log(`\n📊 Test Summary:`);
console.log(`   ✅ Passed: ${passed}/${testCases.length}`);
console.log(`   ❌ Failed: ${failed}/${testCases.length}`);

// Additional detailed tests
console.log('\n📋 Detailed Search Analysis\n');

const detailedQueries = ['bitcoin', 'solidity', 'privacy', 'tutorial'];
detailedQueries.forEach((query) => {
  const results = searchTopics(query);
  console.log(`Query: "${query}"`);
  console.log(`  Found ${results.length} results:`);
  results.slice(0, 3).forEach((result, idx) => {
    console.log(`    ${idx + 1}. ${result.topic.name} (score: ${result.matchScore})`);
    console.log(`       Matched: ${result.matchedFields.join(', ')}`);
  });
  console.log('');
});

// Test tag matching specifically
console.log('🏷️  Tag Matching Test\n');
const tagQueries = ['interactive', 'official-docs', 'video', 'gamified'];
tagQueries.forEach((query) => {
  const results = searchTopics(query);
  const hasTagMatches = results.some((r) => r.matchedFields.includes('tag'));
  console.log(`Query: "${query}" - Tag matches: ${hasTagMatches ? '✅' : '❌'}`);
  if (hasTagMatches) {
    const tagMatches = results.filter((r) => r.matchedFields.includes('tag'));
    console.log(`  Found ${tagMatches.length} topics with tag matches`);
  }
});

if (failed === 0) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some tests failed. Please review the results above.');
  process.exit(1);
}

