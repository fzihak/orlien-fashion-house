'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Scissors, Landmark, HelpCircle, Heart } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

export default function CraftsmanshipExperience() {
  const { soundEnabled } = useAppState()
  const [activeTab, setActiveTab] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)

  // Simple scroll animation observer setup
  useEffect(() => {
    setVisible(true)
  }, [])

  const handleTabClick = (idx: number) => {
    setActiveTab(idx)
    if (soundEnabled) sounds.playSweep()
  }

  const items = [
    {
      title: 'Handcrafted Precision',
      tag: '01 / Bespoke Draping',
      image: '/runway/bts-02.avif',
      story: 'Every single canvas and twill jacket undergoes manual shoulder structure drafting. Our master tailors trace contours directly from fabric grids, preserving organic warp tension.',
      details: ['Hand-drawn block drafts', 'Custom structural canvas inserts', 'Reinforced double-face stitching']
    },
    {
      title: 'Premium Fabrics',
      tag: '02 / Sourcing Provenance',
      image: '/runway/bts-06.avif',
      story: 'We source exclusively from certified heritage mills. In our wools, linens, and liquid silks, we prioritize fiber length and natural weights to ensure long-term drapery shape retention.',
      details: ['GOTS certified organic cotton', 'GRS recycled technical canvas', 'Pure Belgian combed flax linen']
    },
    {
      title: 'Attention To Detail',
      tag: '03 / Hardware & Seams',
      image: '/runway/bts-13.avif',
      story: 'The final layers define our designs. From heavy industrial buckles to hand-sewn pocket flaps, every component is rigorously tested against daily friction parameters.',
      details: ['Brushed silver metal buckles', 'Double-lock raw edge seams', 'Signature double-vent details']
    }
  ]

  return (
    <section className="bg-black text-white px-6 py-24 md:px-8 border-b border-border/25 relative overflow-hidden">
      
      {/* Structural Backdrop Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Title Block */}
        <div className="mb-20 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">07 // CRAFT IN FOCUS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-tight leading-none">
            CRAFTMANSHIP EXPERIENCE
          </h2>
          <p className="text-sm text-gray-400 mt-3 max-w-xl font-light">
            Luxury brands live in details. Inspect how raw fabrics, hand-tailored blocks, and metallic rivets are synthesized into modern elegance.
          </p>
        </div>

        {/* Dynamic Showcase Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Tabs Selector list (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4 text-left">
            {items.map((it, idx) => (
              <button
                key={it.title}
                onClick={() => handleTabClick(idx)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  activeTab === idx
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5'
                    : 'border-white/5 hover:border-white/20 bg-transparent'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[8px] font-mono tracking-widest text-primary font-bold block uppercase">{it.tag}</span>
                  <h3 className="text-lg font-black font-heading text-white uppercase tracking-wider">{it.title}</h3>
                </div>
              </button>
            ))}
          </div>

          {/* Active Canvas Panel (7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-card/25 border border-white/10 rounded-[2.5rem] p-6 md:p-8 glass-panel relative overflow-hidden min-h-[400px]">
            
            {/* Visual Image */}
            <div className="md:col-span-5 aspect-[3/4] rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl">
              <img
                src={items[activeTab].image}
                alt={items[activeTab].title}
                className="w-full h-full object-cover animate-fade-in"
                key={activeTab} // triggers re-render animation
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Visual Specs Description */}
            <div className="md:col-span-7 text-left space-y-6">
              <span className="text-[8px] font-mono tracking-widest text-primary font-bold uppercase border-b border-primary/25 pb-1">
                {items[activeTab].tag}
              </span>
              <h3 className="text-2xl font-black font-heading uppercase text-white tracking-wider leading-none">
                {items[activeTab].title}
              </h3>
              
              <p className="text-xs text-gray-300 font-light leading-relaxed font-serif italic">
                "{items[activeTab].story}"
              </p>

              {/* Bullet checklist points */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 font-bold">Standard specifications</h4>
                <ul className="space-y-1.5 text-xs text-gray-400 font-mono">
                  {items[activeTab].details.map((det) => (
                    <li key={det} className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span className="uppercase text-[10px] tracking-wide">{det}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
