'use client'

import { Sparkles, Landmark, Star, Compass } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

export default function HouseAbout() {
  const { soundEnabled } = useAppState()
  
  const sections = [
    {
      icon: Landmark,
      title: 'Brand Story',
      subtitle: 'Origins of Structure',
      description: 'Founded in 2026, ORLIEN was conceived as a reaction to temporary, fast-paced trends. We establish structural wardrobe blueprints where modern architecture meets high tailoring.'
    },
    {
      icon: Compass,
      title: 'Philosophy',
      subtitle: 'Crafted Beyond Trends',
      description: 'We believe a garment must outlive the season. Our design philosophy explores the dialogue between posture, gravity, and premium fabric layers to guarantee design permanence.'
    },
    {
      icon: Star,
      title: 'Craftsmanship',
      subtitle: 'Precision Execution',
      description: 'From double-faced Twill Wool to pure organic Belgian linens, every detail is engineered in-house. Our pattern blocks are draped hand-by-hand, creating bespoke perfection.'
    }
  ]

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  return (
    <section className="bg-background text-foreground px-6 py-24 md:px-8 border-b border-border/25 relative overflow-hidden">
      
      {/* Visual Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/2 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Title row */}
        <div className="mb-20 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3 animate-pulse text-primary" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">06 // THE HOUSE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-foreground uppercase tracking-tight leading-none">
            THE HOUSE OF ORLIEN
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl font-light">
            Step behind the scenes and review the values, stories, and textile principles that define our creative director note.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {sections.map((sec) => {
            const Icon = sec.icon
            return (
              <div 
                key={sec.title}
                onMouseEnter={handleInteract}
                className="group border border-border/40 hover:border-primary/45 bg-card/10 p-8 rounded-[2rem] transition-all duration-300 text-left glass-panel flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit border border-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[8px] font-mono tracking-widest text-primary font-bold uppercase block">{sec.subtitle}</span>
                    <h3 className="text-xl font-black font-heading text-foreground uppercase tracking-wider">{sec.title}</h3>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed font-light mt-6">
                  {sec.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
