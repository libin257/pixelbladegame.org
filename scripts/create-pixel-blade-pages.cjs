/**
 * Read Excel file and create MDX pages for Pixel Blade
 *
 * This script:
 * 1. Reads 内页.xlsx and filters Priority 1 URLs
 * 2. Creates empty MDX files in src/content/
 * 3. Creates list pages in src/app/
 * 4. Removes old content not in the Excel file
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const EXCEL_PATH = path.join(__dirname, '..', 'tools', 'demand', '内页.xlsx');
const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');
const APP_DIR = path.join(__dirname, '..', 'src', 'app');

/**
 * Read Excel file and extract Priority 1 URLs
 */
function readExcelUrls() {
  console.log('📖 Reading Excel file:', EXCEL_PATH);

  const workbook = XLSX.readFile(EXCEL_PATH);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  console.log(`📊 Total rows: ${data.length}`);

  // Filter Priority 1 URLs
  const priority1Data = data
    .filter(row => row['Priority'] === 1)
    .map(row => ({
      url: (row['URL Path'] || '').trim(),
      title: (row['Article Title'] || '').trim(),
      keyword: (row['Keyword'] || '').trim(),
      searchVolume: row['Search Volume'] || 0
    }))
    .filter(item => item.url.length > 0);

  console.log(`✅ Priority 1 URLs found: ${priority1Data.length}`);

  return priority1Data;
}

/**
 * Parse URL into directory structure
 * Example: /codes/pixel-blade-codes/ -> { category: 'codes', slug: 'pixel-blade-codes' }
 */
function parseUrl(url) {
  // Remove leading and trailing slashes
  const cleanUrl = url.replace(/^\/+|\/+$/g, '');
  const parts = cleanUrl.split('/');

  if (parts.length === 0 || parts[0] === '') {
    return null;
  }

  if (parts.length === 1) {
    return { category: parts[0], slug: 'index' };
  }

  return {
    category: parts[0],
    slug: parts.slice(1).join('/')
  };
}

/**
 * Create MDX file with frontmatter
 */
function createMdxFile(category, slug, pageData) {
  const dir = path.join(CONTENT_DIR, category);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${category}/`);
  }

  const fileName = slug === 'index' ? 'index.mdx' : `${slug}.mdx`;
  const filePath = path.join(dir, fileName);

  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Already exists: ${category}/${fileName}`);
    return;
  }

  // Use article title from Excel or generate from slug
  const title = pageData.title || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const description = `Complete guide for ${title} in Pixel Blade. ${pageData.keyword ? `Keywords: ${pageData.keyword}` : ''}`;

  const content = `---
title: "${title}"
description: "${description}"
keywords: "Pixel Blade, ${pageData.keyword || slug.replace(/-/g, ' ')}, guide, tips"
category: "${category}"
priority: 1
date: "${new Date().toISOString().split('T')[0]}"
---

# ${title}

Content coming soon...
`;

  fs.writeFileSync(filePath, content);
  console.log(`✅ Created: ${category}/${fileName}`);
}

/**
 * Create list page for category
 */
function createListPage(category) {
  const listPagePath = path.join(APP_DIR, category, 'page.tsx');

  // Skip if already exists
  if (fs.existsSync(listPagePath)) {
    console.log(`⏭️  List page exists: ${category}/page.tsx`);
    return;
  }

  // Create directory
  const dir = path.join(APP_DIR, category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Generate category title
  const categoryTitle = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const content = `import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface PageMetadata {
  title: string
  description: string
  priority: number
  date?: string
}

export const metadata = {
  title: '${categoryTitle} - Pixel Blade Guide',
  description: 'Browse all ${categoryTitle.toLowerCase()} guides for Pixel Blade',
}

export default async function ${categoryTitle.replace(/\s+/g, '')}Page() {
  const contentDir = path.join(process.cwd(), 'src', 'content', '${category}')

  let pages: Array<{ slug: string; metadata: PageMetadata }> = []

  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'))

    pages = files.map(file => {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(contentDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)

      return {
        slug,
        metadata: data as PageMetadata
      }
    })

    // Sort by priority (lower number = higher priority)
    pages.sort((a, b) => (a.metadata.priority || 999) - (b.metadata.priority || 999))
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-5xl font-bold text-white mb-4">${categoryTitle}</h1>
      <p className="text-xl text-gray-300 mb-12">
        Browse all ${categoryTitle.toLowerCase()} guides for Pixel Blade
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={\`/${category}/\${page.slug}/\`}
            className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700 hover:border-[#F4B860] transition-all group"
          >
            <h2 className="text-2xl font-bold text-white group-hover:text-[#F4B860] mb-2 transition-colors">
              {page.metadata.title}
            </h2>
            <p className="text-gray-400">
              {page.metadata.description}
            </p>
            {page.metadata.date && (
              <p className="text-sm text-gray-500 mt-4">
                Updated: {new Date(page.metadata.date).toLocaleDateString()}
              </p>
            )}
          </Link>
        ))}
      </div>

      {pages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No guides available yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
`;

  fs.writeFileSync(listPagePath, content);
  console.log(`✅ Created list page: ${category}/page.tsx`);
}

/**
 * Remove old content not in Excel
 */
function cleanupOldContent(validCategories) {
  console.log('\n🧹 Cleaning up old content...');

  // Remove old content directories
  if (fs.existsSync(CONTENT_DIR)) {
    const existingDirs = fs.readdirSync(CONTENT_DIR);
    existingDirs.forEach(dir => {
      const dirPath = path.join(CONTENT_DIR, dir);
      if (fs.statSync(dirPath).isDirectory() && !validCategories.has(dir)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
        console.log(`🗑️  Removed old content: ${dir}/`);
      }
    });
  }

  // Remove old app directories (except special ones)
  const keepDirs = new Set(['[...slug]', 'api', 'fonts', 'sitemap.xml']);
  if (fs.existsSync(APP_DIR)) {
    const existingDirs = fs.readdirSync(APP_DIR);
    existingDirs.forEach(dir => {
      const dirPath = path.join(APP_DIR, dir);
      const stat = fs.statSync(dirPath);

      // Skip files and special directories
      if (!stat.isDirectory() || keepDirs.has(dir)) {
        return;
      }

      // Remove if not in valid categories
      if (!validCategories.has(dir)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
        console.log(`🗑️  Removed old app dir: ${dir}/`);
      }
    });
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting Pixel Blade pages creation...\n');

  try {
    // Read Excel file
    const pagesData = readExcelUrls();

    if (pagesData.length === 0) {
      console.error('❌ No Priority 1 URLs found in Excel file');
      process.exit(1);
    }

    console.log('\n📝 Sample URLs:');
    pagesData.slice(0, 5).forEach(item => console.log(`   - ${item.url} (${item.title})`));
    if (pagesData.length > 5) {
      console.log(`   ... and ${pagesData.length - 5} more\n`);
    }

    // Parse URLs and group by category
    const urlsByCategory = new Map();

    pagesData.forEach(pageData => {
      const parsed = parseUrl(pageData.url);
      if (!parsed) {
        console.warn(`⚠️  Invalid URL: ${pageData.url}`);
        return;
      }

      if (!urlsByCategory.has(parsed.category)) {
        urlsByCategory.set(parsed.category, []);
      }

      urlsByCategory.get(parsed.category).push({
        slug: parsed.slug,
        pageData: pageData
      });
    });

    console.log(`\n📂 Categories found: ${urlsByCategory.size}`);
    urlsByCategory.forEach((items, category) => {
      console.log(`   - ${category}: ${items.length} pages`);
    });

    // Create MDX files
    console.log('\n📄 Creating MDX files...');
    urlsByCategory.forEach((items, category) => {
      items.forEach(({ slug, pageData }) => {
        createMdxFile(category, slug, pageData);
      });
    });

    // Create list pages
    console.log('\n📋 Creating list pages...');
    const validCategories = new Set(urlsByCategory.keys());
    validCategories.forEach(category => {
      createListPage(category);
    });

    // Cleanup old content
    cleanupOldContent(validCategories);

    console.log('\n✨ Done! All pages created successfully.');
    console.log(`\n📊 Summary:`);
    console.log(`   - Categories: ${validCategories.size}`);
    console.log(`   - Total pages: ${pagesData.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
