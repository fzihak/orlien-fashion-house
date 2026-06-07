'use client'

import { Search, Heart, Menu, X, ShoppingBag, Volume2, VolumeX, Plus, Minus, Trash2, Palette, Sparkles } from 'lucide-react'
import { useAppState, Theme } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { useState } from 'react'
import Link from 'next/link'

const navConfig = [
  {
    name: 'Collections',
    path: '/collections',
    dropdown: [
      { name: 'New Arrivals', path: '/collections/new-arrivals' },
      { name: 'Spring / Summer', path: '/collections/spring-summer' },
      { name: 'Autumn / Winter', path: '/collections/autumn-winter' },
      { name: 'Limited Edition', path: '/collections/limited-edition' }
    ]
  },
  {
    name: 'Runway',
    path: '/runway',
    dropdown: [
      { name: 'Latest Show', path: '/runway/latest-show' },
      { name: 'Campaigns', path: '/runway/campaigns' },
      { name: 'Fashion Films', path: '/runway/fashion-films' }
    ]
  },
  {
    name: 'Editorial',
    path: '/editorial',
    dropdown: [
      { name: 'Stories', path: '/editorial/stories' },
      { name: 'Insights', path: '/editorial/insights' },
      { name: 'Interviews', path: '/editorial/interviews' }
    ]
  },
  {
    name: 'Archive',
    path: '/archive',
    dropdown: [
      { name: 'SS24', path: '/archive/ss24' },
      { name: 'FW24', path: '/archive/fw24' },
      { name: 'SS25', path: '/archive/ss25' },
      { name: 'FW25', path: '/archive/fw25' }
    ]
  },
  {
    name: 'House',
    path: '/house',
    dropdown: [
      { name: 'About ORLIEN', path: '/house/about' },
      { name: 'Craftsmanship', path: '/house/craftsmanship' },
      { name: 'Sustainability', path: '/house/sustainability' },
      { name: 'Contact', path: '/house/contact' }
    ]
  },
  {
    name: 'Shop',
    path: '/shop',
    dropdown: [
      { name: 'Women', path: '/shop/women' },
      { name: 'Men', path: '/shop/men' },
      { name: 'Accessories', path: '/shop/accessories' }
    ]
  }
]

export default function Header() {
  const {
    theme,
    setTheme,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    wishlist,
    toggleWishlist,
    soundEnabled,
    setSoundEnabled,
    isCartOpen,
    setCartOpen,
    isWishlistOpen,
    setWishlistOpen,
    setOracleOpen
  } = useAppState()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null)

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const wishlistItemsCount = wishlist.length

  const handleLinkClick = () => {
    if (soundEnabled) sounds.playClick()
  }

  const themesList: { id: Theme; name: string; color: string; desc: string }[] = [
    { id: 'obsidian', name: 'Obsidian Gold', color: 'bg-[#d4af37]', desc: 'Matte obsidian black with champagne gold' },
    { id: 'cyber', name: 'Neon Cyber', color: 'bg-[#a855f7]', desc: 'Techno dark blue with neon glows' },
    { id: 'ivory', name: 'Parisian Ivory', color: 'bg-[#8e7b5f]', desc: 'Warm white with brushed charcoal' },
    { id: 'emerald', name: 'Royal Emerald', color: 'bg-[#c5a880]', desc: 'Deep forest green with bronze metal' },
  ]

  const totalCartPrice = cart.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
    return acc + (numericPrice * item.quantity)
  }, 0)

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/40 px-6 py-5 md:px-8 transition-colors duration-500">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo - Using public/logo.png */}
            <Link 
              href="/"
              onClick={() => {
                if (soundEnabled) sounds.playSweep()
              }}
              className="animate-fade-in flex items-center"
            >
              <img src="/logo.png" alt="ORLIEN" className="h-14 md:h-10 w-auto object-contain dark:invert" />
            </Link>

            {/* Navigation - Shortened items, Home removed */}
            <nav className="hidden items-center gap-8 md:flex">
              {navConfig.map((item) => (
                <div key={item.name} className="relative group py-1.5">
                  <Link
                    href={item.path}
                    onClick={handleLinkClick}
                    className="text-xs font-bold uppercase tracking-wider text-foreground/85 hover:text-foreground transition-colors relative py-1"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-foreground transition-all duration-300 group-hover:w-full" />
                  </Link>
                  
                  {/* Dropdown Menu Container */}
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2.5 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 glass-panel">
                    <div className="flex flex-col gap-2.5 text-left">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          onClick={handleLinkClick}
                          className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-all flex items-center gap-1.5 group/sub"
                        >
                          <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* Right Icons & Sign In button */}
            <div className="flex items-center gap-4 md:gap-5">
              {/* Sound Synthesizer Controller */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 rounded-full hover:bg-secondary text-foreground transition-all flex items-center justify-center"
                title={soundEnabled ? 'Disable sounds' : 'Enable sounds'}
              >
                {soundEnabled ? (
                  <Volume2 className="h-4.5 w-4.5 text-primary" />
                ) : (
                  <VolumeX className="h-4.5 w-4.5 text-foreground/40" />
                )}
              </button>

              {/* Theme Palette Switcher */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (soundEnabled) sounds.playClick()
                    setShowThemeMenu(!showThemeMenu)
                  }}
                  className={`p-1.5 rounded-full text-foreground transition-all hover:bg-secondary flex items-center justify-center ${showThemeMenu ? 'text-primary' : ''}`}
                  title="Palette Selector"
                >
                  <Palette className="h-4.5 w-4.5" />
                </button>

                {showThemeMenu && (
                  <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 glass-panel">
                    <h4 className="text-xs font-bold tracking-wider text-foreground mb-3 flex items-center gap-1.5 uppercase">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      <span>Palette Selector</span>
                    </h4>
                    <div className="space-y-2">
                      {themesList.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTheme(t.id)
                            setShowThemeMenu(false)
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border flex items-center gap-3 transition-all ${theme === t.id ? 'border-primary bg-primary/10' : 'border-border/60 hover:bg-secondary/60'}`}
                        >
                          <div className={`h-4 w-4 rounded-full ${t.color} border border-foreground/20 shrink-0`} />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-foreground">{t.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{t.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* AI Stylist Trigger */}
              <button
                onClick={() => {
                  if (soundEnabled) sounds.playSuccess()
                  setOracleOpen(true)
                }}
                className="p-1.5 text-foreground hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
                title="AI Style Oracle"
              >
                <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
              </button>

              {/* Search Trigger */}
              <Link
                href="/shop"
                onClick={handleLinkClick}
                className="p-1.5 text-foreground hover:text-primary transition-colors flex items-center justify-center"
              >
                <Search className="h-4.5 w-4.5" />
              </Link>

              {/* Cart Bag Trigger */}
              <button
                onClick={() => {
                  if (soundEnabled) sounds.playClick()
                  setCartOpen(true)
                }}
                className="relative p-1.5 text-foreground hover:text-primary transition-colors flex items-center justify-center"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Sign In Button - Matching image rounded outline button */}
              <Link
                href="/signin"
                onClick={() => {
                  if (soundEnabled) sounds.playSuccess()
                }}
                className="hidden rounded-full border border-foreground px-6 py-2 text-xs font-bold text-foreground hover:bg-foreground hover:text-background transition-colors md:inline-block text-center"
              >
                Sign In
              </Link>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => {
                  if (soundEnabled) sounds.playClick()
                  setMobileMenuOpen(!mobileMenuOpen)
                }}
                className="md:hidden p-1.5 text-foreground hover:text-primary transition-all flex items-center justify-center"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="absolute inset-0" onClick={() => setMobileMenuOpen(false)} />
          
          <div className="fixed right-0 top-0 bottom-0 w-3/4 max-w-sm bg-card border-l border-border p-6 flex flex-col justify-between shadow-2xl z-10 animate-slide-in-right">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-heading font-bold text-lg tracking-widest text-foreground">MENU</span>
                <button
                  onClick={() => {
                    if (soundEnabled) sounds.playClick()
                    setMobileMenuOpen(false)
                  }}
                  className="p-2 rounded-full hover:bg-secondary/80 text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 overflow-y-auto max-h-[65vh] pr-1">
                {navConfig.map((item) => {
                  const isExpanded = mobileExpandedItem === item.name
                  return (
                    <div key={item.name} className="border-b border-border/30 py-2">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.path}
                          onClick={() => {
                            if (soundEnabled) sounds.playClick()
                            setMobileMenuOpen(false)
                          }}
                          className="text-base font-bold tracking-widest uppercase text-foreground hover:text-primary transition-colors py-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => {
                            if (soundEnabled) sounds.playClick()
                            setMobileExpandedItem(isExpanded ? null : item.name)
                          }}
                          className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors"
                          aria-label={`Toggle ${item.name} menu`}
                        >
                          {isExpanded ? (
                            <Minus className="h-4 w-4 text-primary" />
                          ) : (
                            <Plus className="h-4 w-4 text-foreground/60" />
                          )}
                        </button>
                      </div>
                      
                      {isExpanded && (
                        <div className="mt-2 pl-4 flex flex-col gap-2.5 border-l border-border/40 ml-2 animate-fade-in">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.path}
                              onClick={() => {
                                if (soundEnabled) sounds.playClick()
                                setMobileMenuOpen(false)
                              }}
                              className="text-xs font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors py-1 flex items-center gap-2"
                            >
                              <span className="h-1 w-1 rounded-full bg-primary" />
                              <span>{sub.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
                
                {/* AI Stylist Mobile Link */}
                <button
                  onClick={() => {
                    if (soundEnabled) sounds.playSuccess()
                    setMobileMenuOpen(false)
                    setOracleOpen(true)
                  }}
                  className="text-left text-base font-bold tracking-widest uppercase text-primary hover:text-accent transition-colors py-3 border-b border-border/30 flex items-center gap-2 cursor-pointer w-full"
                >
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  <span>AI Stylist</span>
                </button>
              </nav>
            </div>
            
            <div className="text-center text-xs text-muted-foreground pt-6 border-t border-border/40">
              ORLIEN • LUXURY FASHION HOUSE
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="absolute inset-0 cursor-pointer" onClick={() => {
            if (soundEnabled) sounds.playClick()
            setWishlistOpen(false)
          }} />

          <div className="relative w-full max-w-md bg-card border-l border-border h-full flex flex-col p-6 shadow-2xl z-10 animate-slide-in-right">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-lg font-bold tracking-wider text-foreground flex items-center gap-2">
                <Heart className="h-5 w-5 fill-primary text-primary" />
                <span>MY WISHLIST ({wishlistItemsCount})</span>
              </h3>
              <button
                onClick={() => {
                  if (soundEnabled) sounds.playClick()
                  setWishlistOpen(false)
                }}
                className="p-1.5 rounded-full hover:bg-secondary text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                  <Heart className="h-12 w-12 mb-4 text-muted-foreground/30 stroke-1" />
                  <p className="text-sm font-medium">Your wishlist is empty.</p>
                  <p className="text-xs mt-1 text-muted-foreground/60">Save items you love here.</p>
                </div>
              ) : (
                wishlist.map((itemId) => {
                  const itemsLookup: Record<number, { name: string; price: string; image: string }> = {
                    1: { name: 'Leather Jacket', price: '$149', image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=200&h=250&fit=crop' },
                    2: { name: 'Fine Knit T-Shirt', price: '$49', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop' },
                    3: { name: 'Straight Denim Trouser', price: '$89', image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=200&h=250&fit=crop' },
                    4: { name: 'Sneakers Pro', price: '$129', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=250&fit=crop' },
                    5: { name: 'Sartorial Trench Coat', price: '$290', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=250&fit=crop' },
                    6: { name: 'Cyber Bomber Jacket', price: '$180', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200&h=250&fit=crop' },
                    7: { name: 'Pleated Linen Trouser', price: '$110', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=250&fit=crop' },
                    8: { name: 'Geometric Sunglasses', price: '$75', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=250&fit=crop' },
                  }
                  const product = itemsLookup[itemId] || { name: 'Special Item', price: '$99', image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=200&h=250&fit=crop' }
                  
                  return (
                    <div key={itemId} className="flex gap-4 p-3 rounded-2xl bg-secondary/50 border border-border/40 hover:border-border transition-all">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-background shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-foreground truncate">{product.name}</h4>
                        <p className="text-sm font-black text-primary mt-1">{product.price}</p>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <button
                          onClick={() => toggleWishlist(itemId)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            removeFromCart(itemId)
                            addToCart({
                              id: itemId,
                              name: product.name,
                              price: product.price,
                              image: product.image
                            })
                          }}
                          className="text-[10px] font-bold tracking-widest text-primary hover:text-accent transition-all uppercase"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Shopping Bag Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="absolute inset-0 cursor-pointer" onClick={() => {
            if (soundEnabled) sounds.playClick()
            setCartOpen(false)
          }} />

          <div className="relative w-full max-w-md bg-card border-l border-border h-full flex flex-col p-6 shadow-2xl z-10 animate-slide-in-right">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-lg font-bold tracking-wider text-foreground flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span>MY BAG ({cartItemsCount})</span>
              </h3>
              <button
                onClick={() => {
                  if (soundEnabled) sounds.playClick()
                  setCartOpen(false)
                }}
                className="p-1.5 rounded-full hover:bg-secondary text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mb-4 text-muted-foreground/30 stroke-1" />
                  <p className="text-sm font-medium">Your shopping bag is empty.</p>
                  <p className="text-xs mt-1 text-muted-foreground/60">Start shopping to fill it.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-3 rounded-2xl bg-secondary/50 border border-border/40 hover:border-border transition-all">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-background shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate">{item.name}</h4>
                      <div className="flex gap-2 mt-1">
                        {item.size && <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">SIZE: {item.size}</span>}
                        {item.color && <span className="text-[9px] px-1.5 py-0.5 rounded bg-foreground/5 text-foreground/70 border border-border">COLOR: {item.color}</span>}
                      </div>
                      <p className="text-sm font-black text-primary mt-2">{item.price}</p>
                    </div>
                    <div className="flex flex-col justify-between items-end shrink-0">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-2 border border-border/60 bg-background rounded-full px-2 py-0.5 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-foreground/60 hover:text-primary transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold text-foreground min-w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-foreground/60 hover:text-primary transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border pt-4 mt-auto space-y-4">
                <div className="flex items-center justify-between text-foreground">
                  <span className="text-xs tracking-widest font-medium uppercase">Estimated Total</span>
                  <span className="text-xl font-black text-primary">${totalCartPrice.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => {
                    if (soundEnabled) sounds.playSuccess()
                    setCartOpen(false)
                  }}
                  className="w-full py-4 bg-primary text-primary-foreground hover:bg-accent transition-all font-bold tracking-widest uppercase rounded-full text-xs block text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
