'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Sparkles, MoveRight, Eye } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import Link from 'next/link'
import Product3DCarousel from '@/components/product-3d-carousel'

interface RunwayLook {
  id: number
  lookNum: string
  act: string
  image: string
  modelStats: string
  fabric: string
  description: string
}

export default function RunwayShow() {
  const { soundEnabled } = useAppState()
  const [activeIndex, setActiveIndex] = useState(0)

  const runwayLooks: RunwayLook[] = [
    {
      id: 1,
      lookNum: 'LOOK 01',
      act: 'ACT I: HEAVY STRUCTURE',
      image: '/runway/look-01.avif',
      modelStats: 'Model is 180cm • Wearing Size S',
      fabric: 'Double-Face Twill Wool',
      description: 'An exploration into brutalist drapery. Heavy twill wraps asymmetric curves, finished with raw seam lines and a modular double buckle belt.'
    },
    {
      id: 2,
      lookNum: 'LOOK 02',
      act: 'ACT I: CONCRETE ATELIER',
      image: '/runway/look-02.avif',
      modelStats: 'Model is 178cm • Wearing Size XS',
      fabric: 'Washed Tech Canvas',
      description: 'Utility meets high-fashion volume. Constructed from washed tech canvas featuring structured shoulder caps and oversized pocket shields.'
    },
    {
      id: 3,
      lookNum: 'LOOK 03',
      act: 'ACT II: LINEAR FLOW',
      image: '/runway/look-03.avif',
      modelStats: 'Model is 188cm • Wearing Size M',
      fabric: 'Crushed Cowhide Leather',
      description: 'Crushed textured cowhide bomber tailored with deep elastic rib drapes that adjust form dynamically during forward posture.'
    },
    {
      id: 4,
      lookNum: 'LOOK 04',
      act: 'ACT II: RAW ESSENTIALS',
      image: '/runway/look-04.avif',
      modelStats: 'Model is 179cm • Wearing Size S',
      fabric: 'Liquid Crepe Silk',
      description: 'Weighted crepe-back satin bias panels configured to flow gracefully under biological motion paths.'
    }
  ]

  const handleNext = () => {
    if (soundEnabled) sounds.playSweep()
    setActiveIndex((prev) => (prev + 1) % runwayLooks.length)
  }

  const handlePrev = () => {
    if (soundEnabled) sounds.playSweep()
    setActiveIndex((prev) => (prev - 1 + runwayLooks.length) % runwayLooks.length)
  }

  const activeLook = runwayLooks[activeIndex]
  const runwayImages = runwayLooks.map((look) => look.image)

  return (
    <div className="bg-black px-6 py-28 md:px-8 border-b border-border/25 transition-colors duration-500 relative overflow-hidden">
      {/* Visual background nodes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/2 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-primary/5 text-primary mb-4 animate-pulse">
              <Sparkles className="h-3 w-3" />
              <span className="text-[9px] uppercase tracking-widest font-black font-mono">RUNWAY IN MOTION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-tight">
              SS26 RUNWAY SHOWCASE
            </h2>
            <p className="text-sm text-gray-400 mt-3 max-w-xl font-light">
              A chronological review of Act I and Act II silhouettes captured live. Deconstructed tailoring configured to flow gracefully under biological motion paths.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="h-12 w-12 border border-white/10 hover:border-primary/50 hover:bg-white/5 rounded-full flex items-center justify-center text-white transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 border border-white/10 hover:border-primary/50 hover:bg-white/5 rounded-full flex items-center justify-center text-white transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[9px] font-mono tracking-widest text-primary font-black uppercase border-b border-primary/25 pb-1">
              {activeLook.act}
            </span>
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight font-heading">
              {activeLook.lookNum}
            </h3>
            <p className="text-base text-gray-300 font-light leading-relaxed max-w-xl font-serif italic">
              "{activeLook.description}"
            </p>

            <div className="grid gap-6 sm:grid-cols-2 pt-4 border-t border-white/5">
              <div className="border-l border-primary pl-4 py-1">
                <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-mono mb-1">Fabric Composition</p>
                <p className="text-xs font-semibold text-white tracking-wide uppercase">{activeLook.fabric}</p>
              </div>
              <div className="border-l border-primary pl-4 py-1">
                <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-mono mb-1">Model Record</p>
                <p className="text-xs font-semibold text-white tracking-wide uppercase">{activeLook.modelStats}</p>
              </div>
            </div>

            <Link
              href="/lookbook"
              onClick={() => { if (soundEnabled) sounds.playChord() }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors pt-6 group"
            >
              <span>Explore Full Runway Show</span>
              <MoveRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-card/30 shadow-2xl overflow-hidden">
              <Product3DCarousel images={runwayImages} activeIndex={activeIndex} onChangeIndex={setActiveIndex} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {runwayLooks.map((look) => (
                <button
                  key={look.id}
                  onClick={() => {
                    setActiveIndex(look.id - 1)
                    if (soundEnabled) sounds.playClick()
                  }}
                  className={`group overflow-hidden rounded-2xl border transition-all cursor-pointer relative ${
                    activeLook.id === look.id ? 'shadow-2xl border-primary' : 'border-white/5 hover:border-primary/45'
                  }`}
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-background">
                    <img src={look.image} alt={look.lookNum} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 flex flex-col justify-end text-left">
                    <p className="text-[8px] font-mono tracking-widest text-primary font-bold uppercase">{look.act.split(':')[0]}</p>
                    <p className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">{look.lookNum}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
