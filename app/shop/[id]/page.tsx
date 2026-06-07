'use client'

import { useState, useEffect, use } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import Product3DCarousel from '@/components/product-3d-carousel'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { 
  ShoppingBag, 
  Heart, 
  ChevronRight, 
  X, 
  Star, 
  Sparkles, 
  Check, 
  ArrowLeft, 
  Scissors, 
  FileText, 
  Truck, 
  ShieldCheck 
} from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: string
  category: 'outerwear' | 'top' | 'bottom' | 'acc'
  images: string[]
  rating: number
  swatches: { name: string; hex: string }[]
  sizes: string[]
  desc: string
  composition: string
  materials: string[]
  details: string[]
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap Next.js dynamic routing parameter using use()
  const { id } = use(params)
  
  const { soundEnabled, addToCart, wishlist, toggleWishlist, setCartOpen } = useAppState()
  
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [activeTab, setActiveTab] = useState<'desc' | 'materials' | 'shipping'>('desc')
  const [addedItem, setAddedItem] = useState(false)
  const [toast, setToast] = useState<{ title: string; desc: string } | null>(null)
  
  // Fit Pass State
  const [vipProfile, setVipProfile] = useState<{ name: string; height: string; chest: string; waist: string } | null>(null)

  // 10 Premium products database with multiple campaign textures
  const products: Product[] = [
    { 
      id: 5, 
      name: 'Deconstructed Twill Trench', 
      price: '$290', 
      category: 'outerwear', 
      images: ['/runway/look-01.avif', '/runway/look-12.avif', '/runway/bts-01.avif', '/runway/bts-08.avif'],
      rating: 4.9,
      swatches: [{ name: 'Cream Tan', hex: '#d2b48c' }, { name: 'Slate Grey', hex: '#708090' }],
      sizes: ['S', 'M', 'L'],
      desc: 'An exploration into brutalist drapery. Heavy twill wraps asymmetric curves, finished with raw seam lines and a modular double buckle belt.',
      composition: '80% organic wool, 20% recycled polyamide. Dry clean only.',
      materials: ['Organic Melton Wool', 'Recycled Polyamide', 'Horn Hardware'],
      details: ['Asymmetric tailored panels', 'Double metal buckle waist belt', 'Raw-hem finish cuffs', 'Signature ORLIEN Spring 26 interior lining']
    },
    { 
      id: 6, 
      name: 'Brutalist Leather Aviator', 
      price: '$220', 
      category: 'outerwear', 
      images: ['/runway/look-03.avif', '/runway/look-11.avif', '/runway/bts-02.avif', '/runway/bts-09.avif'],
      rating: 4.8,
      swatches: [{ name: 'Onyx Black', hex: '#1c1c1c' }, { name: 'Whiskey Brown', hex: '#8b5a2b' }],
      sizes: ['S', 'M', 'L', 'XL'],
      desc: 'Crushed textured cowhide bomber tailored with deep elastic rib drapes that adjust form dynamically during forward posture.',
      composition: '100% drum-dyed sheepskin leather. Clean by leather specialist.',
      materials: ['Genuine Lambskin Leather', 'Elastic Wool Ribbing'],
      details: ['Asymmetric heavy zippers', 'Exaggerated storm collar drapes', 'Satin lining core', 'Zippered utility sleeves pocket']
    },
    { 
      id: 1, 
      name: 'Asymmetric Canvas Parka', 
      price: '$180', 
      category: 'outerwear', 
      images: ['/runway/look-02.avif', '/runway/look-06.avif', '/runway/bts-03.avif', '/runway/bts-10.avif'],
      rating: 4.8,
      swatches: [{ name: 'Tech Black', hex: '#111111' }, { name: 'Cobalt Blue', hex: '#4169e1' }],
      sizes: ['M', 'L', 'XL'],
      desc: 'Utility meets high-fashion volume. Constructed from washed tech canvas featuring structured shoulder caps and oversized pocket shields.',
      composition: '100% recycled nylon shell, GRS certified. Cold wash.',
      materials: ['Recycled Nylon Canvas', 'Washed Tech Shell'],
      details: ['Water-resistant technical canvas', 'Exaggerated pocket shields', 'Structured shoulder caps', 'Concealed drawcord adjusters']
    },
    { 
      id: 2, 
      name: 'Liquid Silk Shift Dress', 
      price: '$145', 
      category: 'top', 
      images: ['/runway/look-04.avif', '/runway/look-14.avif', '/runway/bts-04.avif', '/runway/bts-07.avif'],
      rating: 4.9,
      swatches: [{ name: 'Off-White', hex: '#fcfaf2' }, { name: 'Charcoal', hex: '#36454f' }],
      sizes: ['S', 'M', 'L'],
      desc: 'Weighted crepe-back satin bias panels configured to flow gracefully under biological motion paths.',
      composition: '100% organic crepe silk. Gentle hand wash.',
      materials: ['GOTS Organic Crepe Silk'],
      details: ['Bias-cut flowing panels', 'Draped cowl neckline', 'Raw finish seam outlines', 'Biological kinetic drape config']
    },
    { 
      id: 7, 
      name: 'Structured Gabardine Trouser', 
      price: '$110', 
      category: 'bottom', 
      images: ['/runway/look-05.avif', '/runway/look-10.avif', '/runway/bts-05.avif', '/runway/bts-11.avif'],
      rating: 4.9,
      swatches: [{ name: 'Taupe Clay', hex: '#8f8679' }, { name: 'Slate Charcoal', hex: '#2f3542' }],
      sizes: ['30', '32', '34'],
      desc: 'Double pleated trousers combined with high-twist wool gabardine structures, creating a sharp formal drape.',
      composition: '100% premium wool gabardine. Dry clean.',
      materials: ['Pure Wool Gabardine'],
      details: ['Double front pleating lines', 'Deep cropped ankle hem tailoring', 'Hidden button-fly closure', 'Bespoke interior piping lines']
    },
    { 
      id: 3, 
      name: 'Raw Edge Denim Trouser', 
      price: '$95', 
      category: 'bottom', 
      images: ['/runway/look-15.avif', '/runway/look-13.avif', '/runway/bts-06.avif', '/runway/bts-12.avif'],
      rating: 4.7,
      swatches: [{ name: 'Indigo Blue', hex: '#2e5894' }, { name: 'Faded Black', hex: '#2b2b2a' }],
      sizes: ['30', '32', '34', '36'],
      desc: 'Slouchy, extra-long wide leg jeans designed with raw-cut edges, triple stitched panels and distressed hems.',
      composition: '100% raw organic indigo denim cotton. Cold wash.',
      materials: ['Raw Selvedge Indigo Denim Cotton'],
      details: ['Extra slouchy wide leg profile', 'Raw distressed bottom cuffs', 'Triple stitched side reinforcement panels', 'Branded copper hardware rivets']
    },
    { 
      id: 8, 
      name: 'Geometric Acetate Sunglasses', 
      price: '$75', 
      category: 'acc', 
      images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop', '/runway/look-08.avif', '/runway/bts-03.avif', '/runway/bts-11.avif'],
      rating: 4.9,
      swatches: [{ name: 'Polarized Black', hex: '#000000' }, { name: 'Amber Tortoise', hex: '#8b5a2b' }],
      sizes: ['OS'],
      desc: 'Angular frame sunglasses crafted from bio-acetate blocks with polarized UV filter blocks.',
      composition: '100% bio-acetate frame, CR-39 protective lenses.',
      materials: ['Bio-Acetate Blocks', 'CR-39 Specialized Lenses'],
      details: ['Hand-polished angular frame bevels', '100% UV400 polarized filters', 'Reinforced metal interior hinges', 'Signature gold block accents']
    },
    { 
      id: 4, 
      name: 'Sneakers Pro Kinetic', 
      price: '$129', 
      category: 'acc', 
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop', '/runway/look-06.avif', '/runway/bts-05.avif', '/runway/bts-11.avif'],
      rating: 4.9,
      swatches: [{ name: 'Obsidian Gold', hex: '#d4af37' }, { name: 'Ivory Tan', hex: '#d2b48c' }],
      sizes: ['8', '9', '10', '11'],
      desc: 'Low-top technical sneakers built with knit sock drapes, leather trims, and responsive rubber soles.',
      composition: 'Recycled polyester knit, premium calf leather overlays.',
      materials: ['Recycled Polyester Knit', 'Premium Calfskin Leather'],
      details: ['Ergonomic elastic sock ankle inserts', 'Reflective nylon utility bindings', 'Responsive vulcanized rubber soles', 'Custom textured tread configurations']
    },
    { 
      id: 9, 
      name: 'Heavy Knit Column Robe', 
      price: '$165', 
      category: 'top', 
      images: ['/runway/look-07.avif', '/runway/look-02.avif', '/runway/bts-07.avif', '/runway/bts-14.avif'],
      rating: 4.8,
      swatches: [{ name: 'Melange Grey', hex: '#bdc3c7' }, { name: 'Onyx Black', hex: '#1c1c1c' }],
      sizes: ['S', 'M', 'L'],
      desc: 'Coarse gauge Belgian linen and merino wool blend column knit with integrated structured shoulders and a high collar.',
      composition: '70% organic merino wool, 30% Belgian linen. Hand wash.',
      materials: ['Organic Merino Wool', 'Belgian Natural Linen Knit'],
      details: ['Coarse gauge structured knit columns', 'High protective collar shield', 'Fitted wrist rib lines', 'Wide side slit hem lines']
    },
    { 
      id: 10, 
      name: 'Atelier Leather Gloves', 
      price: '$85', 
      category: 'acc', 
      images: ['/runway/bts-13.avif', '/runway/bts-01.avif', '/runway/bts-09.avif', '/runway/look-05.avif'],
      rating: 4.7,
      swatches: [{ name: 'Onyx Black', hex: '#1c1c1c' }, { name: 'Whiskey Brown', hex: '#8b5a2b' }],
      sizes: ['S', 'M'],
      desc: 'Hand-stitched drum-dyed glove set configured with custom interior rib inserts and silver hardware details.',
      composition: '100% genuine lambskin leather. Clean by specialist.',
      materials: ['Genuine Drum-Dyed Lambskin Leather'],
      details: ['Silver metal hardware adjusters', 'Hand-stitched perimeter lines', 'Ribbed inner cuffs insert', 'Signature ORLIEN stamps']
    }
  ]

  // Find target product
  const product = products.find(p => p.id === parseInt(id)) || products[0]

  useEffect(() => {
    setSelectedColor(product.swatches[0].name)
    setSelectedSize(product.sizes[0])
  }, [product])

  // Get fit pass data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('orlien-measurements')
      if (saved) {
        try {
          setVipProfile(JSON.parse(saved))
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [])

  // VIP recommendations
  const getRecommendedSize = (chestVal: number) => {
    if (chestVal < 36) return 'S'
    if (chestVal >= 36 && chestVal <= 40) return 'M'
    if (chestVal > 40 && chestVal <= 44) return 'L'
    return 'XL'
  }

  const getRecommendedWaist = (waistVal: number) => {
    const targetSizes = [30, 32, 34, 36]
    const closest = targetSizes.reduce((prev, curr) => 
      Math.abs(curr - waistVal) < Math.abs(prev - waistVal) ? curr : prev
    )
    return String(closest)
  }

  let recommendedSize = ''
  if (vipProfile) {
    if (product.category === 'bottom') {
      const waistVal = parseInt(vipProfile.waist) || 0
      if (waistVal > 0) recommendedSize = getRecommendedWaist(waistVal)
    } else if (product.category !== 'acc') {
      const chestVal = parseInt(vipProfile.chest) || 0
      if (chestVal > 0) recommendedSize = getRecommendedSize(chestVal)
    }
  }

  // Interactivity clicks
  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const handleAddProduct = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize
    })

    setToast({
      title: 'Added to Bag',
      desc: `${product.name} - Size ${selectedSize} / ${selectedColor}`
    })

    setAddedItem(true)
    if (soundEnabled) sounds.playSuccess()
    setTimeout(() => {
      setAddedItem(false)
    }, 2000)
  }

  // Toast cleanup
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const isWished = wishlist.includes(product.id)

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      {/* Main Container */}
      <div className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 md:px-8 py-8 md:py-12">
        
        {/* Back Link Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border/40 pb-5 mb-8">
          <Link
            href="/shop"
            onClick={handleInteract}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Shop</span>
          </Link>
          
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono uppercase tracking-widest">
            <span className="text-primary font-bold">LOOK {String(product.id).padStart(2, '0')}</span>
            <span>/</span>
            <span>{product.category}</span>
          </div>
        </div>

        {/* Immersive Dynamic 3D Product Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[600px]">
          
          {/* LEFT COLUMN: Three.js Interactive 3D WebGL Canvas (60% width) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4 relative">
            <div className="flex-1 w-full aspect-[4/3] lg:aspect-auto h-full min-h-[380px] lg:min-h-[560px]">
              <Product3DCarousel 
                images={product.images} 
                activeIndex={activeImageIndex} 
                onChangeIndex={setActiveImageIndex} 
              />
            </div>

            {/* Bottom 2D thumbnail preview bar to switch index manually */}
            <div className="flex justify-center gap-3 overflow-x-auto max-w-full pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => { if (soundEnabled) sounds.playClick(); setActiveImageIndex(idx) }}
                  className={`h-14 w-14 rounded-2xl overflow-hidden border transition-all shrink-0 relative ${
                    idx === activeImageIndex 
                      ? 'border-primary scale-110 shadow-lg shadow-primary/10 ring-2 ring-primary/20' 
                      : 'border-border opacity-50 hover:opacity-100 hover:scale-102'
                  }`}
                  title={`Select view ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <div className="absolute top-1 right-1 bg-black/60 rounded h-3.5 w-3.5 flex items-center justify-center text-[7px] text-white font-mono">
                    {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Premium Specs Panel (40% width) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-card/25 border border-border/40 rounded-3xl p-6 md:p-8 glass-panel relative text-left">
            
            {/* Upper Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.25em] text-primary font-black uppercase">
                  ORLIEN Spring 26 Campaign
                </span>
                
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2 border border-border hover:border-foreground hover:bg-secondary rounded-full text-foreground/80 hover:text-foreground transition-all"
                  title="Toggle wishlist"
                >
                  <Heart className={`h-4 w-4 ${isWished ? 'fill-primary text-primary' : ''}`} />
                </button>
              </div>

              <h1 className="text-3xl md:text-4xl font-black uppercase text-foreground leading-none tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4">
                <p className="text-2xl font-black text-primary font-mono leading-none">{product.price}</p>
                <div className="flex items-center gap-1 text-xs border-l border-border/80 pl-4 py-0.5">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="font-bold text-foreground font-mono">{product.rating}</span>
                </div>
              </div>

              {/* VIP Fitting recommendations pass */}
              {vipProfile && recommendedSize && (
                <div className="p-4 border border-primary/30 bg-primary/5 rounded-2xl space-y-2.5 animate-pulse-subtle">
                  <div className="flex items-center gap-2 text-primary font-mono text-[9px] font-bold tracking-widest">
                    <Scissors className="h-4 w-4 text-primary" />
                    <span>VIP CUSTOM FITTING SUGGESTION</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-foreground/80 font-light">
                    Fitting Pass Profile Active for <span className="font-bold text-primary">{vipProfile.name}</span>. Based on studio measurements, size <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded font-mono font-bold text-xs inline-block shadow-sm">{recommendedSize}</span> is recommended for a balanced bespoke shoulder & drape fit.
                  </p>
                </div>
              )}

              {/* Specs parameters selects */}
              <div className="space-y-4 pt-4 border-t border-border/40">
                {/* Select Color */}
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">
                    Colorway: <span className="text-foreground font-black">{selectedColor}</span>
                  </span>
                  <div className="flex gap-3">
                    {product.swatches.map(sw => (
                      <button
                        key={sw.name}
                        onClick={() => { if (soundEnabled) sounds.playClick(); setSelectedColor(sw.name) }}
                        className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all ${
                          selectedColor === sw.name ? 'border-primary scale-110 ring-2 ring-primary/25' : 'border-border hover:scale-105'
                        }`}
                        title={sw.name}
                      >
                        <span className="h-6 w-6 rounded-full" style={{ backgroundColor: sw.hex }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select Size */}
                {product.category !== 'acc' && (
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">
                      Size Grid: <span className="text-foreground font-black">{selectedSize}</span>
                    </span>
                    <div className="flex gap-2">
                      {product.sizes.map(sz => {
                        const isRecommended = sz === recommendedSize
                        return (
                          <button
                            key={sz}
                            onClick={() => { if (soundEnabled) sounds.playClick(); setSelectedSize(sz) }}
                            className={`h-8 min-w-8 px-2.5 rounded-lg text-xs font-mono font-bold border transition-all flex items-center justify-center gap-1 ${
                              selectedSize === sz
                                ? 'bg-primary border-primary text-primary-foreground shadow-md'
                                : isRecommended
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-border bg-transparent text-foreground hover:border-foreground/50'
                            }`}
                          >
                            <span>{sz}</span>
                            {isRecommended && <Check className="h-3.5 w-3.5 shrink-0" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Composition */}
              <div className="p-3.5 bg-secondary/30 border border-border/40 rounded-2xl text-[10px] text-muted-foreground font-mono leading-relaxed mt-4">
                Composition: {product.composition}
              </div>
            </div>

            {/* Accordion Tabs details */}
            <div className="space-y-4 pt-4 border-t border-border/40">
              <div className="flex border-b border-border/30 pb-2 gap-4">
                {[
                  { id: 'desc', name: 'Description' },
                  { id: 'materials', name: 'Materials Ledger' },
                  { id: 'shipping', name: 'Shipping' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => { if (soundEnabled) sounds.playClick(); setActiveTab(t.id as any) }}
                    className={`text-[9px] font-bold uppercase tracking-widest pb-1 transition-all ${
                      activeTab === t.id 
                        ? 'border-b-2 border-primary text-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              <div className="text-xs leading-relaxed text-muted-foreground font-light min-h-[90px]">
                {activeTab === 'desc' && (
                  <div className="space-y-2.5">
                    <p>{product.desc}</p>
                    <ul className="list-disc list-inside space-y-1 text-[11px]">
                      {product.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div className="space-y-3">
                    <p>Structured with sustainable luxury ledger blocks:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map((m, i) => (
                        <span key={i} className="px-3 py-1 bg-secondary/40 border border-border/50 text-[10px] font-mono rounded-lg text-foreground uppercase tracking-widest font-bold">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2 text-[11px] leading-relaxed">
                    <div className="flex gap-2 items-start">
                      <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p>Complimentary carbon-neutral standard delivery. Express priority shipping available.</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p>Atelier lifetime repair certifications included. 30-day hassle-free returns registry access.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Add to Bag */}
            <div className="pt-4 border-t border-border/40 mt-auto">
              <button
                onClick={handleAddProduct}
                disabled={addedItem}
                className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  addedItem
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                    : 'bg-primary text-primary-foreground hover:bg-accent shadow-lg shadow-primary/20 hover:scale-[1.01]'
                }`}
              >
                {addedItem ? (
                  <>
                    <Check className="h-4.5 w-4.5 animate-bounce" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4.5 w-4.5" />
                    <span>ADD TO SHOPPING BAG</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* FLOAT TOAST ALERT */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-card border border-primary/30 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in-bottom max-w-sm select-none">
          <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="text-[11px] font-bold text-foreground truncate">{toast.title}</p>
            <p className="text-[10px] text-muted-foreground truncate mt-0.5">{toast.desc}</p>
          </div>
          <button 
            onClick={() => {
              setCartOpen(true)
              setToast(null)
            }}
            className="px-3 py-1.5 bg-primary text-primary-foreground hover:bg-accent rounded-lg text-[9px] font-bold uppercase tracking-widest shrink-0 transition-colors"
          >
            BAG
          </button>
          <button 
            onClick={() => setToast(null)} 
            className="p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-all shrink-0"
            title="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <StyleOracle />
      <Footer />
    </main>
  )
}
