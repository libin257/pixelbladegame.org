'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the article
    const article = document.querySelector('article')
    if (!article) return

    const headingElements = article.querySelectorAll('h2, h3')
    const headingData: Heading[] = []

    headingElements.forEach((heading, index) => {
      const text = heading.textContent || ''
      const level = parseInt(heading.tagName[1])

      // Create ID from text if it doesn't exist
      if (!heading.id) {
        heading.id = `heading-${index}`
      }

      headingData.push({
        id: heading.id,
        text,
        level
      })
    })

    setHeadings(headingData)

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    headingElements.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700">
        <h4 className="text-sm font-semibold text-[#F4B860] mb-4 uppercase tracking-wide">
          On This Page
        </h4>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? 'ml-4' : ''}
            >
              <a
                href={`#${heading.id}`}
                className={`block text-sm transition-colors ${
                  activeId === heading.id
                    ? 'text-[#F4B860] font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  })
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
