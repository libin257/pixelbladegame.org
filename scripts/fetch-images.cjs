const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Image sources from requirement documents
const images = [
  // Official Noodlecake Images
  {
    url: 'https://noodlecake.com/wp-content/uploads/2025/06/WinterBurrow-Noodlecake-feature-1280x720_New-1.png',
    dest: 'public/images/steam/official-banner.png',
    description: 'Official Key Art / Hero Background'
  },
  {
    url: 'https://noodlecake.com/wp-content/uploads/2025/06/Screenshot-208.png',
    dest: 'public/images/screenshots/snowy-forest.png',
    description: 'Gameplay - Snowy Forest'
  },
  {
    url: 'https://noodlecake.com/wp-content/uploads/2025/06/Screenshot-417.png',
    dest: 'public/images/screenshots/cozy-interior.png',
    description: 'Gameplay - Cozy Interior & Cooking'
  },
  // Unsplash Background Images
  {
    url: 'https://unsplash.com/photos/cuHPfeqI-tQ/download?force=true',
    dest: 'public/images/backgrounds/misty-forest.jpg',
    description: 'Misty Forest Background (Option A)'
  },
  {
    url: 'https://unsplash.com/photos/3t78mz5oVx8/download?force=true',
    dest: 'public/images/backgrounds/snowy-trees.jpg',
    description: 'Snowy Trees Background (Option B)'
  },
  // YouTube Video Thumbnails
  {
    url: 'https://img.youtube.com/vi/IARTw2JICZU/maxresdefault.jpg',
    dest: 'public/images/videos/official-trailer.jpg',
    description: 'Official Trailer Thumbnail'
  },
  {
    url: 'https://img.youtube.com/vi/Huj0WmMRiMk/maxresdefault.jpg',
    dest: 'public/images/videos/in-depth-review.jpg',
    description: 'In-Depth Review Thumbnail'
  },
  {
    url: 'https://img.youtube.com/vi/hQqV9lA9A94/maxresdefault.jpg',
    dest: 'public/images/videos/full-playthrough.jpg',
    description: 'Full Playthrough Thumbnail'
  }
];

// Download function
function downloadImage(url, dest, description) {
  return new Promise((resolve, reject) => {
    const destPath = path.join(__dirname, '..', dest);
    const destDir = path.dirname(destPath);

    // Ensure directory exists
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Skip if file already exists
    if (fs.existsSync(destPath)) {
      console.log(`✓ Skipped (exists): ${description}`);
      resolve({ url, dest, description, status: 'skipped' });
      return;
    }

    const file = fs.createWriteStream(destPath);
    const protocol = url.startsWith('https') ? https : http;

    console.log(`⬇ Downloading: ${description}...`);

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        console.log(`↪ Redirecting to: ${redirectUrl}`);
        downloadImage(redirectUrl, dest, description).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${description}`);
        resolve({ url, dest, description, status: 'downloaded' });
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

// Main execution
async function main() {
  console.log('🖼️  Fetching Winter Burrow Images...\n');

  const results = {
    downloaded: 0,
    skipped: 0,
    failed: 0
  };

  for (const img of images) {
    try {
      const result = await downloadImage(img.url, img.dest, img.description);
      if (result.status === 'downloaded') results.downloaded++;
      if (result.status === 'skipped') results.skipped++;
    } catch (error) {
      console.error(`✗ Failed: ${img.description}`);
      console.error(`  Error: ${error.message}`);
      results.failed++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Downloaded: ${results.downloaded}`);
  console.log(`   Skipped: ${results.skipped}`);
  console.log(`   Failed: ${results.failed}`);
  console.log(`   Total: ${images.length}\n`);

  if (results.failed > 0) {
    console.log('⚠️  Some images failed to download. Please check the URLs or network connection.');
    process.exit(1);
  } else {
    console.log('✅ All images fetched successfully!\n');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
