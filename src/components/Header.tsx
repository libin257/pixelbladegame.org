import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-700/50 bg-black/30 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-white drop-shadow-md">
              Pixel Blade
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/codes/pixel-blade-codes"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Codes
            </Link>
            <Link
              href="/codes/pixel-blade-rings-codes"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Rings Codes
            </Link>
            <Link
              href="/tier-list/pixel-blade-weapon-tier-list"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Weapon Tier List
            </Link>
            <Link
              href="/guides/pixel-blade-wiki"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Wiki Starter
            </Link>
            <Link
              href="/guides/pixel-blade-discord"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Discord Hub
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/tools/codes"
            className="bg-[#F4B860] hover:bg-[#D99B3C] text-black font-semibold py-2 px-4 rounded-lg transition-colors"
            aria-label="Get Working Codes for Pixel Blade"
          >
            Get Working Codes
          </Link>
        </div>
      </div>
    </header>
  )
}
