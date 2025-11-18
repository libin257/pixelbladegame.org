#!/bin/bash

# Winter Burrow URL Testing Script
# Tests all major pages and community articles

BASE_URL="http://localhost:3000"
PASS=0
FAIL=0
TOTAL=0

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "🧪 Winter Burrow URL Testing"
echo "Base URL: $BASE_URL"
echo "=========================================="
echo ""

# Function to test URL
test_url() {
    local url=$1
    local description=$2
    TOTAL=$((TOTAL + 1))

    printf "Testing: %-50s " "$description"

    # Use curl to test URL (follow redirects, check status code)
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$url")

    if [ "$status_code" == "200" ]; then
        echo -e "${GREEN}✅ PASS${NC} (200)"
        PASS=$((PASS + 1))
    else
        echo -e "${RED}❌ FAIL${NC} ($status_code)"
        FAIL=$((FAIL + 1))
    fi
}

echo "📄 Testing Core Pages..."
echo "----------------------------------------"
test_url "/" "Homepage"
test_url "/warmth-tool" "Warmth Calculator"
test_url "/crafting" "Recipe Finder"
test_url "/robots.txt" "robots.txt"
test_url "/sitemap.xml" "sitemap.xml"

echo ""
echo "📰 Testing Community Articles..."
echo "----------------------------------------"
test_url "/community/reddit-highlights" "Reddit Highlights"
test_url "/community/mods/texture-pack" "Texture Pack Mods"
test_url "/community/mods/cheat-engine" "Cheat Engine Tools"
test_url "/community/mods/ui-scaler" "UI Scaler Mods"
test_url "/community/speedrun-records" "Speedrun Records"
test_url "/community/fan-art-contest" "Fan Art Contest"

echo ""
echo "📚 Testing Sample Articles from Other Categories..."
echo "----------------------------------------"
test_url "/guides/beginner" "Beginner Guide"
test_url "/guides/map" "Interactive Map"
test_url "/survival/warmth" "Warmth System"
test_url "/crafting/tools/pickaxe" "Pickaxe Guide"
test_url "/platforms/steam" "Steam Platform"
test_url "/news/patch-notes" "Patch Notes"
test_url "/faq/price" "Price FAQ"

echo ""
echo "=========================================="
echo "📊 Test Summary"
echo "=========================================="
echo -e "Total Tests: ${YELLOW}$TOTAL${NC}"
echo -e "Passed:      ${GREEN}$PASS${NC}"
echo -e "Failed:      ${RED}$FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Please check the errors above.${NC}"
    exit 1
fi
