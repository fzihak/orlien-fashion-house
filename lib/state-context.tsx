'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { sounds } from '@/lib/sound-utils'

export type Theme = 'obsidian' | 'cyber' | 'ivory' | 'emerald'

export interface CartItem {
  id: number
  name: string
  price: string
  image: string
  size?: string
  color?: string
  quantity: number
}

interface StateContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  updateQuantity: (id: number, delta: number) => void
  wishlist: number[]
  toggleWishlist: (id: number) => void
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
  isWishlistOpen: boolean
  setWishlistOpen: (open: boolean) => void
  isOracleOpen: boolean
  setOracleOpen: (open: boolean) => void
}

const StateContext = createContext<StateContextType | undefined>(undefined)

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('obsidian')
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(false)
  const [isCartOpen, setCartOpen] = useState<boolean>(false)
  const [isWishlistOpen, setWishlistOpen] = useState<boolean>(false)
  const [isOracleOpen, setOracleOpen] = useState<boolean>(false)

  // Sync theme class to html/body
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.classList.remove('theme-obsidian', 'theme-cyber', 'theme-ivory', 'theme-emerald')
      root.classList.add(`theme-${theme}`)
    }
  }, [theme])

  // Play introductory chord once the user activates sound
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    if (soundEnabled) {
      sounds.playSweep()
    }
  }

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled)
    sounds.enable(enabled)
    if (enabled) {
      setTimeout(() => {
        sounds.playChord()
      }, 50)
    }
  }

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      )

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prevCart, { ...newItem, quantity: 1 }]
    })

    if (soundEnabled) {
      sounds.playSuccess()
    }
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    if (soundEnabled) {
      sounds.playPop()
    }
  }

  const clearCart = () => {
    setCart([])
    if (soundEnabled) {
      sounds.playPop()
    }
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta
            return { ...item, quantity: nextQty }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    )
    if (soundEnabled) {
      sounds.playClick()
    }
  }

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(id)
      if (exists) {
        if (soundEnabled) sounds.playPop()
        return prev.filter((item) => item !== id)
      } else {
        if (soundEnabled) sounds.playSuccess()
        return [...prev, id]
      }
    })
  }

  return (
    <StateContext.Provider
      value={{
        theme,
        setTheme,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        wishlist,
        toggleWishlist,
        soundEnabled,
        setSoundEnabled,
        isCartOpen,
        setCartOpen,
        isWishlistOpen,
        setWishlistOpen,
        isOracleOpen,
        setOracleOpen,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider')
  }
  return context
}
