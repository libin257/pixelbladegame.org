'use client'

import { useState, useEffect } from 'react'

interface Code {
  code: string
  reward: string
  status: 'active' | 'expired'
  platform: string
  expiresAt: string | null
}

interface CodesData {
  updated: string
  sources: string[]
  platforms: string[]
  codes: Code[]
}

export function CodeChecker() {
  const [codesData, setCodesData] = useState<CodesData | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL')
  const [showActiveOnly, setShowActiveOnly] = useState(true)
  const [filteredCodes, setFilteredCodes] = useState<Code[]>([])
  const [copiedCode, setCopiedCode] = useState<string>('')

  useEffect(() => {
    // Load codes data
    fetch('/data/codes.json')
      .then(res => res.json())
      .then((data: CodesData) => {
        setCodesData(data)
      })
      .catch(err => {
        console.error('Failed to load codes data:', err)
      })
  }, [])

  useEffect(() => {
    if (!codesData) return

    let filtered = codesData.codes

    // Filter by platform
    if (selectedPlatform !== 'ALL') {
      filtered = filtered.filter(code =>
        code.platform === selectedPlatform || code.platform === 'ALL'
      )
    }

    // Filter by status
    if (showActiveOnly) {
      filtered = filtered.filter(code => code.status === 'active')
    }

    setFilteredCodes(filtered)
  }, [codesData, selectedPlatform, showActiveOnly])

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-500/20 text-green-300 border-green-500/50'
      : 'bg-red-500/20 text-red-300 border-red-500/50'
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
          🎁 ONE-CLICK CODE COPY CENTER
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform Filter */}
          <div>
            <label className="block text-white font-semibold mb-3">
              <span className="text-[#F4B860]">Platform:</span> Select Your Device
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#F4B860] focus:outline-none focus:ring-2 focus:ring-[#F4B860]/20"
            >
              <option value="ALL">All Platforms</option>
              <option value="ROBLOX">ROBLOX</option>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
            </select>
          </div>

          {/* Active Only Toggle */}
          <div>
            <label className="block text-white font-semibold mb-3">
              <span className="text-[#F4B860]">Filter:</span> Code Status
            </label>
            <button
              onClick={() => setShowActiveOnly(!showActiveOnly)}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all border-2 ${
                showActiveOnly
                  ? 'border-green-500 bg-green-500/20 text-green-300'
                  : 'border-gray-700 bg-gray-800 text-gray-400'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <input
                  type="checkbox"
                  checked={showActiveOnly}
                  onChange={() => setShowActiveOnly(!showActiveOnly)}
                  className="w-5 h-5"
                />
                <span>Show Active Codes Only ✓</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Codes Display */}
      <div className="space-y-4">
        {filteredCodes.length > 0 ? (
          filteredCodes.map((codeItem, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-5 border-2 border-gray-700 hover:border-[#F4B860]/50 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Code and Status */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white font-mono">
                      {codeItem.code}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(codeItem.status)}`}>
                      {codeItem.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-2">
                    🎁 Reward: <span className="text-white font-semibold">{codeItem.reward}</span>
                  </p>

                  <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                    <span>📱 Platform: {codeItem.platform}</span>
                    {codeItem.expiresAt && (
                      <span>⏰ Expires: {new Date(codeItem.expiresAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopyCode(codeItem.code)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105 active:scale-95 ${
                    copiedCode === codeItem.code
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-[#F4B860] to-[#D99B3C] text-black hover:from-[#D99B3C] hover:to-[#C88B2E]'
                  }`}
                >
                  {copiedCode === codeItem.code ? '✓ Copied!' : '📋 Copy Code'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-800/30 rounded-lg p-8 border border-gray-700 text-center">
            <p className="text-gray-400 text-lg">
              😕 No codes found for your selected filters.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Try changing your platform or toggle off "Active Only" filter.
            </p>
          </div>
        )}
      </div>

      {/* Data Source Info */}
      {codesData && (
        <div className="mt-8 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-3">📊 Data Sources</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {codesData.sources.map((source, index) => (
              <span key={index} className="bg-[#1E3A34] px-3 py-1 rounded-full text-xs text-gray-300">
                {source}
              </span>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs">
            Last updated: {new Date(codesData.updated).toLocaleString()} • Total codes: {codesData.codes.length}
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-300 mb-3">💡 How to Redeem Codes</h4>
        <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
          <li>Launch Pixel Blade on your device</li>
          <li>Click the <span className="text-white font-semibold">Settings</span> or <span className="text-white font-semibold">Menu</span> button</li>
          <li>Look for the <span className="text-white font-semibold">Codes</span> or <span className="text-white font-semibold">Redeem</span> option</li>
          <li>Copy a code from above and paste it into the input field</li>
          <li>Click <span className="text-white font-semibold">Redeem</span> to claim your rewards!</li>
        </ol>
      </div>
    </div>
  )
}
