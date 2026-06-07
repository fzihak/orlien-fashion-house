'use client'

import { Sparkles } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

export default function CreativeDirector() {
  const { soundEnabled } = useAppState()

  const handleHover = () => {
    if (soundEnabled) sounds.playPop()
  }

  return (
    <section className="bg-black text-white px-6 py-24 md:px-8 border-b border-border/25 relative overflow-hidden">
      
      {/* Decorative Blur Nodes */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/2 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Title */}
        <div className="mb-20 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">11 // THE DIRECTOR NOTE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-tight leading-none">
            CREATIVE DIRECTOR NOTE
          </h2>
          <p className="text-sm text-gray-400 mt-3 max-w-xl font-light">
            A personal statement regarding structural design, chromatic spectrums, and contemporary lifestyle silhouettes.
          </p>
        </div>

        {/* Layout: Photo + Letter (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Photo Frame (5 Columns) */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-secondary/10 shadow-2xl aspect-[3/4] group">
            <img 
              src="/runway/bts-14.avif" 
              alt="Creative Director in the Studio" 
              className="w-full h-full object-cover scale-[1.01] group-hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 text-left text-white space-y-1">
              <span className="text-[9px] font-mono tracking-widest text-primary font-bold uppercase">THE ATELIER BLUEPRINT</span>
              <h3 className="text-lg font-black uppercase font-heading tracking-wide">ORLIEN DESIGN OFFICE</h3>
            </div>
          </div>

          {/* Letter Frame (7 Columns) */}
          <div className="lg:col-span-7 text-left space-y-6 md:space-y-8 max-w-2xl">
            <h3 className="text-2xl font-black font-heading uppercase text-white tracking-wide border-b border-white/10 pb-4">
              A Letter from Our Creative Director
            </h3>
            
            {/* The Letter Body */}
            <div className="space-y-6 text-sm text-gray-300 font-light leading-relaxed font-serif italic">
              <p>
                "At ORLIEN, we define fashion not as transient trends, but as structural permanence. The objects we construct in our studio are physical records of geometry, Postures, and the chromatic densities of textile layers."
              </p>
              <p>
                "For the Spring/Summer 2026 Collection, we focused extensively on tension. Removing heavy seams and allowing liquid silk and pre-washed tech canvas to fall naturally creates a dialogue between anatomical motion and gravitational grids."
              </p>
              <p>
                "We thank you for entering the ORLIEN Society. Settle into modern elegance and timeless silhouettes designed to endure beyond the moment."
              </p>
            </div>

            {/* Signature Block */}
            <div className="pt-6 border-t border-white/5 flex flex-col items-start gap-1 font-mono">
              <span className="text-[10.5px] font-bold tracking-[0.25em] text-primary uppercase">Office of the Creative Director</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest">ORLIEN LUXURY FASHION HOUSE</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
