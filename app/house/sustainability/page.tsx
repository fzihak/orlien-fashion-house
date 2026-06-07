'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { ArrowLeft, Sparkles, RefreshCw, Eye, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function SustainabilityPage() {
  const { soundEnabled } = useAppState()

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const reports = [
    {
      title: '97.2% Pattern Yield Efficiency',
      metric: '2.8% SCRAPS',
      theme: 'Zero-Waste Algorithm',
      desc: 'By feeding pattern vectors to a nesting clustering algorithm, pieces are fitted tightly together. Scraps are minimized to 2.8%, compared to the standard 25% industrial average.'
    },
    {
      title: 'Aegean Cotton Organic Coop Contracts',
      metric: '100% GOTS CERTIFIED',
      theme: 'Supply Chain Transparency',
      desc: 'We secure direct trade agreements with farming collectives in Izmir, Turkey, ensuring fair salary margins and full tracing records back to individual soil grids.'
    },
    {
      title: 'Circular insulation conversion',
      metric: '100% RECYCLED Remnants',
      theme: 'Material Upcycling',
      desc: 'Remaining scrap residuals are gathered, shredded, and re-spun back into thick insulating blocks. This wool padding forms the warming base of our Tech Windbreakers.'
    }
  ]

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      <section className="relative w-full py-16 border-b border-border/40 text-left">
        <div className="mx-auto max-w-6xl px-6 md:px-8 space-y-20">
          
          {/* Breadcrumb Back Link */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-mono border-b border-border/30 pb-4">
            <Link href="/house" onClick={handleInteract} className="hover:text-primary flex items-center gap-1 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to House</span>
            </Link>
            <span>/</span>
            <span>Sustainability & Vision</span>
          </div>

          {/* Hero Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase font-black flex items-center gap-1.5 animate-pulse">
                <RefreshCw className="h-4 w-4" />
                <span>ECOLOGICAL AUDIT RESOLUTION</span>
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading uppercase tracking-tight leading-none text-foreground">
                Luxury With Responsibility
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed font-light font-serif">
                ORLIEN merges absolute luxury with responsibility. We choose organic certified fibers, establish direct fair contracts with cooperatives, and design out waste through mathematics.
              </p>
            </div>
            
            <div className="lg:col-span-7 aspect-[21/9] bg-secondary rounded-2xl overflow-hidden border border-border/30 shadow-sm">
              <img src="/runway/bts-06.avif" alt="Zero waste grid pattern cutting" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1200ms]" />
            </div>
          </div>

          {/* Detailed Reports Grid */}
          <div className="space-y-6 border-t border-border/20 pt-16">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-primary font-black">THE GREEN STATEMENT</span>
              <h3 className="text-xl font-bold uppercase tracking-wide mt-1">Sustainability Pillars</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reports.map((rep) => (
                <div 
                  key={rep.title} 
                  onMouseEnter={handleInteract}
                  className="p-6 border border-border/40 bg-card/25 rounded-2xl flex flex-col justify-between space-y-4 hover:border-primary/45 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[8px] font-mono text-primary font-bold uppercase tracking-widest">
                      <span>{rep.theme}</span>
                      <span className="bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{rep.metric}</span>
                    </div>
                    <h4 className="text-sm font-bold uppercase text-foreground">{rep.title}</h4>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed font-serif">
                      {rep.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GOTS / GRS Verification Stamp */}
          <div className="p-8 border border-border/40 bg-card/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="h-4.5 w-4.5" />
                <span>VERIFIED ECOLOGICAL LEDGERS</span>
              </div>
              <h4 className="text-lg font-bold uppercase tracking-wide">Supply Chain Authentication</h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                ORLIEN registers all materials GOTS (Global Organic Textile Standard) and GRS (Global Recycled Standard) certifications directly inside the digital catalog, ensuring full traceability bounds for the modern buyer.
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
