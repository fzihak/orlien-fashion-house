'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Star, Quote, Sparkles } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

interface Review {
  id: number
  quote: string
  author: string
  title: string
  outlet: string
  rating: number
  image: string
}

export default function Testimonial() {
  const { soundEnabled } = useAppState()
  const [activeIdx, setActiveIdx] = useState(0)

  const reviews: Review[] = [
    {
      id: 1,
      quote: "ORLIEN's outerwear styles are incredibly fresh, bold, and structurally precise. The fabric holds form with a weight and finish that is rare in contemporary tech streetwear.",
      author: "Rafa H.",
      title: "Lead Apparel Designer",
      outlet: "HYPEBEAST Critique",
      rating: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop"
    },
    {
      id: 2,
      quote: "The comfort levels are staggering. Pairing raw linen and organic cotton inside a modular technical layout offers a wardrobe that transition seamlessly between executive meetings and long flights.",
      author: "Elena M.",
      title: "Editor-in-Chief",
      outlet: "VOGUE Editorial",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop"
    },
    {
      id: 3,
      quote: "An absolute masterclass in minimalist fashion geometry. The customizable color palettes and AI style customizer show a brand that is truly operating in the next generation of apparel.",
      author: "Julian K.",
      title: "Menswear Stylist",
      outlet: "GQ Style Guide",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"
    }
  ]

  const handleNext = () => {
    if (soundEnabled) sounds.playSweep()
    setActiveIdx((prev) => (prev + 1) % reviews.length)
  }

  const handlePrev = () => {
    if (soundEnabled) sounds.playSweep()
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const activeReview = reviews[activeIdx]

  return (
    <div className="bg-background px-6 py-24 md:px-8 border-b border-border/30 transition-colors duration-500 relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="mb-16 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3" />
            <span className="text-[9px] uppercase tracking-widest font-black">EDITORIAL VOICES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            What Critiques Say
          </h2>
        </div>

        {/* Dynamic Slider Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Quote Card (7 Columns) */}
          <div className="lg:col-span-7 bg-card/40 border border-border/60 rounded-3xl p-8 glass-panel relative min-h-[380px] flex flex-col justify-between">
            <Quote className="absolute top-6 right-8 h-20 w-20 text-primary/5 stroke-1 pointer-events-none" />

            {/* Rating Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(activeReview.rating)].map((_, i) => (
                <Star key={i} className="h-4.5 w-4.5 fill-primary text-primary" />
              ))}
            </div>

            {/* Quote text */}
            <div className="animate-fade-in duration-500 flex-1">
              <p className="text-lg md:text-xl font-light text-foreground leading-relaxed italic">
                "{activeReview.quote}"
              </p>
            </div>

            {/* Author Block */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
              <div>
                <h4 className="text-base font-bold text-foreground">{activeReview.author}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activeReview.title} — <span className="text-primary font-bold">{activeReview.outlet}</span>
                </p>
              </div>

              {/* Slider Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="h-10 w-10 border border-border/80 hover:border-primary/50 hover:bg-secondary rounded-full flex items-center justify-center text-foreground transition-all active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-10 w-10 border border-border/80 hover:border-primary/50 hover:bg-secondary rounded-full flex items-center justify-center text-foreground transition-all active:scale-95"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Lifestyle Portrait (5 Columns) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-border bg-secondary/30 shadow-xl">
              <img
                src={activeReview.image}
                alt={activeReview.author}
                className="w-full h-full object-cover animate-fade-in duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Slider Progress Indicator */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-full text-white text-[10px]">
                <span className="font-mono">STYLE INFLUENCER #{activeReview.id}</span>
                <span className="font-bold text-primary">0{activeIdx + 1} / 0{reviews.length}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
