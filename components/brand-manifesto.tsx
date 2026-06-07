'use client'

import { motion } from 'lucide-react'

export default function BrandManifesto() {
  return (
    <section className="bg-black text-white px-6 py-28 md:py-36 md:px-8 border-b border-border/25 relative overflow-hidden flex items-center justify-center">
      {/* Editorial Decorative Grid Backdrop */}
      <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
        <span className="text-[9px] font-mono tracking-[0.35em] text-primary uppercase font-black">
          L'ATELIER MANIFESTO // SERIES 01
        </span>
        
        <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
          <blockquote className="text-4xl sm:text-5xl md:text-7xl font-black font-heading tracking-tight leading-[1.08] uppercase text-white">
            Fashion is not what you wear.
          </blockquote>
          
          <div className="w-16 h-[1px] bg-primary/45 mx-auto" />
          
          <blockquote className="text-2xl sm:text-3xl md:text-5xl font-light font-serif italic tracking-wide text-gray-300 leading-relaxed">
            It is what remains after the moment has passed.
          </blockquote>
        </div>

        <div className="text-[8px] font-mono tracking-[0.25em] text-white/30 uppercase pt-4">
          ORLIEN LUXURY FASHION HOUSE • PARIS • MILAN • NEW YORK
        </div>
      </div>
    </section>
  )
}
