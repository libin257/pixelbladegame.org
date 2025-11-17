#!/bin/bash

BASE_URL="http://localhost:3000"
RESULTS_FILE="url-test-results.md"

# Initialize results file
cat > "$RESULTS_FILE" << 'HEADER'
# Rue Valley Website - URL Testing Report

**测试时间**: $(date +"%Y-%m-%d %H:%M:%S")
**基础URL**: http://localhost:3000

## 测试摘要

| 类别 | 测试数量 | 成功 | 失败 |
|------|----------|------|------|

HEADER

# Function to test a URL
test_url() {
    local path="$1"
    local full_url="${BASE_URL}${path}"
    local status_code=$(curl -s -o /dev/null -w "%{http_code}" "$full_url")
    
    if [ "$status_code" = "200" ]; then
        echo "✅ $path"
        return 0
    else
        echo "❌ $path (HTTP $status_code)"
        return 1
    fi
}

# Test homepage
echo "## 核心页面测试" >> "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"

total=0
success=0
failed=0

# Test homepage
echo "测试首页..."
if test_url "/" >> "$RESULTS_FILE"; then
    ((success++))
else
    ((failed++))
fi
((total++))
echo "" >> "$RESULTS_FILE"

# Test MDX pages
echo "## MDX内容页面测试" >> "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"

while IFS= read -r page; do
    echo "测试 /$page..."
    if test_url "/$page" >> "$RESULTS_FILE"; then
        ((success++))
    else
        ((failed++))
    fi
    ((total++))
done < <(find src/content -name "*.mdx" | sed 's|src/content/||' | sed 's|\.mdx$||' | sort)

echo "" >> "$RESULTS_FILE"

# Test special routes
echo "## 特殊路由测试" >> "$RESULTS_FILE"
echo "" >> "$RESULTS_FILE"

echo "测试 sitemap.xml..."
if test_url "/sitemap.xml" >> "$RESULTS_FILE"; then
    ((success++))
else
    ((failed++))
fi
((total++))

# Add summary
sed -i '' "3s|.*|**测试时间**: $(date +"%Y-%m-%d %H:%M:%S")|" "$RESULTS_FILE"

# Calculate percentages
success_rate=$(echo "scale=2; $success * 100 / $total" | bc)

# Add summary table
cat >> "$RESULTS_FILE" << SUMMARY

## 测试结果统计

- **总测试数**: $total
- **成功**: $success
- **失败**: $failed
- **成功率**: ${success_rate}%

## 测试细节

所有URL均通过 \`curl -I\` 命令测试HTTP状态码。

- ✅ 表示返回 200 OK
- ❌ 表示返回其他状态码或请求失败

SUMMARY

echo ""
echo "========================================="
echo "URL测试完成！"
echo "总计: $total | 成功: $success | 失败: $failed"
echo "成功率: ${success_rate}%"
echo "详细报告: $RESULTS_FILE"
echo "========================================="
