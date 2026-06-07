'use client'

import { useState } from 'react'
import { Sparkles, Play, X, Camera, Film, ArrowRight } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import Link from 'next/link'

export default function FashionFilm() {
  const { soundEnabled } = useAppState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState<'bts' | 'journal'>('bts')

  const playClick = () => {
    if (soundEnabled) sounds.playClick()
  }

  const togglePlayer = () => {
    if (soundEnabled) sounds.playSweep()
    setIsPlaying(!isPlaying)
  }

  const btsItems = [
    { id: 'bts-01', image: '/runway/bts-01.avif', caption: 'Artisans adjusting raw hem drapes.' },
    { id: 'bts-02', image: '/runway/bts-04.avif', caption: 'Briefing look lists before entry.' },
    { id: 'bts-03', image: '/runway/bts-06.avif', caption: 'Fabric swatches in the design lab.' }
  ]

  const journalItems = [
    { id: 'look-12', image: '/runway/look-12.avif', caption: 'Double-faced twill wool trench detail.' },
    { id: 'look-04', image: '/runway/look-04.avif', caption: 'Crepe silk bias drapes under kinetic motion.' },
    { id: 'look-07', image: '/runway/look-07.avif', caption: 'Heavy gage linen column robe structures.' }
  ]

  const activeGrid = activeTab === 'bts' ? btsItems : journalItems

  return (
    <section className="bg-background px-6 py-24 md:px-8 border-b border-border/25 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Title Section */}
        <div className="mb-20 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">08 // THE CINEMA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-foreground uppercase tracking-tight leading-none">
            ORLIEN FASHION FILM
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl font-light">
            Experience the SS26 campaign collection through motion. Watch our editorial trailer and browse raw backstage feeds.
          </p>
        </div>

        {/* Netflix-style layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Fullscreen Campaign Trailer Video Preview Box (8 Columns) */}
          <div className="lg:col-span-8 group relative rounded-[2rem] border border-border/40 overflow-hidden bg-secondary/20 shadow-2xl flex items-center justify-center min-h-[360px] md:min-h-[460px]">
            <img 
              src="/runway/hero-banner-2.avif" 
              alt="Fashion Film Trailer Poster" 
              className="absolute inset-0 w-full h-full object-cover scale-[1.01] group-hover:scale-100 transition-transform duration-[1000ms] brightness-50"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />

            {/* Video Play HUD Controls */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center space-y-6 max-w-md px-6">
              <button 
                onClick={togglePlayer}
                className="h-20 w-20 rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:text-primary hover:border-primary hover:scale-105 active:scale-95 transition-all shadow-2xl cursor-pointer"
                title="Play Trailer Video"
              >
                <Play className="h-8 w-8 fill-current ml-1" />
              </button>
              <div>
                <span className="text-[8px] font-mono tracking-[0.3em] text-primary font-bold uppercase block mb-1">
                  OFFICIAL TRAILER // DIR_NOTE
                </span>
                <h3 className="text-2xl font-black font-heading uppercase text-white tracking-wider leading-none">
                  SS26 CAMPAIGN FILM
                </h3>
              </div>
            </div>

            {/* Float Bottom Badge */}
            <div className="absolute bottom-6 left-6 z-20 text-left text-white/50 text-[9px] font-mono tracking-widest uppercase hidden md:block">
              RUN_TIME // 02:45 MINS • HIGH CONTRAST FEED
            </div>
          </div>

          {/* Right: Backstage / Editorial photography feeds (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between border border-border/40 bg-card/25 rounded-[2rem] p-6 glass-panel text-left">
            
            {/* Feed Tabs Selector */}
            <div className="space-y-6">
              <div className="flex gap-2 p-1 bg-secondary/50 rounded-full border border-border/60">
                <button
                  onClick={() => { playClick(); setActiveTab('bts') }}
                  className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    activeTab === 'bts' 
                      ? 'bg-foreground text-background shadow-md' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1">
                    <Film className="h-3 w-3" />
                    <span>Backstage</span>
                  </span>
                </button>
                <button
                  onClick={() => { playClick(); setActiveTab('journal') }}
                  className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    activeTab === 'journal' 
                      ? 'bg-foreground text-background shadow-md' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1">
                    <Camera className="h-3 w-3" />
                    <span>Editorial</span>
                  </span>
                </button>
              </div>

              {/* Feed List Grid */}
              <div className="space-y-4">
                {activeGrid.map((it) => (
                  <div 
                    key={it.id} 
                    className="flex gap-4 items-center p-2 rounded-2xl bg-secondary/30 border border-border/40 hover:border-primary/30 transition-all group/feed"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-background shrink-0 border border-white/5">
                      <img src={it.image} alt={it.caption} className="w-full h-full object-cover group-hover/feed:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[8px] font-mono tracking-widest text-primary font-bold uppercase block mb-1">
                        REF // {it.id}
                      </span>
                      <p className="text-[10.5px] leading-relaxed text-muted-foreground truncate font-light">
                        {it.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom link */}
            <Link
              href="/lookbook"
              onClick={playClick}
              className="inline-flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors pt-6 border-t border-border/40 mt-6"
            >
              <span>Explore Campaign Journal</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

          </div>

        </div>

      </div>

      {/* Fullscreen Video Player Modal Overlay */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between items-center p-6 animate-fade-in">
          
          {/* Modal Header */}
          <div className="w-full max-w-7xl flex justify-between items-center border-b border-white/10 pb-4 text-white">
            <div className="text-left font-mono">
              <span className="text-xs text-primary font-bold tracking-[0.25em]">ORLIEN CAMPAIGN CINEMA</span>
              <div className="text-[10px] text-gray-400 mt-0.5">SPRING / SUMMER 2026 OFFICIAL TRAILER</div>
            </div>
            
            <button 
              onClick={togglePlayer}
              className="p-2.5 rounded-full hover:bg-white/10 text-white transition-all hover:scale-105 cursor-pointer"
              title="Close Player"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Core Video Player viewport */}
          <div className="flex-1 w-full max-w-5xl flex items-center justify-center py-6">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              {/* Loop Autoplay Youtube brandless embed video stream */}
              <iframe
                src="https://www.youtube.com/embed/oPtfQAFIk-4?autoplay=1&mute=0&loop=1&playlist=oPtfQAFIk-4&controls=1&showinfo=0&rel=0&modestbranding=1"
                title="ORLIEN SS26 Campaign Film"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-none"
              />
            </div>
          </div>

          {/* Modal Footer helper */}
          <div className="text-white/40 text-[9px] font-mono tracking-widest uppercase">
            ORLIEN DIGITAL SCREENING PLATFORM • MULTI-BASS SOUND
          </div>

        </div>
      )}

    </section>
  )
}
