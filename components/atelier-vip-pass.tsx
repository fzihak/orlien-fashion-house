'use client'

import React, { useRef, useState } from 'react'
import { Calendar, Check, Download, Info, RefreshCw, Scissors, Sparkles } from 'lucide-react'
import { sounds } from '@/lib/sound-utils'
import { useAppState } from '@/lib/state-context'

interface VIPPassProps {
  ticket: {
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
  onReset: () => void
}

export default function AtelierVIPPass({ ticket, onReset }: VIPPassProps) {
  const { soundEnabled } = useAppState()
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Interactive 3D tilt coordinates
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})
  const [shineStyle, setShineStyle] = useState<React.CSSProperties>({ opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left // cursor X on card
    const y = e.clientY - rect.top  // cursor Y on card

    const width = rect.width
    const height = rect.height

    const xc = width / 2
    const yc = height / 2

    // Max rotation 12 degrees
    const rx = -((y - yc) / yc) * 12
    const ry = ((x - xc) / xc) * 12

    // Holographic gradient position
    const shineX = (x / width) * 100
    const shineY = (y / height) * 100

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.05s ease-out'
    })

    setShineStyle({
      opacity: 0.65,
      background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.18) 0%, rgba(212,175,55,0.08) 50%, transparent 80%)`
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    })
    setShineStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease-out'
    })
  }

  const handleDownload = () => {
    if (soundEnabled) sounds.playSuccess()
    alert(`Downloading VIP Fitting Pass: ${ticket.code}\nRegistered Name: ${ticket.name}\nCalibrated Fitting: Chest ${ticket.chest}", Waist ${ticket.waist}"`)
  }

  const getFriendlyDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="flex flex-col items-center gap-8 py-4 w-full max-w-lg mx-auto">
      
      {/* Dynamic 3D Ticket Box Wrapper */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => { if (soundEnabled) sounds.playPop() }}
        style={tiltStyle}
        className="w-full relative aspect-[1.6/1] md:aspect-[1.58/1] rounded-[24px] bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-primary/40 p-6 shadow-[0_25px_60px_-15px_rgba(212,175,55,0.15)] flex flex-col justify-between overflow-hidden cursor-pointer group select-none select-none transition-transform duration-200"
      >
        {/* Holographic foil shine layer */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 transition-opacity" 
          style={shineStyle} 
        />

        {/* Ambient background grid layer */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-0" />
        
        {/* Glowing border effects */}
        <div className="absolute inset-0 border border-white/5 rounded-[22px] pointer-events-none z-10" />

        {/* Header row */}
        <div className="flex items-start justify-between z-10 relative">
          <div className="space-y-0.5 text-left">
            <span className="text-[7px] font-black uppercase tracking-[0.25em] text-primary flex items-center gap-1">
              <Sparkles className="h-2 w-2 text-primary animate-pulse" />
              <span>Calibrated Fitting Ticket</span>
            </span>
            <h3 className="text-base font-black uppercase tracking-wider text-white font-heading">
              ORLIEN ATELIER
            </h3>
          </div>
          
          <div className="text-right flex flex-col items-end">
            <span className="text-[8px] font-mono text-white/50 uppercase tracking-widest">
              Pass Category
            </span>
            <span className="px-2 py-0.5 mt-0.5 rounded bg-primary/10 border border-primary/30 text-primary text-[8px] font-bold uppercase font-mono tracking-wider">
              Bespoke VIP
            </span>
          </div>
        </div>

        {/* Mid area: client info, slot */}
        <div className="grid grid-cols-12 gap-3 items-end z-10 relative text-left">
          
          {/* Sizing Blueprint details */}
          <div className="col-span-8 space-y-3">
            <div className="space-y-0.5">
              <span className="text-[7px] font-mono text-white/45 uppercase tracking-wider block">
                MEMBER CLIENT
              </span>
              <span className="text-xs font-bold text-white uppercase truncate block max-w-[200px]">
                {ticket.name}
              </span>
            </div>

            <div className="flex gap-4">
              <div className="space-y-0.5">
                <span className="text-[7px] font-mono text-white/45 uppercase tracking-wider block">
                  SERVICE FITTING
                </span>
                <span className="text-[9px] font-bold text-white uppercase truncate block max-w-[150px]">
                  {ticket.service.replace('Bespoke ', '')}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[7px] font-mono text-white/45 uppercase tracking-wider block">
                  APPOINTMENT
                </span>
                <span className="text-[9px] font-bold text-primary flex items-center gap-0.5 font-mono uppercase">
                  <span>{getFriendlyDate(ticket.date)}</span>
                  <span>@</span>
                  <span>{ticket.time}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Sizing Calibrations Ledger Block */}
          <div className="col-span-4 p-2 bg-black/40 border border-white/10 rounded-xl space-y-1">
            <span className="text-[6.5px] font-mono font-black text-primary uppercase tracking-wider block text-center">
              METRIC BLOCKS
            </span>
            <div className="grid grid-cols-3 gap-0.5 text-center text-[7px] font-mono">
              <div className="bg-neutral-900 border border-white/5 rounded px-0.5 py-1">
                <p className="text-white/40 uppercase text-[5.5px]">Hgt</p>
                <p className="font-bold text-white mt-0.5">{ticket.height}</p>
              </div>
              <div className="bg-neutral-900 border border-white/5 rounded px-0.5 py-1">
                <p className="text-white/40 uppercase text-[5.5px]">Bst</p>
                <p className="font-bold text-white mt-0.5">{ticket.chest}"</p>
              </div>
              <div className="bg-neutral-900 border border-white/5 rounded px-0.5 py-1">
                <p className="text-white/40 uppercase text-[5.5px]">Wst</p>
                <p className="font-bold text-white mt-0.5">{ticket.waist}"</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer row: Barcode, Ticket Code */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 z-10 relative">
          {/* Vector Barcode */}
          <div className="flex flex-col items-start gap-1">
            {/* Minimal SVG Barcode lines */}
            <svg className="h-5 w-28 fill-white/80" viewBox="0 0 100 20">
              <rect x="0" y="0" width="1" height="20" />
              <rect x="2" y="0" width="2" height="20" />
              <rect x="5" y="0" width="1" height="20" />
              <rect x="7" y="0" width="3" height="20" />
              <rect x="11" y="0" width="1" height="20" />
              <rect x="13" y="0" width="2" height="20" />
              <rect x="16" y="0" width="1" height="20" />
              <rect x="18" y="0" width="4" height="20" />
              <rect x="23" y="0" width="1" height="20" />
              <rect x="25" y="0" width="2" height="20" />
              <rect x="28" y="0" width="1" height="20" />
              <rect x="30" y="0" width="3" height="20" />
              <rect x="34" y="0" width="2" height="20" />
              <rect x="37" y="0" width="1" height="20" />
              <rect x="39" y="0" width="2" height="20" />
              <rect x="42" y="0" width="4" height="20" />
              <rect x="47" y="0" width="1" height="20" />
              <rect x="49" y="0" width="1" height="20" />
              <rect x="51" y="0" width="3" height="20" />
              <rect x="55" y="0" width="1" height="20" />
              <rect x="57" y="0" width="2" height="20" />
              <rect x="60" y="0" width="1" height="20" />
              <rect x="62" y="0" width="3" height="20" />
              <rect x="66" y="0" width="1" height="20" />
              <rect x="68" y="0" width="4" height="20" />
              <rect x="73" y="0" width="1" height="20" />
              <rect x="75" y="0" width="2" height="20" />
              <rect x="78" y="0" width="1" height="20" />
              <rect x="80" y="0" width="3" height="20" />
              <rect x="84" y="0" width="2" height="20" />
              <rect x="87" y="0" width="1" height="20" />
              <rect x="89" y="0" width="2" height="20" />
              <rect x="92" y="0" width="4" height="20" />
              <rect x="97" y="0" width="1" height="20" />
              <rect x="99" y="0" width="1" height="20" />
            </svg>
            <span className="text-[7px] font-mono text-white/30 tracking-[0.2em] uppercase">
              digital block signature
            </span>
          </div>

          {/* Ticket code and confirm indicator */}
          <div className="text-right space-y-0.5">
            <span className="text-[9px] font-mono font-black text-primary tracking-widest bg-primary/5 border border-primary/20 px-2.5 py-1 rounded-md inline-block">
              {ticket.code}
            </span>
            <div className="flex items-center gap-1 justify-end mt-1 text-[7px] font-mono text-green-500 font-bold uppercase tracking-wider">
              <Check className="h-2.5 w-2.5 text-green-500" />
              <span>Calibrated Ledger Signed</span>
            </div>
          </div>
        </div>

      </div>

      {/* Post-Booking Details and Actions */}
      <div className="w-full space-y-4 text-center mt-2">
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto font-light">
          Your fitting pass has been successfully registered. Navigate to the catalog; our system will dynamically recommended the optimal sizes based on your profile ledger.
        </p>

        <div className="flex gap-4 pt-1 justify-center max-w-xs mx-auto">
          <button
            onClick={onReset}
            className="flex-1 py-3 border border-border hover:bg-secondary rounded-full font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Book Other</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="flex-1 py-3 bg-primary text-primary-foreground hover:bg-accent rounded-full font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Save Pass</span>
          </button>
        </div>
      </div>

    </div>
  )
}
