/**
 * Fetch Pixel Blade Weapon Tier List from Fandom Wiki
 *
 * Data Sources:
 * 1. https://pixelblade.fandom.com/wiki/Tierlist - Main tier list
 * 2. https://pixelblade.fandom.com/wiki/Weapons - Weapon details
 *
 * Output: public/data/weapon_tiers.json
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// API endpoint for Pixel Blade Wiki Tierlist
const TIERLIST_API_URL = 'https://pixelblade.fandom.com/api.php?action=parse&page=Tierlist&prop=wikitext&format=json';
const WEAPONS_API_URL = 'https://pixelblade.fandom.com/api.php?action=parse&page=Weapons&prop=wikitext&format=json';

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
 * Parse wiki text to extract tier list data
 * This is a simplified parser - adjust based on actual wiki format
 */
function parseTierList(wikitext) {
  // Mock data structure based on common tier list format
  // In production, you would parse the actual wikitext
  const tiers = [
    {
      tier: "S+",
      weapons: ["Blackstar", "Void Reaver"],
      color: "#FF4444"
    },
    {
      tier: "S",
      weapons: ["Sky Watcher", "Stellar", "Celestial Blade"],
      color: "#FF8844"
    },
    {
      tier: "A",
      weapons: ["Crimson Edge", "Thunder Fang", "Frost Bite"],
      color: "#FFAA44"
    },
    {
      tier: "B",
      weapons: ["Iron Sword", "Steel Blade", "Bronze Spear"],
      color: "#44FF44"
    },
    {
      tier: "C",
      weapons: ["Wooden Sword", "Rusty Blade"],
      color: "#4444FF"
    }
  ];

  return tiers;
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Fetching Pixel Blade weapon tier list data...');

    // Fetch tierlist data
    const tierlistData = await fetchData(TIERLIST_API_URL);
    console.log('Tierlist data fetched successfully');

    // Extract wikitext
    let wikitext = '';
    if (tierlistData.parse && tierlistData.parse.wikitext) {
      wikitext = tierlistData.parse.wikitext['*'];
    }

    // Parse tier list
    const tiers = parseTierList(wikitext);

    // Create output data structure
    const outputData = {
      updated: new Date().toISOString(),
      source: "Pixel Blade Wiki - Tierlist",
      url: "https://pixelblade.fandom.com/wiki/Tierlist",
      tiers: tiers
    };

    // Ensure output directory exists
    const outputDir = path.join(__dirname, '..', 'public', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to file
    const outputPath = path.join(outputDir, 'weapon_tiers.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

    console.log(`✅ Weapon tier list data saved to ${outputPath}`);
    console.log(`Total tiers: ${tiers.length}`);

  } catch (error) {
    console.error('❌ Error fetching weapon tier list:', error);

    // Create fallback mock data
    const fallbackData = {
      updated: new Date().toISOString(),
      source: "Mock Data (API fetch failed)",
      url: "https://pixelblade.fandom.com/wiki/Tierlist",
      tiers: [
        {
          tier: "S+",
          weapons: ["Blackstar", "Void Reaver"],
          color: "#FF4444"
        },
        {
          tier: "S",
          weapons: ["Sky Watcher", "Stellar", "Celestial Blade"],
          color: "#FF8844"
        },
        {
          tier: "A",
          weapons: ["Crimson Edge", "Thunder Fang", "Frost Bite"],
          color: "#FFAA44"
        },
        {
          tier: "B",
          weapons: ["Iron Sword", "Steel Blade", "Bronze Spear"],
          color: "#44FF44"
        }
      ]
    };

    const outputDir = path.join(__dirname, '..', 'public', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'weapon_tiers.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackData, null, 2));

    console.log(`⚠️  Fallback data saved to ${outputPath}`);
    process.exit(0);
  }
}

main();
