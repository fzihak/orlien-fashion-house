'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function WishlistPage() {
  const { soundEnabled, wishlist, toggleWishlist, addToCart } = useAppState()

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const itemsLookup: Record<number, { name: string; price: string; image: string }> = {
    1: { name: 'Asymmetric Canvas Parka', price: '$180', image: '/runway/look-02.avif' },
    2: { name: 'Liquid Silk Shift Dress', price: '$145', image: '/runway/look-04.avif' },
    3: { name: 'Raw Edge Denim Trouser', price: '$95', image: '/runway/look-15.avif' },
    4: { name: 'Sneakers Pro Kinetic', price: '$129', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop' },
    5: { name: 'Deconstructed Twill Trench', price: '$290', image: '/runway/look-01.avif' },
    6: { name: 'Brutalist Leather Aviator', price: '$220', image: '/runway/look-03.avif' },
    7: { name: 'Structured Gabardine Trouser', price: '$110', image: '/runway/look-05.avif' },
    8: { name: 'Geometric Acetate Sunglasses', price: '$75', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop' },
    9: { name: 'Heavy Knit Column Robe', price: '$165', image: '/runway/look-07.avif' },
    10: { name: 'Atelier Leather Gloves', price: '$85', image: '/runway/bts-13.avif' }
  }

  const handleMoveToBag = (id: number) => {
    const item = itemsLookup[id]
    if (item) {
      addToCart({
        id,
        name: item.name,
        price: item.price,
        image: item.image,
        color: 'Default',
        size: 'M'
      })
      toggleWishlist(id) // Remove from wishlist after adding to bag
      if (soundEnabled) sounds.playSuccess()
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      <section className="relative w-full py-16 border-b border-border/40 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-12">
          
          {/* Header */}
          <div className="space-y-4 max-w-2xl border-b border-border/20 pb-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase font-black flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
              <span>SAVED ARCHIVES</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-black font-heading uppercase tracking-tight leading-none">
              My Wishlist
            </h1>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
              A private catalog of your favorite looks and bespoke structures.
            </p>
          </div>

          {/* List display */}
          {wishlist.length === 0 ? (
            <div className="h-72 border border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center p-6 text-muted-foreground max-w-2xl mx-auto my-6">
              <Heart className="h-10 w-10 mb-4 text-muted-foreground/30 stroke-1" />
              <p className="text-sm font-bold text-foreground uppercase tracking-widest">Your saved collection is empty.</p>
              <p className="text-xs mt-1 max-w-xs leading-relaxed">Save items from the catalog to build your digital wardrobe.</p>
              <Link
                href="/shop"
                onClick={handleInteract}
                className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground font-mono font-bold rounded-full text-[10px] tracking-widest uppercase hover:bg-accent transition-all"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map(id => {
                const prod = itemsLookup[id] || { name: 'Atelier Item', price: '$99', image: '/runway/look-01.avif' }
                return (
                  <div key={id} className="p-4 border border-border/40 bg-card/25 rounded-2xl flex gap-4 text-left items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-20 rounded-xl overflow-hidden bg-secondary border border-border/30 shrink-0">
                        <img src={prod.image} alt="" className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold uppercase text-foreground truncate max-w-[150px]">{prod.name}</h4>
                        <p className="text-xs font-mono font-bold text-primary">{prod.price}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 items-end shrink-0">
                      <button
                        onClick={() => toggleWishlist(id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-secondary"
                        title="Remove look"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMoveToBag(id)}
                        className="px-3 py-1.5 bg-primary text-primary-foreground hover:bg-accent text-[9px] font-mono font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1"
                      >
                        <ShoppingBag className="h-3 w-3" />
                        <span>Bag</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </section>

      <StyleOracle />
      <Footer />
    </main>
  )
}
