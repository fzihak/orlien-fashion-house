'use client'

import { Sparkles, Globe, Heart, ShieldCheck } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

export default function Sustainability() {
  const { soundEnabled } = useAppState()

  const categories = [
    {
      icon: ShieldCheck,
      title: 'Ethical Sourcing',
      desc: 'We map and audit our complete supply chain. Every weaver, tanner, and metal worker is certified under strict European ethical labor codes, securing fair compensation and workplace standard checks.'
    },
    {
      icon: Heart,
      title: 'Sustainable Materials',
      desc: '100% GOTS organic cottons, heritage wool blends, and technical fabrics synthesized from ocean nylon debris (GRS certified). Our drapes are naturally dyed to reduce ground-water contamination.'
    },
    {
      icon: Globe,
      title: 'Future Vision',
      desc: 'We design for circularity. Through complimentary alteration programs and recycle registry points, ORLIEN aims for structural zero-waste garment loop lifetimes by 2030.'
    }
  ]

  const handleHover = () => {
    if (soundEnabled) sounds.playPop()
  }

  return (
    <section className="bg-background text-foreground px-6 py-24 md:px-8 border-b border-border/25 relative overflow-hidden">
      
      {/* Decorative Blur Nodes */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/2 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="mb-20 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">12 // THE FUTURE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-foreground uppercase tracking-tight leading-none">
            SUSTAINABILITY & VISION
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl font-light">
            Crafting beyond trends requires protecting our source material grids. Explore our core ecological commitments.
          </p>
        </div>

        {/* 3-Column minimalist panel grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <div 
                key={cat.title}
                onMouseEnter={handleHover}
                className="group p-8 rounded-[2rem] border border-border/40 hover:border-primary/45 bg-card/10 flex flex-col justify-between transition-all duration-300 text-left glass-panel"
              >
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit border border-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-black font-heading text-foreground uppercase tracking-wider">{cat.title}</h3>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed font-light mt-6">
                  {cat.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
