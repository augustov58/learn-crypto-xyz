#!/usr/bin/env tsx

/**
 * Validation script for crypto-topics data
 * 
 * Usage:
 *   npm run validate-topics
 *   or
 *   npx tsx scripts/validate-topics.ts
 */

import {
  validateTopicsData,
  validateDataIntegrity,
} from '../lib/validation';

// Import data directly (TypeScript will handle the compilation)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { categories, topics } = require('../data/crypto-topics');

function main() {
  console.log('🔍 Validating crypto-topics data...\n');

  try {
    // Import data
    if (!categories || !Array.isArray(categories)) {
      throw new Error('Categories data is missing or invalid');
    }
    if (!topics || !Array.isArray(topics)) {
      throw new Error('Topics data is missing or invalid');
    }
    
    console.log(`📊 Found ${categories.length} categories and ${topics.length} topics\n`);

    // Validate structure
    const validation = validateTopicsData({ categories, topics });
    
    if (!validation.success) {
      console.error('❌ Validation failed!\n');
      console.error('Errors:');
      if (validation.error?.issues) {
        validation.error.issues.forEach((err) => {
          const path = err.path.length > 0 ? err.path.join('.') : 'root';
          console.error(`  - ${path}: ${err.message}`);
        });
      } else {
        console.error(`  - ${validation.error?.message || 'Unknown validation error'}`);
      }
      process.exit(1);
    }

    console.log('✅ Schema validation passed\n');

    // Validate data integrity
    if (!validation.data) {
      throw new Error('Validation succeeded but data is missing');
    }
    
    const integrity = validateDataIntegrity(validation.data.categories, validation.data.topics);
    
    if (!integrity.valid) {
      console.error('❌ Data integrity check failed!\n');
      console.error('Errors:');
      integrity.errors.forEach((err) => {
        console.error(`  - ${err}`);
      });
      process.exit(1);
    }

    console.log('✅ Data integrity check passed\n');
    console.log('🎉 All validations passed!');
    
    // Summary
    const totalResources = validation.data!.topics.reduce(
      (sum, topic) => sum + topic.resources.length,
      0
    );
    console.log(`\n📈 Summary:`);
    console.log(`   - Categories: ${validation.data!.categories.length}`);
    console.log(`   - Topics: ${validation.data!.topics.length}`);
    console.log(`   - Resources: ${totalResources}`);
    
  } catch (error) {
    console.error('❌ Validation script error:');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

