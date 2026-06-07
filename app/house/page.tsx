'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react'
import Link from 'next/link'

export default function HousePage() {
  const { soundEnabled } = useAppState()

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const values = [
    { title: 'Material Honesty', desc: 'Allowing fabrics to show their natural grains and textures without artificial coatings.' },
    { title: 'Biomechanical Tailoring', desc: 'Crafting garment outlines that flex with body curves and support posture changes.' },
    { title: 'Zero Waste Commitment', desc: 'Redesigning pattern layouts to eliminate fabric scrap leftovers to under 3%.' }
  ]

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      <section className="relative w-full py-16 md:py-24 border-b border-border/40 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-16">
          
          {/* Header */}
          <div className="space-y-4 max-w-2xl border-b border-border/20 pb-8">
            <span className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase font-black">
              ORLIEN CORPORATE IDENTITY
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading uppercase tracking-tight leading-none">
              The House of ORLIEN
            </h1>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider leading-relaxed">
              Crafted Beyond Trends. Establishments in New York, Paris, and Milan.
            </p>
          </div>

          {/* Brand Manifesto */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-border/20 pb-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[9px] font-mono tracking-widest text-primary font-black">HOUSE MANIFESTO</span>
              <h2 className="text-3xl font-serif font-black uppercase text-foreground leading-tight">
                "Fashion is not what you wear. It is what remains after the moment has passed."
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                We believe in clothing that holds value across generations. By merging bespoke tailoring craftsmanship with digital pattern optimization, we generate high-fashion silhouettes that feel extremely premium and function in natural movement.
              </p>
            </div>
            <div className="lg:col-span-7 aspect-[21/9] bg-secondary rounded-2xl overflow-hidden border border-border/30">
              <img src="/runway/hero-banner-2.avif" alt="Manifesto landscape" className="w-full h-full object-cover grayscale" />
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-6">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-primary font-black">CORE VALUES</span>
              <h3 className="text-xl font-bold uppercase tracking-wide mt-1">Our Philosophy</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="p-6 border border-border/40 bg-card/25 rounded-2xl space-y-3">
                  <h4 className="text-sm font-bold uppercase text-foreground">{v.title}</h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed font-serif">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Global Presence Boutiques details */}
          <div className="border-t border-border/40 pt-12 text-left space-y-6">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-primary font-black">GLOBAL PRESENCE</span>
              <h3 className="text-xl font-bold uppercase tracking-wide mt-1">Bespoke Boutiques</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 border border-border/20 rounded-xl bg-card/20">
                <div className="font-bold text-foreground">NEW YORK SHOWROOM</div>
                <div className="text-[10px] text-muted-foreground mt-1">Broadway Docks // Studio A</div>
              </div>
              <div className="p-4 border border-border/20 rounded-xl bg-card/20">
                <div className="font-bold text-foreground">PARIS ATELIER</div>
                <div className="text-[10px] text-muted-foreground mt-1">Rue de la Paix // Floor 3</div>
              </div>
              <div className="p-4 border border-border/20 rounded-xl bg-card/20">
                <div className="font-bold text-foreground">MILAN BOUTIQUE</div>
                <div className="text-[10px] text-muted-foreground mt-1">Via Monte Napoleone // Galleria</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <StyleOracle />
      <Footer />
    </main>
  )
}
