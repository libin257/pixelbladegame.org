const fs = require('fs');
const path = require('path');

// 读取文章2.md文件
const articleFile = path.join(__dirname, '../tools/demand/文章2.md');
const content = fs.readFileSync(articleFile, 'utf-8');

// 定义URL路径到文件路径的映射 - 这些是还缺少内容的文件
const pathMap = {
  '/codes/pixel-blade-codes-2025/': 'src/content/codes/pixel-blade-codes-2025.mdx',
  '/codes/pixel-blade-codes/': 'src/content/codes/pixel-blade-codes.mdx',
  '/codes/codes-for-pixel-blade/': 'src/content/codes/codes-for-pixel-blade.mdx',
  '/codes/pixel-blade-early-access-codes/': 'src/content/codes/pixel-blade-early-access-codes.mdx',
  '/guides/how-to-get-wishes-in-pixel-blade/': 'src/content/guides/how-to-get-wishes-in-pixel-blade.mdx',
  '/guides/pixel-blade-roblox-wiki/': 'src/content/guides/pixel-blade-roblox-wiki.mdx',
  '/guides/roblox-pixel-blade-wiki/': 'src/content/guides/roblox-pixel-blade-wiki.mdx',
  '/info/pixel-blade/': 'src/content/info/pixel-blade.mdx',
  '/info/pixel-blades/': 'src/content/info/pixel-blades.mdx',
  '/info/stellar-pixel-blade/': 'src/content/info/stellar-pixel-blade.mdx',
  '/info/pixel-blade-script/': 'src/content/info/pixel-blade-script.mdx',
  '/tier-list/pixel-blade-tier-list/': 'src/content/tier-list/pixel-blade-tier-list.mdx',
  '/tier-list/pixel-blade-sword-tier-list/': 'src/content/tier-list/pixel-blade-sword-tier-list.mdx',
};

// 提取所有markdown代码块
const markdownBlocks = [];
const regex = /```markdown\n(---[\s\S]*?)```/g;
let match;

while ((match = regex.exec(content)) !== null) {
  const block = match[1].trim();
  // 提取canonical路径
  const canonicalMatch = block.match(/canonical:\s*"([^"]+)"/);
  if (canonicalMatch) {
    const canonical = canonicalMatch[1];
    markdownBlocks.push({ canonical, content: block });
  }
}

console.log(`Found ${markdownBlocks.length} markdown blocks in 文章2.md`);

// 处理每个block,写入对应的文件
let processedCount = 0;
let skippedCount = 0;

for (const block of markdownBlocks) {
  // 处理canonical路径，可能包含完整域名或只有路径
  let canonical = block.canonical;
  if (canonical.startsWith('https://pixelbladegame.org')) {
    canonical = canonical.replace('https://pixelbladegame.org', '');
  }

  const filePath = pathMap[canonical];
  if (filePath) {
    const fullPath = path.join(__dirname, '..', filePath);
    // 检查文件是否已经有内容
    const currentContent = fs.readFileSync(fullPath, 'utf-8');
    const currentLines = currentContent.split('\n').length;

    if (currentLines < 50) {
      fs.writeFileSync(fullPath, block.content, 'utf-8');
      console.log(`✓ Filled: ${filePath} (${block.content.split('\n').length} lines)`);
      processedCount++;
    } else {
      console.log(`⊘ Skipped: ${filePath} (already has ${currentLines} lines)`);
      skippedCount++;
    }
  } else {
    console.log(`✗ No mapping for: ${block.canonical}`);
  }
}

console.log(`\n✅ Processed ${processedCount} articles`);
console.log(`⊘ Skipped ${skippedCount} articles (already filled)`);
console.log(`Total: ${markdownBlocks.length} blocks found`);
