'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { ArrowLeft, MapPin, Phone, Mail, Send, Check } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const { soundEnabled } = useAppState()
  
  const [activeShowroom, setActiveShowroom] = useState<'ny' | 'paris' | 'milan'>('ny')
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const handleShowroomChange = (id: 'ny' | 'paris' | 'milan') => {
    if (soundEnabled) sounds.playSweep()
    setActiveShowroom(id)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return

    setSending(true)
    if (soundEnabled) sounds.playSweep()

    setTimeout(() => {
      setSending(false)
      setSent(true)
      if (soundEnabled) sounds.playSuccess()

      setTimeout(() => {
        setSent(false)
        setName('')
        setEmail('')
        setMessage('')
      }, 2000)
    }, 1500)
  }

  const showrooms = {
    ny: {
      name: 'NEW YORK SHOWROOM',
      address: 'Broadway Docks Studio A, Soho, New York',
      phone: '+1 (800) ORLIEN-NY',
      hours: 'Mon - Sat // 10:00 - 19:00',
      image: '/runway/bts-01.avif'
    },
    paris: {
      name: 'PARIS ATELIER',
      address: '3 Rue de la Paix, Place Vendôme, Paris',
      phone: '+33 (0) 1 42 68 53 00',
      hours: 'Mon - Fri // 09:30 - 18:30',
      image: '/runway/bts-04.avif'
    },
    milan: {
      name: 'MILAN BOUTIQUE',
      address: 'Galleria Vittorio Emanuele II, Via Monte Napoleone, Milan',
      phone: '+39 02 7600 5900',
      hours: 'Mon - Sun // 10:30 - 19:30',
      image: '/runway/bts-07.avif'
    }
  }

  const details = showrooms[activeShowroom]

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      <section className="relative w-full py-16 border-b border-border/40 text-left">
        <div className="mx-auto max-w-6xl px-6 md:px-8 space-y-16">
          
          {/* Breadcrumb back */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-mono border-b border-border/30 pb-4">
            <Link href="/house" onClick={handleInteract} className="hover:text-primary flex items-center gap-1 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to House</span>
            </Link>
            <span>/</span>
            <span>Bespoke Directory</span>
          </div>

          {/* Title Area */}
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase font-black">
              ORLIEN WORLDWIDE CONNECTIONS
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-heading uppercase tracking-tight leading-none">
              Contact Us
            </h1>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider leading-relaxed">
              Dispatch press inquiries, secure showroom appointments, and register studio partnerships.
            </p>
          </div>

          {/* Showroom Switcher & Map Visual Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border-b border-border/20 pb-12">
            
            {/* Switcher & info (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#777] font-black uppercase">BOUTIQUE LOCATIONS</span>
                  <div className="flex gap-2.5 mt-2">
                    {[
                      { id: 'ny', label: 'New York' },
                      { id: 'paris', label: 'Paris' },
                      { id: 'milan', label: 'Milan' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => handleShowroomChange(btn.id as any)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          activeShowroom === btn.id
                            ? 'bg-foreground text-background font-black shadow-md'
                            : 'text-foreground/60 hover:text-foreground hover:bg-secondary/40 border border-border/20'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-border/40 bg-card/25 rounded-2xl space-y-4 font-mono text-xs">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">{details.name}</h3>
                  <div className="space-y-3 font-light text-muted-foreground">
                    <div className="flex gap-2 items-start">
                      <MapPin className="h-4.5 w-4.5 text-primary shrink-0" />
                      <span>{details.address}</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Phone className="h-4.5 w-4.5 text-primary shrink-0" />
                      <span>{details.phone}</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Mail className="h-4.5 w-4.5 text-primary shrink-0" />
                      <span>{details.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Press Directories */}
              <div className="p-5 border border-border/20 rounded-xl bg-card/15 font-mono text-[10px] space-y-2 uppercase text-muted-foreground">
                <div className="flex justify-between">
                  <span>Press & Editorial Relations</span>
                  <strong className="text-foreground">press@orlien.com</strong>
                </div>
                <div className="flex justify-between">
                  <span>Wholesale & Partnerships</span>
                  <strong className="text-foreground">partners@orlien.com</strong>
                </div>
              </div>
            </div>

            {/* Showroom Image (7 Cols) */}
            <div className="lg:col-span-7 aspect-[21/9] lg:aspect-auto rounded-3xl overflow-hidden bg-secondary border border-border/30 shadow-sm">
              <img src={details.image} alt={details.name} className="w-full h-full object-cover grayscale transition-all duration-[800ms]" />
            </div>

          </div>

          {/* Form wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="text-[9px] font-mono tracking-widest text-primary font-black uppercase">DISPATCH BOARD</span>
              <h2 className="text-2xl font-serif font-black uppercase text-foreground leading-tight">
                Submit Inquiry
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                Fill in the dispatch board to register custom measurements fitting pass requests, editorial catalog orders, or wholesale questions.
              </p>
            </div>
            
            <div className="lg:col-span-7 bg-card/25 border border-border/40 rounded-3xl p-6 md:p-8 glass-panel relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono uppercase tracking-widest font-bold text-muted-foreground">Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={handleInteract}
                      placeholder="Your name"
                      className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground/50 font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono uppercase tracking-widest font-bold text-muted-foreground">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={handleInteract}
                      placeholder="Your email"
                      className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground/50 font-mono"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] font-mono uppercase tracking-widest font-bold text-muted-foreground">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={handleInteract}
                    placeholder="Bespoke request details..."
                    className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground/50 font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending || sent}
                  className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    sent
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                      : 'bg-primary text-primary-foreground hover:bg-accent shadow-lg shadow-primary/20 cursor-pointer'
                  }`}
                >
                  {sent ? (
                    <>
                      <Check className="h-4.5 w-4.5 animate-bounce" />
                      <span>Message Dispatched</span>
                    </>
                  ) : sending ? (
                    <span>Dispatched Request...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Dispatch Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      <StyleOracle />
      <Footer />
    </main>
  )
}
