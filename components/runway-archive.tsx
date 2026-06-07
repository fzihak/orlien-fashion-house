'use client'

import { useState } from 'react'
import { Sparkles, Eye, ArrowRight } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import Link from 'next/link'

export default function RunwayArchive() {
  const { soundEnabled } = useAppState()
  const [activeSeason, setActiveSeason] = useState<string>('SS25')

  const seasons = [
    {
      id: 'FW25',
      name: 'Autumn / Winter 2025',
      tag: 'COLLECTION // SERIES 04',
      image: '/runway/look-10.avif',
      venue: 'The Highline Portal, New York',
      story: 'An exploration in raw industrial wools and broad-shoulder drapery layers. FW25 deconstructed flight jackets and double-breasted formal trenches, emphasizing structural weights.',
      highlights: ['Melton Wool Aviators', 'Asymmetric Rib Drapes', 'Raw Melton Capes']
    },
    {
      id: 'SS25',
      name: 'Spring / Summer 2025',
      tag: 'COLLECTION // SERIES 03',
      image: '/runway/look-08.avif',
      venue: 'Concrete Docks Pier 17, New York',
      story: 'Fluid canvas constructs designed to float gracefully under high biological motion. We integrated flexible cords and memory textiles, forming modular utility windbreakers.',
      highlights: ['Memory Canvas Anoraks', 'Asymmetric Lapel Wraps', 'Utility Denims']
    },
    {
      id: 'FW24',
      name: 'Autumn / Winter 2024',
      tag: 'COLLECTION // SERIES 02',
      image: '/runway/look-15.avif',
      venue: 'Grand Central Hallway, New York',
      story: 'Classical tailoring blocks reimagined with heavy pre-washed cotton canvas. Highlighted wide-leg raw denim contours and distressed hems with functional metal rivets.',
      highlights: ['Wide Raw Jeans', 'Double Buckle Corsets', 'Washed Tech Parkas']
    },
    {
      id: 'SS24',
      name: 'Spring / Summer 2024',
      tag: 'COLLECTION // SERIES 01',
      image: '/runway/look-04.avif',
      venue: 'Atelier Courtyard, Paris',
      story: 'Liquid silk shift dresses and light linen column robe structures. Celebrating the pure flow of organic weaves in high contrast black, gold, and white palettes.',
      highlights: ['Crepe Silk Shifts', 'Belgian Linen Trousers', 'Polarized Bio-Acetate']
    }
  ]

  const handleSelectSeason = (seasonId: string) => {
    setActiveSeason(seasonId)
    if (soundEnabled) sounds.playSweep()
  }

  const selected = seasons.find(s => s.id === activeSeason) || seasons[0]

  return (
    <section className="bg-background text-foreground px-6 py-24 md:px-8 border-b border-border/25 transition-colors duration-500 relative">
      
      {/* Decorative backdrop blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/2 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Title row */}
        <div className="mb-20 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">10 // THE ARCHIVE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-foreground uppercase tracking-tight leading-none">
            RUNWAY ARCHIVE
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl font-light">
            A visual timeline of the house's past seasonal collections. Browse venue logs, highlights, and structural silhouettes.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Timeline Selector (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between border border-border/40 bg-card/25 rounded-[2.5rem] p-6 md:p-8 glass-panel relative min-h-[350px]">
            <div className="space-y-4">
              <span className="text-[9px] font-mono tracking-widest text-primary font-bold uppercase block mb-6">
                ARCHIVE TIMELINE
              </span>
              
              {/* Timeline nodes */}
              <div className="relative border-l border-border/60 pl-6 space-y-8 text-left">
                {seasons.map((s) => {
                  const isActive = activeSeason === s.id
                  return (
                    <div 
                      key={s.id}
                      onClick={() => handleSelectSeason(s.id)}
                      className="relative cursor-pointer group"
                    >
                      {/* Interactive dot indicator */}
                      <span className={`absolute -left-[30px] top-1.5 h-3.5 w-3.5 rounded-full border transition-all ${
                        isActive 
                          ? 'bg-primary border-primary scale-110' 
                          : 'bg-background border-border/60 group-hover:border-primary'
                      }`} />
                      
                      <div className="space-y-0.5">
                        <span className={`text-xs font-black font-mono tracking-wider ${isActive ? 'text-primary' : 'text-foreground/50'}`}>
                          {s.id}
                        </span>
                        <h4 className={`text-sm font-bold uppercase tracking-wide transition-colors ${isActive ? 'text-foreground' : 'text-foreground/60'}`}>
                          {s.name.split(' ')[0]} {s.name.split(' ')[s.name.split(' ').length - 1]}
                        </h4>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom link */}
            <Link
              href="/lookbook"
              className="inline-flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors pt-6 border-t border-border/40 w-full"
            >
              <span>Review Full Archive</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Right Widescreen Details Panel (8 Columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#050505] border border-white/5 rounded-[2.5rem] p-6 md:p-8 relative min-h-[400px]">
            
            {/* Image Box */}
            <div className="md:col-span-5 aspect-[3/4] rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl bg-secondary">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-full object-cover animate-fade-in"
                key={activeSeason} // resets key to trigger smooth entry transition
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Details content */}
            <div className="md:col-span-7 text-left space-y-6">
              <div className="space-y-1">
                <span className="text-[8px] font-mono tracking-widest text-primary font-bold uppercase border-b border-primary/25 pb-1">
                  {selected.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-heading uppercase text-white tracking-wider leading-none">
                  {selected.name}
                </h3>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block pt-1">{selected.venue}</span>
              </div>

              <p className="text-xs text-gray-300 font-light leading-relaxed font-serif italic">
                "{selected.story}"
              </p>

              {/* Highlights tags */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 font-bold">Key Collection Pieces</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selected.highlights.map((h) => (
                    <span 
                      key={h}
                      className="px-3 py-1 rounded-full border border-white/10 text-white font-mono text-[9px] uppercase tracking-wider bg-white/5"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
