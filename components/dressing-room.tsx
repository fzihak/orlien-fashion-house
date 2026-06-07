'use client'

import { useState, useEffect } from 'react'
import { Sparkles, ShoppingBag, Check, RefreshCw, Layers, ShieldCheck, Heart, X } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

interface OutfitItem {
  id: number
  name: string
  price: string
  image: string
  category: 'outerwear' | 'top' | 'bottom' | 'acc'
  swatches: { name: string; hex: string }[]
  sizes: string[]
}

export default function DressingRoom() {
  const { soundEnabled, addToCart, wishlist, toggleWishlist } = useAppState()
  
  // Equipped Slots
  const [equippedOuter, setEquippedOuter] = useState<OutfitItem | null>(null)
  const [equippedTop, setEquippedTop] = useState<OutfitItem | null>(null)
  const [equippedBottom, setEquippedBottom] = useState<OutfitItem | null>(null)
  const [equippedAcc, setEquippedAcc] = useState<OutfitItem | null>(null)
  
  // Custom selections on equipped items
  const [outerColor, setOuterColor] = useState<string>('')
  const [outerSize, setOuterSize] = useState<string>('')
  
  const [topColor, setTopColor] = useState<string>('')
  const [topSize, setTopSize] = useState<string>('')
  
  const [bottomColor, setBottomColor] = useState<string>('')
  const [bottomSize, setBottomSize] = useState<string>('')
  
  const [accColor, setAccColor] = useState<string>('')
  const [accSize, setAccSize] = useState<string>('')

  const [addedToCart, setAddedToCart] = useState(false)

  // Catalog Database
  const inventory: OutfitItem[] = [
    // Outerwear
    { 
      id: 5, 
      name: 'Sartorial Trench Coat', 
      price: '$290', 
      category: 'outerwear', 
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
      swatches: [{ name: 'Cream Tan', hex: '#d2b48c' }, { name: 'Slate Grey', hex: '#708090' }],
      sizes: ['S', 'M', 'L']
    },
    { 
      id: 6, 
      name: 'Cyber Bomber Jacket', 
      price: '$180', 
      category: 'outerwear', 
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop',
      swatches: [{ name: 'Tech Black', hex: '#111111' }, { name: 'Cobalt Blue', hex: '#4169e1' }],
      sizes: ['M', 'L', 'XL']
    },
    { 
      id: 1, 
      name: 'Leather Jacket', 
      price: '$149', 
      category: 'outerwear', 
      image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=500&fit=crop',
      swatches: [{ name: 'Onyx Black', hex: '#1c1c1c' }, { name: 'Whiskey Brown', hex: '#8b5a2b' }],
      sizes: ['S', 'M', 'L']
    },
    // Tops
    { 
      id: 2, 
      name: 'Fine Knit T-Shirt', 
      price: '$49', 
      category: 'top', 
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      swatches: [{ name: 'Off-White', hex: '#fcfaf2' }, { name: 'Charcoal', hex: '#36454f' }],
      sizes: ['XS', 'S', 'M', 'L']
    },
    // Bottoms
    { 
      id: 7, 
      name: 'Pleated Linen Trouser', 
      price: '$110', 
      category: 'bottom', 
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
      swatches: [{ name: 'Cream White', hex: '#faf9f6' }, { name: 'Taupe Clay', hex: '#8f8679' }],
      sizes: ['30', '32', '34']
    },
    { 
      id: 3, 
      name: 'Straight Denim Trouser', 
      price: '$89', 
      category: 'bottom', 
      image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=500&fit=crop',
      swatches: [{ name: 'Indigo Blue', hex: '#2e5894' }, { name: 'Faded Black', hex: '#2b2b2a' }],
      sizes: ['30', '32', '34', '36']
    },
    // Accessories
    { 
      id: 8, 
      name: 'Geometric Sunglasses', 
      price: '$75', 
      category: 'acc', 
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop',
      swatches: [{ name: 'Polarized Black', hex: '#000000' }, { name: 'Silver Mirror', hex: '#e5e4e2' }],
      sizes: ['OS']
    },
  ]

  // Default values set when equipping
  useEffect(() => {
    if (equippedOuter) {
      setOuterColor(equippedOuter.swatches[0].name)
      setOuterSize(equippedOuter.sizes[0])
    }
  }, [equippedOuter])

  useEffect(() => {
    if (equippedTop) {
      setTopColor(equippedTop.swatches[0].name)
      setTopSize(equippedTop.sizes[0])
    }
  }, [equippedTop])

  useEffect(() => {
    if (equippedBottom) {
      setBottomColor(equippedBottom.swatches[0].name)
      setBottomSize(equippedBottom.sizes[0])
    }
  }, [equippedBottom])

  useEffect(() => {
    if (equippedAcc) {
      setAccColor(equippedAcc.swatches[0].name)
      setAccSize(equippedAcc.sizes[0])
    }
  }, [equippedAcc])

  // Equip handler
  const handleEquip = (item: OutfitItem) => {
    if (soundEnabled) sounds.playClick()
    setAddedToCart(false)

    if (item.category === 'outerwear') {
      setEquippedOuter(equippedOuter?.id === item.id ? null : item)
    } else if (item.category === 'top') {
      setEquippedTop(equippedTop?.id === item.id ? null : item)
    } else if (item.category === 'bottom') {
      setEquippedBottom(equippedBottom?.id === item.id ? null : item)
    } else if (item.category === 'acc') {
      setEquippedAcc(equippedAcc?.id === item.id ? null : item)
    }
  }

  // Clear equipped slots
  const resetMannequin = () => {
    if (soundEnabled) sounds.playPop()
    setEquippedOuter(null)
    setEquippedTop(null)
    setEquippedBottom(null)
    setEquippedAcc(null)
    setAddedToCart(false)
  }

  // Calculations
  const activeItems = [equippedOuter, equippedTop, equippedBottom, equippedAcc].filter(Boolean) as OutfitItem[]
  const activeItemsCount = activeItems.length
  
  const totalPrice = [equippedOuter, equippedTop, equippedBottom, equippedAcc].reduce((acc, item) => {
    if (!item) return acc
    const numeric = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
    return acc + numeric
  }, 0)

  // Dynamic checks for style matrix
  const colorHarmony = activeItemsCount > 1 ? 25 : 0
  const silhouetteBalance = equippedOuter && equippedBottom ? 35 : 0
  const layeringStrength = equippedOuter && equippedTop ? 30 : 0
  const accBonus = equippedAcc ? 10 : 0
  const styleIndex = Math.min(colorHarmony + silhouetteBalance + layeringStrength + accBonus, 100)

  let styleLabel = 'Aesthetic Diagnosis'
  let comfortLevel = 50

  if (activeItemsCount > 0) {
    comfortLevel = 60 + activeItemsCount * 8
    if (equippedOuter?.id === 5 && equippedBottom?.id === 7) {
      styleLabel = 'Sartorial Parisian Chic'
      comfortLevel = 88
    } else if (equippedOuter?.id === 6 && equippedBottom?.id === 3) {
      styleLabel = 'Kinetic Techwear Street'
      comfortLevel = 94
    } else if (equippedOuter?.id === 1 && equippedBottom?.id === 3) {
      styleLabel = 'Obsidian Heritage Classic'
      comfortLevel = 80
    } else {
      styleLabel = 'Avant-Garde Fusion'
    }
  }

  const handleBuyOutfit = () => {
    if (equippedOuter) {
      addToCart({
        id: equippedOuter.id,
        name: equippedOuter.name,
        price: equippedOuter.price,
        image: equippedOuter.image,
        color: outerColor,
        size: outerSize
      })
    }
    if (equippedTop) {
      addToCart({
        id: equippedTop.id,
        name: equippedTop.name,
        price: equippedTop.price,
        image: equippedTop.image,
        color: topColor,
        size: topSize
      })
    }
    if (equippedBottom) {
      addToCart({
        id: equippedBottom.id,
        name: equippedBottom.name,
        price: equippedBottom.price,
        image: equippedBottom.image,
        color: bottomColor,
        size: bottomSize
      })
    }
    if (equippedAcc) {
      addToCart({
        id: equippedAcc.id,
        name: equippedAcc.name,
        price: equippedAcc.price,
        image: equippedAcc.image,
        color: accColor,
        size: accSize
      })
    }
    setAddedToCart(true)
    if (soundEnabled) sounds.playSuccess()
  }

  return (
    <div id="dressing-room" className="bg-background px-6 py-20 md:px-8 border-b border-border/30 transition-colors duration-500 relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Layers className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase">LABORATORY EXPERIMENT</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Atelier Design Laboratory
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl font-light">
              Configure and calibrate structural fabric layers on our interactive mannequin visualizer deck.
            </p>
          </div>

          <button
            onClick={resetMannequin}
            className="px-6 py-3 border border-border/80 hover:bg-secondary/60 hover:text-primary text-foreground rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset Calibrations</span>
          </button>
        </div>
        


        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Mannequin Visual Canvas - Left (6 Columns) */}
          <div className="lg:col-span-6 bg-card/40 border border-border/60 rounded-3xl p-6 glass-panel relative flex flex-col items-center justify-between min-h-[600px] overflow-hidden">
            
            {/* Tech HUD Line overlays */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block" viewBox="0 0 450 480">
              {/* Acc Sunglasses Line to Head (left column layout to center body node) */}
              <path 
                d="M 110 55 L 225 70" 
                fill="none" 
                stroke={equippedAcc ? 'var(--primary)' : 'rgba(255,255,255,0.06)'} 
                strokeWidth={equippedAcc ? '1.5' : '1'} 
                strokeDasharray={equippedAcc ? '0' : '4 4'}
                className="transition-colors duration-500"
              />
              
              {/* Outerwear Line to Shoulders */}
              <path 
                d="M 110 215 L 225 150" 
                fill="none" 
                stroke={equippedOuter ? 'var(--primary)' : 'rgba(255,255,255,0.06)'} 
                strokeWidth={equippedOuter ? '1.5' : '1'} 
                strokeDasharray={equippedOuter ? '0' : '4 4'}
                className="transition-colors duration-500"
              />
              
              {/* Top Line to Chest */}
              <path 
                d="M 340 135 L 225 155" 
                fill="none" 
                stroke={equippedTop ? 'var(--primary)' : 'rgba(255,255,255,0.06)'} 
                strokeWidth={equippedTop ? '1.5' : '1'} 
                strokeDasharray={equippedTop ? '0' : '4 4'}
                className="transition-colors duration-500"
              />
              
              {/* Bottoms Line to Legs */}
              <path 
                d="M 340 295 L 225 290" 
                fill="none" 
                stroke={equippedBottom ? 'var(--primary)' : 'rgba(255,255,255,0.06)'} 
                strokeWidth={equippedBottom ? '1.5' : '1'} 
                strokeDasharray={equippedBottom ? '0' : '4 4'}
                className="transition-colors duration-500"
              />
            </svg>

            <span className="text-[9px] font-mono tracking-widest text-primary/40 mb-4 z-10 uppercase">HOLOGRAPHIC DRESSING DECK v1.2</span>

            {/* Visual Mannequin Grid */}
            <div className="relative w-full grid grid-cols-1 md:grid-cols-12 items-center gap-4 z-10">
              
              {/* LEFT COLUMN: Slots for Acc, Outerwear */}
              <div className="md:col-span-4 space-y-4 flex flex-col items-center">
                
                {/* Accessory Slot */}
                <div className={`w-36 p-3 rounded-2xl border transition-all ${
                  equippedAcc ? 'border-primary/60 bg-secondary/50' : 'border-dashed border-border/60 bg-transparent opacity-60'
                }`}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-black">HEAD ACCESSORY</span>
                    {equippedAcc && (
                      <button 
                        onClick={() => { if (soundEnabled) sounds.playPop(); setEquippedAcc(null); }}
                        className="text-muted-foreground hover:text-destructive p-0.5 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  {equippedAcc ? (
                    <div className="space-y-2">
                      <div className="w-full h-14 rounded-lg overflow-hidden relative">
                        <img src={equippedAcc.image} alt={equippedAcc.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[10px] text-foreground font-bold truncate">{equippedAcc.name.split(' ')[0]}</p>
                    </div>
                  ) : (
                    <div className="h-14 flex items-center justify-center text-[10px] text-muted-foreground italic">Empty Slot</div>
                  )}
                </div>

                {/* Outerwear Slot */}
                <div className={`w-36 p-3 rounded-2xl border transition-all ${
                  equippedOuter ? 'border-primary/60 bg-secondary/50' : 'border-dashed border-border/60 bg-transparent opacity-60'
                }`}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-black">OUTER LAYER</span>
                    {equippedOuter && (
                      <button 
                        onClick={() => { if (soundEnabled) sounds.playPop(); setEquippedOuter(null); }}
                        className="text-muted-foreground hover:text-destructive p-0.5 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  {equippedOuter ? (
                    <div className="space-y-2">
                      <div className="w-full h-20 rounded-lg overflow-hidden relative">
                        <img src={equippedOuter.image} alt={equippedOuter.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[10px] text-foreground font-bold truncate">{equippedOuter.name}</p>
                      
                      {/* Swatch & Size Selector on Equipped Slot */}
                      <div className="flex items-center justify-between pt-1 border-t border-border/30">
                        <select 
                          value={outerSize}
                          onChange={(e) => setOuterSize(e.target.value)}
                          className="bg-background text-[9px] border border-border rounded px-1 text-foreground focus:outline-none"
                        >
                          {equippedOuter.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <div className="flex gap-1">
                          {equippedOuter.swatches.map(sw => (
                            <button
                              key={sw.name}
                              onClick={() => setOuterColor(sw.name)}
                              className={`h-3 w-3 rounded-full border ${outerColor === sw.name ? 'border-primary' : 'border-border'}`}
                              style={{ backgroundColor: sw.hex }}
                              title={sw.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-24 flex items-center justify-center text-[10px] text-muted-foreground italic">Empty Slot</div>
                  )}
                </div>

              </div>

              {/* CENTER COLUMN: glowing vector avatar */}
              <div className="md:col-span-4 flex justify-center py-6 md:py-0">
                <div className="relative w-28 h-[280px] border border-border/20 rounded-full flex items-center justify-center bg-secondary/5">
                  <svg className="w-full h-full text-foreground/10 hover:text-primary/20 transition-colors" viewBox="0 0 100 240">
                    {/* Glowing Wireframe Mannequin Outline */}
                    <path 
                      d="M 50 15 C 53 15, 55 18, 55 22 C 55 26, 53 29, 50 29 C 47 29, 45 26, 45 22 C 45 18, 47 15, 50 15 Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                    />
                    <path 
                      d="M 47 29 L 53 29 L 58 35 L 68 46 L 75 75 L 72 78 L 65 52 L 60 52 L 60 110 L 68 180 L 65 220 L 59 220 L 52 140 L 48 140 L 41 220 L 35 220 L 32 180 L 40 110 L 40 52 L 35 52 L 28 78 L 25 75 L 32 46 L 42 35 Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                    />
                    
                    {/* Glowing active node elements */}
                    <circle cx={50} cy={22} r={3} className={`transition-all ${equippedAcc ? 'fill-primary animate-ping' : 'fill-foreground/15'}`} />
                    <circle cx={50} cy={45} r={3.5} className={`transition-all ${equippedOuter ? 'fill-primary animate-ping' : 'fill-foreground/15'}`} />
                    <circle cx={50} cy={75} r={3} className={`transition-all ${equippedTop ? 'fill-primary animate-ping' : 'fill-foreground/15'}`} />
                    <circle cx={50} cy={130} r={3} className={`transition-all ${equippedBottom ? 'fill-primary animate-ping' : 'fill-foreground/15'}`} />
                  </svg>
                </div>
              </div>

              {/* RIGHT COLUMN: Slots for Top, Bottom */}
              <div className="md:col-span-4 space-y-4 flex flex-col items-center">
                
                {/* Top / Torso Slot */}
                <div className={`w-36 p-3 rounded-2xl border transition-all ${
                  equippedTop ? 'border-primary/60 bg-secondary/50' : 'border-dashed border-border/60 bg-transparent opacity-60'
                }`}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-black">MID / INNER TOP</span>
                    {equippedTop && (
                      <button 
                        onClick={() => { if (soundEnabled) sounds.playPop(); setEquippedTop(null); }}
                        className="text-muted-foreground hover:text-destructive p-0.5 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  {equippedTop ? (
                    <div className="space-y-2">
                      <div className="w-full h-18 rounded-lg overflow-hidden relative">
                        <img src={equippedTop.image} alt={equippedTop.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[10px] text-foreground font-bold truncate">{equippedTop.name}</p>
                      
                      {/* Swatch & Size Selector on Equipped Slot */}
                      <div className="flex items-center justify-between pt-1 border-t border-border/30">
                        <select 
                          value={topSize}
                          onChange={(e) => setTopSize(e.target.value)}
                          className="bg-background text-[9px] border border-border rounded px-1 text-foreground focus:outline-none"
                        >
                          {equippedTop.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <div className="flex gap-1">
                          {equippedTop.swatches.map(sw => (
                            <button
                              key={sw.name}
                              onClick={() => setTopColor(sw.name)}
                              className={`h-3 w-3 rounded-full border ${topColor === sw.name ? 'border-primary' : 'border-border'}`}
                              style={{ backgroundColor: sw.hex }}
                              title={sw.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-20 flex items-center justify-center text-[10px] text-muted-foreground italic">Empty Slot</div>
                  )}
                </div>

                {/* Bottoms Slot */}
                <div className={`w-36 p-3 rounded-2xl border transition-all ${
                  equippedBottom ? 'border-primary/60 bg-secondary/50' : 'border-dashed border-border/60 bg-transparent opacity-60'
                }`}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-black">LEGS / BOTTOMS</span>
                    {equippedBottom && (
                      <button 
                        onClick={() => { if (soundEnabled) sounds.playPop(); setEquippedBottom(null); }}
                        className="text-muted-foreground hover:text-destructive p-0.5 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  {equippedBottom ? (
                    <div className="space-y-2">
                      <div className="w-full h-20 rounded-lg overflow-hidden relative">
                        <img src={equippedBottom.image} alt={equippedBottom.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[10px] text-foreground font-bold truncate">{equippedBottom.name}</p>
                      
                      {/* Swatch & Size Selector on Equipped Slot */}
                      <div className="flex items-center justify-between pt-1 border-t border-border/30">
                        <select 
                          value={bottomSize}
                          onChange={(e) => setBottomSize(e.target.value)}
                          className="bg-background text-[9px] border border-border rounded px-1 text-foreground focus:outline-none"
                        >
                          {equippedBottom.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <div className="flex gap-1">
                          {equippedBottom.swatches.map(sw => (
                            <button
                              key={sw.name}
                              onClick={() => setBottomColor(sw.name)}
                              className={`h-3 w-3 rounded-full border ${bottomColor === sw.name ? 'border-primary' : 'border-border'}`}
                              style={{ backgroundColor: sw.hex }}
                              title={sw.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-24 flex items-center justify-center text-[10px] text-muted-foreground italic">Empty Slot</div>
                  )}
                </div>

              </div>

            </div>

            {/* Gauges & Computed Scores */}
            <div className="w-full mt-6 space-y-4 pt-6 border-t border-border/50">
              
              {/* Score Gauges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary/30 border border-border/40 rounded-2xl">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Style Synergy</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-black text-primary">{styleIndex}%</span>
                    <span className="text-[9px] text-muted-foreground truncate">({styleLabel})</span>
                  </div>
                  <div className="h-1 bg-border rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${styleIndex}%` }} />
                  </div>
                </div>

                <div className="p-3 bg-secondary/30 border border-border/40 rounded-2xl">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Comfort Index</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-black text-foreground">{comfortLevel}%</span>
                    <span className="text-[9px] text-muted-foreground">Standard</span>
                  </div>
                  <div className="h-1 bg-border rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-accent transition-all duration-500" style={{ width: `${comfortLevel}%` }} />
                  </div>
                </div>
              </div>

              {/* Dynamic Synergy checks checklist */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground font-mono">
                <div className="flex items-center gap-1">
                  <span className={colorHarmony > 0 ? 'text-primary font-bold' : 'opacity-40'}>●</span>
                  <span>Color Balance</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={silhouetteBalance > 0 ? 'text-primary font-bold' : 'opacity-40'}>●</span>
                  <span>Layer Harmony</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={layeringStrength > 0 ? 'text-primary font-bold' : 'opacity-40'}>●</span>
                  <span>Fit Proportion</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={accBonus > 0 ? 'text-primary font-bold' : 'opacity-40'}>●</span>
                  <span>Eyewear Finish</span>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="flex items-center justify-between pt-4 border-t border-border/20">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Total Outfit cost</span>
                  <p className="text-xl font-black text-primary">${totalPrice}</p>
                </div>

                <button
                  onClick={handleBuyOutfit}
                  disabled={activeItemsCount === 0 || addedToCart}
                  className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-primary text-primary-foreground hover:bg-accent disabled:opacity-30 disabled:pointer-events-none'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-4.5 w-4.5" />
                      <span>Equipped Bagged</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4.5 w-4.5" />
                      <span>Register Outfit to Bag</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Grid Selection list - Right (6 Columns) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Outerwear Category */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-xs font-bold tracking-widest uppercase">01 • Outerwear Layering</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">Coats & Jackets</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {inventory.filter(i => i.category === 'outerwear').map((item) => {
                  const isEquipped = equippedOuter?.id === item.id
                  const isWished = wishlist.includes(item.id)
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleEquip(item)}
                      className={`cursor-pointer group relative p-3 rounded-2xl border transition-all ${
                        isEquipped
                          ? 'border-primary bg-primary/5 shadow-md shadow-primary/5'
                          : 'border-border/60 hover:border-border hover:bg-secondary/40'
                      }`}
                    >
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-2 bg-background relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleWishlist(item.id)
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 border border-white/10 hover:bg-black text-white hover:text-primary transition-colors"
                        >
                          <Heart className={`h-3 w-3 ${isWished ? 'fill-primary text-primary' : ''}`} />
                        </button>
                      </div>
                      <h4 className="text-[10px] font-bold text-foreground truncate">{item.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-black text-primary">{item.price}</span>
                        <span className="text-[9px] font-bold tracking-wider text-muted-foreground/60 uppercase group-hover:text-primary">
                          {isEquipped ? 'Equipped' : 'Equip'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mid Layers / Tops & Bottoms Double Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Tops */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-xs font-bold tracking-widest uppercase">02 • Torso Tops</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">Knitwear</span>
                </div>
                {inventory.filter(i => i.category === 'top').map((item) => {
                  const isEquipped = equippedTop?.id === item.id
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleEquip(item)}
                      className={`cursor-pointer group p-3 rounded-2xl border transition-all ${
                        isEquipped ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-border hover:bg-secondary/40'
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] font-bold text-foreground truncate">{item.name}</h4>
                          <p className="text-xs font-black text-primary">{item.price}</p>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0">
                          {isEquipped ? 'Active' : 'Wear'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Accessories */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-xs font-bold tracking-widest uppercase">04 • Accents</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">Eyewear</span>
                </div>
                {inventory.filter(i => i.category === 'acc').map((item) => {
                  const isEquipped = equippedAcc?.id === item.id
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleEquip(item)}
                      className={`cursor-pointer group p-3 rounded-2xl border transition-all ${
                        isEquipped ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-border hover:bg-secondary/40'
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] font-bold text-foreground truncate">{item.name}</h4>
                          <p className="text-xs font-black text-primary">{item.price}</p>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0">
                          {isEquipped ? 'Active' : 'Wear'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>

            {/* Bottoms Category */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-xs font-bold tracking-widest uppercase">03 • Structural Trousers</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-secondary text-muted-foreground">Denims & Linens</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {inventory.filter(i => i.category === 'bottom').map((item) => {
                  const isEquipped = equippedBottom?.id === item.id
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleEquip(item)}
                      className={`cursor-pointer group p-3 rounded-2xl border transition-all ${
                        isEquipped ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-border hover:bg-secondary/40'
                      }`}
                    >
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[10px] font-bold text-foreground truncate">{item.name}</h4>
                          <p className="text-sm font-black text-primary mt-1">{item.price}</p>
                          <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1 block group-hover:text-primary">
                            {isEquipped ? 'Active • Remove' : 'Equip Bottom'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
