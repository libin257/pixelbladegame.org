import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-muted-foreground border-t">
      <div className="flex flex-col justify-center items-center max-w-7xl text-center mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:text-start">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 w-full">
          <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start">
            <h3 className="text-sm font-bold tracking-normal">
              <Link href="/" className="flex items-center space-x-2">
                <span className="inline-block font-bold">Winter Burrow Info</span>
              </Link>
            </h3>
            <p className="mt-4 text-xs">
              Your ultimate Winter Burrow companion - Complete survival guides, warmth calculator, crafting recipes,
              interactive map, and community insights for the cozy survival game that's warming hearts everywhere.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Game Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/guides/beginner/" className="text-base">Getting Started</Link></li>
              <li><Link href="/guides/walkthrough/" className="text-base">Complete Walkthrough</Link></li>
              <li><Link href="/guides/characters/" className="text-base">Characters</Link></li>
              <li><Link href="/faq/price/" className="text-base">Buy Game</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Community</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/community/reddit/" className="text-base">Reddit Discussions</Link></li>
              <li><Link href="/reviews/" className="text-base">Reviews</Link></li>
              <li><Link href="/news/patch-notes/" className="text-base">Patch Notes</Link></li>
              <li><Link href="/download/save-files/" className="text-base">Save Files</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/privacy/" className="text-base">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="text-base">Terms of Service</Link></li>
            </ul>
            <p className="mt-6 text-xs text-gray-400">
              A heartwarming cozy survival adventure
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 w-full">
          <p className="text-base text-center">
            © 2025 winterburrow.info. All Rights Reserved. Unofficial fan site. Game developed by Noodlecake.
          </p>
        </div>
      </div>
    </footer>
  )
}
