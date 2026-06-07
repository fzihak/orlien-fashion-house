'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import Link from 'next/link'

export default function FeaturedCollections() {
  const { soundEnabled } = useAppState()
  
  const collections = [
    { 
      name: 'Spring / Summer', 
      tag: '01 // WARM LIGHT DYNAMICS',
      desc: 'Liquid silk shift silhouettes and high-twist linens designed to respond gracefully to postured motion and light.',
      image: '/runway/look-04.avif', 
      className: 'lg:mt-0',
      link: '/shop'
    },
    { 
      name: 'Autumn / Winter', 
      tag: '02 // HEAVY BLUEPRINT STRUCTURES',
      desc: 'Brutalist double-faced wool coats, washed tech canvas parkas, and protective leather aviators tailored for sharp, urban postures.',
      image: '/runway/look-11.avif', 
      className: 'lg:mt-12',
      link: '/shop'
    },
    { 
      name: 'Limited Edition', 
      tag: '03 // EXCLUSIVE ATELIER RELEASES',
      desc: 'Numbered capsules hand-constructed with heritage deadstock textiles, GOTS certified organic fibers, and bespoke metallic finishes.',
      image: '/runway/look-12.avif', 
      className: 'lg:mt-24',
      link: '/shop'
    },
  ]

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  return (
    <div className="bg-background px-6 py-24 md:px-8 border-b border-border/25 transition-colors duration-500 relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">04 / THE SEASONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-foreground uppercase tracking-tight leading-none">
            Featured Collections
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto font-light">
            Explore our curated seasonal drop blueprints, each tailored to adapt to modern luxury environments.
          </p>
        </div>

        {/* Asymmetric Offset grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {collections.map((collection) => (
            <Link 
              href={collection.link}
              key={collection.name} 
              onMouseEnter={handleInteract}
              onClick={() => { if (soundEnabled) sounds.playClick() }}
              className={`group cursor-pointer bg-card/10 border border-border/40 hover:border-primary/45 p-4 rounded-[2rem] transition-all duration-500 glass-panel ${collection.className}`}
            >
              {/* Image Container with Custom Ratio */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] mb-6 bg-background">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                
                {/* Visual Glass Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />
                
                {/* Floating Meta tags inside card */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 text-left">
                  <span className="text-[8px] font-mono tracking-widest text-primary font-bold">{collection.tag}</span>
                  <h3 className="text-3xl font-black font-heading tracking-tight uppercase leading-none">{collection.name}</h3>
                </div>
              </div>

              {/* Outside Card Description */}
              <div className="space-y-4 px-2 pb-2 text-left">
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  {collection.desc}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary group-hover:text-accent transition-colors pt-2">
                  <span>Explore Collection</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
