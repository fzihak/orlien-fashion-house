'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { Eye, EyeOff, Sparkles, User, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const { soundEnabled } = useAppState()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [stylePreference, setStylePreference] = useState('minimalist')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      if (soundEnabled) sounds.playPop()
      setErrorMessage('Please fill in all registry fields.')
      return
    }

    setLoading(true)
    setErrorMessage('')
    if (soundEnabled) sounds.playSweep()

    // Simulate database registration
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      if (soundEnabled) sounds.playSuccess()
      
      // Auto redirect to signin or home
      setTimeout(() => {
        router.push('/signin')
      }, 1800)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      <section className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-140px)] border-b border-border/40">
        
        {/* Left Side: Editorial Campaign Image */}
        <div className="hidden lg:block lg:col-span-7 relative bg-secondary overflow-hidden">
          <img 
            src="/runway/look-07.avif" 
            alt="ORLIEN Editorial Campaign" 
            className="absolute inset-0 w-full h-full object-cover grayscale select-none scale-[1.01]" 
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 text-left text-white space-y-3 z-10">
            <span className="text-[10px] font-mono tracking-[0.35em] text-primary uppercase font-black">
              ORLIEN BESPOKE MEMBERSHIP
            </span>
            <h2 className="text-4xl font-serif font-bold uppercase tracking-tight max-w-lg leading-tight">
              Crafted Beyond Trends, Tailored For You
            </h2>
            <p className="text-xs text-gray-300 font-mono tracking-wider max-w-md">
              Create a personalized style card. Retain measurements for quick checkout, early access to new shows, and live styling chimes.
            </p>
          </div>
        </div>

        {/* Right Side: Sign Up form */}
        <div className="lg:col-span-5 flex items-center justify-center p-8 sm:p-12 bg-card/10 backdrop-blur-sm relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
          
          <div className="w-full max-w-sm space-y-8 text-left z-10">
            
            {success ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="inline-flex p-4 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 justify-center items-center">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>
                <h2 className="text-2xl font-black uppercase font-heading">
                  Registry Created
                </h2>
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                  Bespoke profile configured successfully. Redirecting to access portal...
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-mono text-[9px] uppercase tracking-widest font-black">
                    <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                    <span>BESPOKE REGISTER</span>
                  </div>
                  <h1 className="text-3xl font-black uppercase tracking-tight font-heading leading-none">
                    Create Profile
                  </h1>
                  <p className="text-xs text-muted-foreground font-light">
                    Register credentials for the House database.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 bg-destructive/10 border border-destructive/20 text-destructive text-[11px] font-mono rounded-xl tracking-wide animate-pulse-subtle">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4.5">
                  
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={handleInteract}
                      placeholder="Alexander McQueen"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground/50 transition-all font-mono"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
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
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground/50 transition-all font-mono"
                    />
                  </div>

                  {/* Password field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={handleInteract}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-12 py-3 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground placeholder-muted-foreground/50 transition-all font-mono"
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

                  {/* Aesthetic Preference Selector */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-muted-foreground">
                      Style Profile Preference
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'minimalist', name: 'Minimal' },
                        { id: 'avantgarde', name: 'Avant' },
                        { id: 'brutalist', name: 'Brutalist' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => { handleInteract(); setStylePreference(item.id) }}
                          className={`py-2 px-2.5 text-[10px] font-bold uppercase rounded-lg border transition-all truncate text-center ${
                            stylePreference === item.id 
                              ? 'border-primary bg-primary/10 text-primary font-black'
                              : 'border-border bg-transparent text-foreground/70 hover:border-foreground/50'
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-primary-foreground hover:bg-accent font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-primary/10 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>CREATING BESPOKE PROFILE...</span>
                    ) : (
                      <>
                        <span>Submit Registration</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-6 border-t border-border/40 text-center text-xs text-muted-foreground space-y-3 font-mono">
                  <p>
                    Already registered?{' '}
                    <Link 
                      href="/signin" 
                      onClick={handleInteract}
                      className="text-primary font-bold hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </>
            )}

          </div>
        </div>

      </section>

      <StyleOracle />
      <Footer />
    </main>
  )
}
