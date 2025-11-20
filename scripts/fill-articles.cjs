const fs = require('fs');
const path = require('path');

// 读取文章1.md文件
const articleFile = path.join(__dirname, '../tools/demand/文章1.md');
const content = fs.readFileSync(articleFile, 'utf-8');

// 定义URL路径到文件路径的映射
const pathMap = {
  '/codes/pixel-blade-rings-codes/': 'src/content/codes/pixel-blade-rings-codes.mdx',
  '/info/pixel-blade-early-access/': 'src/content/info/pixel-blade-early-access.mdx',
  '/info/pixel-blade-roblox/': 'src/content/info/pixel-blade-roblox.mdx',
  '/codes/roblox-pixel-blade-codes/': 'src/content/codes/roblox-pixel-blade-codes.mdx',
  '/info/roblox-pixel-blade/': 'src/content/info/roblox-pixel-blade.mdx',
  '/codes/codes-pixel-blade/': 'src/content/codes/codes-pixel-blade.mdx',
  '/guides/how-to-use-potions-in-pixel-blade/': 'src/content/guides/how-to-use-potions-in-pixel-blade.mdx',
  '/codes/pixel-blade-code/': 'src/content/codes/pixel-blade-code.mdx',
  '/codes/pixel-blade-roblox-codes/': 'src/content/codes/pixel-blade-roblox-codes.mdx',
  '/guides/pixel-blade-wiki/': 'src/content/guides/pixel-blade-wiki.mdx',
  '/info/blade-pixel-art/': 'src/content/info/blade-pixel-art.mdx',
  '/codes/codes-for-pixel-blade-roblox/': 'src/content/codes/codes-for-pixel-blade-roblox.mdx',
  '/codes/pixel-blade-codes-roblox/': 'src/content/codes/pixel-blade-codes-roblox.mdx',
  '/guides/pixel-blade-discord/': 'src/content/guides/pixel-blade-discord.mdx',
  '/tier-list/pixel-blade-weapon-tier-list/': 'src/content/tier-list/pixel-blade-weapon-tier-list.mdx',
  '/codes/pixel-blades-codes/': 'src/content/codes/pixel-blades-codes.mdx',
  '/codes/codes-in-pixel-blade/': 'src/content/codes/codes-in-pixel-blade.mdx',
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

console.log(`Found ${markdownBlocks.length} markdown blocks`);

// 处理每个block,写入对应的文件
let processedCount = 0;
for (const block of markdownBlocks) {
  const filePath = pathMap[block.canonical];
  if (filePath) {
    const fullPath = path.join(__dirname, '..', filePath);
    fs.writeFileSync(fullPath, block.content, 'utf-8');
    console.log(`✓ Filled: ${filePath}`);
    processedCount++;
  } else {
    console.log(`✗ No mapping for: ${block.canonical}`);
  }
}

console.log(`\nProcessed ${processedCount} / ${markdownBlocks.length} articles`);
