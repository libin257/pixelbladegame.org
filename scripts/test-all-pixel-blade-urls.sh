#!/bin/bash

# Pixel Blade URL Testing Script
# Tests all content pages

BASE_URL="http://localhost:3002"
PASS=0
FAIL=0
TOTAL=0

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "🧪 Pixel Blade URL Testing"
echo "Base URL: $BASE_URL"
echo "=========================================="
echo ""

# Function to test URL
test_url() {
    local url=$1
    local description=$2
    TOTAL=$((TOTAL + 1))

    printf "Testing: %-60s " "$description"

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
test_url "/robots.txt" "robots.txt"
test_url "/sitemap.xml" "sitemap.xml"
test_url "/favicon.ico" "favicon.ico"

echo ""
echo "🎁 Testing Codes Pages..."
echo "----------------------------------------"
test_url "/codes" "Codes List Page"
test_url "/codes/pixel-blade-codes" "Pixel Blade Codes"
test_url "/codes/pixel-blade-rings-codes" "Pixel Blade Rings Codes"
test_url "/codes/pixel-blade-early-access-codes" "Pixel Blade Early Access Codes"
test_url "/codes/codes-for-pixel-blade" "Codes for Pixel Blade"
test_url "/codes/pixel-blade-codes-2025" "Pixel Blade Codes 2025"
test_url "/codes/roblox-pixel-blade-codes" "Roblox Pixel Blade Codes"
test_url "/codes/codes-pixel-blade" "Codes Pixel Blade"
test_url "/codes/pixel-blade-code" "Pixel Blade Code"
test_url "/codes/pixel-blade-roblox-codes" "Pixel Blade Roblox Codes"
test_url "/codes/codes-for-pixel-blade-roblox" "Codes for Pixel Blade Roblox"
test_url "/codes/pixel-blade-codes-roblox" "Pixel Blade Codes Roblox"
test_url "/codes/pixel-blades-codes" "Pixel Blades Codes"
test_url "/codes/codes-in-pixel-blade" "Codes in Pixel Blade"

echo ""
echo "ℹ️ Testing Info Pages..."
echo "----------------------------------------"
test_url "/info/pixel-blade-early-access" "Pixel Blade Early Access"
test_url "/info/pixel-blade-roblox" "Pixel Blade Roblox"
test_url "/info/roblox-pixel-blade" "Roblox Pixel Blade"
test_url "/info/blade-pixel-art" "Blade Pixel Art"
test_url "/info/pixel-blade" "Pixel Blade"
test_url "/info/pixel-blades" "Pixel Blades"
test_url "/info/stellar-pixel-blade" "Stellar Pixel Blade"
test_url "/info/pixel-blade-script" "Pixel Blade Script"

echo ""
echo "📚 Testing Guides Pages..."
echo "----------------------------------------"
test_url "/guides" "Guides List Page"
test_url "/guides/how-to-use-potions-in-pixel-blade" "How to Use Potions"
test_url "/guides/pixel-blade-wiki" "Pixel Blade Wiki"
test_url "/guides/pixel-blade-discord" "Pixel Blade Discord"
test_url "/guides/how-to-get-wishes-in-pixel-blade" "How to Get Wishes"
test_url "/guides/pixel-blade-roblox-wiki" "Pixel Blade Roblox Wiki"
test_url "/guides/roblox-pixel-blade-wiki" "Roblox Pixel Blade Wiki"

echo ""
echo "🏆 Testing Tier List Pages..."
echo "----------------------------------------"
test_url "/tier-list" "Tier List Page"
test_url "/tier-list/pixel-blade-weapon-tier-list" "Pixel Blade Weapon Tier List"
test_url "/tier-list/pixel-blade-tier-list" "Pixel Blade Tier List"
test_url "/tier-list/pixel-blade-sword-tier-list" "Pixel Blade Sword Tier List"

echo ""
echo "🛠️ Testing Tools Pages..."
echo "----------------------------------------"
test_url "/tools" "Tools Page"
test_url "/tools/codes" "Codes Tool"
test_url "/tools/weapon-tiers" "Weapon Tiers Tool"

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
