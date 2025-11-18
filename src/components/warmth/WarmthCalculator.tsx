'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import warmthData from '@/../../public/data/warmth-matrix.json'

interface WarmthItem {
  name: string
  warmth: number
  durations: number[]
}

interface WarmthData {
  temperatures: number[]
  items: WarmthItem[]
}

export function WarmthCalculator() {
  const data = warmthData as WarmthData
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [targetTemp, setTargetTemp] = useState<number>(-10)
  const [minWarmth, setMinWarmth] = useState<number>(0)

  // Calculate total warmth and duration
  const calculations = useMemo(() => {
    const selected = data.items.filter(item => selectedItems.includes(item.name))
    const totalWarmth = selected.reduce((sum, item) => sum + item.warmth, 0)

    // Find target temperature index
    const tempIndex = data.temperatures.indexOf(targetTemp)
    let totalDuration = 0

    if (tempIndex !== -1) {
      selected.forEach(item => {
        totalDuration += item.durations[tempIndex] || 0
      })
    }

    return { totalWarmth, totalDuration, selectedCount: selected.length }
  }, [selectedItems, targetTemp, data])

  // Filter displayed items by minimum warmth
  const filteredItems = useMemo(() => {
    return data.items.filter(item => item.warmth >= minWarmth)
  }, [minWarmth, data.items])

  const toggleItem = (itemName: string) => {
    setSelectedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  // Get color based on warmth value
  const getWarmthColor = (warmth: number) => {
    if (warmth >= 18) return 'bg-[#F4B860] text-black'
    if (warmth >= 12) return 'bg-orange-400 text-black'
    if (warmth >= 8) return 'bg-yellow-400 text-black'
    return 'bg-blue-400 text-white'
  }

  // Get color for duration display
  const getDurationColor = (duration: number, temp: number) => {
    if (duration >= 20) return 'text-green-400'
    if (duration >= 15) return 'text-yellow-400'
    if (duration >= 10) return 'text-orange-400'
    return 'text-red-400'
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Total Warmth Points</div>
          <div className="text-4xl font-bold text-[#F4B860]">{calculations.totalWarmth}</div>
          <div className="text-sm text-gray-500 mt-2">{calculations.selectedCount} items equipped</div>
        </div>

        <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Survival Time at {targetTemp}°C</div>
          <div className="text-4xl font-bold text-white">{calculations.totalDuration} min</div>
          <div className="text-sm text-gray-500 mt-2">
            {calculations.totalDuration >= 20 ? '✅ Safe to explore' :
             calculations.totalDuration >= 10 ? '⚠️ Quick trips only' :
             '❌ Too dangerous'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Equipment Slots Used</div>
          <div className="text-4xl font-bold text-white">{calculations.selectedCount}/5</div>
          <div className="text-sm text-gray-500 mt-2">
            {5 - calculations.selectedCount} slots available
          </div>
        </div>
      </div>

      {/* Temperature Selector */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 mb-8">
        <label className="block text-lg font-semibold text-white mb-4">
          Target Temperature Zone
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {data.temperatures.map((temp) => (
            <button
              key={temp}
              onClick={() => setTargetTemp(temp)}
              className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                targetTemp === temp
                  ? 'bg-[#F4B860] text-black ring-2 ring-[#F4B860]'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {temp > 0 ? '+' : ''}{temp}°C
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-400">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div>Burrow Area</div>
            <div>Flax Fields</div>
            <div>Pine Forest</div>
            <div>Granite Outcrops</div>
            <div>Mountain Pass</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 mb-8">
        <label className="block text-lg font-semibold text-white mb-4">
          Filter by Minimum Warmth
        </label>
        <input
          type="range"
          min="0"
          max="20"
          step="2"
          value={minWarmth}
          onChange={(e) => setMinWarmth(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>All Items (0+)</span>
          <span className="text-[#F4B860] font-semibold">{minWarmth}+ warmth</span>
          <span>Best Only (20+)</span>
        </div>
      </div>

      {/* Items Grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">Select Your Clothing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isSelected = selectedItems.includes(item.name)
            const tempIndex = data.temperatures.indexOf(targetTemp)
            const duration = tempIndex !== -1 ? item.durations[tempIndex] : 0

            return (
              <button
                key={item.name}
                onClick={() => toggleItem(item.name)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-[#F4B860] bg-[#F4B860]/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                  <span className={`px-2 py-1 rounded text-sm font-bold ${getWarmthColor(item.warmth)}`}>
                    {item.warmth}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  At {targetTemp}°C: <span className={`font-semibold ${getDurationColor(duration, targetTemp)}`}>
                    {duration} minutes
                  </span>
                </div>
                {isSelected && (
                  <div className="mt-2 text-xs text-[#F4B860]">✓ Equipped</div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Warmth Matrix Heatmap */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">Warmth Duration Matrix</h3>
        <p className="text-gray-300 mb-6">
          Complete heatmap showing survival time (in minutes) for each clothing item at different temperatures.
          Warmer colors = longer survival time.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Item</th>
                <th className="text-center py-3 px-2 text-gray-400 font-semibold">Warmth</th>
                {data.temperatures.map(temp => (
                  <th key={temp} className="text-center py-3 px-2 text-gray-400 font-semibold">
                    {temp}°C
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, idx) => (
                <tr
                  key={item.name}
                  className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                    selectedItems.includes(item.name) ? 'bg-[#F4B860]/5' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-white font-medium">{item.name}</td>
                  <td className="text-center py-3 px-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getWarmthColor(item.warmth)}`}>
                      {item.warmth}
                    </span>
                  </td>
                  {item.durations.map((duration, tempIdx) => {
                    const temp = data.temperatures[tempIdx]
                    // Calculate heatmap color intensity
                    const maxDuration = 26
                    const intensity = Math.min(duration / maxDuration, 1)
                    const bgColor = `rgba(244, 184, 96, ${intensity * 0.3})`

                    return (
                      <td
                        key={tempIdx}
                        className="text-center py-3 px-2"
                        style={{ backgroundColor: bgColor }}
                      >
                        <span className={getDurationColor(duration, temp)}>
                          {duration}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#F4B860]/10 rounded"></div>
            <span className="text-gray-400">Low Duration</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#F4B860]/30 rounded"></div>
            <span className="text-gray-400">High Duration</span>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-300 mb-3">💡 Pro Tips</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Always bring 25% more warmth gear than calculated</li>
            <li>• Stack multiple items for extreme cold zones</li>
            <li>• Check weather before long expeditions</li>
            <li>• Night doubles the cold effect</li>
          </ul>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-yellow-300 mb-3">⚠️ Safety Reminders</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Under 10 min = Emergency trips only</li>
            <li>• Bring warm food for emergencies</li>
            <li>• Set up campfire checkpoints</li>
            <li>• Return before warmth drops below 30%</li>
          </ul>
        </div>
      </div>

      {/* Link to full page */}
      <div className="text-center">
        <Link
          href="/warmth-tool/"
          className="inline-block text-[#F4B860] hover:text-[#D99B3C] font-semibold underline"
        >
          Open in full page view →
        </Link>
      </div>
    </div>
  )
}
