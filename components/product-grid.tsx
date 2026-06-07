'use client'

import { useState } from 'react'
import { Heart, ShoppingBag, Eye, Sparkles, Star } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

interface Product {
  id: number
  name: string
  price: string
  category: 'cyber' | 'minimalist' | 'sartorial'
  image: string
  rating: number
  tag: string
}

export default function ProductGrid() {
  const { soundEnabled, addToCart, wishlist, toggleWishlist } = useAppState()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [addedProductId, setAddedProductId] = useState<number | null>(null)

  const products: Product[] = [
    {
      id: 5,
      name: 'Sartorial Trench Coat',
      price: '$290',
      category: 'sartorial',
      tag: 'Limited Edition',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop'
    },
    {
      id: 6,
      name: 'Cyber Bomber Jacket',
      price: '$180',
      category: 'cyber',
      tag: 'New Drop',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&h=600&fit=crop'
    },
    {
      id: 1,
      name: 'Leather Jacket',
      price: '$149',
      category: 'minimalist',
      tag: 'Best Seller',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=600&fit=crop'
    },
    {
      id: 7,
      name: 'Pleated Linen Trouser',
      price: '$110',
      category: 'sartorial',
      tag: 'Seasonal',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop'
    },
    {
      id: 3,
      name: 'Black Denim Jeans',
      price: '$89',
      category: 'minimalist',
      tag: 'Classic',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=600&fit=crop'
    },
    {
      id: 8,
      name: 'Geometric Sunglasses',
      price: '$75',
      category: 'cyber',
      tag: 'Accent Accessories',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=600&fit=crop'
    }
  ]

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  // React 3D perspective hover math
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xc = rect.width / 2
    const yc = rect.height / 2
    const dx = x - xc
    const dy = y - yc
    
    // Rotate max 8 degrees
    const rx = -(dy / yc) * 8
    const ry = (dx / xc) * 8
    
    card.style.setProperty('--rx', `${rx}deg`)
    card.style.setProperty('--ry', `${ry}deg`)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
  }

  const handleCategoryChange = (cat: string) => {
    if (soundEnabled) sounds.playClick()
    setActiveCategory(cat)
  }

  const handleAddToCart = (e: React.MouseEvent, prod: Product) => {
    e.stopPropagation()
    addToCart({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image
    })
    setAddedProductId(prod.id)
    setTimeout(() => {
      setAddedProductId(null)
    }, 2000)
  }

  return (
    <div id="collections" className="bg-background px-6 py-20 md:px-8 border-b border-border/30 transition-colors duration-500">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3" />
            <span className="text-[9px] uppercase tracking-widest font-black">CURATED SHOWCASE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Explore Curated Fits
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto font-light">
            Deconstructed geometric styles designed to adapt. Sort categories below to isolate distinct aesthetics.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { id: 'all', label: 'All Catalog' },
              { id: 'cyber', label: 'Cyber Avant-Garde' },
              { id: 'minimalist', label: 'Minimalist Essentials' },
              { id: 'sartorial', label: 'Sartorial Tailoring' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary border-primary text-primary-foreground shadow-md'
                    : 'border-border bg-transparent text-foreground hover:bg-secondary/60 hover:border-foreground/45'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-Style Asymmetrical Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
          {filteredProducts.map((prod) => {
            const isWished = wishlist.includes(prod.id)
            const isAdded = addedProductId === prod.id
            return (
              <div
                key={prod.id}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => {
                  setHoveredProduct(prod.id)
                  if (soundEnabled) sounds.playPop()
                }}
                className="perspective-card group relative bg-card/40 border border-border/60 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 glass-panel"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Product Image Panel */}
                <div 
                  className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-background mb-4"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-bold uppercase tracking-widest text-primary">
                    {prod.tag}
                  </div>

                  {/* Top Right Heart Wishlist Trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(prod.id)
                    }}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-primary transition-all active:scale-90"
                  >
                    <Heart className={`h-3.5 w-3.5 ${isWished ? 'fill-primary text-primary' : ''}`} />
                  </button>

                  {/* Dark overlay showing quick inspection icons on hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => handleAddToCart(e, prod)}
                      disabled={isAdded}
                      className="p-3.5 rounded-full bg-primary text-primary-foreground hover:bg-accent transition-all hover:scale-110 active:scale-95 shadow-lg flex items-center justify-center"
                      title="Quick Add to Bag"
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Info Block */}
                <div style={{ transform: 'translateZ(10px)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground">{prod.category} spectrum</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-[10px] font-bold text-foreground">{prod.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-foreground mt-2 truncate">{prod.name}</h3>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                    <span className="text-base font-black text-primary">{prod.price}</span>
                    
                    <button
                      onClick={(e) => handleAddToCart(e, prod)}
                      disabled={isAdded}
                      className={`px-4 py-2 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 ${
                        isAdded
                          ? 'bg-green-500 text-white border-green-500'
                          : 'border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary'
                      }`}
                    >
                      {isAdded ? (
                        <span>Added</span>
                      ) : (
                        <>
                          <ShoppingBag className="h-3 w-3" />
                          <span>Buy +</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
