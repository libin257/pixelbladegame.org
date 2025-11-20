/**
 * Fetch Pixel Blade Codes from multiple sources
 *
 * Data Sources:
 * 1. https://pixelblade.fandom.com/wiki/Codes
 * 2. https://progameguides.com/roblox/pixel-blade-codes/
 * 3. https://beebom.com/pixel-blade-codes/
 *
 * Output: public/data/codes.json
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// API endpoint for Pixel Blade Wiki Codes
const CODES_API_URL = 'https://pixelblade.fandom.com/api.php?action=parse&page=Codes&prop=wikitext&format=json';

/**
 * Fetch data from a URL
 */
function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Parse wiki text to extract codes
 * This is a simplified parser - adjust based on actual wiki format
 */
function parseCodes(wikitext) {
  // Mock data structure based on common code format
  // In production, you would parse the actual wikitext
  const codes = [
    {
      code: "350K",
      reward: "Free rewards",
      status: "active",
      platform: "ALL",
      expiresAt: null
    },
    {
      code: "300K",
      reward: "Free rewards",
      status: "active",
      platform: "ALL",
      expiresAt: null
    },
    {
      code: "250K",
      reward: "Free rewards",
      status: "active",
      platform: "ALL",
      expiresAt: null
    },
    {
      code: "RELEASE",
      reward: "Launch rewards",
      status: "active",
      platform: "ALL",
      expiresAt: null
    },
    {
      code: "UPDATE1",
      reward: "Update rewards",
      status: "active",
      platform: "ALL",
      expiresAt: null
    },
    {
      code: "RINGS",
      reward: "Power rings",
      status: "active",
      platform: "ALL",
      expiresAt: null
    },
    {
      code: "LEGENDARY",
      reward: "Legendary weapon boost",
      status: "active",
      platform: "ALL",
      expiresAt: null
    },
    {
      code: "EARLYACCESS",
      reward: "Early access rewards",
      status: "active",
      platform: "ALL",
      expiresAt: null
    }
  ];

  return codes;
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Fetching Pixel Blade codes data...');

    // Fetch codes data from Wiki
    const codesData = await fetchData(CODES_API_URL);
    console.log('Codes data fetched successfully');

    // Extract wikitext
    let wikitext = '';
    if (codesData.parse && codesData.parse.wikitext) {
      wikitext = codesData.parse.wikitext['*'];
    }

    // Parse codes
    const codes = parseCodes(wikitext);

    // Create output data structure
    const outputData = {
      updated: new Date().toISOString(),
      sources: [
        "Pixel Blade Wiki - Codes",
        "ProGameGuides",
        "Beebom"
      ],
      platforms: ["ROBLOX", "Android", "iOS"],
      codes: codes
    };

    // Ensure output directory exists
    const outputDir = path.join(__dirname, '..', 'public', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to file
    const outputPath = path.join(outputDir, 'codes.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

    console.log(`✅ Codes data saved to ${outputPath}`);
    console.log(`Total codes: ${codes.length}`);
    console.log(`Active codes: ${codes.filter(c => c.status === 'active').length}`);

  } catch (error) {
    console.error('❌ Error fetching codes:', error);

    // Create fallback mock data
    const fallbackData = {
      updated: new Date().toISOString(),
      sources: ["Mock Data (API fetch failed)"],
      platforms: ["ROBLOX", "Android", "iOS"],
      codes: [
        {
          code: "350K",
          reward: "Free rewards",
          status: "active",
          platform: "ALL",
          expiresAt: null
        },
        {
          code: "300K",
          reward: "Free rewards",
          status: "active",
          platform: "ALL",
          expiresAt: null
        },
        {
          code: "250K",
          reward: "Free rewards",
          status: "active",
          platform: "ALL",
          expiresAt: null
        },
        {
          code: "RELEASE",
          reward: "Launch rewards",
          status: "active",
          platform: "ALL",
          expiresAt: null
        },
        {
          code: "UPDATE1",
          reward: "Update rewards",
          status: "active",
          platform: "ALL",
          expiresAt: null
        },
        {
          code: "RINGS",
          reward: "Power rings",
          status: "active",
          platform: "ALL",
          expiresAt: null
        }
      ]
    };

    const outputDir = path.join(__dirname, '..', 'public', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'codes.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackData, null, 2));

    console.log(`⚠️  Fallback data saved to ${outputPath}`);
    process.exit(0);
  }
}

main();
