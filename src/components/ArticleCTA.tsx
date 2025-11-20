'use client'

import { useState } from 'react'
import Link from 'next/link'

export function ArticleCTA() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Track engagement event for GA4
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'newsletter_signup', {
        method: 'article_bottom'
      })
    }

    setSubscribed(true)
    setEmail('')

    // Reset after 3 seconds
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <div className="mt-12 bg-gradient-to-br from-[#F4B860]/10 via-[#D99B3C]/10 to-[#1C162D]/50 rounded-xl p-8 border border-[#F4B860]/30">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#F4B860]/20 px-4 py-2 rounded-full mb-4">
          <span className="text-2xl">🎮</span>
          <span className="text-[#F4B860] font-semibold text-sm">Stay Updated</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">
          Get the Latest Pixel Blade Codes & Guides
        </h3>
        <p className="text-gray-300 mb-6">
          Join 10,000+ players who never miss new codes, tier list updates, and exclusive tips delivered directly to your inbox.
        </p>

        {subscribed ? (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-300 font-semibold">
            ✅ Thanks! Check your email to confirm subscription.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#F4B860] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#F4B860] hover:bg-[#D99B3C] text-black font-bold rounded-lg transition-colors whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
        )}

        <p className="text-xs text-gray-500 mt-4">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  )
}

export function FloatingCTA() {
  return (
    <div className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <Link
        href="/tools/codes"
        className="flex flex-col items-center gap-2 bg-gradient-to-br from-[#F4B860] to-[#D99B3C] text-black px-6 py-4 rounded-lg shadow-2xl hover:shadow-[#F4B860]/50 transition-all hover:scale-105"
        onClick={() => {
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'floating_cta_click', {
              location: 'article_sidebar'
            })
          }
        }}
      >
        <span className="text-3xl">🎁</span>
        <span className="font-bold text-sm text-center leading-tight">
          Get Working<br />Codes Now
        </span>
      </Link>
    </div>
  )
}
