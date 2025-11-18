#!/bin/bash

# Build All Data Script for Winter Burrow
# Auto-fetch all static resources: images, videos, Reddit, game data

set -e  # Exit on error

echo "🏔️  Winter Burrow - Data Fetch Script"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Step 1: Fetch Images
echo -e "${BLUE}Step 1/4: Fetching Images...${NC}"
node scripts/fetch-images.cjs
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}⚠️  Some images may have failed. Check output above.${NC}"
fi
echo ""

# Step 2: Generate YouTube Data
echo -e "${BLUE}Step 2/4: Generating YouTube Data...${NC}"
node scripts/fetch-youtube.cjs
echo ""

# Step 3: Generate Reddit Data
echo -e "${BLUE}Step 3/4: Generating Reddit Data...${NC}"
node scripts/fetch-reddit.cjs
echo ""

# Step 4: Fetch Game Data from Google Sheets
echo -e "${BLUE}Step 4/4: Fetching Game Data...${NC}"
node scripts/fetch-sheets.cjs
echo ""

# Summary
echo "======================================"
echo -e "${GREEN}✅ All data fetched successfully!${NC}"
echo ""
echo "📁 Generated files:"
echo "   • public/images/*"
echo "   • public/data/*.json"
echo "   • public/data/*.csv"
echo "   • src/data/videos.ts"
echo "   • src/data/reddit.ts"
echo ""
echo "🎯 Next steps:"
echo "   1. Review generated data files"
echo "   2. Run 'npm run dev' to test"
echo "   3. Proceed with content migration"
echo ""
