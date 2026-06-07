'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Link from 'next/link'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { 
  Heart, 
  ShoppingBag, 
  X, 
  Star, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  Check, 
  Grid2X2, 
  Grid3X3, 
  LayoutGrid, 
  SlidersHorizontal, 
  Info, 
  Trash2,
  ChevronDown,
  Eye
} from 'lucide-react'

interface Product {
  id: number
  name: string
  price: string
  category: 'outerwear' | 'top' | 'bottom' | 'acc'
  image: string
  hoverImage: string
  rating: number
  swatches: { name: string; hex: string }[]
  sizes: string[]
  desc: string
  composition: string
  materials: string[]
}

export default function ShopPage() {
  const { soundEnabled, addToCart, wishlist, toggleWishlist, setCartOpen } = useAppState()
  
  // Layout States
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3) // 2, 3, or 4 columns on desktop
  const [mobileGridCols, setMobileGridCols] = useState<1 | 2>(2) // 1 or 2 columns on mobile
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  // Filter States
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [selectedSize, setSelectedSize] = useState<string>('all')
  const [priceBracket, setPriceBracket] = useState<string>('all')
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('featured')

  // Personalization States (VIP Fit Pass measurements)
  const [vipProfile, setVipProfile] = useState<{ name: string; height: string; chest: string; waist: string } | null>(null)
  
  // Toast notifications
  const [toast, setToast] = useState<{ title: string; desc: string } | null>(null)

  // Drawer options selection
  const [quickColor, setQuickColor] = useState('')
  const [quickSize, setQuickSize] = useState('')
  const [addedItem, setAddedItem] = useState(false)

  // Load custom measurements if booked in Atelier fitting pass
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('orlien-measurements')
      if (saved) {
        try {
          setVipProfile(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to parse fitting measurements', e)
        }
      }
    }
  }, [])

  // Expanded 10-Garment Premium Products Database matched directly to downloaded Spring 26 lookbook/bts AVIFs
  const products: Product[] = [
    { 
      id: 5, 
      name: 'Deconstructed Twill Trench', 
      price: '$290', 
      category: 'outerwear', 
      image: '/runway/look-01.avif',
      hoverImage: '/runway/look-12.avif',
      rating: 4.9,
      swatches: [{ name: 'Cream Tan', hex: '#d2b48c' }, { name: 'Slate Grey', hex: '#708090' }],
      sizes: ['S', 'M', 'L'],
      desc: 'An exploration into brutalist drapery. Heavy twill wraps asymmetric curves, finished with raw seam lines and a modular double buckle belt.',
      composition: '80% organic wool, 20% recycled polyamide. Dry clean only.',
      materials: ['wool', 'polyamide']
    },
    { 
      id: 6, 
      name: 'Brutalist Leather Aviator', 
      price: '$220', 
      category: 'outerwear', 
      image: '/runway/look-03.avif',
      hoverImage: '/runway/look-11.avif',
      rating: 4.8,
      swatches: [{ name: 'Onyx Black', hex: '#1c1c1c' }, { name: 'Whiskey Brown', hex: '#8b5a2b' }],
      sizes: ['S', 'M', 'L', 'XL'],
      desc: 'Crushed textured cowhide bomber tailored with deep elastic rib drapes that adjust form dynamically during forward posture.',
      composition: '100% drum-dyed sheepskin leather. Clean by leather specialist.',
      materials: ['leather']
    },
    { 
      id: 1, 
      name: 'Asymmetric Canvas Parka', 
      price: '$180', 
      category: 'outerwear', 
      image: '/runway/look-02.avif',
      hoverImage: '/runway/look-06.avif',
      rating: 4.8,
      swatches: [{ name: 'Tech Black', hex: '#111111' }, { name: 'Cobalt Blue', hex: '#4169e1' }],
      sizes: ['M', 'L', 'XL'],
      desc: 'Utility meets high-fashion volume. Constructed from washed tech canvas featuring structured shoulder caps and oversized pocket shields.',
      composition: '100% recycled nylon shell, GRS certified. Cold wash.',
      materials: ['nylon', 'cotton']
    },
    { 
      id: 2, 
      name: 'Liquid Silk Shift Dress', 
      price: '$145', 
      category: 'top', 
      image: '/runway/look-04.avif',
      hoverImage: '/runway/look-14.avif',
      rating: 4.9,
      swatches: [{ name: 'Off-White', hex: '#fcfaf2' }, { name: 'Charcoal', hex: '#36454f' }],
      sizes: ['S', 'M', 'L'],
      desc: 'Weighted crepe-back satin bias panels configured to flow gracefully under biological motion paths.',
      composition: '100% organic crepe silk. Gentle hand wash.',
      materials: ['silk']
    },
    { 
      id: 7, 
      name: 'Structured Gabardine Trouser', 
      price: '$110', 
      category: 'bottom', 
      image: '/runway/look-05.avif',
      hoverImage: '/runway/look-10.avif',
      rating: 4.9,
      swatches: [{ name: 'Taupe Clay', hex: '#8f8679' }, { name: 'Slate Charcoal', hex: '#2f3542' }],
      sizes: ['30', '32', '34'],
      desc: 'Double pleated trousers combined with high-twist wool gabardine structures, creating a sharp formal drape.',
      composition: '100% premium wool gabardine. Dry clean.',
      materials: ['wool']
    },
    { 
      id: 3, 
      name: 'Raw Edge Denim Trouser', 
      price: '$95', 
      category: 'bottom', 
      image: '/runway/look-15.avif',
      hoverImage: '/runway/look-13.avif',
      rating: 4.7,
      swatches: [{ name: 'Indigo Blue', hex: '#2e5894' }, { name: 'Faded Black', hex: '#2b2b2a' }],
      sizes: ['30', '32', '34', '36'],
      desc: 'Slouchy, extra-long wide leg jeans designed with raw-cut edges, triple stitched panels and distressed hems.',
      composition: '100% raw organic indigo denim cotton. Cold wash.',
      materials: ['cotton', 'denim']
    },
    { 
      id: 8, 
      name: 'Geometric Acetate Sunglasses', 
      price: '$75', 
      category: 'acc', 
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=800&fit=crop',
      hoverImage: '/runway/look-08.avif',
      rating: 4.9,
      swatches: [{ name: 'Polarized Black', hex: '#000000' }, { name: 'Amber Tortoise', hex: '#8b5a2b' }],
      sizes: ['OS'],
      desc: 'Angular frame sunglasses crafted from bio-acetate blocks with polarized UV filter blocks.',
      composition: '100% bio-acetate frame, CR-39 protective lenses.',
      materials: ['acetate']
    },
    { 
      id: 4, 
      name: 'Sneakers Pro Kinetic', 
      price: '$129', 
      category: 'acc', 
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
      hoverImage: '/runway/look-06.avif',
      rating: 4.9,
      swatches: [{ name: 'Obsidian Gold', hex: '#d4af37' }, { name: 'Ivory Tan', hex: '#d2b48c' }],
      sizes: ['8', '9', '10', '11'],
      desc: 'Low-top technical sneakers built with knit sock drapes, leather trims, and responsive rubber soles.',
      composition: 'Recycled polyester knit, premium calf leather overlays.',
      materials: ['nylon', 'leather']
    },
    { 
      id: 9, 
      name: 'Heavy Knit Column Robe', 
      price: '$165', 
      category: 'top', 
      image: '/runway/look-07.avif',
      hoverImage: '/runway/look-02.avif',
      rating: 4.8,
      swatches: [{ name: 'Melange Grey', hex: '#bdc3c7' }, { name: 'Onyx Black', hex: '#1c1c1c' }],
      sizes: ['S', 'M', 'L'],
      desc: 'Coarse gauge Belgian linen and merino wool blend column knit with integrated structured shoulders and a high collar.',
      composition: '70% organic merino wool, 30% Belgian linen. Hand wash.',
      materials: ['wool', 'linen']
    },
    { 
      id: 10, 
      name: 'Atelier Leather Gloves', 
      price: '$85', 
      category: 'acc', 
      image: '/runway/bts-13.avif',
      hoverImage: '/runway/bts-01.avif',
      rating: 4.7,
      swatches: [{ name: 'Onyx Black', hex: '#1c1c1c' }, { name: 'Whiskey Brown', hex: '#8b5a2b' }],
      sizes: ['S', 'M'],
      desc: 'Hand-stitched drum-dyed glove set configured with custom interior rib inserts and silver hardware details.',
      composition: '100% genuine lambskin leather. Clean by specialist.',
      materials: ['leather']
    }
  ]

  // Filter & Sort Calculations
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || p.category === category
    const matchesSize = selectedSize === 'all' || p.sizes.includes(selectedSize)
    
    // Price checks
    const priceVal = parseFloat(p.price.replace('$', '')) || 0
    let matchesPrice = true
    if (priceBracket === 'under-100') matchesPrice = priceVal < 100
    else if (priceBracket === '100-200') matchesPrice = priceVal >= 100 && priceVal <= 200
    else if (priceBracket === 'over-200') matchesPrice = priceVal > 200

    // Materials check
    const matchesMaterial = selectedMaterials.length === 0 || 
      p.materials.some(m => selectedMaterials.includes(m))

    // Colors check
    const matchesColor = selectedColors.length === 0 || 
      p.swatches.some(s => selectedColors.includes(s.name))

    return matchesSearch && matchesCategory && matchesSize && matchesPrice && matchesMaterial && matchesColor
  })

  // Sort application
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') {
      const pA = parseFloat(a.price.replace('$', '')) || 0
      const pB = parseFloat(b.price.replace('$', '')) || 0
      return pA - pB
    }
    if (sortBy === 'price-high-low') {
      const pA = parseFloat(a.price.replace('$', '')) || 0
      const pB = parseFloat(b.price.replace('$', '')) || 0
      return pB - pA
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating
    }
    return 0
  })

  // Sound chimes
  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const handleTabChange = (cat: string) => {
    if (soundEnabled) sounds.playSweep()
    setCategory(cat)
  }

  // Quick specifications details drawer (slides out right)
  const handleOpenDetailDrawer = (prod: Product) => {
    if (soundEnabled) sounds.playClick()
    setSelectedProduct(prod)
    setQuickColor(prod.swatches[0].name)
    setQuickSize(prod.sizes[0])
    setAddedItem(false)
  }

  // Drawer Add to Bag trigger
  const handleAddDrawerItem = () => {
    if (!selectedProduct) return
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      color: quickColor,
      size: quickSize
    })
    
    // Set toast banner
    setToast({
      title: 'Added to bag',
      desc: `${selectedProduct.name} - Size ${quickSize} / ${quickColor}`
    })

    setAddedItem(true)
    if (soundEnabled) sounds.playSuccess()

    setTimeout(() => {
      setAddedItem(false)
      setSelectedProduct(null)
    }, 1200)
  }

  // Zara-style Instant Add to bag directly from card hover (saves clicks!)
  const handleInstantAdd = (prod: Product, size: string) => {
    addToCart({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      color: prod.swatches[0].name,
      size: size
    })

    // Set toast banner
    setToast({
      title: 'Instant Add Successful',
      desc: `${prod.name} (Size ${size}) added to bag.`
    })

    if (soundEnabled) sounds.playSuccess()
  }

  // Toggle material options
  const handleToggleMaterial = (mat: string) => {
    handleInteract()
    setSelectedMaterials(prev => 
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    )
  }

  // Toggle color filters
  const handleToggleColor = (col: string) => {
    handleInteract()
    setSelectedColors(prev => 
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    )
  }

  // Reset all sorting & attributes criteria
  const handleResetFilters = () => {
    if (soundEnabled) sounds.playSweep()
    setSearch('')
    setCategory('all')
    setSelectedSize('all')
    setPriceBracket('all')
    setSelectedMaterials([])
    setSelectedColors([])
    setSortBy('featured')
  }

  // VIP Fit Recommendation calculators
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

  // Compute recommendation size for the detailed drawer view
  let recommendedSize = ''
  if (vipProfile && selectedProduct) {
    if (selectedProduct.category === 'bottom') {
      const waistVal = parseInt(vipProfile.waist) || 0
      if (waistVal > 0) recommendedSize = getRecommendedWaist(waistVal)
    } else if (selectedProduct.category !== 'acc') {
      const chestVal = parseInt(vipProfile.chest) || 0
      if (chestVal > 0) recommendedSize = getRecommendedSize(chestVal)
    }
  }

  // Automatically fade out toasts after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      {/* Main Container */}
      <div className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 md:px-8 py-8 md:py-12">
        
        {/* Title area & VIP Fit Pass Banner */}
        <div className="mb-8 text-left space-y-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest font-mono">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Catalog</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight uppercase text-foreground leading-none">
                Atelier Catalog
              </h1>
              <p className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-widest">
                Showing {sortedProducts.length} premium design structures
              </p>
            </div>
            
            {/* VIP Fitting pass indicators */}
            {vipProfile && (
              <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-primary/30 bg-primary/5 rounded-2xl text-[10px] tracking-wider text-primary font-mono font-bold animate-pulse-subtle">
                <Sparkles className="h-4 w-4 animate-spin-slow text-primary" />
                <span>VIP PASS PROFILE ACTIVE: FIT SUGGESTIONS ON</span>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic World-Class Toolbar (Zara / ORLIEN inspired) */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-border/40 pb-5 mb-8 gap-4 sticky top-[68px] bg-background/95 backdrop-blur-md z-30 pt-2">
          
          {/* Left: Responsive Category filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', name: 'All' },
              { id: 'outerwear', name: 'Outerwear' },
              { id: 'top', name: 'Tops & Knits' },
              { id: 'bottom', name: 'Trousers' },
              { id: 'acc', name: 'Accessories' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 ${
                  category === cat.id
                    ? 'bg-foreground text-background shadow-md'
                    : 'text-foreground/60 hover:text-foreground hover:bg-secondary/40'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right Controls: Filters button, Sort options, Density selection */}
          <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto text-xs tracking-widest font-mono text-muted-foreground">
            
            {/* Slide-out Filters trigger */}
            <button
              onClick={() => { handleInteract(); setIsFilterOpen(true) }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:border-foreground hover:text-foreground transition-all"
              title="Open filters drawer"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>FILTERS</span>
              {(selectedMaterials.length > 0 || selectedColors.length > 0 || priceBracket !== 'all' || search) && (
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              )}
            </button>

            {/* Typography sorting */}
            <div className="flex items-center gap-1.5 border-l border-border/60 pl-4">
              <span>SORT /</span>
              <select
                value={sortBy}
                onChange={(e) => { handleInteract(); setSortBy(e.target.value) }}
                className="bg-transparent border-none text-foreground font-bold font-mono focus:outline-none cursor-pointer text-[10px] uppercase tracking-wider py-1 pl-1"
              >
                <option value="featured" className="bg-card text-foreground">Featured</option>
                <option value="price-low-high" className="bg-card text-foreground">Price Low-High</option>
                <option value="price-high-low" className="bg-card text-foreground">Price High-Low</option>
                <option value="rating" className="bg-card text-foreground">Top Rated</option>
              </select>
            </div>

            {/* Density Selector */}
            <div className="flex items-center gap-2 border-l border-border/60 pl-4">
              {/* Mobile togglers */}
              <div className="flex md:hidden items-center gap-1.5">
                <button
                  onClick={() => { handleInteract(); setMobileGridCols(1) }}
                  className={`p-1 text-[9px] font-mono font-bold rounded border ${mobileGridCols === 1 ? 'border-primary text-primary bg-primary/5' : 'border-border/40 text-foreground/45'}`}
                  title="1 Column Grid"
                >
                  1X
                </button>
                <button
                  onClick={() => { handleInteract(); setMobileGridCols(2) }}
                  className={`p-1 text-[9px] font-mono font-bold rounded border ${mobileGridCols === 2 ? 'border-primary text-primary bg-primary/5' : 'border-border/40 text-foreground/45'}`}
                  title="2 Columns Grid"
                >
                  2X
                </button>
              </div>

              {/* Desktop togglers */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => { handleInteract(); setGridCols(2) }}
                  className={`p-1.5 rounded transition-all ${gridCols === 2 ? 'text-primary' : 'text-foreground/45 hover:text-foreground'}`}
                  title="2 Columns density"
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => { handleInteract(); setGridCols(3) }}
                  className={`p-1.5 rounded transition-all ${gridCols === 3 ? 'text-primary' : 'text-foreground/45 hover:text-foreground'}`}
                  title="3 Columns density"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => { handleInteract(); setGridCols(4) }}
                  className={`p-1.5 rounded transition-all ${gridCols === 4 ? 'text-primary' : 'text-foreground/45 hover:text-foreground'}`}
                  title="4 Columns density"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Empty layout display */}
        {sortedProducts.length === 0 ? (
          <div className="h-72 border border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center p-6 text-muted-foreground max-w-2xl mx-auto my-12">
            <Info className="h-10 w-10 mb-4 stroke-1 text-primary animate-pulse" />
            <p className="text-sm font-bold text-foreground uppercase tracking-widest">No structural items match your filters.</p>
            <p className="text-xs mt-1 max-w-sm leading-relaxed">Try clear filter keywords or modify price range options to review active products.</p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground font-mono font-bold rounded-full text-[10px] tracking-widest uppercase hover:bg-accent transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* World-Class Zara/ORLIEN Layout Grid */
          <div 
            className={`grid gap-x-6 gap-y-10 transition-all duration-500 ${
              mobileGridCols === 1 ? 'grid-cols-1' : 'grid-cols-2'
            } ${
              gridCols === 2 
                ? 'lg:grid-cols-2 max-w-5xl mx-auto' 
                : gridCols === 4 
                  ? 'lg:grid-cols-4' 
                  : 'lg:grid-cols-3'
            }`}
          >
            {sortedProducts.map((prod) => {
              const isWished = wishlist.includes(prod.id)
              return (
                <Link
                  key={prod.id}
                  href={`/shop/${prod.id}`}
                  className="group cursor-pointer flex flex-col justify-between"
                >
                  {/* Image Frame (Double-Image Hover swap, minimal borders) */}
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-secondary border border-border/30 hover:border-foreground/30 transition-all duration-500 mb-4 select-none">
                    
                    {/* Primary flatlay image */}
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0" 
                    />
                    
                    {/* Hover model wear image */}
                    <img 
                      src={prod.hoverImage} 
                      alt={`${prod.name} - Runway wear`} 
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 scale-[1.02] group-hover:scale-100" 
                    />

                    {/* Dark overlay hover effect */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                    {/* Wishlist triggers */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        toggleWishlist(prod.id)
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black text-white hover:text-primary transition-all active:scale-90 z-20"
                      title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`h-3.5 w-3.5 transition-transform ${isWished ? 'fill-primary text-primary scale-110' : ''}`} />
                    </button>

                    {/* Quick Spec trigger */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleOpenDetailDrawer(prod)
                      }}
                      className="absolute top-3 right-12 p-2 rounded-full bg-black/60 hover:bg-black text-white hover:text-primary transition-all active:scale-90 z-20"
                      title="Quick Specs Ledger"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    
                    {/* Sizing tags (Zara-style Instant Quick Add overlay) */}
                    {prod.category !== 'acc' && (
                      <div className="absolute inset-x-0 bottom-0 bg-black/45 backdrop-blur-md p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-1.5 items-center z-20">
                        <span className="text-[8px] font-mono uppercase text-white/60 tracking-wider mr-1 hidden sm:inline">Quick Add:</span>
                        {prod.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              handleInstantAdd(prod, sz)
                            }}
                            className="h-6 min-w-6 px-1 rounded bg-white text-black hover:bg-primary hover:text-primary-foreground text-[9px] font-mono font-bold transition-all active:scale-90"
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Quick Specs corner badge */}
                    <div className="absolute top-3 left-3 bg-black/55 px-2 py-0.5 rounded text-[8px] text-white/80 font-mono tracking-widest border border-white/5 uppercase select-none group-hover:text-white transition-colors">
                      LOOK-{String(prod.id).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Description details card */}
                  <div className="text-left space-y-1.5 px-1.5">
                    <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{prod.category}</span>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="font-bold text-foreground">{prod.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-foreground text-xs uppercase tracking-widest truncate group-hover:text-primary transition-colors mt-0.5">
                      {prod.name}
                    </h3>
                    <p className="text-sm font-black text-primary font-mono">{prod.price}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

      </div>

      {/* FILTER PANEL DRAWER (Slides in Left) */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start animate-fade-in">
          {/* Close Backdrop click */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsFilterOpen(false)} />
          
          <div className="relative w-full max-w-sm bg-card border-r border-border h-full flex flex-col p-6 shadow-2xl z-10 animate-slide-in-left overflow-y-auto">
            
            {/* Header row */}
            <div className="flex items-center justify-between pb-4 border-b border-border/40 mb-6">
              <h3 className="text-sm font-bold tracking-widest text-foreground flex items-center gap-2 uppercase">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <span>Filters Panel</span>
              </h3>
              <button 
                onClick={() => setIsFilterOpen(false)} 
                className="p-1.5 rounded-full hover:bg-secondary text-foreground transition-all"
                title="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Forms Body */}
            <div className="flex-1 space-y-6 text-left pb-6">
              
              {/* Text Search */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">Search Collection</span>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Type keyword..."
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground/60"
                  />
                  {search && (
                    <button 
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Price Brackets */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">Price Bracket</span>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'all', name: 'All Prices' },
                    { id: 'under-100', name: 'Under $100' },
                    { id: '100-200', name: '$100 - $200' },
                    { id: 'over-200', name: 'Above $200' }
                  ].map((pr) => (
                    <button
                      key={pr.id}
                      onClick={() => { handleInteract(); setPriceBracket(pr.id) }}
                      className={`text-left text-xs py-1.5 px-3 rounded-lg transition-all ${
                        priceBracket === pr.id
                          ? 'bg-primary/10 text-primary font-bold border-l-2 border-primary pl-2'
                          : 'text-foreground/70 hover:bg-secondary/40 pl-2'
                      }`}
                    >
                      {pr.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials composition */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">Fabric & Materials</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'wool', name: 'Pure Wool' },
                    { id: 'leather', name: 'Sheepskin' },
                    { id: 'nylon', name: 'Recycled Nylon' },
                    { id: 'cotton', name: 'Organic Cotton' },
                    { id: 'silk', name: 'Silk Satin' },
                    { id: 'linen', name: 'Belgian Linen' },
                    { id: 'acetate', name: 'Acetate' }
                  ].map((mat) => {
                    const active = selectedMaterials.includes(mat.id)
                    return (
                      <button
                        key={mat.id}
                        onClick={() => handleToggleMaterial(mat.id)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          active
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-border bg-transparent text-foreground/75 hover:border-foreground/50'
                        }`}
                      >
                        {mat.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Sizes Selection */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">Sizes</span>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'S', 'M', 'L', 'XL', '30', '32', '34', '36', 'OS'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => { handleInteract(); setSelectedSize(sz) }}
                      className={`h-7 min-w-7 px-1.5 rounded-lg text-[10px] font-mono font-bold border transition-all ${
                        selectedSize === sz
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-border bg-transparent text-foreground hover:border-foreground/45'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors Filter */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">Color Swatches</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Onyx Black', hex: '#1c1c1c' },
                    { name: 'Slate Grey', hex: '#708090' },
                    { name: 'Cream Tan', hex: '#d2b48c' },
                    { name: 'Off-White', hex: '#fcfaf2' },
                    { name: 'Taupe Clay', hex: '#8f8679' },
                    { name: 'Indigo Blue', hex: '#2e5894' },
                    { name: 'Faded Black', hex: '#2b2b2a' },
                    { name: 'Cobalt Blue', hex: '#4169e1' },
                    { name: 'Tech Black', hex: '#111111' },
                    { name: 'Obsidian Gold', hex: '#d4af37' }
                  ].map((color) => {
                    const active = selectedColors.includes(color.name)
                    return (
                      <button
                        key={color.name}
                        onClick={() => handleToggleColor(color.name)}
                        className={`h-6 w-6 rounded-full border flex items-center justify-center transition-all ${
                          active ? 'border-primary scale-110 ring-2 ring-primary/20' : 'border-border hover:scale-105'
                        }`}
                        title={color.name}
                      >
                        <span className="h-4 w-4 rounded-full" style={{ backgroundColor: color.hex }} />
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="border-t border-border/40 pt-4 mt-auto">
              <button
                onClick={handleResetFilters}
                className="w-full py-3 border border-border hover:bg-secondary rounded-full text-xs font-bold uppercase tracking-widest text-foreground"
              >
                Reset Filters
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DYNAMIC SPECIFICATIONS DETAIL DRAWER (Slides in Right) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
          {/* Close Backdrop Click */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedProduct(null)} />
          
          <div className="relative w-full max-w-md bg-card border-l border-border h-full flex flex-col p-6 shadow-2xl z-10 animate-slide-in-right overflow-y-auto justify-between">
            
            {/* Header row */}
            <div className="flex items-center justify-between pb-4 border-b border-border/40 mb-6">
              <h3 className="text-sm font-bold tracking-widest text-foreground flex items-center gap-2 uppercase">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span>Product Ledger</span>
              </h3>
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="p-1.5 rounded-full hover:bg-secondary text-foreground transition-all"
                title="Close drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Spec details body */}
            <div className="flex-1 space-y-6 text-left pb-6">
              
              {/* Product Gallery frame */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-secondary border border-border/30">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                
                {/* Micro thumbnail toggle overlay */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <button 
                    onClick={() => { handleInteract(); setSelectedProduct(prev => prev ? { ...prev, image: selectedProduct.image === prev.hoverImage ? prev.hoverImage : prev.image } : null) }}
                    className="px-2.5 py-1 bg-black/75 rounded text-[8px] text-white font-mono tracking-wider border border-white/10 hover:bg-black"
                  >
                    TOGGLE VIEW
                  </button>
                </div>
              </div>

              {/* Title Price */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-primary font-black">House Spec // Look-{selectedProduct.id}</span>
                <h2 className="text-xl md:text-2xl font-black uppercase text-foreground leading-tight tracking-wide">{selectedProduct.name}</h2>
                <p className="text-lg font-black text-primary font-mono">{selectedProduct.price}</p>
              </div>

              {/* VIP Fitting pass recommendation overlay */}
              {vipProfile && recommendedSize && (
                <div className="p-3.5 border border-primary/30 bg-primary/5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Sparkles className="h-4 w-4 animate-pulse text-primary" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">VIP SIZING RECOMMENDATION</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-foreground/80 font-light">
                    Hello <strong className="text-primary font-bold">{vipProfile.name}</strong>. Based on your registered appointment fittings (Chest: {vipProfile.chest}", Waist: {vipProfile.waist}"), we recommend selecting <span className="bg-primary text-primary-foreground font-mono font-bold px-2 py-0.5 rounded text-xs inline-block mx-0.5 shadow-sm">{recommendedSize}</span> for the best structured silhouette fit.
                  </p>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Product Narrative</span>
                <p className="text-xs leading-relaxed text-muted-foreground font-light">{selectedProduct.desc}</p>
              </div>

              {/* Form specifications swatches sizes */}
              <div className="space-y-4 pt-2 border-t border-border/40">
                
                {/* Select Color Swatch */}
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">
                    Colourway: <span className="text-foreground font-black">{quickColor}</span>
                  </span>
                  <div className="flex gap-2.5">
                    {selectedProduct.swatches.map((sw) => (
                      <button
                        key={sw.name}
                        onClick={() => { if (soundEnabled) sounds.playClick(); setQuickColor(sw.name) }}
                        className={`h-7 w-7 rounded-full border flex items-center justify-center transition-all ${
                          quickColor === sw.name ? 'border-primary scale-110 ring-2 ring-primary/20' : 'border-border hover:scale-105'
                        }`}
                        title={sw.name}
                      >
                        <span className="h-5 w-5 rounded-full" style={{ backgroundColor: sw.hex }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes button list */}
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">
                    Sizing Grid: <span className="text-foreground font-black">{quickSize}</span>
                  </span>
                  <div className="flex gap-2">
                    {selectedProduct.sizes.map((sz) => {
                      const isRecommended = sz === recommendedSize
                      return (
                        <button
                          key={sz}
                          onClick={() => { if (soundEnabled) sounds.playClick(); setQuickSize(sz) }}
                          className={`h-8 min-w-8 px-2 rounded-lg text-xs font-mono font-bold border transition-all flex items-center justify-center gap-1 ${
                            quickSize === sz
                              ? 'bg-primary border-primary text-primary-foreground shadow-md'
                              : isRecommended
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border bg-transparent text-foreground hover:border-foreground/50'
                          }`}
                        >
                          <span>{sz}</span>
                          {isRecommended && <Check className="h-3 w-3 shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                </div>

              </div>

              {/* Composition & Care instructions */}
              <div className="space-y-2 border-t border-border/40 pt-4">
                <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Composition & Maintenance</span>
                <div className="p-3.5 bg-secondary/35 border border-border/40 rounded-2xl text-[10px] text-muted-foreground font-mono leading-relaxed">
                  {selectedProduct.composition}
                </div>
              </div>

            </div>

            {/* Footer buy actions */}
            <div className="border-t border-border/40 pt-4 mt-auto">
              <button
                onClick={handleAddDrawerItem}
                disabled={addedItem}
                className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  addedItem
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                    : 'bg-primary text-primary-foreground hover:bg-accent shadow-lg shadow-primary/20 hover:scale-[1.01]'
                }`}
              >
                {addedItem ? (
                  <>
                    <Check className="h-4.5 w-4.5" />
                    <span>Item Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4.5 w-4.5" />
                    <span>Purchase Selection</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MINIMALIST TOAST NOTIFICATION POPUP (Bottom-Right) */}
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
