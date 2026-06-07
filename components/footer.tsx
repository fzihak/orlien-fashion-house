'use client'

import { Heart, Mail, Send, Star, ArrowUp } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import Link from 'next/link'

export default function Footer() {
  const { soundEnabled } = useAppState()

  const handleLinkClick = () => {
    if (soundEnabled) sounds.playClick()
  }

  const handleScrollTop = () => {
    if (soundEnabled) sounds.playSweep()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#050505] text-gray-400 border-t border-border/20 transition-colors duration-500">
      <div className="px-6 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <Link href="/" onClick={handleLinkClick} className="block w-fit">
                <img src="/logo.png" alt="ORLIEN" className="h-18 md:h-12 w-auto object-contain brightness-0 invert" />
              </Link>
              <p className="text-xs leading-relaxed max-w-xs font-light text-gray-500">
                Curating timeless tailoring and modern visual elegance for the modern luxury lifestyle.
              </p>
              <div className="text-[10px] text-primary/60 font-mono">ESTABLISHED / 2026</div>
            </div>

            {/* Shop Column */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Shop</h4>
              <ul className="space-y-3 text-xs font-light">
                {[
                  { name: 'New Arrivals', path: '/collections/new-arrivals' },
                  { name: 'Best Sellers', path: '/shop' },
                  { name: 'Collections', path: '/collections' },
                  { name: 'Bespoke Atelier', path: '/atelier' }
                ].map(item => (
                  <li key={item.name}>
                    <Link 
                      href={item.path} 
                      onClick={handleLinkClick}
                      className="hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-1.5 h-[1px] bg-primary transition-all" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">About</h4>
              <ul className="space-y-3 text-xs font-light">
                {[
                  { name: 'Our Story', path: '/house/about' },
                  { name: 'Sustainability', path: '/house/sustainability' },
                  { name: 'Editorial Campaigns', path: '/runway/campaigns' },
                  { name: 'Careers', path: '/editorial' }
                ].map(item => (
                  <li key={item.name}>
                    <Link 
                      href={item.path} 
                      onClick={handleLinkClick}
                      className="hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-1.5 h-[1px] bg-primary transition-all" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Support</h4>
              <ul className="space-y-3 text-xs font-light">
                {[
                  { name: 'Help Center', path: '/customer-care' },
                  { name: 'Shipping Info', path: '/customer-care' },
                  { name: 'Returns Policy', path: '/customer-care' },
                  { name: 'Size Guides', path: '/customer-care' }
                ].map(item => (
                  <li key={item.name}>
                    <Link 
                      href={item.path} 
                      onClick={handleLinkClick}
                      className="hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-1.5 h-[1px] bg-primary transition-all" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lower copyright bar */}
          <div className="border-t border-border/30 pt-10 mt-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              <p className="text-[10px] tracking-wider text-gray-600 uppercase">
                © 2026 ORLIEN. All rights reserved.
              </p>

              {/* Social chimes */}
              <div className="flex gap-4">
                {[
                  { icon: Mail, label: 'Email Support' },
                  { icon: Send, label: 'Telegram channel' },
                  { icon: Star, label: 'Rate Us' }
                ].map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <button
                      key={idx}
                      onClick={handleLinkClick}
                      className="p-2 border border-border/40 rounded-full hover:border-primary/50 text-gray-500 hover:text-primary transition-all active:scale-95"
                      title={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  )
                })}
              </div>

              {/* Scroll back up */}
              <button
                onClick={handleScrollTop}
                className="px-4 py-2 rounded-full border border-border/40 hover:border-primary/50 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 hover:text-primary transition-colors shrink-0"
              >
                <span>Scroll Up</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
