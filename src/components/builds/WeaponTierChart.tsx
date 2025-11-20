'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface WeaponTier {
  tier: string
  weapons: string[]
  color: string
}

interface TierData {
  updated: string
  source: string
  url: string
  tiers: WeaponTier[]
}

export function WeaponTierChart() {
  const [tierData, setTierData] = useState<TierData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load weapon tier data
    fetch('/data/weapon_tiers.json')
      .then(res => res.json())
      .then((data: TierData) => {
        setTierData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load weapon tier data:', err)
        setLoading(false)
      })
  }, [])

  // Get tier label style
  const getTierStyle = (tier: string) => {
    switch (tier) {
      case 'S+':
        return 'bg-gradient-to-br from-red-500 to-pink-600 text-white'
      case 'S':
        return 'bg-gradient-to-br from-orange-500 to-red-500 text-white'
      case 'A':
        return 'bg-gradient-to-br from-yellow-500 to-orange-500 text-black'
      case 'B':
        return 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
      case 'C':
        return 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600 text-white'
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto text-center py-12">
        <div className="animate-pulse text-gray-400">Loading weapon tier list...</div>
      </div>
    )
  }

  if (!tierData) {
    return (
      <div className="max-w-7xl mx-auto text-center py-12">
        <div className="text-gray-400">Failed to load weapon tier data</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-[#F4B860] to-[#D99B3C] text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
          ⚔️ REAL-TIME DATA FROM PIXEL BLADE WIKI
        </div>
      </div>

      {/* Tier List */}
      <div className="space-y-4">
        {tierData.tiers.map((tierItem, index) => {
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-5 border border-gray-700 hover:border-[#F4B860]/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                {/* Tier Badge */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center font-bold text-3xl ${getTierStyle(tierItem.tier)}`}>
                  {tierItem.tier}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Tier Description */}
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-white mb-1">
                      Tier {tierItem.tier} - {tierItem.tier === 'S+' ? 'God Tier' : tierItem.tier === 'S' ? 'Top Tier' : tierItem.tier === 'A' ? 'Great' : tierItem.tier === 'B' ? 'Good' : 'Average'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {tierItem.weapons.length} weapon{tierItem.weapons.length !== 1 ? 's' : ''} in this tier
                    </p>
                  </div>

                  {/* Weapon Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tierItem.weapons.map((weapon, weaponIndex) => (
                      <div
                        key={weaponIndex}
                        className="bg-[#1E3A34] px-4 py-2 rounded-lg text-sm font-semibold text-white border border-[#F4B860]/30 hover:border-[#F4B860] transition-colors cursor-pointer"
                      >
                        {weapon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {tierData.tiers.map((tierItem, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded ${getTierStyle(tierItem.tier)} flex items-center justify-center text-xs font-bold`}>
                {tierItem.tier}
              </div>
              <span className="text-gray-300 text-sm">
                {tierItem.tier === 'S+' ? 'God Tier' : tierItem.tier === 'S' ? 'Top Tier' : tierItem.tier === 'A' ? 'Great' : tierItem.tier === 'B' ? 'Good' : 'Average'}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          Data sourced from Pixel Blade Wiki • Updated: {new Date(tierData.updated).toLocaleDateString()}
        </p>
      </div>

      {/* View Full Chart Link */}
      <div className="text-center mt-8">
        <Link
          href="/tier-list/pixel-blade-weapon-tier-list/"
          className="inline-flex items-center gap-2 text-[#F4B860] hover:text-[#D99B3C] font-semibold text-lg group"
        >
          <span>View Full Chart & Weapon Details</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  )
}
