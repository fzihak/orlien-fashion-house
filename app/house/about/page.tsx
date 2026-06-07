'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { ArrowLeft, BookOpen, Landmark } from 'lucide-react'
import Link from 'next/link'

export default function HouseAboutPage() {
  const { soundEnabled } = useAppState()

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const milestones = [
    {
      year: '2024',
      title: 'The Brutalist Foundation',
      location: 'New York Atelier',
      desc: 'ORLIEN was established inside a landmark 1974 Brutalist concrete warehouse. The raw materials and structural honesty of the architecture directly inspired our initial canvas collections, highlighting exposed seam bindings and modular double belts.'
    },
    {
      year: '2025',
      title: 'Biomechanical Integration',
      location: 'Design Laboratory',
      desc: 'Our studio integrated infrared posture sensors and acceleration mapping to analyze fabric drape behaviors under biological motion. Standard silhouettes were split into dynamic canvas layers, redefining how luxury formalwear adapts to movement.'
    },
    {
      year: '2026',
      title: 'The Zero-Waste Pattern Code',
      location: 'Global Distribution',
      desc: 'We successfully implemented custom cutting algorithms that puzzle garment patterns tightly together, dropping scrap waste margins to a record 2.8%. Residual fabrics are gathered and re-spun into insulated technical layers.'
    }
  ]

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      {/* Main Container */}
      <section className="relative w-full py-16 md:py-24 border-b border-border/40 text-left">
        <div className="mx-auto max-w-6xl px-6 md:px-8 space-y-20">
          
          {/* Breadcrumb Back Link */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-mono border-b border-border/30 pb-4">
            <Link href="/house" onClick={handleInteract} className="hover:text-primary flex items-center gap-1 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to House</span>
            </Link>
            <span>/</span>
            <span>About ORLIEN</span>
          </div>

          {/* Large Editorial Title & Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-[9px] uppercase tracking-widest font-black">
                <Landmark className="h-3.5 w-3.5 text-primary" />
                <span>FOUNDING MEMORANDUM</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading uppercase tracking-tight leading-none text-foreground">
                About The House
              </h1>
              
              <p className="text-xs font-mono text-primary uppercase tracking-widest font-bold">
                ESTABLISHED NEW YORK // ATELIER REF ORL
              </p>
            </div>
            
            <div className="lg:col-span-7 aspect-[21/9] bg-secondary rounded-3xl overflow-hidden border border-border/30 shadow-sm">
              <img src="/runway/bts-10.avif" alt="Founding loom workshop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1200ms]" />
            </div>
          </div>

          {/* Immersive Biography Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-border/20 pt-16">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase font-bold flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                <span>ATELIER ARCHIVES</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold uppercase text-foreground leading-tight">
                Brutalist Roots & Material Honesty
              </h3>
            </div>
            
            {/* Long Text Columns */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 font-serif text-sm leading-relaxed text-muted-foreground">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:font-black first-letter:text-primary font-light">
                In the universe of haute couture, form has frequently been forced into rigid constraints. Standard pattern structures dictate how a garment hangs, forcing the human physique to conform to static forms. The design offices of ORLIEN sought to establish a new vocabulary.
              </p>
              <p className="font-light">
                Our creation space—a raw concrete warehouse—instilled a respect for material honesty. We choose not to hide the construction process under superficial coatings. Seams are exposed, linings are structural, and fasteners serve as deliberate visual statements.
              </p>
            </div>
          </div>

          {/* Interactive Multi-Phase Brand Timeline */}
          <div className="space-y-8 border-t border-border/20 pt-16">
            <div className="text-left space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-muted-foreground font-black uppercase">CHRONOLOGICAL HISTORY</span>
              <h3 className="text-2xl font-serif font-black uppercase text-foreground">Innovative Milestones</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-[1.5px] before:bg-border/40">
              {milestones.map((mil) => (
                <div 
                  key={mil.year}
                  onMouseEnter={handleInteract}
                  className="flex gap-6 relative pl-10 md:pl-12 group animate-fade-in"
                >
                  {/* Visual Node Dot */}
                  <div className="absolute left-2.5 top-1.5 h-3.5 w-3.5 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-all duration-300 z-10 shrink-0" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
                    {/* Year & title */}
                    <div className="md:col-span-4 text-left">
                      <div className="text-2xl font-mono font-black text-primary leading-none">{mil.year}</div>
                      <h4 className="text-sm font-bold uppercase text-foreground tracking-wide mt-1.5">{mil.title}</h4>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">{mil.location}</p>
                    </div>
                    {/* Desc */}
                    <div className="md:col-span-8 text-left text-muted-foreground font-serif font-light leading-relaxed text-xs">
                      {mil.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Museum Quote Banner */}
          <div className="border-t border-border/20 pt-16 text-center max-w-3xl mx-auto relative overflow-hidden">
            <span className="text-[9px] font-mono tracking-[0.2em] text-primary uppercase font-black">MISSION STATEMENT</span>
            <blockquote className="text-2xl font-light italic text-foreground leading-relaxed mt-4 font-serif">
              "We do not design garments for temporary seasons. We establish frameworks that survive aesthetic trends and physical wear, ensuring every pattern represents an archive block."
            </blockquote>
            <cite className="text-xs font-mono tracking-widest block uppercase mt-4 text-muted-foreground">— ORLIEN Design Council</cite>
          </div>

        </div>
      </section>

      <StyleOracle />
      <Footer />
    </main>
  )
}
