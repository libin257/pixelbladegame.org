import Link from 'next/link'
import Image from 'next/image'
import { VideoSection } from '@/components/rue-valley/VideoSection'
import { RedditSection } from '@/components/rue-valley/RedditSection'
import { WarmthCalculator } from '@/components/warmth/WarmthCalculator'
import { RecipeFinder } from '@/components/crafting/RecipeFinder'

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://winterburrow.info/#website',
        url: 'https://winterburrow.info',
        name: 'Winter Burrow Info',
        description: 'Complete survival guide and wiki for Winter Burrow featuring beginner tips, warmth calculator, crafting recipes, and full walkthrough.',
        publisher: {
          '@id': 'https://winterburrow.info/#organization'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://winterburrow.info/search?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://winterburrow.info/#organization',
        name: 'Winter Burrow Info',
        url: 'https://winterburrow.info',
        logo: {
          '@type': 'ImageObject',
          url: 'https://winterburrow.info/images/logo.png',
          width: 512,
          height: 512
        },
        sameAs: []
      },
      {
        '@type': 'WebPage',
        '@id': 'https://winterburrow.info/#webpage',
        url: 'https://winterburrow.info',
        name: 'Winter Burrow - Complete Survival Guide & Wiki',
        isPartOf: {
          '@id': 'https://winterburrow.info/#website'
        },
        about: {
          '@id': 'https://winterburrow.info/#organization'
        },
        description: 'Master Winter Burrow with our comprehensive guide featuring beginner survival tips, interactive warmth calculator, crafting recipe finder, full walkthrough, and platform reviews.'
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
            Winter Burrow
          </h1>
          <h2 className="text-3xl lg:text-4xl text-gray-200 drop-shadow-md mb-4">
            Master the frozen wilderness in just 3 minutes
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 mb-6">
            Complete Guide, Warmth Calculator & Survival Tips
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Gather resources, craft lifesaving tools, and out-cozy the cold—all while solving Auntie's disappearance.
            We provide comprehensive guides, warmth mechanics analysis, and crafting recipes to help you survive the frozen wilderness.
          </p>
          <div className="flex gap-4">
            <Link
              href="/guides/beginner/"
              className="bg-[#F4B860] hover:bg-[#D99B3C] text-black font-bold py-3 px-6 rounded-md transition-colors"
              aria-label="Open 3-Minute Starter Guide"
            >
              3-Minute Starter Guide
            </Link>
            <Link
              href="/guides/map/"
              className="bg-white/90 hover:bg-white text-[#1E3A34] font-semibold py-3 px-6 rounded-md transition-colors"
              aria-label="View Interactive Map"
            >
              Interactive Map
            </Link>
            <Link
              href="/warmth-tool/"
              className="border border-gray-600 hover:border-[#F4B860] text-gray-200 hover:text-white font-medium py-3 px-6 rounded-md transition-colors"
              aria-label="Open Warmth Calculator"
            >
              Warmth Calculator
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/steam/header.jpg"
            alt="Winter Burrow key art - mouse with axe in snowy burrow"
            width={460}
            height={215}
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

      {/* Warmth Calculator Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Winter Survival Calculator
        </h2>
        <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
          Calculate exact survival time based on temperature and clothing combinations.
          Select your gear and see real-time estimates for different weather zones.
        </p>
        <WarmthCalculator />
      </section>

      {/* Recipe Finder Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Crafting Recipe Finder
        </h2>
        <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
          Find what you can craft with your current materials.
          Select available resources and instantly see all craftable items.
        </p>
        <RecipeFinder />
      </section>

      {/* Video & Reddit Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YouTube Videos */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">🎬 Featured Videos</h2>
            <VideoSection />
          </div>

          {/* Reddit Discussions */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">💬 Community Discussions</h2>
            <RedditSection />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Winter Burrow Core Features</h2>
        <p className="text-center text-gray-300 mb-8">Why This Cozy Survival Game Is Worth Playing</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Warmth Management</h3>
            <p className="text-gray-300 text-sm">
              Complex temperature system where clothing choices directly impact survival time.
              Master the warmth calculator to optimize your gear for different weather conditions.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Crafting & Resources</h3>
            <p className="text-gray-300 text-sm">
              Gather materials like granite, pinewood, and flax to craft essential survival tools.
              Strategic resource management is key to thriving in the frozen wilderness.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Heartwarming Story</h3>
            <p className="text-gray-300 text-sm">
              Uncover the mystery of Auntie's disappearance while building your cozy burrow.
              Charming characters and emotional narrative await your discovery.
            </p>
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
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Master the Frozen Wilderness?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Start your Winter Burrow journey now with our complete survival guides, warmth calculator,
          crafting recipes, and interactive map to conquer the cold and solve Auntie's mystery.
        </p>
        <Link
          href="/guides/beginner/"
          className="inline-block bg-[#F4B860] hover:bg-[#D99B3C] text-black font-bold py-3 px-8 rounded-md transition-colors"
          aria-label="Get Started with Winter Burrow Guide"
        >
          Get Started
        </Link>
      </section>
    </div>
    </>
  )
}

const quickLinks = [
  {
    title: "3-Minute Starter Guide",
    subtitle: "Quick Survival Primer",
    url: "/guides/beginner/"
  },
  {
    title: "Interactive Map",
    subtitle: "Find All Resources",
    url: "/guides/map/"
  },
  {
    title: "Crafting Calculator",
    subtitle: "Warmth & Recipes",
    url: "/warmth-tool/"
  },
  {
    title: "Best Price Tracker",
    subtitle: "Multi-Platform Deals",
    url: "/faq/price/"
  },
  {
    title: "Wiki Index",
    subtitle: "Complete Systems Guide",
    url: "/guides/wiki/"
  },
  {
    title: "Patch Notes",
    subtitle: "Latest Updates",
    url: "/news/patch-notes/"
  }
]

const faqs = [
  {
    question: "What is Winter Burrow?",
    answer: "Winter Burrow is a cozy survival game where you play as a mouse gathering resources and crafting tools to survive the frozen wilderness. You must manage warmth, hunger, and stamina while uncovering the mystery of Auntie's disappearance. The game combines survival mechanics with heartwarming storytelling."
  },
  {
    question: "How do I start playing Winter Burrow?",
    answer: "We recommend reading our 3-minute beginner's guide first to understand the basic survival mechanics and warmth system. The game is available on Steam, Nintendo Switch, and other platforms. Start by gathering basic resources like twigs and pine wood, then craft essential warmth items before the first night."
  },
  {
    question: "How many endings does Winter Burrow have?",
    answer: "Winter Burrow features multiple endings depending on your survival choices, resource management decisions, and how you progress through Auntie's mystery. Different paths affect your relationships with other characters and the fate of your burrow community."
  },
  {
    question: "What should I do if I encounter a soft-lock?",
    answer: "Soft-locks usually occur from running out of essential resources or getting trapped without warmth items. Check our Reddit discussion section for detailed soft-lock solutions. Common issues like resource depletion or crafting station access failures all have community-provided workarounds and prevention tips."
  }
]
