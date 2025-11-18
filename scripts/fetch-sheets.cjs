const fs = require('fs');
const path = require('path');
const https = require('https');

// Google Sheets URLs from requirement documents
const sheets = [
  {
    name: 'clothing',
    url: 'https://docs.google.com/spreadsheets/d/13ko-YyLuwweD8L-ejDOo4ZPVE3vsyjAni5ioz2M5akE/export?gid=0&format=csv',
    dest: 'public/data/clothing.csv',
    description: 'Clothing warmth values'
  },
  {
    name: 'recipes',
    url: 'https://docs.google.com/spreadsheets/d/13ko-YyLuwweD8L-ejDOo4ZPVE3vsyjAni5ioz2M5akE/export?gid=1380093282&format=csv',
    dest: 'public/data/recipes.csv',
    description: 'Crafting recipes'
  }
];

// Download CSV function
function downloadCSV(url, dest, description) {
  return new Promise((resolve, reject) => {
    const destPath = path.join(__dirname, '..', dest);
    const destDir = path.dirname(destPath);

    // Ensure directory exists
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const file = fs.createWriteStream(destPath);

    console.log(`⬇ Downloading: ${description}...`);

    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        console.log(`↪ Redirecting to: ${redirectUrl}`);
        downloadCSV(redirectUrl, dest, description).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(destPath);
        console.log(`✓ Downloaded: ${description} (${stats.size} bytes)`);
        resolve({ url, dest, description, size: stats.size });
      });
    });

    request.on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });

    file.on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

// Parse CSV to JSON
function csvToJson(csvFilePath, jsonFilePath, transformer) {
  const csvPath = path.join(__dirname, '..', csvFilePath);
  const jsonPath = path.join(__dirname, '..', jsonFilePath);

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.trim().split('\n');

  if (lines.length < 2) {
    throw new Error('CSV file is empty or has no data rows');
  }

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const jsonData = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    const row = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    if (transformer) {
      const transformed = transformer(row);
      if (transformed) jsonData.push(transformed);
    } else {
      jsonData.push(row);
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log(`✓ Converted ${csvFilePath} → ${jsonFilePath} (${jsonData.length} rows)`);

  return jsonData;
}

// Main execution
async function main() {
  console.log('📊 Fetching Winter Burrow Game Data from Google Sheets...\n');

  // Download CSV files
  for (const sheet of sheets) {
    try {
      await downloadCSV(sheet.url, sheet.dest, sheet.description);
    } catch (error) {
      console.error(`✗ Failed to download ${sheet.description}: ${error.message}`);
      process.exit(1);
    }
  }

  console.log('\n🔄 Converting CSV to JSON...\n');

  try {
    // Convert clothing data with warmth calculations
    const clothingData = csvToJson(
      'public/data/clothing.csv',
      'public/data/clothing.json',
      (row) => {
        // Transform clothing data
        if (!row.Item || !row.Warmth) return null;

        const warmth = parseInt(row.Warmth) || 0;
        const temperatures = [-15, -10, -5, 0, 5];

        // Calculate duration at each temperature (simplified formula)
        const durations = temperatures.map(temp => {
          const baseDuration = warmth * 2;
          const tempEffect = (temp + 15) / 2;
          return Math.max(5, Math.round(baseDuration + tempEffect));
        });

        return {
          item: row.Item,
          warmth: warmth,
          category: row.Category || 'clothing',
          durations: durations // minutes at each temperature
        };
      }
    );

    // Convert recipes data
    const recipesData = csvToJson(
      'public/data/recipes.csv',
      'public/data/recipes.json',
      (row) => {
        // Transform recipe data
        if (!row.Item) return null;

        return {
          item: row.Item,
          materials: parseMaterials(row.Materials || ''),
          station: row.Station || 'Handcraft',
          category: row.Category || 'tool'
        };
      }
    );

    // Generate warmth matrix for heatmap
    generateWarmthMatrix(clothingData);

    console.log('\n✅ All game data fetched and converted successfully!\n');
    console.log(`📝 Summary:`);
    console.log(`   Clothing items: ${clothingData.length}`);
    console.log(`   Recipes: ${recipesData.length}\n`);

  } catch (error) {
    console.error(`✗ Error converting data: ${error.message}`);
    process.exit(1);
  }
}

// Helper function to parse materials string
function parseMaterials(materialsStr) {
  if (!materialsStr) return [];

  // Format: "Stone x2, Stick x3, Fiber x2"
  const parts = materialsStr.split(',').map(p => p.trim());
  return parts.map(part => {
    const match = part.match(/(.+?)\s*x(\d+)/);
    if (match) {
      return [match[1].trim(), parseInt(match[2])];
    }
    return [part, 1];
  });
}

// Generate warmth matrix for D3.js heatmap
function generateWarmthMatrix(clothingData) {
  const matrixPath = path.join(__dirname, '..', 'public/data/warmth-matrix.json');

  const matrix = {
    temperatures: [-15, -10, -5, 0, 5],
    items: clothingData.map(item => ({
      name: item.item,
      warmth: item.warmth,
      durations: item.durations
    }))
  };

  fs.writeFileSync(matrixPath, JSON.stringify(matrix, null, 2), 'utf-8');
  console.log(`✓ Generated warmth matrix for heatmap`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
