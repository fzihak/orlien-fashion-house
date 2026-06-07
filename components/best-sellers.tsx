'use client'

import { useState } from 'react'
import { Star, ShoppingCart, Heart, Sparkles, Check } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

interface BestSellerProduct {
  id: number
  name: string
  price: string
  rating: number
  image: string
  swatches: { name: string; hex: string }[]
  sizes: string[]
}

export default function BestSellers() {
  const { soundEnabled, addToCart, wishlist, toggleWishlist } = useAppState()
  
  // Local state for tracking options per product
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>({
    1: 'Obsidian Black',
    2: 'Cream White',
    3: 'Pure Obsidian',
    4: 'Obsidian Gold'
  })
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({
    1: 'M',
    2: 'M',
    3: '32',
    4: '10'
  })
  const [addedItemMap, setAddedItemMap] = useState<Record<number, boolean>>({})

  const products: BestSellerProduct[] = [
    { 
      id: 1, 
      name: 'Leather Jacket', 
      price: '$149', 
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=600&fit=crop',
      swatches: [
        { name: 'Obsidian Black', hex: '#111111' },
        { name: 'Brushed Whiskey', hex: '#8b5a2b' },
        { name: 'Chrome Silver', hex: '#b0c4de' }
      ],
      sizes: ['S', 'M', 'L', 'XL']
    },
    { 
      id: 2, 
      name: 'Fine Knit T-Shirt', 
      price: '$49', 
      rating: 4.9, 
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
      swatches: [
        { name: 'Cream White', hex: '#fdf5e6' },
        { name: 'Faded Onyx', hex: '#2f4f4f' },
        { name: 'Soft Olive', hex: '#556b2f' }
      ],
      sizes: ['XS', 'S', 'M', 'L']
    },
    { 
      id: 3, 
      name: 'Straight Denim Trouser', 
      price: '$89', 
      rating: 4.7, 
      image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=600&fit=crop',
      swatches: [
        { name: 'Pure Obsidian', hex: '#0a0a0d' },
        { name: 'Wash Indigo', hex: '#4682b4' },
        { name: 'Raw Grey', hex: '#708090' }
      ],
      sizes: ['30', '32', '34', '36']
    },
    { 
      id: 4, 
      name: 'Sneakers Pro', 
      price: '$129', 
      rating: 4.9, 
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
      swatches: [
        { name: 'Obsidian Gold', hex: '#d4af37' },
        { name: 'Neon Acid', hex: '#adff2f' },
        { name: 'Ivory Tan', hex: '#d2b48c' }
      ],
      sizes: ['8', '9', '10', '11']
    },
  ]

  const handleSwatchSelect = (productId: number, colorName: string) => {
    if (soundEnabled) sounds.playClick()
    setSelectedColors(prev => ({ ...prev, [productId]: colorName }))
  }

  const handleSizeSelect = (productId: number, size: string) => {
    if (soundEnabled) sounds.playClick()
    setSelectedSizes(prev => ({ ...prev, [productId]: size }))
  }

  const handleAddProduct = (prod: BestSellerProduct) => {
    const size = selectedSizes[prod.id]
    const color = selectedColors[prod.id]

    addToCart({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      size,
      color
    })

    setAddedItemMap(prev => ({ ...prev, [prod.id]: true }))
    setTimeout(() => {
      setAddedItemMap(prev => ({ ...prev, [prod.id]: false }))
    }, 2000)
  }

  return (
    <div className="bg-secondary/20 px-6 py-20 md:px-8 border-b border-border/30 transition-colors duration-500">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
              <Sparkles className="h-3 w-3" />
              <span className="text-[9px] uppercase tracking-widest font-black">CURATED HITS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Best Sellers
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl font-light">
              Explore structural garments that defined the season. Customize options directly from the cards.
            </p>
          </div>
          
          <a
            href="#collections"
            className="hidden md:block px-6 py-3 border border-border/80 hover:bg-secondary rounded-full font-bold text-xs uppercase tracking-widest text-foreground transition-colors"
          >
            View Full Catalog
          </a>
        </div>

        {/* 4-Column Asymmetric layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isWished = wishlist.includes(product.id)
            const activeColor = selectedColors[product.id]
            const activeSize = selectedSizes[product.id]
            const isAdded = addedItemMap[product.id]

            return (
              <div 
                key={product.id} 
                className="group relative bg-card/40 border border-border/60 hover:border-primary/50 transition-all duration-300 rounded-3xl p-4 flex flex-col justify-between glass-panel"
              >
                {/* Image & Overlay Frame */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-background mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top Buttons (Wishlist) */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black text-white hover:text-primary transition-all z-10"
                  >
                    <Heart className={`h-3 w-3 ${isWished ? 'fill-primary text-primary' : ''}`} />
                  </button>

                  {/* Slide-Up Sizing Tray on Hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/85 backdrop-blur-md p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-white/10 flex flex-col gap-2">
                    <span className="text-[8px] uppercase tracking-widest font-black text-primary">SELECT SIZE</span>
                    <div className="flex gap-1.5 justify-center">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSizeSelect(product.id, sz)}
                          className={`h-7 min-w-7 px-1 rounded text-[9px] font-bold border transition-all ${
                            activeSize === sz
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'border-white/20 text-white/80 hover:border-white hover:text-white'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Swatches block */}
                <div className="flex items-center gap-1.5 mb-3">
                  {product.swatches.map((sw) => (
                    <button
                      key={sw.name}
                      onClick={() => handleSwatchSelect(product.id, sw.name)}
                      className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-all ${
                        activeColor === sw.name ? 'border-primary scale-110' : 'border-border/60 hover:scale-105'
                      }`}
                      title={sw.name}
                    >
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: sw.hex }} />
                    </button>
                  ))}
                  <span className="text-[9px] text-muted-foreground ml-auto truncate uppercase tracking-wider max-w-[120px]">
                    {activeColor.split(' ')[0]}
                  </span>
                </div>

                {/* Header Information */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground text-sm truncate">{product.name}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="text-xs font-bold text-foreground">{product.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">
                    Active Size: {activeSize}
                  </p>
                </div>

                {/* Lower Action Row */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
                  <span className="text-base font-black text-primary">{product.price}</span>
                  
                  <button 
                    onClick={() => handleAddProduct(product)}
                    className={`px-4 py-2 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all flex items-center gap-1.5 ${
                      isAdded 
                        ? 'bg-green-500 text-white' 
                        : 'bg-primary text-primary-foreground hover:bg-accent'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-3 w-3" />
                        <span>Buy +</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )
          })}
        </div>

        {/* Mobile sizing catalog link */}
        <div className="mt-12 md:hidden flex justify-center">
          <a 
            href="#collections"
            className="px-6 py-3 border border-border text-foreground hover:bg-secondary rounded-full font-bold text-xs uppercase tracking-widest text-center w-full"
          >
            Explore Full Catalog
          </a>
        </div>

      </div>
    </div>
  )
}
