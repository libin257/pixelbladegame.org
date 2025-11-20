const http = require('http');

// 基础URL
const BASE_URL = 'http://localhost:3002';

// 需要测试的URL列表
const urls = [
  // 首页和工具页
  '/',
  '/tools',
  '/tools/codes',
  '/tools/weapon-tiers',

  // Codes 页面
  '/codes/pixel-blade-codes',
  '/codes/pixel-blade-rings-codes',
  '/codes/pixel-blade-early-access-codes',
  '/codes/codes-for-pixel-blade',
  '/codes/pixel-blade-codes-2025',
  '/codes/roblox-pixel-blade-codes',
  '/codes/codes-pixel-blade',
  '/codes/pixel-blade-code',
  '/codes/pixel-blade-roblox-codes',
  '/codes/codes-for-pixel-blade-roblox',
  '/codes/pixel-blade-codes-roblox',
  '/codes/pixel-blades-codes',
  '/codes/codes-in-pixel-blade',

  // Info 页面
  '/info/pixel-blade-early-access',
  '/info/pixel-blade-roblox',
  '/info/roblox-pixel-blade',
  '/info/blade-pixel-art',
  '/info/pixel-blade',
  '/info/pixel-blades',
  '/info/stellar-pixel-blade',
  '/info/pixel-blade-script',

  // Guides 页面
  '/guides/how-to-use-potions-in-pixel-blade',
  '/guides/pixel-blade-wiki',
  '/guides/pixel-blade-discord',
  '/guides/how-to-get-wishes-in-pixel-blade',
  '/guides/pixel-blade-roblox-wiki',
  '/guides/roblox-pixel-blade-wiki',

  // Tier List 页面
  '/tier-list/pixel-blade-weapon-tier-list',
  '/tier-list/pixel-blade-tier-list',
  '/tier-list/pixel-blade-sword-tier-list',
];

// 测试单个URL
function testUrl(url) {
  return new Promise((resolve) => {
    const fullUrl = `${BASE_URL}${url}`;

    http.get(fullUrl, (res) => {
      const status = res.statusCode;
      const statusIcon = status === 200 ? '✅' : status === 404 ? '❌' : '⚠️';
      console.log(`${statusIcon} ${status} - ${url}`);
      resolve({ url, status, success: status === 200 });
    }).on('error', (err) => {
      console.log(`❌ ERROR - ${url}: ${err.message}`);
      resolve({ url, status: 'ERROR', success: false, error: err.message });
    });
  });
}

// 测试所有URL
async function testAllUrls() {
  console.log(`🚀 Testing ${urls.length} URLs...\n`);

  const results = [];

  for (const url of urls) {
    const result = await testUrl(url);
    results.push(result);
    // 添加小延迟避免请求过快
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📊 Test Summary:');
  console.log('================');

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`✅ Successful: ${successful}/${urls.length}`);
  console.log(`❌ Failed: ${failed}/${urls.length}`);

  if (failed > 0) {
    console.log('\n❌ Failed URLs:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.url} (${r.status})`);
    });
  }

  console.log('\n✅ Test completed!');
}

// 运行测试
testAllUrls().catch(console.error);
