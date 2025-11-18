import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-700/50 bg-black/30 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-white drop-shadow-md">
              Winter Burrow
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/guides/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Guide
            </Link>
            <Link
              href="/crafting/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Crafting
            </Link>
            <Link
              href="/resources/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Resources
            </Link>
            <Link
              href="/survival/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Survival
            </Link>
            <Link
              href="/reviews/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Reviews
            </Link>
            <Link
              href="/community/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Community
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/guides/beginner/"
            className="bg-[#F4B860] hover:bg-[#D99B3C] text-black font-semibold py-2 px-4 rounded-lg transition-colors"
            aria-label="Get Started with Winter Burrow Guide"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
