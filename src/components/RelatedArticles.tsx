import Link from 'next/link'

interface RelatedArticle {
  title: string
  href: string
  category: string
}

interface RelatedArticlesProps {
  category: string
  currentSlug: string
}

// 预定义的相关文章映射
const relatedArticlesMap: Record<string, RelatedArticle[]> = {
  codes: [
    { title: 'Pixel Blade Rings Codes', href: '/codes/pixel-blade-rings-codes', category: 'Codes' },
    { title: 'Pixel Blade Codes 2025', href: '/codes/pixel-blade-codes-2025', category: 'Codes' },
    { title: 'Pixel Blade Early Access Codes', href: '/codes/pixel-blade-early-access-codes', category: 'Codes' }
  ],
  guides: [
    { title: 'How To Use Potions In Pixel Blade', href: '/guides/how-to-use-potions-in-pixel-blade', category: 'Guides' },
    { title: 'Pixel Blade Wiki Explained', href: '/guides/pixel-blade-wiki', category: 'Guides' },
    { title: 'Pixel Blade Discord Guide', href: '/guides/pixel-blade-discord', category: 'Guides' }
  ],
  'tier-list': [
    { title: 'Pixel Blade Weapon Tier List', href: '/tier-list/pixel-blade-weapon-tier-list', category: 'Tier List' },
    { title: 'Pixel Blade Sword Tier List', href: '/tier-list/pixel-blade-sword-tier-list', category: 'Tier List' },
    { title: 'Complete Tier List & Rankings', href: '/tier-list/pixel-blade-tier-list', category: 'Tier List' }
  ],
  info: [
    { title: 'Stellar Pixel Blade Explained', href: '/info/stellar-pixel-blade', category: 'Info' },
    { title: 'Pixel Blade Early Access', href: '/info/pixel-blade-early-access', category: 'Info' },
    { title: 'Pixel Blade Script Explained', href: '/info/pixel-blade-script', category: 'Info' }
  ]
}

export function RelatedArticles({ category, currentSlug }: RelatedArticlesProps) {
  const articles = relatedArticlesMap[category] || []
  // 过滤掉当前文章
  const filteredArticles = articles.filter(article => !currentSlug.includes(article.href))

  // 只显示前3篇
  const displayArticles = filteredArticles.slice(0, 3)

  if (displayArticles.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-[#F4B860]">📚</span>
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayArticles.map((article, index) => (
          <Link
            key={index}
            href={article.href}
            className="group bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700 hover:border-[#F4B860] transition-all hover:shadow-lg hover:shadow-[#F4B860]/20"
          >
            <span className="text-xs text-[#F4B860] font-semibold uppercase tracking-wide">
              {article.category}
            </span>
            <h4 className="text-lg font-semibold text-white mt-2 group-hover:text-[#F4B860] transition-colors">
              {article.title}
            </h4>
            <span className="inline-flex items-center gap-1 text-sm text-gray-400 mt-3 group-hover:text-white transition-colors">
              Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
