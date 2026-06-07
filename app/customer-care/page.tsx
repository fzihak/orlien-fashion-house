'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import {
  Sparkles,
  ChevronRight,
  Truck,
  RefreshCw,
  Scissors,
  HelpCircle,
  ShieldCheck,
  MapPin,
  Clock,
  Mail
} from 'lucide-react'
import Link from 'next/link'

type Tab = 'shipping' | 'returns' | 'sizing' | 'faq'

const tabItems: Array<{ id: Tab; label: string; icon: typeof Truck }> = [
  { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
  { id: 'returns', label: 'Returns & Exchange', icon: RefreshCw },
  { id: 'sizing', label: 'Garment Sizing Guides', icon: Scissors },
  { id: 'faq', label: 'Support FAQ', icon: HelpCircle }
]

const featureCards = [
  {
    title: 'Worldwide Concierge Support',
    description: 'Personal service for every order, from virtual fittings to expedited customs clearance.',
    icon: ShieldCheck
  },
  {
    title: 'Atelier Pickup',
    description: 'Same-day collection from the studio with premium packaging and hand-finished checks.',
    icon: MapPin
  },
  {
    title: 'Fast Global Routing',
    description: 'Express delivery powered by environmentally responsible logistics partners.',
    icon: Truck
  },
  {
    title: '24/7 Order Tracking',
    description: 'Real-time visibility with premium support notifications across every shipment.',
    icon: Clock
  }
]

export default function CustomerCarePage() {
  const { soundEnabled } = useAppState()
  const [activeTab, setActiveTab] = useState<Tab>('shipping')

  const handleTabChange = (tab: Tab) => {
    if (soundEnabled) sounds.playClick()
    setActiveTab(tab)
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      <div className="flex-1">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at top right, rgba(212, 175, 55, 0.14), transparent 42%)'
            }}
          />
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted-foreground font-mono">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Customer Care</span>
                </div>
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-black font-heading tracking-tight uppercase leading-tight">
                    Luxury support for every order.
                  </h1>
                  <p className="max-w-2xl text-sm text-muted-foreground leading-7">
                    From atelier pickup to express global routing, our service philosophy is built for premium fashion houses. Every delivery, return, and fit guide is designed to feel as refined as the garments themselves.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-3xl border border-border/60 bg-card/70 p-6 glass-panel shadow-xl shadow-black/10">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-bold">Premium Concierge</p>
                    <h2 className="mt-4 text-3xl font-black tracking-tight">24/7 global support</h2>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      Speak to our service atelier any time for orders, delivery upgrades, or bespoke return arrangements.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-border/60 bg-card/70 p-6 glass-panel shadow-xl shadow-black/10">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-bold">Fast Fulfillment</p>
                    <h2 className="mt-4 text-3xl font-black tracking-tight">Same-day studio pickup</h2>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      Collect your order at the atelier or schedule a bespoke courier pickup with zero wait time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-card/80 shadow-2xl shadow-black/20">
                    <img
                      src="/runway/hero-banner.avif"
                      alt="Studio packaging and premium logistics"
                      className="w-full h-105 object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute left-6 bottom-6">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-bold">Studio Dispatch</p>
                      <h2 className="mt-3 text-2xl font-black text-white">Hand-checked & ready to move.</h2>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-lg shadow-black/10">
                      <img
                        src="/runway/look-07.avif"
                        alt="Packaging details at the atelier"
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/80">Premium Packaging</p>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-lg shadow-black/10">
                      <img
                        src="/runway/look-09.avif"
                        alt="Courier handoff for a runway shipment"
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-white/80">Global Handoff</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-10 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="rounded-3xl border border-border/60 bg-card/70 p-6 glass-panel shadow-xl shadow-black/10">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr] items-start">
            <div className="rounded-[2.5rem] overflow-hidden border border-border/60 bg-card/80 shadow-2xl shadow-black/20">
              <img
                src="/runway/look-04.avif"
                alt="Custom atelier parcel ready for dispatch"
                className="w-full h-130 object-cover"
              />
            </div>
            <div className="grid gap-4">
              <div className="rounded-[2.5rem] overflow-hidden border border-border/60 bg-card/80 shadow-2xl shadow-black/20">
                <img
                  src="/runway/bts-03.avif"
                  alt="Artisan inspecting couture packaging"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-[2.5rem] overflow-hidden border border-border/60 bg-card/80 shadow-2xl shadow-black/20">
                <img
                  src="/runway/look-12.avif"
                  alt="Luxury fashion delivery experience"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 md:px-8">
          <div className="mb-10">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted-foreground font-mono">
              <span>Service Blueprint</span>
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Premium service protocols for every customer journey.
            </h2>
            <p className="mt-4 max-w-3xl text-sm text-muted-foreground leading-7">
              We make the customer-care experience as deliberate and well-tailored as the garments themselves. Explore delivery, returns, sizing, and support in a structured, ultra-luxury format.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 border-b border-border/40 pb-6">
            {tabItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] transition-all ${
                    isActive
                      ? 'border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10'
                      : 'border-border/60 text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </div>

          <div className="mt-10 rounded-[2.5rem] border border-border/60 bg-card/80 p-8 glass-panel shadow-2xl shadow-black/20">
            {activeTab === 'shipping' && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-bold">Shipping & Delivery</p>
                  <h3 className="text-3xl font-black text-foreground">Global premium routing with no compromise.</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Each shipment is escorted through customs by our logistics partners and packaged in custom, sustainable presentation materials. Delivery estimates are guaranteed for high-priority collections.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="rounded-3xl border border-border/50 bg-secondary/20 p-6">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-semibold">Domestic Standard</p>
                    <p className="mt-4 text-2xl font-black text-foreground">2 - 3 Days</p>
                    <p className="mt-3 text-xs text-muted-foreground">Free on orders over $150. Carbon-neutral courier with priority handling.</p>
                  </div>
                  <div className="rounded-3xl border border-border/50 bg-secondary/20 p-6">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-semibold">Atelier Pickup</p>
                    <p className="mt-4 text-2xl font-black text-foreground">Same Day</p>
                    <p className="mt-3 text-xs text-muted-foreground">Ready within 24 hours from our central studio, with personal packaging checks.</p>
                  </div>
                  <div className="rounded-3xl border border-border/50 bg-secondary/20 p-6">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-semibold">International Express</p>
                    <p className="mt-4 text-2xl font-black text-foreground">5 - 7 Days</p>
                    <p className="mt-3 text-xs text-muted-foreground">Premium air freight with full door-to-door tracking.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-bold">Returns & Exchanges</p>
                  <h3 className="text-3xl font-black text-foreground">Luxury policies with thoughtful flexibility.</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Our returns are designed for modern wardrobes. We accept unworn items in original condition and support premium exchanges for size, cut, or finish preferences.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-3xl border border-border/50 bg-secondary/20 p-6">
                    <h4 className="text-base font-semibold text-foreground uppercase tracking-[0.25em]">Conditions</h4>
                    <ul className="mt-4 space-y-3 text-xs text-muted-foreground">
                      <li>Keep garments unworn, unwashed, and with all original tags.</li>
                      <li>Return luxury outerwear in its presentation box.</li>
                      <li>Bespoke pieces from our `/atelier` collection are final sale.</li>
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-border/50 bg-secondary/20 p-6">
                    <h4 className="text-base font-semibold text-foreground uppercase tracking-[0.25em]">How to Return</h4>
                    <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                      Email <a href="mailto:support@orlien.com" className="text-primary hover:text-accent">support@orlien.com</a> with your order or ticket number. We will arrange pickup with a bespoke return label and sustainable packaging.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sizing' && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-bold">Sizing Guides</p>
                  <h3 className="text-3xl font-black text-foreground">Precision fit data for every silhouette.</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Use these measurements to choose your ideal fit. For custom tailoring, our atelier consultations refine your final size with exact body metrics.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-border/50 bg-secondary/20 p-6">
                    <h4 className="text-base font-semibold text-foreground uppercase tracking-[0.25em]">Jackets</h4>
                    <div className="mt-4 space-y-3 text-xs text-muted-foreground">
                      <p><span className="font-semibold text-foreground">S:</span> 34" - 36" chest</p>
                      <p><span className="font-semibold text-foreground">M:</span> 38" - 40" chest</p>
                      <p><span className="font-semibold text-foreground">L:</span> 42" - 44" chest</p>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-border/50 bg-secondary/20 p-6">
                    <h4 className="text-base font-semibold text-foreground uppercase tracking-[0.25em]">Trousers</h4>
                    <div className="mt-4 space-y-3 text-xs text-muted-foreground">
                      <p><span className="font-semibold text-foreground">30:</span> 30" - 31" waist / 30" inseam</p>
                      <p><span className="font-semibold text-foreground">32:</span> 32" - 33" waist / 32" inseam</p>
                      <p><span className="font-semibold text-foreground">34:</span> 34" - 35" waist / 32" inseam</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-primary font-bold">Support FAQ</p>
                  <h3 className="text-3xl font-black text-foreground">Answers for the discerning client.</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    Quick responses for common questions around fittings, shipping origins, and premium delivery options.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-3xl border border-border/50 bg-secondary/20 p-6">
                    <h4 className="font-semibold text-foreground uppercase tracking-[0.25em]">Can international clients book custom fits?</h4>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      Yes. Digital consultations are available globally. Book through our <Link href="/atelier" className="text-primary hover:text-accent">atelier page</Link> and choose the virtual fitting option.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-border/50 bg-secondary/20 p-6">
                    <h4 className="font-semibold text-foreground uppercase tracking-[0.25em]">Where are the garments shipped from?</h4>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      Every order is assembled and packaged at our central logistics studio in Istanbul before leaving for destination routing across Europe, Asia, and North America.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <StyleOracle />
      <Footer />
    </main>
  )
}
