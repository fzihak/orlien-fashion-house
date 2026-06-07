'use client'

import { useState } from 'react'
import { ArrowRight, Check, Copy, Sparkles, AlertCircle } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'

export default function Newsletter() {
  const { soundEnabled } = useAppState()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const promoCode = 'ORLIEN-SOCIETY-20'

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      if (soundEnabled) sounds.playPop()
      setError('Please enter a valid structural email.')
      return
    }

    setError('')
    setSubscribed(true)
    if (soundEnabled) sounds.playSuccess()
  }

  const handleCopyCode = () => {
    if (soundEnabled) sounds.playClick()
    navigator.clipboard.writeText(promoCode)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="bg-[#050505] px-6 py-28 md:px-8 border-b border-border/30 transition-colors duration-500 relative overflow-hidden">
      {/* Decorative grids/glows */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-6">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-primary/5 text-primary">
            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.25em] font-black font-mono">THE SOCIETY</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-none uppercase">
            Join The ORLIEN Society
          </h2>
          
          <p className="text-sm text-gray-400 max-w-xl mx-auto font-light leading-relaxed font-serif italic">
            Exclusive stories, campaigns and collection previews.
          </p>

          {!subscribed ? (
            /* Standard form view */
            <form onSubmit={handleSubscribe} className="space-y-4 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for private credential access" 
                    className="w-full px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-primary transition-all font-light"
                  />
                  {error && (
                    <div className="absolute -bottom-6 left-4 flex items-center gap-1.5 text-red-400 text-[10px] font-medium">
                      <AlertCircle className="h-3 w-3" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
                
                <button 
                  type="submit"
                  className="px-8 py-4 bg-primary hover:bg-accent text-primary-foreground font-bold rounded-full text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 group shrink-0"
                >
                  <span>Request Access</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-[10px] text-gray-500 pt-3">
                We value your digital security. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            /* Successful subscription view */
            <div className="max-w-md mx-auto p-6 rounded-3xl border border-primary/20 bg-primary/5 text-center space-y-4 animate-fade-in-up">
              <div className="h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto">
                <Check className="h-5 w-5" />
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-white">Welcome to the Inner Circle</h4>
                <p className="text-xs text-gray-400 mt-1.5 font-light">
                  Your structural access profile is registered. Copy your initial 20% discount code below:
                </p>
              </div>

              {/* Promo code copy bar */}
              <div className="flex items-center justify-between gap-3 bg-black/60 border border-white/10 rounded-full p-2 pl-4 max-w-sm mx-auto">
                <code className="text-xs font-mono font-bold text-primary tracking-wider">{promoCode}</code>
                <button
                  onClick={handleCopyCode}
                  className={`px-4 py-2 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all flex items-center gap-1 ${
                    copied ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:bg-accent'
                  }`}
                >
                  {copied ? (
                    <span>Copied</span>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
