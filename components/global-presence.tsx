'use client'

import { Sparkles } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

export default function GlobalPresence() {
  const { soundEnabled } = useAppState()

  const stats = [
    { num: '25+', label: 'Curated Collections', sub: 'Seasonal drop capsules' },
    { num: '15', label: 'Countries Reached', sub: 'Hand-courier destinations' },
    { num: '100K+', label: 'Society Community', sub: 'Active registry profiles' }
  ]

  const handleHover = () => {
    if (soundEnabled) sounds.playPop()
  }

  return (
    <section className="bg-black text-white px-6 py-28 md:px-8 border-b border-border/25 relative overflow-hidden flex items-center justify-center">
      
      {/* Decorative backdrop grid */}
      <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/2 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 text-center space-y-16">
        
        {/* Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">13 // GLOBAL FOOTPRINT</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-tight leading-none">
            GLOBAL PRESENCE
          </h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto font-light leading-relaxed">
            Delivering modern visual elegance and tailor precision to global collectors hand-by-hand.
          </p>
        </div>

        {/* 3-Column Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {stats.map((st) => (
            <div 
              key={st.label}
              onMouseEnter={handleHover}
              className="space-y-3 p-8 border border-white/5 bg-card/25 rounded-[2rem] glass-panel hover:border-primary/45 transition-all duration-300 text-center flex flex-col justify-center min-h-[200px]"
            >
              <h3 className="text-5xl md:text-7xl font-black font-heading text-primary leading-none tracking-tight">
                {st.num}
              </h3>
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-wider text-white">
                  {st.label}
                </p>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  {st.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
