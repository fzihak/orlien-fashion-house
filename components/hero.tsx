'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

const slides = [
  {
    image: '/runway/hero-banner.avif',
    mobileImage: '/runway/hero-banner-mobile.avif',
    season: 'ORLIEN — Timeless Fashion. Modern Elegance.',
    title: 'TIMELESS FASHION',
    desc: 'Handcrafted garments engineered beyond transient trends. Step into the future of luxury style with modern visual silhouettes and tailored heritage.',
    link: '/shop',
    actionText: 'Explore Collection'
  },
  {
    image: '/runway/hero-banner-2.avif',
    mobileImage: '/runway/hero-banner-2-mobile.avif',
    season: 'ORLIEN — Crafted Beyond Trends.',
    title: 'MODERN ELEGANCE',
    desc: 'Meticulously curated designs balancing classical lines with sophisticated silhouettes. Experience tailored organic wool and liquid silk drapes.',
    link: '/shop',
    actionText: 'Review Catalog'
  }
]

export default function Hero() {
  const { soundEnabled } = useAppState()
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const playClickSound = () => {
    if (soundEnabled) sounds.playClick()
  }

  const playTransitionSound = () => {
    if (soundEnabled) sounds.playSweep()
  }

  const handleNext = () => {
    if (isTransitioning) return
    playTransitionSound()
    setIsTransitioning(true)
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    playTransitionSound()
    setIsTransitioning(true)
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleDotSelect = (index: number) => {
    if (index === current || isTransitioning) return
    playClickSound()
    setIsTransitioning(true)
    setCurrent(index)
  }

  // Handle slide transitions timing
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning])

  // Setup auto-rotate interval
  useEffect(() => {
    timerRef.current = setInterval(() => {
      // Auto transition
      setIsTransitioning(true)
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 8000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [current])

  const slide = slides[current]

  return (
    <section className="relative w-full min-h-[92vh] md:min-h-screen bg-black overflow-hidden flex items-center justify-center border-b border-border/25 select-none">
      
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        {slides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-70 scale-100' : 'opacity-0 scale-[1.03]'
            } transition-transform duration-[8000ms]`}
          >
            {/* Picture element for responsive image loading */}
            <picture>
              <source media="(max-width: 768px)" srcSet={s.mobileImage} />
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover object-center"
              />
            </picture>
            {/* Elegant high-end gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
          </div>
        ))}
      </div>

      {/* Interactive Visual Overlay Grid Lines */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.05] border-x border-dashed border-white/20 mx-auto max-w-7xl hidden lg:grid grid-cols-4 items-stretch">
        <div className="border-r border-dashed border-white/20" />
        <div className="border-r border-dashed border-white/20" />
        <div className="border-r border-dashed border-white/20" />
        <div className="border-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 z-20 flex flex-col justify-end py-16 md:py-24 min-h-[92vh] md:min-h-screen relative">
        
        {/* Floating coordinates for tech-luxury details */}
        <div className="absolute top-12 left-8 text-[8px] font-mono tracking-[0.3em] text-white/40 hidden md:block">
          SYS_CORD // 40.7128° N, 74.0060° W <br/>
          ATELIER_GRID_V1.2
        </div>
        
        <div className="absolute top-12 right-8 text-[8px] font-mono tracking-[0.3em] text-white/40 hidden md:block text-right">
          MODEL_REF // DECON_BLOCK <br/>
          SERIES_DROP_SS26
        </div>

        {/* Content Box */}
        <div className="max-w-2xl space-y-6 md:space-y-8 text-left mt-auto">
          
          {/* Season Tag */}
          <div 
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary transition-all duration-700 max-w-full flex-wrap justify-center ${
              isTransitioning ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <Sparkles className="h-3 w-3 animate-pulse text-primary shrink-0" />
            <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.12em] sm:tracking-[0.25em] font-black font-mono text-center">
              {slide.season}
            </span>
          </div>

          {/* Title */}
          <h1 
            className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white font-heading leading-[1.05] transition-all duration-700 delay-100 uppercase ${
              isTransitioning ? 'opacity-0 translate-y-6 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            {slide.title}
          </h1>

          {/* Description */}
          <p 
            className={`text-sm md:text-base text-gray-300 leading-relaxed font-light font-sans max-w-xl transition-all duration-700 delay-200 ${
              isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
            }`}
          >
            {slide.desc}
          </p>

          {/* Buttons and Actions */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-4 transition-all duration-700 delay-300 ${
              isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
            }`}
          >
            <Link
              href={slide.link}
              onClick={playClickSound}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-[0.2em] text-xs hover:bg-accent hover:scale-[1.02] active:scale-95 transition-all duration-300 rounded-full shadow-lg shadow-primary/10"
            >
              {slide.actionText}
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link
              href="/lookbook"
              onClick={playClickSound}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 hover:border-white/50 text-white hover:bg-white/5 font-bold uppercase tracking-[0.2em] text-xs transition-all active:scale-95 text-center min-w-[160px]"
            >
              View Lookbook
            </Link>
          </div>

        </div>

        {/* Lower Carousel Navigation HUD */}
        <div className="flex flex-row items-center justify-between border-t border-white/10 pt-8 mt-12 md:mt-20">
          
          {/* Slide Indicator Numbers */}
          <div className="text-xs font-mono text-white/55 tracking-widest flex items-center gap-2">
            <span className="font-bold text-primary">0{current + 1}</span>
            <span className="text-white/20">/</span>
            <span className="opacity-40">0{slides.length}</span>
          </div>

          {/* Slide dots switcher */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotSelect(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === current ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/45'
                }`}
                title={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next/Prev Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              className="h-10 w-10 rounded-full border border-white/10 hover:border-white/40 hover:bg-white/5 flex items-center justify-center text-white transition-all active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
              title="Previous Slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="h-10 w-10 rounded-full border border-white/10 hover:border-white/40 hover:bg-white/5 flex items-center justify-center text-white transition-all active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
              title="Next Slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Continuous active bottom time-elapsed progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-[8000ms] ease-linear z-30" style={{ width: isTransitioning ? '0%' : '100%' }} />

    </section>
  )
}
