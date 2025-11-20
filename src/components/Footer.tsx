import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-muted-foreground border-t">
      <div className="flex flex-col justify-center items-center max-w-7xl text-center mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:text-start">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 w-full">
          <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start">
            <h3 className="text-sm font-bold tracking-normal">
              <Link href="/" className="flex items-center space-x-2">
                <span className="inline-block font-bold">Pixel Blade Info</span>
              </Link>
            </h3>
            <p className="mt-4 text-xs">
              Your ultimate Pixel Blade companion - Complete Roblox RPG guides, weapon tier lists, working codes,
              character progression tips, and community insights for the pixel adventure.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Game Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/codes/pixel-blade-codes" className="text-base">Codes</Link></li>
              <li><Link href="/tier-list/pixel-blade-weapon-tier-list" className="text-base">Weapon Tier List</Link></li>
              <li><Link href="/guides/pixel-blade-wiki" className="text-base">Wiki Starter</Link></li>
              <li><Link href="/tools/codes" className="text-base">Get Codes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Community</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/guides/pixel-blade-discord" className="text-base">Discord</Link></li>
              <li><Link href="/guides/how-to-use-potions-in-pixel-blade" className="text-base">Guides</Link></li>
              <li><Link href="/info/pixel-blade-early-access" className="text-base">Early Access</Link></li>
              <li><Link href="/tier-list/pixel-blade-tier-list" className="text-base">Tier Lists</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/privacy/" className="text-base">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="text-base">Terms of Service</Link></li>
            </ul>
            <p className="mt-6 text-xs text-gray-400">
              An epic Roblox pixel RPG adventure
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 w-full">
          <p className="text-base text-center">
            © 2025 Pixel Blade Info. All Rights Reserved. Unofficial fan site.
          </p>
        </div>
      </div>
    </footer>
  )
}
