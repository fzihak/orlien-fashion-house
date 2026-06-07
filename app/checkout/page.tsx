'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { CreditCard, Truck, CheckCircle, ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { soundEnabled, cart, clearCart } = useAppState()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleInteract = () => {
    if (soundEnabled) sounds.playPop()
  }

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalCartPrice = cart.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
    return acc + (numericPrice * item.quantity)
  }, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !cardNumber || !expiry || !cvc) return

    setLoading(true)
    if (soundEnabled) sounds.playSweep()

    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      if (soundEnabled) sounds.playSuccess()

      // Clear cart
      clearCart()

      // Redirect home after brief showcase
      setTimeout(() => {
        router.push('/')
      }, 2500)
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      <section className="relative w-full py-16 border-b border-border/40 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-12">
          
          {/* Breadcrumb back */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-mono border-b border-border/30 pb-4">
            <Link href="/shop" onClick={handleInteract} className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Shop</span>
            </Link>
            <span>/</span>
            <span>Checkout Ledger</span>
          </div>

          {success ? (
            <div className="text-center py-16 space-y-6 animate-fade-in max-w-md mx-auto">
              <div className="inline-flex p-4 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 justify-center items-center">
                <CheckCircle className="h-12 w-12 animate-bounce" />
              </div>
              <h2 className="text-3xl font-black uppercase font-heading">Order Secured</h2>
              <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                Thank you for experiencing ORLIEN. A verification receipt and tracking allocation code has been dispatched.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Form (7 Cols) */}
              <div className="lg:col-span-7 bg-card/25 border border-border/40 rounded-3xl p-6 md:p-8 glass-panel relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="space-y-4">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Delivery Allocation</span>
                    </h3>
                    
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono uppercase tracking-widest font-bold text-muted-foreground">Contact Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={handleInteract}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground/50 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-border/30 pt-4">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      <span>Payment Ledger</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest font-bold text-muted-foreground">Card Number</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          onFocus={handleInteract}
                          placeholder="•••• •••• •••• ••••"
                          className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground/50 font-mono"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest font-bold text-muted-foreground">Expiry Date</label>
                          <input
                            type="text"
                            required
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            onFocus={handleInteract}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground/50 font-mono"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest font-bold text-muted-foreground">CVC</label>
                          <input
                            type="text"
                            required
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            onFocus={handleInteract}
                            placeholder="•••"
                            className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground/50 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || cartItemsCount === 0}
                    className="w-full py-4 bg-primary text-primary-foreground hover:bg-accent font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>DISPATCHING SECURED ORDER...</span>
                    ) : (
                      <>
                        <span>Submit Order Authorization</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Summary (5 Cols) */}
              <div className="lg:col-span-5 p-6 border border-border/40 rounded-3xl bg-card/15 text-left space-y-6 font-mono text-xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2 pb-3 border-b border-border/20">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  <span>Order Summary</span>
                </h3>

                <div className="space-y-4 max-h-48 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center gap-4 border-b border-border/10 pb-3 last:border-0 last:pb-0">
                      <div>
                        <div className="font-bold text-foreground truncate max-w-[150px]">{item.name}</div>
                        <div className="text-[9px] text-muted-foreground">QTY: {item.quantity} // SIZE: {item.size}</div>
                      </div>
                      <span className="font-bold text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/30 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SUBTOTAL</span>
                    <span className="text-foreground">${totalCartPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SHIPPING</span>
                    <span className="text-primary font-bold">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between text-sm font-black border-t border-border/25 pt-2">
                    <span className="text-foreground">ESTIMATED TOTAL</span>
                    <span className="text-primary">${totalCartPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 items-center text-[9px] text-muted-foreground uppercase border-t border-border/20 pt-4">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <span>Verified ecological luxury delivery parameters</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      <StyleOracle />
      <Footer />
    </main>
  )
}
