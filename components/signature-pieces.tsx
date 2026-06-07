'use client'

import { Sparkles, ArrowRight, Heart } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import Link from 'next/link'

export default function SignaturePieces() {
  const { soundEnabled, addToCart, wishlist, toggleWishlist } = useAppState()

  const signatureItems = [
    {
      id: 5,
      name: 'Deconstructed Twill Trench',
      price: '$290',
      image: '/runway/look-01.avif',
      story: 'An exploration into raw asymmetry and structural drapery. We tailored classical protective outerwear block structures, removing excess back weights and adding modular side closures to form dynamic shapes.',
      material: '80% Organic Melton Wool, 20% GRS Recycled Polyamide. Hand-combed fibers sourced from heritage Biella mills.',
      inspiration: 'The brutalist concrete stairwells and vertical shadows of mid-century metropolitan staging grounds.',
      swatch: 'Cream Tan / Slate Grey'
    },
    {
      id: 6,
      name: 'Brutalist Leather Aviator',
      price: '$220',
      image: '/runway/look-03.avif',
      story: 'Utility outerwear engineered with double-layered panels. Structured shoulder blades and broad neck guards drape elegantly, featuring hand-distressed edges and double zip compartments.',
      material: '100% Drum-Dyed Cowhide Leather, GRS Recycled Cotton rib lining. Sourced from sustainable gold-rated tanneries.',
      inspiration: 'Retro flight silhouettes merged with cybernetic utility shapes and functional posture contours.',
      swatch: 'Onyx Black / Whiskey Brown'
    }
  ]

  const handleInstantBuy = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      color: item.swatch.split('/')[0].trim(),
      size: 'M'
    })
    if (soundEnabled) sounds.playSuccess()
  }

  const handleWishlist = (id: number) => {
    toggleWishlist(id)
    if (soundEnabled) sounds.playClick()
  }

  return (
    <section className="bg-[#050505] px-6 py-24 md:px-8 border-b border-border/25 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-primary/2 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Title Block */}
        <div className="mb-24 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3 animate-pulse text-primary" />
            <span className="text-[9px] uppercase tracking-widest font-black font-mono">05 // THE SIGNATURES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-tight leading-none">
            Signature Pieces
          </h2>
          <p className="text-sm text-gray-400 mt-3 max-w-xl font-light">
            A meticulous showcase of the house’s defining silhouettes. Inspect the story, composition, and blueprints behind each garment.
          </p>
        </div>

        {/* Alternate Showcase Layout */}
        <div className="space-y-32">
          {signatureItems.map((item, index) => {
            const isLeft = index % 2 === 0
            const isWished = wishlist.includes(item.id)

            return (
              <div 
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                
                {/* Image Block */}
                <div 
                  className={`lg:col-span-6 relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-secondary/15 group aspect-[4/5] ${
                    isLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  
                  {/* Floating Action Badge */}
                  <button
                    onClick={() => handleWishlist(item.id)}
                    className="absolute top-6 right-6 p-3 rounded-full bg-black/60 hover:bg-black text-white hover:text-primary transition-all active:scale-90 z-20 cursor-pointer"
                    title={isWished ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`h-4.5 w-4.5 ${isWished ? 'fill-primary text-primary scale-110' : 'text-white'}`} />
                  </button>
                  
                  <div className="absolute bottom-6 left-6 text-white text-[10px] font-mono tracking-widest bg-black/60 px-3 py-1 rounded-full border border-white/5 uppercase">
                    Ref // Look {String(item.id).padStart(2, '0')}
                  </div>
                </div>

                {/* Info Text Block */}
                <div 
                  className={`lg:col-span-6 text-left space-y-6 md:space-y-8 ${
                    isLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-primary font-bold uppercase">
                      LUXURY SIGNATURE DESIGN
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black font-heading text-white uppercase tracking-tight leading-none">
                      {item.name}
                    </h3>
                    <p className="text-xl font-black text-primary font-mono">{item.price}</p>
                  </div>

                  {/* Story Section */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 font-bold">The Narrative</h4>
                    <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed font-serif italic">
                      "{item.story}"
                    </p>
                  </div>

                  {/* Material Section */}
                  <div className="space-y-2 border-l-2 border-primary pl-4 py-1">
                    <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500 font-bold">Fabric Provenance</h4>
                    <p className="text-xs text-gray-400 font-light font-mono leading-relaxed">
                      {item.material}
                    </p>
                  </div>

                  {/* Inspiration Section */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 font-bold">Design Inspiration</h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed max-w-lg">
                      {item.inspiration}
                    </p>
                  </div>

                  {/* Swatches & Buy Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-4">
                    <button
                      onClick={() => handleInstantBuy(item)}
                      className="px-8 py-4 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest hover:bg-accent transition-all duration-300 rounded-full shadow-lg shadow-primary/10 cursor-pointer"
                    >
                      Acquire Piece
                    </button>
                    
                    <Link
                      href={`/shop`}
                      className="px-6 py-4 rounded-full border border-white/10 hover:border-white/40 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Specifications Detail
                    </Link>
                  </div>

                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
