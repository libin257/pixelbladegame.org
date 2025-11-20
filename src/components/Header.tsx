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
              href="/codes"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Codes
            </Link>
            <Link
              href="/tier-list"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Tier List
            </Link>
            <Link
              href="/guides"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Guides
            </Link>
            <Link
              href="/info"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Info
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
