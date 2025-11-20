import Link from 'next/link'
import Image from 'next/image'
import { WeaponTierChart } from '@/components/builds/WeaponTierChart'
import { CodeChecker } from '@/components/builds/CodeChecker'

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://pixelbladegame.org/#website',
        url: 'https://pixelbladegame.org',
        name: 'Pixel Blade Info',
        description: 'Pixel Blade fan-hub: grab the latest working codes, see the weapon tier list & legendary drop map, and level up faster with data-driven tools.',
        publisher: {
          '@id': 'https://pixelbladegame.org/#organization'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://pixelbladegame.org/search?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://pixelbladegame.org/#organization',
        name: 'Pixel Blade Info',
        url: 'https://pixelbladegame.org',
        logo: {
          '@type': 'ImageObject',
          url: 'https://pixelbladegame.org/images/logo.png',
          width: 512,
          height: 512
        },
        sameAs: []
      },
      {
        '@type': 'WebPage',
        '@id': 'https://pixelbladegame.org/#webpage',
        url: 'https://pixelbladegame.org',
        name: 'Pixel Blade Guides, Codes & Tier List | Master the Pixel Realm Fast',
        isPartOf: {
          '@id': 'https://pixelbladegame.org/#website'
        },
        about: {
          '@id': 'https://pixelbladegame.org/#organization'
        },
        description: 'Pixel Blade fan-hub: grab the latest working codes, see the weapon tier list & legendary drop map, and level up faster with data-driven tools.'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto py-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-4">
            Pixel Blade
          </h1>
          <h2 className="text-3xl lg:text-4xl text-gray-200 drop-shadow-md mb-4">
            Master the pixel realm in just 3 minutes
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 mb-6">
            Snag codes, rank your weapons and conquer every dungeon
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Your ultimate Pixel Blade companion featuring working codes, weapon tier lists, legendary drop maps, and data-driven tools to level up faster. Get ready to dominate the pixel realm!
          </p>
          <div className="flex gap-4">
            <Link
              href="/tools/codes"
              className="bg-[#F4B860] hover:bg-[#D99B3C] text-black font-bold py-3 px-6 rounded-md transition-colors"
              aria-label="Get Working Codes"
            >
              Get Working Codes
            </Link>
            <Link
              href="/tools/weapon-tiers"
              className="bg-white/90 hover:bg-white text-[#1E3A34] font-semibold py-3 px-6 rounded-md transition-colors"
              aria-label="See Weapon Tiers"
            >
              See Weapon Tiers
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/hero.png"
            alt="Pixel Blade - Epic pixel art action RPG"
            width={1920}
            height={1080}
            priority
            className="rounded-lg shadow-2xl w-full h-auto"
          />
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((item, index) => (
            <Link key={index} href={item.url}>
              <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] hover:ring-4 hover:ring-[#F4B860]/30 rounded-lg p-6 border border-gray-700 transition-all">
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Build Finder Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Weapon DPS Heatmap
        </h2>
        <p className="text-center text-gray-300 mb-2 max-w-3xl mx-auto text-lg font-semibold">
          Visualise every legendary weapon's real DPS across all game modes
        </p>
        <p className="text-center text-gray-400 mb-8 max-w-3xl mx-auto">
          See which weapons dominate the meta. Updated from Pixel Blade Wiki data.
        </p>
        <WeaponTierChart />
      </section>

      {/* Build Picker Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Code Auto-Checker
        </h2>
        <p className="text-center text-gray-300 mb-2 max-w-3xl mx-auto text-lg font-semibold">
          Paste any code to see if it's still valid — updated hourly from official lists
        </p>
        <p className="text-center text-gray-400 mb-8 max-w-3xl mx-auto">
          Every daily latest codes, one-click copy, never miss free rewards!
        </p>
        <CodeChecker />
      </section>

      {/* Key Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Pixel Blade Core Features</h2>
        <p className="text-center text-gray-300 mb-8">Why This Roblox Game Is Worth Playing</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Instant Codes</h3>
            <p className="text-gray-300 text-sm">
              Get the latest working codes instantly with our one-click copy system. Never miss out on free rewards, power rings, and exclusive items.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">DPS Heatmap</h3>
            <p className="text-gray-300 text-sm">
              Visualize weapon performance with our interactive tier list. Make informed decisions about which legendary weapons to grind for maximum DPS.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Community-Driven Wiki Snapshots</h3>
            <p className="text-gray-300 text-sm">
              Access up-to-date game information sourced from official wiki and verified by the community. Get accurate data you can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Videos & Community Discussion */}
      <section className="mb-16">
        {/* YouTube Videos Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8 flex items-center justify-center gap-3">
            <span className="text-red-500">▶️</span> Featured YouTube Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Video 1 - Embedded */}
            <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-all">
              <div className="relative aspect-video bg-gray-800">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/WNLmf48vvpU"
                  title="NEW Pixel Blade Codes November 2025"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">
                  NEW Pixel Blade Codes November 2025
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  Claim FREE rewards with the latest working codes
                </p>
              </div>
            </div>

            {/* Video 2 - Embedded */}
            <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-all">
              <div className="relative aspect-video bg-gray-800">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/AjUBsseyTO0"
                  title="Ultimate Pixel Blade Guide (Roblox)"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">
                  Ultimate Pixel Blade Guide (Roblox)
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  Complete beginner to advanced gameplay tutorial
                </p>
              </div>
            </div>

            {/* Video 3 - Embedded */}
            <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-all">
              <div className="relative aspect-video bg-gray-800">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/UAAqJ66tboQ"
                  title="All Legendary Weapon Locations"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">
                  All Legendary Weapon Locations
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  Find every legendary weapon and armor piece
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reddit Community Discussion */}
        <div>
          <h2 className="text-3xl font-bold text-center text-white mb-8 flex items-center justify-center gap-3">
            <span className="text-orange-500">💬</span> Community Discussions on Reddit
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Reddit Post 1 - Enhanced Design */}
              <a
                href="https://www.reddit.com/r/lightsabers/comments/15vu4ec/pixel_blade/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-xl overflow-hidden border-2 border-gray-700 hover:border-orange-500 transition-all hover:shadow-xl hover:shadow-orange-500/20"
              >
                {/* Reddit upvote indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-orange-500 to-orange-600"></div>

                <div className="p-6 pl-8">
                  {/* Header with Reddit info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-white text-xl">💬</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 font-semibold text-sm">r/lightsabers</span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">Popular</span>
                      </div>
                      <h3 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors">
                        Pixel Blade Tips & Tricks
                      </h3>
                    </div>
                  </div>

                  {/* Post content preview */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Community discussion on advanced strategies and gameplay tips. Learn from experienced players and share your own techniques.
                  </p>

                  {/* Post stats */}
                  <div className="flex items-center gap-6 text-xs">
                    <div className="flex items-center gap-1 text-orange-400">
                      <span>⬆️</span>
                      <span className="font-semibold">243</span>
                      <span className="text-gray-500">upvotes</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <span>💬</span>
                      <span className="font-semibold">67</span>
                      <span className="text-gray-500">comments</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <span>🔥</span>
                      <span className="text-gray-500">Hot</span>
                    </div>
                  </div>

                  {/* Read more indicator */}
                  <div className="mt-4 flex items-center gap-2 text-orange-500 text-sm font-semibold group-hover:gap-3 transition-all">
                    <span>Join Discussion</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>

              {/* Reddit Post 2 - Enhanced Design */}
              <a
                href="https://www.reddit.com/r/lightsabers/comments/zox4ig/pixel_blade_suggestions/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-xl overflow-hidden border-2 border-gray-700 hover:border-orange-500 transition-all hover:shadow-xl hover:shadow-orange-500/20"
              >
                {/* Reddit upvote indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-orange-500 to-orange-600"></div>

                <div className="p-6 pl-8">
                  {/* Header with Reddit info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-white text-xl">💬</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 font-semibold text-sm">r/lightsabers</span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-500 text-xs">Trending</span>
                      </div>
                      <h3 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors">
                        Pixel Blade Build Suggestions
                      </h3>
                    </div>
                  </div>

                  {/* Post content preview */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    Player recommendations and build optimization discussions. Get expert advice on weapon combinations and stat distributions.
                  </p>

                  {/* Post stats */}
                  <div className="flex items-center gap-6 text-xs">
                    <div className="flex items-center gap-1 text-orange-400">
                      <span>⬆️</span>
                      <span className="font-semibold">189</span>
                      <span className="text-gray-500">upvotes</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <span>💬</span>
                      <span className="font-semibold">52</span>
                      <span className="text-gray-500">comments</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <span>⭐</span>
                      <span className="text-gray-500">Helpful</span>
                    </div>
                  </div>

                  {/* Read more indicator */}
                  <div className="mt-4 flex items-center gap-2 text-orange-500 text-sm font-semibold group-hover:gap-3 transition-all">
                    <span>Join Discussion</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </a>
            </div>

            {/* Enhanced CTA Box with Reddit styling */}
            <div className="relative bg-gradient-to-br from-orange-500/10 via-orange-600/10 to-red-500/10 rounded-xl p-8 border-2 border-orange-500/30 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl">🚀</span>
                  <span className="text-orange-300 font-semibold text-sm">Active Community</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  Join Thousands of Players!
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Share your strategies, ask questions, and learn from the Pixel Blade community on Reddit
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://www.reddit.com/search/?q=pixel%20blade%20roblox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-lg shadow-orange-600/30"
                  >
                    <span>Browse Discussions</span>
                    <span className="text-xl">→</span>
                  </a>

                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span><strong className="text-white">1.2k+</strong> online now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-12 text-center border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Slice Through Dungeons?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Bookmark us for daily code drops & meta updates. Master the pixel realm with the most comprehensive Pixel Blade guide.
        </p>
        <Link
          href="/tools/codes"
          className="inline-block bg-[#F4B860] hover:bg-[#D99B3C] text-black font-bold py-3 px-8 rounded-md transition-colors"
          aria-label="Get Started with Pixel Blade Codes"
        >
          Get Working Codes Now
        </Link>
      </section>
    </div>
    </>
  )
}

const quickLinks = [
  {
    title: "Latest Codes",
    subtitle: "Redeem freebies before they expire",
    url: "/codes/pixel-blade-codes"
  },
  {
    title: "Rings Codes",
    subtitle: "Equip power rings without grinding",
    url: "/codes/pixel-blade-rings-codes"
  },
  {
    title: "Early-Access Codes",
    subtitle: "Claim launch-only rewards",
    url: "/codes/pixel-blade-early-access-codes"
  },
  {
    title: "Weapon Tier List",
    subtitle: "Discover top-tier DPS gear",
    url: "/tier-list/pixel-blade-weapon-tier-list"
  },
  {
    title: "Potion Guide",
    subtitle: "Heal & buff like a pro",
    url: "/guides/how-to-use-potions-in-pixel-blade"
  },
  {
    title: "Stellar Weapon",
    subtitle: "Is Stellar worth the grind?",
    url: "/info/stellar-pixel-blade"
  }
]

const faqs = [
  {
    question: "What is Pixel Blade?",
    answer: "Pixel Blade is an action-packed Roblox game featuring pixel art graphics, intense combat, and legendary weapon collection. Experience fast-paced dungeon crawling, boss battles, and character progression in this exciting adventure."
  },
  {
    question: "How to redeem codes?",
    answer: "To redeem codes in Pixel Blade: 1) Launch the game, 2) Click the Settings or Menu button, 3) Find the 'Codes' or 'Redeem' option, 4) Enter your code and click Redeem. Use our one-click copy feature above to quickly grab working codes!"
  },
  {
    question: "Which weapon is best for Nightmare mode?",
    answer: "For Nightmare mode, S+ tier weapons like Blackstar and Void Reaver offer the best DPS and survivability. Check our weapon tier list above for detailed rankings and stats. Consider your playstyle and the specific boss you're facing for optimal results."
  },
  {
    question: "How to farm legendary drops fast?",
    answer: "To efficiently farm legendary weapons: Focus on high-tier dungeons and boss battles, use drop rate boost potions, and target specific world drop locations. Our weapon tier list and guides show you exactly where to find each legendary item and the best farming routes."
  }
]
