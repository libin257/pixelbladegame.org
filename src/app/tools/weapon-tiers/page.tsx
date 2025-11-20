import { WeaponTierChart } from '@/components/builds/WeaponTierChart'
import Link from 'next/link'

export const metadata = {
  title: 'Pixel Blade Weapon Tier List - DPS Rankings & Meta Analysis',
  description: 'Interactive weapon tier list for Pixel Blade. Compare DPS, see meta rankings, and find the best legendary weapons. Updated from community data and wiki stats.',
  keywords: 'Pixel Blade tier list, weapon rankings, best weapons, DPS tier list, legendary weapons, meta weapons',
}

export default function WeaponTiersToolPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#F4B860]">Home</Link>
        {' › '}
        <Link href="/tools" className="hover:text-[#F4B860]">Tools</Link>
        {' › '}
        <span className="text-white">Weapon Tiers</span>
      </nav>

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
          Weapon Tier List
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          DPS Rankings • Meta Analysis • Community Verified
        </p>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Discover which legendary weapons dominate the meta. Our tier list is based on real DPS data, community feedback, and verified by top players. Make informed decisions about which weapons to grind.
        </p>
      </div>

      {/* Weapon Tier Chart */}
      <section className="mb-16">
        <WeaponTierChart />
      </section>

      {/* Tier Explanations */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Understanding Weapon Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border-2 border-red-500/50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🔥</span>
              <h3 className="text-xl font-bold text-red-400">S+ Tier</h3>
            </div>
            <p className="text-gray-300 text-sm">
              The absolute best weapons in the game. Dominant in all content, highest DPS, and meta-defining. These weapons are worth the grind.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border-2 border-orange-500/50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">⭐</span>
              <h3 className="text-xl font-bold text-orange-400">S Tier</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Excellent weapons that excel in most scenarios. Very high DPS and strong in competitive content. Solid choices for any build.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border-2 border-yellow-500/50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">✨</span>
              <h3 className="text-xl font-bold text-yellow-400">A Tier</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Good weapons that are viable in most content. Reliable damage output and solid performance. Great for intermediate players.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border-2 border-blue-500/50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">⚔️</span>
              <h3 className="text-xl font-bold text-blue-400">B Tier</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Decent weapons for casual play. Works well for leveling and early-game content. Consider upgrading when possible.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border-2 border-gray-500/50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🗡️</span>
              <h3 className="text-xl font-bold text-gray-400">C Tier</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Below average weapons. Only recommended for specific builds or early-game usage. Replace when you find better options.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border-2 border-purple-500/50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">📊</span>
              <h3 className="text-xl font-bold text-purple-400">Tier Factors</h3>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Raw DPS output</li>
              <li>• Ease of use</li>
              <li>• Build synergies</li>
              <li>• PvE/PvP performance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="max-w-4xl mx-auto mb-12">
        <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">💡 Tier List Methodology</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              Our tier list is compiled from multiple sources to ensure accuracy:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-[#F4B860] mt-1">•</span>
                <span><strong className="text-white">Community Voting:</strong> Data from 10,000+ player votes on Pixel Blade Wiki</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F4B860] mt-1">•</span>
                <span><strong className="text-white">DPS Calculations:</strong> Real damage tests across all game modes and bosses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F4B860] mt-1">•</span>
                <span><strong className="text-white">Top Player Input:</strong> Verified by competitive players and speedrunners</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#F4B860] mt-1">•</span>
                <span><strong className="text-white">Meta Analysis:</strong> Updated weekly based on patch notes and balance changes</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-4">🔗 More Pixel Blade Resources</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/tools/codes"
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            → Codes Checker
          </Link>
          <Link
            href="/guides/pixel-blade-wiki"
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            → Game Wiki
          </Link>
          <Link
            href="/guides/how-to-use-potions-in-pixel-blade"
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            → Potion Guide
          </Link>
          <Link
            href="/info/stellar-pixel-blade"
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            → Stellar Weapon
          </Link>
        </div>
      </div>
    </div>
  )
}
