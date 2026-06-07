'use client'

import { TrendingUp } from 'lucide-react'

export default function TrendingStyles() {
  const trends = [
    { 
      id: 1, 
      title: 'Minimalist Chic', 
      image: 'https://images.unsplash.com/photo-1539533057440-7814a9d4aae9?w=500&h=600&fit=crop',
      popularity: 'trending'
    },
    { 
      id: 2, 
      title: 'Bold Patterns', 
      image: 'https://images.unsplash.com/photo-1557672172-298e090d0f80?w=500&h=600&fit=crop',
      popularity: 'trending'
    },
    { 
      id: 3, 
      title: 'Vintage Revival', 
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop',
      popularity: 'trending'
    },
    { 
      id: 4, 
      title: 'Oversized Fits', 
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop',
      popularity: 'trending'
    },
  ]

  return (
    <div className="bg-gray-950 px-6 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-500">Trending Now</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              This Season's Must-Have Styles
            </h2>
            <p className="text-lg text-gray-400">
              Discover what fashion enthusiasts are loving right now
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trends.map((trend) => (
            <div key={trend.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4 h-72 md:h-96">
                <img 
                  src={trend.image} 
                  alt={trend.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
              <h3 className="text-white font-semibold text-lg">{trend.title}</h3>
              <p className="text-gray-400 text-sm">Trending this week</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
