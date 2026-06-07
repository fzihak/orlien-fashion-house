'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { ArrowLeft, Sparkles, Scissors, Layers, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function CraftsmanshipPage() {
  const { soundEnabled } = useAppState()

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const materials = [
    { name: 'Aegean Organic Cotton', source: 'Izmir collectives', threadCount: '400TC fine knit', desc: 'Sourced directly from ecological cooperatives. Extra-long staple fibers spin into yarns of exceptional strength, resisting pilling or stretching.' },
    { name: 'Melton Virgin Wool', source: 'Biella historical mills', threadCount: '820gsm heavy weave', desc: 'Compact, tightly woven wool treated with natural heat shrinkage, forming a windproof shield that repels moisture.' },
    { name: 'GRS Technical Nylon', source: 'Reclaimed ocean plastics', threadCount: 'Double-Ply ripstop', desc: 'Global Recycled Standard certified synthetic fibers compressed at high heat for natural water repellency without chemicals.' }
  ]

  const tailoringSteps = [
    { step: '01', title: 'Puzzle Pattern Cards', desc: 'Garment components are aligned in mathematical puzzle configurations to minimize fabric borders and limit residuals.' },
    { step: '02', title: 'Internal Canvas Pad', desc: 'Chest areas are padded with traditional horsehair and wool canvas inserts, ensuring the lapel rolls and drops naturally.' },
    { step: '03', title: 'Hand-Stitched Bound Seams', desc: 'Raw internal seams are bound in contrasting silk tapes, displaying structural construction details instead of hiding them.' }
  ]

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      <section className="relative w-full py-16 md:py-24 border-b border-border/40 text-left">
        <div className="mx-auto max-w-6xl px-6 md:px-8 space-y-20">
          
          {/* Breadcrumb Back Link */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-mono border-b border-border/30 pb-4">
            <Link href="/house" onClick={handleInteract} className="hover:text-primary flex items-center gap-1 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to House</span>
            </Link>
            <span>/</span>
            <span>Atelier Craftsmanship</span>
          </div>

          {/* Large Hero & Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-[9px] uppercase tracking-widest font-black">
                <Scissors className="h-3.5 w-3.5 text-primary" />
                <span>STUDIO LEDGER NO. 12</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading uppercase tracking-tight leading-none text-foreground">
                Precision in Every Stitch
              </h1>
              
              <p className="text-xs font-mono text-primary uppercase tracking-widest font-bold">
                12,000 PADDED STITCHES // HAND-PRESSED LAYERS
              </p>
            </div>
            
            <div className="lg:col-span-7 aspect-[21/9] bg-secondary rounded-3xl overflow-hidden border border-border/30 shadow-sm">
              <img src="/runway/bts-05.avif" alt="Tailors fitting coat" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1200ms]" />
            </div>
          </div>

          {/* Materials Ledger Grid */}
          <div className="space-y-8 border-t border-border/20 pt-16">
            <div className="space-y-2 text-left">
              <span className="text-[9px] font-mono tracking-widest text-primary font-black uppercase flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                <span>FIBER SPECIFICATIONS</span>
              </span>
              <h3 className="text-2xl font-serif font-black uppercase text-foreground">The Materials Ledger</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {materials.map((mat) => (
                <div 
                  key={mat.name}
                  onMouseEnter={handleInteract}
                  className="p-6 border border-border/40 bg-card/25 rounded-2xl flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors"
                >
                  <div className="space-y-2 text-left">
                    <span className="text-[8px] font-mono text-primary font-bold uppercase tracking-wider">{mat.source} // {mat.threadCount}</span>
                    <h4 className="text-sm font-bold uppercase text-foreground">{mat.name}</h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed font-serif">
                      {mat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tailoring Steps Progress */}
          <div className="space-y-8 border-t border-border/20 pt-16">
            <div className="space-y-2 text-left">
              <span className="text-[9px] font-mono tracking-widest text-primary font-black uppercase">THE WORKSHOP PROCESS</span>
              <h3 className="text-2xl font-serif font-black uppercase text-foreground">Atelier Execution Steps</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tailoringSteps.map((step) => (
                <div key={step.step} className="p-6 border border-border/40 bg-card/20 rounded-xl space-y-4 text-left">
                  <div className="text-2xl font-mono font-black text-primary leading-none">{step.step}</div>
                  <h4 className="text-sm font-bold uppercase text-foreground tracking-wide">{step.title}</h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed font-serif">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Studio Statistics */}
          <div className="p-8 border border-border/40 bg-card/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="max-w-xl space-y-2">
              <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                <CheckCircle2 className="h-4.5 w-4.5" />
                <span>ATELIER VERIFIED SPECS</span>
              </div>
              <h4 className="text-lg font-bold uppercase tracking-wide">Studio Quality Index</h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Every coat undergoes 4 fitting calibration phases and requires over 48 artisan hours to complete, ensuring all structural boundaries are hand-pressed to outline guidelines.
              </p>
            </div>
          </div>

        </div>
      </section>

      <StyleOracle />
      <Footer />
    </main>
  )
}
