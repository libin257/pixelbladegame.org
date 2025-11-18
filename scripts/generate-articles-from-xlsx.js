#!/usr/bin/env node

/**
 * Batch generate article MDX files from winter_burrow_content_matrix.xlsx
 *
 * This script reads the content matrix Excel file and creates empty MDX files
 * with proper frontmatter for all articles listed in the matrix.
 */

import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const XLSX_PATH = path.join(__dirname, '../tools/demand/winter_burrow_content_matrix.xlsx');
const CONTENT_DIR = path.join(__dirname, '../src/content');

// Read the Excel file
console.log('📖 Reading Excel file:', XLSX_PATH);
const workbook = XLSX.readFile(XLSX_PATH);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

console.log(`✅ Found ${data.length} rows in the matrix\n`);

// Process each row and generate MDX files
let created = 0;
let skipped = 0;
let errors = 0;

for (const row of data) {
  try {
    // Extract relevant fields from the row (based on actual Excel columns)
    const url = row['URL Path'] || row['url'] || row['路径'];
    const title = row['Article Title'] || row['title'] || row['标题'];
    const keywords = row['Keyword'] || row['keywords'] || row['关键词'];
    const priority = row['Priority'] || row['priority'] || row['优先级'];
    const reference = row['Reference Link'] || row['reference'] || '';

    // Skip if no URL or title
    if (!url || !title) {
      console.log(`⚠️  Skipping row (missing URL or title):`, row);
      skipped++;
      continue;
    }

    // Clean URL path (remove leading slash and .mdx extension if present)
    const cleanUrl = url.replace(/^\//, '').replace(/\.mdx?$/, '');
    const filePath = path.join(CONTENT_DIR, `${cleanUrl}.mdx`);
    const fileDir = path.dirname(filePath);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  File already exists: ${cleanUrl}.mdx`);
      skipped++;
      continue;
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    // Determine category from URL path
    let category = 'Guide';
    if (url.includes('/crafting/')) category = 'Crafting';
    else if (url.includes('/survival/')) category = 'Survival';
    else if (url.includes('/resources/')) category = 'Resources';
    else if (url.includes('/platforms/')) category = 'Platform';
    else if (url.includes('/faq/')) category = 'FAQ';

    // Generate description from title and keywords
    const description = `Learn about ${keywords} in Winter Burrow. This comprehensive guide covers everything you need to know.`;

    // Generate frontmatter
    const frontmatter = {
      title: title || 'Untitled',
      description: description,
      keywords: keywords || '',
      category: category,
      priority: priority || 50,
      date: new Date().toISOString().split('T')[0],
      reference: reference
    };

    // Generate MDX content with reference link if available
    const referenceSection = reference ? `

## External Reference

For additional information, you can check out: [${reference}](${reference})
` : '';

    const mdxContent = `---
title: "${frontmatter.title}"
description: "${frontmatter.description}"
keywords: "${frontmatter.keywords}"
category: "${frontmatter.category}"
priority: ${frontmatter.priority}
date: "${frontmatter.date}"${reference ? `\nreference: "${reference}"` : ''}
---

# ${frontmatter.title}

${frontmatter.description}

## Quick Summary

<!-- Add a brief 2-3 sentence summary here -->

## Overview

<!-- Add your detailed overview here -->

## Key Points

- Important point 1
- Important point 2
- Important point 3
- Important point 4

## Step-by-Step Guide

### Step 1: [Action Title]

<!-- Describe the first step in detail -->

### Step 2: [Action Title]

<!-- Describe the second step in detail -->

### Step 3: [Action Title]

<!-- Describe the third step in detail -->

## Tips & Best Practices

- **Tip 1**: [Description]
- **Tip 2**: [Description]
- **Tip 3**: [Description]

## Common Mistakes to Avoid

1. **Mistake 1**: [Explanation]
2. **Mistake 2**: [Explanation]
3. **Mistake 3**: [Explanation]

## FAQ

### Question 1: [Common question about this topic]

Answer to question 1.

### Question 2: [Another common question]

Answer to question 2.

### Question 3: [Third question]

Answer to question 3.

## Related Guides

- [Related Guide 1](/link)
- [Related Guide 2](/link)
- [Related Guide 3](/link)${referenceSection}
`;

    // Write the file
    fs.writeFileSync(filePath, mdxContent, 'utf8');
    console.log(`✅ Created: ${cleanUrl}.mdx`);
    created++;

  } catch (error) {
    console.error(`❌ Error processing row:`, error.message);
    console.error('Row data:', row);
    errors++;
  }
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Generation Summary:');
console.log(`   ✅ Created: ${created} files`);
console.log(`   ⏭️  Skipped: ${skipped} files`);
console.log(`   ❌ Errors: ${errors} files`);
console.log('='.repeat(50));

if (created > 0) {
  console.log('\n💡 Next steps:');
  console.log('   1. Review generated files in src/content/');
  console.log('   2. Fill in the content for each article');
  console.log('   3. Run "npm run build" to verify');
}
