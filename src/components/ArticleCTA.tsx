'use client'

import { useState, useEffect, useRef } from 'react'
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
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0, startX: 0, startY: 0, moved: 0 })
  const linkRef = useRef<HTMLAnchorElement>(null)

  // Load position from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('floating-cta-position')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPosition(parsed)
      } catch (e) {
        // Invalid saved position, use default
      }
    }
  }, [])

  // Save position to localStorage
  const savePosition = (pos: { x: number; y: number }) => {
    localStorage.setItem('floating-cta-position', JSON.stringify(pos))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startX: position.x,
      startY: position.y,
      moved: 0
    }
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y

    dragStartRef.current.moved = Math.abs(dx) + Math.abs(dy)

    // Calculate new position with boundary constraints
    const newX = dragStartRef.current.startX + dx
    const newY = dragStartRef.current.startY + dy

    // Get window dimensions for boundary check
    const maxX = window.innerWidth - 200 // button width ~200px
    const maxY = window.innerHeight - 200 // button height ~200px
    const minX = -100
    const minY = -100

    setPosition({
      x: Math.max(minX, Math.min(newX, maxX)),
      y: Math.max(minY, Math.min(newY, maxY))
    })
  }

  const handleMouseUp = (e: MouseEvent) => {
    if (dragStartRef.current.moved > 5) {
      // Was dragging, save position
      savePosition(position)
      e.preventDefault()
      e.stopPropagation()
    }
    setIsDragging(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (dragStartRef.current.moved > 5) {
      // Was dragging, prevent click
      e.preventDefault()
      e.stopPropagation()
      return
    }

    // Track click event
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'floating_cta_click', {
        location: 'article_sidebar'
      })
    }
  }

  // Add/remove global event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, position])

  return (
    <div
      className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translateY(-50%)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : 'transform 0.2s ease-out'
      }}
      onMouseDown={handleMouseDown}
    >
      <Link
        ref={linkRef}
        href="/tools/codes"
        className={`flex flex-col items-center gap-2 bg-gradient-to-br from-[#F4B860] to-[#D99B3C] text-black px-6 py-4 rounded-lg shadow-2xl hover:shadow-[#F4B860]/50 transition-all ${
          isDragging ? 'scale-105 shadow-[#F4B860]/70' : 'hover:scale-105'
        }`}
        onClick={handleClick}
        draggable={false}
      >
        <span className="text-3xl">🎁</span>
        <span className="font-bold text-sm text-center leading-tight">
          Get Working<br />Codes Now
        </span>
      </Link>
    </div>
  )
}
