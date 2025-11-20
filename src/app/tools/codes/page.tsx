import { CodeChecker } from '@/components/builds/CodeChecker'
import Link from 'next/link'

export const metadata = {
  title: 'Pixel Blade Codes Tool - One-Click Copy Active Codes',
  description: 'Interactive code checker for Pixel Blade. Copy working codes instantly, filter by platform, and never miss free rewards. Updated hourly from official sources.',
  keywords: 'Pixel Blade codes, active codes, code checker, redeem codes, free rewards, ROBLOX codes',
}

export default function CodesToolPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#F4B860]">Home</Link>
        {' › '}
        <Link href="/tools" className="hover:text-[#F4B860]">Tools</Link>
        {' › '}
        <span className="text-white">Codes Checker</span>
      </nav>

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
          Pixel Blade Codes Tool
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          One-Click Copy • Platform Filter • Real-Time Updates
        </p>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Get the latest working codes for Pixel Blade. Our tool automatically checks code validity and updates hourly from official sources. Never miss free rewards, rings, or exclusive items!
        </p>
      </div>

      {/* Code Checker Tool */}
      <section className="mb-16">
        <CodeChecker />
      </section>

      {/* Additional Info */}
      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-3">✨ Why Use This Tool?</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• One-click copy for instant redemption</li>
              <li>• Filter by platform (ROBLOX, Android, iOS)</li>
              <li>• Only see active, working codes</li>
              <li>• Updated hourly from official sources</li>
              <li>• No expired codes cluttering your list</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-3">🎮 Code Types Available</h2>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Launch Codes: Limited-time release rewards</li>
              <li>• Milestone Codes: Community achievement bonuses</li>
              <li>• Rings Codes: Exclusive power ring unlocks</li>
              <li>• Early Access: Beta tester exclusive codes</li>
              <li>• Event Codes: Seasonal and special events</li>
            </ul>
          </div>
        </div>

        {/* Related Links */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-300 mb-4">🔗 More Pixel Blade Resources</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/tier-list/pixel-blade-weapon-tier-list"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              → Weapon Tier List
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
      </section>
    </div>
  )
}
