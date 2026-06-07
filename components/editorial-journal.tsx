'use client'

import { Sparkles, ArrowRight } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import Link from 'next/link'

export default function EditorialJournal() {
  const { soundEnabled } = useAppState()

  const articles = [
    {
      id: 'insight',
      category: 'Style Insights',
      title: 'The Grammar of Posture and Drapery',
      desc: 'An exploration into how raw twill and cotton canvas adapt and wrap around anatomical movement paths.',
      image: '/runway/look-12.avif',
      date: 'June 05, 2026',
      readTime: '4 Min Read'
    },
    {
      id: 'story',
      category: 'Fashion Stories',
      title: 'Milano to Paris: The Studio Logs',
      desc: 'Following the design office team as they draft, drape, and reconstruct classical waistcoats and heavy overcoats.',
      image: '/runway/bts-04.avif',
      date: 'May 28, 2026',
      readTime: '6 Min Read'
    },
    {
      id: 'perspective',
      category: 'Designer Perspectives',
      title: 'Refining Form: Beyond Transient Seasons',
      desc: 'Our Creative Director outlines the vision for design permanence, focusing on structural blueprints and ethical fabrics.',
      image: '/runway/bts-14.avif',
      date: 'May 15, 2026',
      readTime: '5 Min Read'
    }
  ]

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  return (
    <section className="bg-[#050505] px-6 py-24 md:px-8 border-b border-border/25 relative overflow-hidden">
      
      {/* Visual background nodes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/2 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="mb-20 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">09 // THE JOURNAL</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-tight leading-none">
            EDITORIAL JOURNAL
          </h2>
          <p className="text-sm text-gray-400 mt-3 max-w-xl font-light">
            Step into the editorial world of ORLIEN. Read curated essays, studio perspectives, and details on contemporary style drapes.
          </p>
        </div>

        {/* 3-Column Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <Link
              href="/editorial"
              key={art.id}
              onMouseEnter={handleInteract}
              onClick={() => { if (soundEnabled) sounds.playClick() }}
              className="group cursor-pointer flex flex-col justify-between border border-white/5 bg-card/20 rounded-[2rem] p-4 hover:border-primary/45 transition-all duration-300 glass-panel"
            >
              {/* Image box */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-secondary border border-white/5 mb-6">
                <img 
                  src={art.image} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/10" />
                
                {/* Floating category tag */}
                <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-full border border-white/5 text-[8px] font-mono tracking-widest uppercase text-white/90">
                  {art.category}
                </div>
              </div>

              {/* Text metadata */}
              <div className="text-left space-y-4 px-2 pb-2">
                <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                  <span>{art.date}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-xl font-black font-heading uppercase text-white tracking-wide leading-tight group-hover:text-primary transition-colors">
                  {art.title}
                </h3>
                
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {art.desc}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary group-hover:text-accent transition-colors pt-4 border-t border-white/5">
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
