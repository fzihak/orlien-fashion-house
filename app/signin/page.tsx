'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { Eye, EyeOff, Sparkles, Mail, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { soundEnabled } = useAppState()
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      if (soundEnabled) sounds.playPop()
      setErrorMessage('Please fill in all credentials.')
      return
    }
    
    setLoading(true)
    setErrorMessage('')
    if (soundEnabled) sounds.playSweep()

    // Simulate luxury API handshake
    setTimeout(() => {
      setLoading(false)
      if (soundEnabled) sounds.playSuccess()
      // Redirect to home page
      router.push('/')
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      <section className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-140px)] border-b border-border/40">
        
        {/* Left Side: Immersive Editorial Graphic Column (7 Cols on desktop) */}
        <div className="hidden lg:block lg:col-span-7 relative bg-secondary overflow-hidden">
          <img 
            src="/runway/look-05.avif" 
            alt="ORLIEN Editorial Campaign" 
            className="absolute inset-0 w-full h-full object-cover grayscale select-none scale-[1.01]" 
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 text-left text-white space-y-3 z-10">
            <span className="text-[10px] font-mono tracking-[0.35em] text-primary uppercase font-black">
              ORLIEN ATELIER ACCESS
            </span>
            <h2 className="text-4xl font-serif font-bold uppercase tracking-tight max-w-lg leading-tight">
              A Bespoke Identity for Creative Minds
            </h2>
            <p className="text-xs text-gray-300 font-mono tracking-wider max-w-md">
              Access the exclusive digital wardrobe, retrieve customized studio measurements, and synchronize styles dynamically.
            </p>
          </div>
        </div>

        {/* Right Side: Editorial Form Panel (5 Cols on desktop) */}
        <div className="lg:col-span-5 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-card/10 backdrop-blur-sm relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
          
          <div className="w-full max-w-sm space-y-8 text-left z-10">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-mono text-[9px] uppercase tracking-widest font-black">
                <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                <span>MEMBERS PORTAL</span>
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tight font-heading leading-none">
                Sign In
              </h1>
              <p className="text-xs text-muted-foreground font-light">
                Enter your registry details to synchronize style portfolios.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 bg-destructive/10 border border-destructive/20 text-destructive text-[11px] font-mono rounded-xl tracking-wide animate-pulse-subtle">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email field */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleInteract}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground/50 transition-all font-mono"
                />
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest font-bold text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Password</span>
                  </span>
                  <a href="#" className="hover:text-primary transition-colors text-[9px]">Forgot?</a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleInteract}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground/50 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => { handleInteract(); setShowPassword(!showPassword) }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground hover:bg-accent font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-primary/10 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>SYNCHRONIZING REGISTRY...</span>
                ) : (
                  <>
                    <span>Enter Atelier</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-6 border-t border-border/40 text-center text-xs text-muted-foreground space-y-3 font-mono">
              <p>
                First time?{' '}
                <Link 
                  href="/signup" 
                  onClick={handleInteract}
                  className="text-primary font-bold hover:underline"
                >
                  Create bespoke account
                </Link>
              </p>
              <div className="text-[9px] opacity-40">
                ORLIEN CO. SECURITY STANDARDS ACTIVE
              </div>
            </div>

          </div>
        </div>

      </section>

      <StyleOracle />
      <Footer />
    </main>
  )
}
