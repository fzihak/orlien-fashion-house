'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { Heart, ShoppingBag, SlidersHorizontal, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: string
  category: 'outerwear' | 'top' | 'bottom' | 'acc'
  gender?: 'women' | 'men' | 'unisex'
  image: string
  hoverImage: string
  rating: number
  sizes: string[]
  swatches: { name: string; hex: string }[]
}

const products: Product[] = [
  { id: 5, name: 'Deconstructed Twill Trench', price: '$290', category: 'outerwear', gender: 'unisex', image: '/runway/look-01.avif', hoverImage: '/runway/look-12.avif', rating: 4.9, sizes: ['S', 'M', 'L'], swatches: [{ name: 'Cream Tan', hex: '#d2b48c' }] },
  { id: 6, name: 'Brutalist Leather Aviator', price: '$220', category: 'outerwear', gender: 'men', image: '/runway/look-03.avif', hoverImage: '/runway/look-11.avif', rating: 4.8, sizes: ['S', 'M', 'L', 'XL'], swatches: [{ name: 'Onyx Black', hex: '#1c1c1c' }] },
  { id: 2, name: 'Liquid Silk Shift Dress', price: '$145', category: 'top', gender: 'women', image: '/runway/look-04.avif', hoverImage: '/runway/look-14.avif', rating: 4.9, sizes: ['S', 'M', 'L'], swatches: [{ name: 'Off-White', hex: '#fcfaf2' }] },
  { id: 7, name: 'Structured Gabardine Trouser', price: '$110', category: 'bottom', gender: 'unisex', image: '/runway/look-05.avif', hoverImage: '/runway/look-10.avif', rating: 4.9, sizes: ['30', '32', '34'], swatches: [{ name: 'Taupe Clay', hex: '#8f8679' }] },
  { id: 8, name: 'Geometric Acetate Sunglasses', price: '$75', category: 'acc', gender: 'unisex', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop', hoverImage: '/runway/look-08.avif', rating: 4.9, sizes: ['OS'], swatches: [{ name: 'Polarized Black', hex: '#000000' }] }
]

export default function CategoryShop({ category }: { category: 'women' | 'men' | 'accessories' }) {
  const { soundEnabled, addToCart, wishlist, toggleWishlist } = useAppState()
  
  const [selectedSize, setSelectedSize] = useState('all')

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const catStr = category.toLowerCase()

  // Pre-filter catalog based on parameters
  const filtered = products.filter(p => {
    if (catStr === 'women') return p.gender === 'women' || p.gender === 'unisex'
    if (catStr === 'men') return p.gender === 'men' || p.gender === 'unisex'
    if (catStr === 'accessories') return p.category === 'acc'
    return true
  }).filter(p => selectedSize === 'all' || p.sizes.includes(selectedSize))

  const handleInstantAdd = (prod: any) => {
    addToCart({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      color: prod.swatches[0].name,
      size: 'M'
    })
    if (soundEnabled) sounds.playSuccess()
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      <section className="relative w-full py-16 border-b border-border/40 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-12">
          
          {/* Breadcrumb back */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-mono border-b border-border/30 pb-4">
            <Link href="/shop" onClick={handleInteract} className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Shop</span>
            </Link>
            <span>/</span>
            <span>{catStr.toUpperCase()} COLLECTION</span>
          </div>

          {/* Hero Banner */}
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase font-black">
              ORLIEN ATELIER DIVISION
            </span>
            <h1 className="text-4xl sm:text-5xl font-black font-heading uppercase tracking-tight leading-none">
              {catStr === 'accessories' ? 'Accessories' : `${catStr}'s Collection`}
            </h1>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider leading-relaxed">
              Curated tailoring cuts and patterns designed specifically for the {catStr} silhouette range.
            </p>
          </div>

          {/* Filtering row */}
          <div className="flex justify-between items-center border-y border-border/25 py-4 font-mono text-[11px]">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <span>FILTER SIZE /</span>
              <select 
                value={selectedSize}
                onChange={(e) => { handleInteract(); setSelectedSize(e.target.value) }}
                className="bg-transparent text-foreground font-bold focus:outline-none cursor-pointer border border-border/30 rounded px-2 py-0.5"
              >
                <option value="all" className="bg-card text-foreground">All</option>
                <option value="S" className="bg-card text-[#333]">S</option>
                <option value="M" className="bg-card text-[#333]">M</option>
                <option value="L" className="bg-card text-[#333]">L</option>
              </select>
            </div>
            
            <span>{filtered.length} DESIGN STRUCTURES</span>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(prod => {
              const isWished = wishlist.includes(prod.id)
              return (
                <div key={prod.id} className="group relative flex flex-col justify-between">
                  <Link href={`/shop/${prod.id}`} onClick={handleInteract} className="block">
                    <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-secondary border border-border/30 group-hover:border-foreground/35 transition-all relative">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          toggleWishlist(prod.id)
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black text-white hover:text-primary transition-all z-25"
                      >
                        <Heart className={`h-3.5 w-3.5 ${isWished ? 'fill-primary text-primary' : ''}`} />
                      </button>
                    </div>
                  </Link>

                  <div className="mt-4 flex justify-between items-end gap-3 text-left">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase text-foreground">{prod.name}</h4>
                      <p className="text-xs font-mono font-bold text-primary">{prod.price}</p>
                    </div>
                    <button
                      onClick={() => handleInstantAdd(prod)}
                      className="p-2.5 bg-primary text-primary-foreground hover:bg-accent rounded-full transition-all shrink-0 active:scale-95"
                      title="Quick Add to Bag"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      <StyleOracle />
      <Footer />
    </main>
  )
}
