'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import StyleOracle from '@/components/style-oracle'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import { Sparkles, ChevronRight, Scissors, Ruler, User, Mail, Hammer } from 'lucide-react'
import Link from 'next/link'

// Import premium components
import AtelierMannequin from '@/components/atelier-mannequin'
import AtelierScheduler from '@/components/atelier-scheduler'
import AtelierVIPPass from '@/components/atelier-vip-pass'

interface Ticket {
  name: string
  email: string
  service: string
  height: string
  chest: string
  waist: string
  date: string
  time: string
  code: string
}

export default function AtelierPage() {
  const { soundEnabled } = useAppState()
  
  // Form states initialized with realistic default metrics
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('Bespoke Measurement Fitting')
  
  const [height, setHeight] = useState(180)
  const [chest, setChest] = useState(38)
  const [waist, setWaist] = useState(32)
  
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const services = [
    { 
      name: 'Bespoke Measurement Fitting', 
      desc: 'Detailed tailor fitting, drafting custom pattern blocks for suits/coats.', 
      duration: '60 Mins',
      details: 'Hand-tailored pattern design blocks.'
    },
    { 
      name: 'Fabric & Textile Consultation', 
      desc: 'Inspect raw organic linen, long-staple cotton, and wool drapes.', 
      duration: '30 Mins',
      details: 'Sourcing of heritage GOTS fabrics.'
    },
    { 
      name: 'Private Runway Capsule Preview', 
      desc: 'Private lookbook viewing with dedicated styling assistants.', 
      duration: '45 Mins',
      details: 'Review spring looks in studio.'
    }
  ]

  // Quick metrics updater from mannequin presets
  const handleMetricsUpdate = (metrics: { height: number; chest: number; waist: number }) => {
    setHeight(metrics.height)
    setChest(metrics.chest)
    setWaist(metrics.waist)
  }

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validations
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'Client name is required'
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid client email is required'
    if (!date) newErrors.date = 'Select appointment date'
    if (!time) newErrors.time = 'Select hour slot'
    if (height < 140 || height > 220) newErrors.height = 'Height must be between 140cm and 220cm'
    if (chest < 28 || chest > 52) newErrors.chest = 'Chest size must be between 28" and 52"'
    if (waist < 22 || waist > 48) newErrors.waist = 'Waist size must be between 22" and 48"'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      if (soundEnabled) sounds.playPop()
      
      // Auto-scroll to errors if on mobile
      const firstError = Object.keys(newErrors)[0]
      const element = document.getElementsByName(firstError)[0]
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setErrors({})
    const code = `VTX-${Math.floor(100000 + Math.random() * 900000)}`
    
    // Save measurements to localStorage for unified VIP Shop suggestions
    if (typeof window !== 'undefined') {
      localStorage.setItem('orlien-measurements', JSON.stringify({ 
        height: String(height), 
        chest: String(chest), 
        waist: String(waist), 
        name 
      }))
    }

    setTicket({
      name,
      email,
      service,
      height: String(height),
      chest: String(chest),
      waist: String(waist),
      date,
      time,
      code
    })

    if (soundEnabled) sounds.playSuccess()
  }

  const handleReset = () => {
    if (soundEnabled) sounds.playSweep()
    setTicket(null)
    setName('')
    setEmail('')
    setService('Bespoke Measurement Fitting')
    setHeight(180)
    setChest(38)
    setWaist(32)
    setDate('')
    setTime('')
    setErrors({})
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col justify-between overflow-x-hidden">
      <Header />

      {/* Main Container */}
      <div className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 md:px-8 py-8 md:py-12">
        
        {/* Breadcrumb and Page Header */}
        <div className="mb-10 text-left space-y-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-widest font-mono">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Atelier</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight uppercase text-foreground leading-none">
                Bespoke Atelier
              </h1>
              <p className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-widest">
                Configure bone contours & reserve master tailor fittings
              </p>
            </div>
            
            {ticket && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/25 bg-green-500/5 text-green-500 text-[9px] uppercase tracking-widest font-mono font-bold">
                <Sparkles className="h-3.5 w-3.5 text-green-500 animate-pulse" />
                <span>LEDGER REGISTRY COMPLETE</span>
              </div>
            )}
          </div>
        </div>

        {/* Condition-based screen rendering */}
        {ticket ? (
          /* Render Holographic 3D Ticket when booking is completed */
          <div className="py-12 md:py-16 text-center space-y-6">
            <div className="max-w-md mx-auto space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-wider text-foreground">
                VIP FIT PASS ISSUED
              </h2>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                Hover over the pass to inspect structural holographic threads. Your coordinates are recorded.
              </p>
            </div>

            <AtelierVIPPass ticket={ticket} onReset={handleReset} />
          </div>
        ) : (
          /* Render Form with real-time Mannequin when booking is active */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Side: Interactive SVG Mannequin (5 Columns) */}
            <div className="lg:col-span-5 lg:sticky lg:top-[90px] space-y-6">
              <AtelierMannequin 
                height={height}
                chest={chest}
                waist={waist}
                onUpdate={handleMetricsUpdate}
              />

              {/* Service Cards info overview */}
              <div className="hidden lg:block space-y-3">
                <h4 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase flex items-center gap-1">
                  <Hammer className="h-3.5 w-3.5 text-primary" />
                  <span>Workshop Standards</span>
                </h4>
                {services.map((ser) => {
                  const isActive = service === ser.name
                  return (
                    <div 
                      key={ser.name} 
                      onClick={() => { if (soundEnabled) sounds.playClick(); setService(ser.name) }}
                      className={`p-4 border rounded-2xl cursor-pointer flex gap-4 items-start transition-all ${
                        isActive
                          ? 'border-primary bg-primary/5 shadow-md scale-[1.01]'
                          : 'border-border/60 bg-secondary/10 hover:border-foreground/30'
                      }`}
                    >
                      <div className={`p-2 rounded-xl border shrink-0 mt-0.5 transition-colors ${
                        isActive 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-primary/5 text-primary border-primary/20'
                      }`}>
                        <Scissors className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center justify-between">
                          <h5 className={`text-xs font-bold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                            {ser.name}
                          </h5>
                          <span className="text-[9px] font-mono text-primary font-bold uppercase shrink-0">
                            {ser.duration}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 font-light leading-relaxed">
                          {ser.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Side: Booking Form details (7 Columns) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleBookSubmit} className="bg-card/40 border border-border/60 rounded-3xl p-6 md:p-8 glass-panel space-y-8 text-left">
                
                <div className="border-b border-border/40 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground uppercase tracking-wide">
                      Register Sizing Fitting
                    </h3>
                    <p className="text-xs text-muted-foreground font-light mt-0.5">
                      Inputs translate directly into your customized garment drape weights.
                    </p>
                  </div>
                </div>

                {/* Sizing sliders & inputs calibration */}
                <div className="space-y-6">
                  <div className="flex items-center gap-1.5 border-b border-border/20 pb-2">
                    <Ruler className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-primary font-mono">
                      Dimension Coordinates
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Height Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground uppercase font-bold">
                        <span>Height</span>
                        <span className="text-foreground font-black">{height} cm</span>
                      </div>
                      <input
                        type="range"
                        name="height"
                        min="140"
                        max="220"
                        value={height}
                        onChange={(e) => { 
                          if (soundEnabled && Number(e.target.value) % 5 === 0) sounds.playClick()
                          setHeight(Number(e.target.value)) 
                        }}
                        className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                      />
                      <div className="flex justify-between text-[7px] font-mono text-muted-foreground/60">
                        <span>140 cm</span>
                        <span>220 cm</span>
                      </div>
                      {errors.height && <p className="text-[9px] text-red-400 font-bold font-mono">{errors.height}</p>}
                    </div>

                    {/* Chest Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground uppercase font-bold">
                        <span>Chest (Bust)</span>
                        <span className="text-foreground font-black">{chest}"</span>
                      </div>
                      <input
                        type="range"
                        name="chest"
                        min="28"
                        max="52"
                        value={chest}
                        onChange={(e) => {
                          if (soundEnabled && Number(e.target.value) % 2 === 0) sounds.playClick()
                          setChest(Number(e.target.value))
                        }}
                        className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                      />
                      <div className="flex justify-between text-[7px] font-mono text-muted-foreground/60">
                        <span>28 in</span>
                        <span>52 in</span>
                      </div>
                      {errors.chest && <p className="text-[9px] text-red-400 font-bold font-mono">{errors.chest}</p>}
                    </div>

                    {/* Waist Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground uppercase font-bold">
                        <span>Waist</span>
                        <span className="text-foreground font-black">{waist}"</span>
                      </div>
                      <input
                        type="range"
                        name="waist"
                        min="22"
                        max="48"
                        value={waist}
                        onChange={(e) => {
                          if (soundEnabled && Number(e.target.value) % 2 === 0) sounds.playClick()
                          setWaist(Number(e.target.value))
                        }}
                        className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                      />
                      <div className="flex justify-between text-[7px] font-mono text-muted-foreground/60">
                        <span>22 in</span>
                        <span>48 in</span>
                      </div>
                      {errors.waist && <p className="text-[9px] text-red-400 font-bold font-mono">{errors.waist}</p>}
                    </div>
                  </div>
                </div>

                {/* Service Dropdown Selector (Mobile specific) */}
                <div className="space-y-2 lg:hidden">
                  <div className="flex items-center gap-1.5 border-b border-border/20 pb-2">
                    <Scissors className="h-4 w-4 text-primary" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-primary font-mono">
                      Fitting Service
                    </span>
                  </div>
                  <select
                    value={service}
                    onChange={(e) => { if (soundEnabled) sounds.playClick(); setService(e.target.value) }}
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/50 border border-border text-xs focus:outline-none focus:border-primary text-foreground font-mono"
                  >
                    {services.map(s => <option key={s.name} value={s.name} className="bg-card text-foreground">{s.name}</option>)}
                  </select>
                </div>

                {/* Calendar Date / Time Custom Scheduler Component */}
                <AtelierScheduler
                  selectedDate={date}
                  selectedTime={time}
                  onSelectDate={(d) => { setDate(d); setErrors(prev => ({ ...prev, date: '' })) }}
                  onSelectTime={(t) => { setTime(t); setErrors(prev => ({ ...prev, time: '' })) }}
                />
                {errors.date && <p className="text-[9px] text-red-400 font-bold font-mono mt-1">{errors.date}</p>}
                {errors.time && <p className="text-[9px] text-red-400 font-bold font-mono mt-1">{errors.time}</p>}

                {/* Client credentials info input row */}
                <div className="space-y-6 pt-4 border-t border-border/30">
                  <div className="flex items-center gap-1.5 border-b border-border/20 pb-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-primary font-mono">
                      Credentials ledger
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Client Name */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>Client Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-4 py-3 rounded-2xl bg-secondary/40 border border-border text-xs focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground/60 transition-all font-mono"
                      />
                      {errors.name && <p className="text-[9px] text-red-400 font-bold font-mono">{errors.name}</p>}
                    </div>

                    {/* Client Email */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>Client Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full px-4 py-3 rounded-2xl bg-secondary/40 border border-border text-xs focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground/60 transition-all font-mono"
                      />
                      {errors.email && <p className="text-[9px] text-red-400 font-bold font-mono">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Form submit confirm button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-primary hover:bg-accent text-primary-foreground font-black rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 hover:scale-[1.01]"
                  >
                    Calibrate and Confirm Fitting Slot
                  </button>
                </div>

              </form>
            </div>

          </div>
        )}

      </div>

      <StyleOracle />
      <Footer />
    </main>
  )
}
