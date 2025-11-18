'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import recipesData from '@/../../public/data/recipes.json'

interface Recipe {
  item: string
  materials: Array<[string, number]>
  station: string
  category?: string
}

export function RecipeFinder() {
  const recipes = recipesData as Recipe[]
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedStation, setSelectedStation] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Extract all unique materials
  const allMaterials = useMemo(() => {
    const materials = new Set<string>()
    recipes.forEach(recipe => {
      recipe.materials.forEach(([material]) => {
        materials.add(material)
      })
    })
    return Array.from(materials).sort()
  }, [recipes])

  // Extract all unique crafting stations
  const allStations = useMemo(() => {
    const stations = new Set<string>()
    recipes.forEach(recipe => {
      stations.add(recipe.station)
    })
    return Array.from(stations).sort()
  }, [recipes])

  // Filter recipes based on search, station, and available materials
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Search filter
      if (searchTerm && !recipe.item.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Station filter
      if (selectedStation !== 'all' && recipe.station !== selectedStation) {
        return false
      }

      // Material filter - only show recipes where all materials are available
      if (selectedMaterials.length > 0) {
        const canCraft = recipe.materials.every(([material]) =>
          selectedMaterials.includes(material)
        )
        if (!canCraft) {
          return false
        }
      }

      return true
    })
  }, [recipes, searchTerm, selectedStation, selectedMaterials])

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    )
  }

  const getMissingMaterials = (recipe: Recipe): string[] => {
    if (selectedMaterials.length === 0) return []
    return recipe.materials
      .filter(([material]) => !selectedMaterials.includes(material))
      .map(([material]) => material)
  }

  const getStationColor = (station: string) => {
    switch (station) {
      case 'Handcraft':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'Workbench':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'Advanced Workbench':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'Kitchen':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Total Recipes</div>
          <div className="text-4xl font-bold text-white">{recipes.length}</div>
        </div>

        <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Materials Selected</div>
          <div className="text-4xl font-bold text-[#F4B860]">{selectedMaterials.length}</div>
        </div>

        <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Craftable Recipes</div>
          <div className="text-4xl font-bold text-green-400">{filteredRecipes.length}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Search by Name
            </label>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4B860] focus:border-transparent"
            />
          </div>

          {/* Station Filter */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Crafting Station
            </label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F4B860] focus:border-transparent"
            >
              <option value="all">All Stations</option>
              {allStations.map(station => (
                <option key={station} value={station}>{station}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Material Selector */}
        <div>
          <label className="block text-sm font-semibold text-white mb-3">
            Select Your Available Materials ({selectedMaterials.length} selected)
          </label>
          <div className="flex flex-wrap gap-2">
            {allMaterials.map(material => (
              <button
                key={material}
                onClick={() => toggleMaterial(material)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedMaterials.includes(material)
                    ? 'bg-[#F4B860] text-black ring-2 ring-[#F4B860]'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {material}
              </button>
            ))}
          </div>
          {selectedMaterials.length > 0 && (
            <button
              onClick={() => setSelectedMaterials([])}
              className="mt-3 text-sm text-gray-400 hover:text-white underline"
            >
              Clear all materials
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          {selectedMaterials.length > 0 ? 'Recipes You Can Craft' : 'All Available Recipes'}
          <span className="text-gray-400 text-lg ml-3">({filteredRecipes.length})</span>
        </h3>

        {filteredRecipes.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-12 border border-gray-700 text-center">
            <p className="text-gray-400 text-lg mb-2">No recipes found</p>
            <p className="text-sm text-gray-500">
              Try selecting different materials or changing your search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => {
              const missingMaterials = getMissingMaterials(recipe)
              const canCraft = missingMaterials.length === 0 && selectedMaterials.length > 0

              return (
                <div
                  key={index}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border transition-all ${
                    canCraft
                      ? 'border-green-500 ring-2 ring-green-500/30'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {/* Recipe Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white flex-1">
                      {recipe.item}
                    </h4>
                    {canCraft && (
                      <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded">
                        ✓ Can Craft
                      </span>
                    )}
                  </div>

                  {/* Station */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded text-xs font-semibold border ${getStationColor(recipe.station)}`}>
                      {recipe.station}
                    </span>
                  </div>

                  {/* Materials */}
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-400">Required Materials:</div>
                    {recipe.materials.map(([material, amount], idx) => {
                      const hasIt = selectedMaterials.includes(material)
                      return (
                        <div
                          key={idx}
                          className={`flex items-center justify-between text-sm ${
                            hasIt ? 'text-green-300' : 'text-gray-400'
                          }`}
                        >
                          <span>{material}</span>
                          <span className="font-semibold">
                            {hasIt && '✓ '}×{amount}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Missing Materials Warning */}
                  {missingMaterials.length > 0 && selectedMaterials.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="text-xs text-red-400">
                        Missing: {missingMaterials.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-300 mb-3">💡 How to Use</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Select materials you currently have in inventory</li>
            <li>• Green highlighted recipes can be crafted right now</li>
            <li>• Filter by crafting station to see what's possible</li>
            <li>• Use search to quickly find specific items</li>
          </ul>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-yellow-300 mb-3">⚠️ Crafting Tips</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Upgrade to Advanced Workbench for better items</li>
            <li>• Stockpile common materials like Pine Wood and Flax</li>
            <li>• Craft in batches to save time</li>
            <li>• Some recipes require rare materials from specific zones</li>
          </ul>
        </div>
      </div>

      {/* Link to full page */}
      <div className="text-center">
        <Link
          href="/crafting/"
          className="inline-block text-[#F4B860] hover:text-[#D99B3C] font-semibold underline"
        >
          Open in full page view →
        </Link>
      </div>
    </div>
  )
}
