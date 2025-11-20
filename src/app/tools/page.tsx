import Link from 'next/link'

export const metadata = {
  title: 'Pixel Blade Tools - Interactive Game Tools & Calculators',
  description: 'Collection of interactive tools for Pixel Blade. Code checker, weapon tier calculator, build optimizer, and more data-driven tools to level up faster.',
}

export default function ToolsPage() {
  const tools = [
    {
      title: 'Codes Checker',
      description: 'One-click copy working codes with platform filters. Updated hourly from official sources.',
      icon: '🎁',
      href: '/tools/codes',
      features: ['One-click copy', 'Platform filter', 'Real-time updates', 'Active only filter']
    },
    {
      title: 'Weapon Tier List',
      description: 'Interactive DPS rankings and meta analysis. Compare legendary weapons and find the best gear.',
      icon: '⚔️',
      href: '/tools/weapon-tiers',
      features: ['DPS rankings', 'Tier explanations', 'Community verified', 'Meta analysis']
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
          Pixel Blade Tools
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          Interactive Tools & Calculators
        </p>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Data-driven tools to help you master Pixel Blade faster. From code checkers to weapon calculators, we've got everything you need.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {tools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            className="group bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700 hover:border-[#F4B860] transition-all hover:shadow-lg hover:shadow-[#F4B860]/20"
          >
            <div className="text-5xl mb-4">{tool.icon}</div>
            <h2 className="text-2xl font-bold text-white group-hover:text-[#F4B860] mb-2 transition-colors">
              {tool.title}
            </h2>
            <p className="text-gray-400 mb-4">
              {tool.description}
            </p>
            <ul className="space-y-1">
              {tool.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-500">
                  ✓ {feature}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-[#F4B860] font-semibold group-hover:translate-x-1 transition-transform inline-block">
              Launch Tool →
            </div>
          </Link>
        ))}

        {/* Coming Soon Cards */}
        <div className="bg-gradient-to-br from-[#1C162D]/50 to-[#0D0A16]/50 rounded-lg p-6 border border-gray-700 border-dashed">
          <div className="text-5xl mb-4 opacity-50">📊</div>
          <h3 className="text-xl font-bold text-gray-500 mb-2">
            Build Comparison Tool
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Compare multiple builds side-by-side with detailed stat breakdowns and synergy analysis.
          </p>
          <span className="inline-block bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs">
            Coming Soon
          </span>
        </div>

        <div className="bg-gradient-to-br from-[#1C162D]/50 to-[#0D0A16]/50 rounded-lg p-6 border border-gray-700 border-dashed">
          <div className="text-5xl mb-4 opacity-50">🗡️</div>
          <h3 className="text-xl font-bold text-gray-500 mb-2">
            DPS Calculator
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Calculate exact damage output with different weapon combos, buffs, and enemy types.
          </p>
          <span className="inline-block bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs">
            Coming Soon
          </span>
        </div>

        <div className="bg-gradient-to-br from-[#1C162D]/50 to-[#0D0A16]/50 rounded-lg p-6 border border-gray-700 border-dashed">
          <div className="text-5xl mb-4 opacity-50">💎</div>
          <h3 className="text-xl font-bold text-gray-500 mb-2">
            Drop Rate Tracker
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Track your legendary drop rates and compare with community averages.
          </p>
          <span className="inline-block bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs">
            Coming Soon
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          More Tools Coming Soon!
        </h2>
        <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
          We're constantly building new tools to help you dominate Pixel Blade. Have a tool idea? Let us know!
        </p>
        <Link
          href="/guides/pixel-blade-discord"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Join Discord Community
        </Link>
      </div>
    </div>
  )
}
