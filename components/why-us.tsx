'use client'

import { Sparkles, Scissors, Landmark, HelpCircle, ShieldCheck } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

export default function WhyUs() {
  const { soundEnabled } = useAppState()
  
  const manifestos = [
    {
      icon: Scissors,
      title: 'ATELIER TAILORING',
      subtitle: 'Precision Hand-Draping',
      description: 'Drafted and assembled within our historic concrete ateliers. Each pattern block is hand-draped, draped for natural posture movement, and finished with reinforced raw seams.'
    },
    {
      icon: ShieldCheck,
      title: 'ORGANIC PROVENANCE',
      subtitle: 'Heritage GOTS & GRS Materials',
      description: 'Consciously sourced. We utilize long-staple Belgian flax linens, high-twist virgin wools, and GRS-certified tech nylons designed to withstand atmospheric cycles.'
    },
    {
      icon: Landmark,
      title: 'THE HOUSE HERITAGE',
      subtitle: 'Established 2026',
      description: 'Fusing digital utility drapes with classical tailoring blueprints. A creative manifesto dedicated to structural design permanence rather than transient seasons.'
    }
  ]

  const handleHover = () => {
    if (soundEnabled) sounds.playPop()
  }

  return (
    <section className="bg-background px-6 py-24 md:px-8 border-b border-border/25 transition-colors duration-500 relative overflow-hidden">
      
      {/* Decorative Blur Nodes */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/2 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Editorial Heading */}
        <div className="mb-20 text-left space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
            <Sparkles className="h-3 w-3" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">HOUSE PHILOSOPHY</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading uppercase text-foreground leading-[1.1] tracking-tight">
            THE MANIFESTO OF <br className="hidden sm:inline" />
            CRAFT & PERMANENCE
          </h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xl">
            ORLIEN is founded on structural tension. We deconstruct classic wardrobe tailoring, creating luxury garments designed to adapt, perform, and endure.
          </p>
        </div>

        {/* Editorial Grid: Asymmetric Collage + Text Column */}
        <div className="grid gap-12 lg:grid-cols-12 items-stretch">
          
          {/* Left Collage Column (7 Columns) */}
          <div className="lg:col-span-7 grid gap-6 grid-cols-12">
            
            {/* Large Hero Image */}
            <div className="col-span-12 relative overflow-hidden rounded-[2rem] border border-border/40 bg-secondary/10 shadow-2xl h-[380px] md:h-[450px] group">
              <img
                src="/runway/hero-banner-2.avif"
                alt="Atelier Manifesto"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute left-8 bottom-8 text-white max-w-[80%] text-left space-y-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-primary font-bold">ACT II // SCENE 05</span>
                <h3 className="text-2xl md:text-3xl font-black font-heading uppercase leading-none tracking-wide">
                  TENSION IN FORM
                </h3>
                <p className="text-xs text-gray-300 font-light max-w-sm">
                  Runway fitting logs captured live in the design studio.
                </p>
              </div>
            </div>

            {/* Asymmetric Small Images Row */}
            <div className="col-span-7 relative overflow-hidden rounded-2xl border border-border/40 bg-secondary/10 shadow-lg h-[200px] group">
              <img 
                src="/runway/look-12.avif" 
                alt="Material precision" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 text-white text-[9px] font-mono uppercase tracking-[0.25em]">
                01 / GOTS TEXTILES
              </div>
            </div>

            <div className="col-span-5 relative overflow-hidden rounded-2xl border border-border/40 bg-secondary/10 shadow-lg h-[200px] group">
              <img 
                src="/runway/look-09.avif" 
                alt="Bespoke finish" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 text-white text-[9px] font-mono uppercase tracking-[0.25em]">
                02 / PATTERN DRAFT
              </div>
            </div>

          </div>

          {/* Right Text Column (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {manifestos.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    onMouseEnter={handleHover}
                    className="group rounded-3xl border border-border/40 bg-secondary/10 p-6 transition-all duration-300 hover:border-primary/45 hover:bg-secondary/20 text-left"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="rounded-xl bg-primary/10 p-2.5 text-primary border border-primary/10 shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono font-bold tracking-[0.25em] text-primary block">
                          {item.title}
                        </span>
                        <h3 className="text-sm font-black text-foreground uppercase tracking-widest">
                          {item.subtitle}
                        </h3>
                        <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
