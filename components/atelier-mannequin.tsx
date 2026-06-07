'use client'

import { Info, Sparkles, Scale } from 'lucide-react'
import { sounds } from '@/lib/sound-utils'
import { useAppState } from '@/lib/state-context'

interface MannequinProps {
  height: number
  chest: number
  waist: number
  onUpdate: (metrics: { height: number; chest: number; waist: number }) => void
}

export default function AtelierMannequin({ height, chest, waist, onUpdate }: MannequinProps) {
  const { soundEnabled } = useAppState()

  // Base adjustments for the vector drawing
  // Normalized metrics:
  // Height: 150cm to 210cm -> scales Y-axis from 0.85 to 1.15
  // Chest: 30 inches to 48 inches
  // Waist: 24 inches to 44 inches

  const heightVal = height || 180
  const chestVal = chest || 38
  const waistVal = waist || 32

  // Map values to width coordinates
  const baseWidth = 150 // center of SVG
  const shoulderWidth = Math.max(60, Math.min(130, 70 + (chestVal - 30) * 2.2))
  const chestWidth = Math.max(50, Math.min(120, 60 + (chestVal - 30) * 2.5))
  const waistWidth = Math.max(40, Math.min(110, 50 + (waistVal - 24) * 2.5))
  const hipWidth = Math.max(50, Math.min(125, 60 + (waistVal - 24) * 2.2))

  // Height multiplier for visual vertical scaling
  const heightFactor = Math.max(0.85, Math.min(1.2, (heightVal / 180)))
  const headY = 50 * (2 - heightFactor)
  const neckY = headY + 15
  const shoulderY = neckY + 12
  const chestY = shoulderY + 28 * heightFactor
  const waistY = chestY + 35 * heightFactor
  const hipY = waistY + 38 * heightFactor
  const feetY = hipY + 75 * heightFactor

  const handlePreset = (pHeight: number, pChest: number, pWaist: number) => {
    if (soundEnabled) sounds.playSweep()
    onUpdate({ height: pHeight, chest: pChest, waist: pWaist })
  }

  return (
    <div className="bg-card/40 border border-border/60 rounded-3xl p-6 glass-panel relative flex flex-col justify-between h-full">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] rounded-3xl pointer-events-none" />

      <div className="relative space-y-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-3 z-10">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground font-mono">
              Sizing Blueprint
            </h3>
          </div>
          <span className="text-[8px] font-mono bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded uppercase tracking-wider">
            Atelier CAD v1.0
          </span>
        </div>

        {/* Presets Selectors */}
        <div className="flex flex-wrap gap-1.5 pt-1 z-10">
          {[
            { label: 'Slim Fit', h: 175, c: 36, w: 29 },
            { label: 'Athletic Fit', h: 182, c: 42, w: 32 },
            { label: 'Classic Drape', h: 180, c: 40, w: 34 },
            { label: 'Avant Silhouette', h: 188, c: 38, w: 31 }
          ].map((preset) => {
            const isActive = height === preset.h && chest === preset.c && waist === preset.w
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePreset(preset.h, preset.c, preset.w)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-wider border transition-all ${
                  isActive
                    ? 'bg-primary border-primary text-primary-foreground font-bold shadow'
                    : 'border-border bg-background/50 text-foreground/70 hover:border-foreground/50 hover:bg-background'
                }`}
              >
                {preset.label}
              </button>
            )
          })}
        </div>

        {/* SVG CAD Screen */}
        <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto bg-black/45 border border-border/40 rounded-2xl p-4 flex items-center justify-center overflow-hidden shadow-inner mt-2 select-none group">
          
          {/* Neon scan lines */}
          <div className="absolute inset-x-0 h-[2px] bg-primary/20 top-0 animate-scanner pointer-events-none" />

          <svg
            viewBox="0 0 300 400"
            className="w-full h-full stroke-primary/30 fill-none transition-all duration-500"
          >
            {/* Guide Lines */}
            <line x1="150" y1="20" x2="150" y2="380" className="stroke-dashed stroke-border/40" strokeDasharray="3 3" />
            <line x1="20" y1={chestY} x2="280" y2={chestY} className="stroke-dashed stroke-border/40" strokeDasharray="3 3" />
            <line x1="20" y1={waistY} x2="280" y2={waistY} className="stroke-dashed stroke-border/40" strokeDasharray="3 3" />

            {/* Height Ruler (Left Side) */}
            <g className="stroke-primary/50 text-[8px] font-mono fill-primary/50 font-bold">
              <line x1="35" y1={headY - 15} x2="35" y2={feetY + 10} className="stroke-primary/40" />
              <line x1="30" y1={headY - 15} x2="40" y2={headY - 15} className="stroke-primary/40" />
              <line x1="30" y1={feetY + 10} x2="40" y2={feetY + 10} className="stroke-primary/40" />
              <text x="12" y={(headY + feetY) / 2} transform={`rotate(-90 28 ${(headY + feetY) / 2})`} className="tracking-widest">
                HEIGHT: {heightVal}cm
              </text>
            </g>

            {/* Mannequin Wireframe Group */}
            <g className="transition-all duration-500">
              
              {/* Head Capsule */}
              <ellipse cx="150" cy={headY} rx="14" ry="17" className="stroke-primary/60 stroke-2" />
              
              {/* Neck */}
              <line x1="147" y1={headY + 17} x2="147" y2={shoulderY} className="stroke-primary/50" />
              <line x1="153" y1={headY + 17} x2="153" y2={shoulderY} className="stroke-primary/50" />

              {/* Body Contour Path (Left side & Right side symmetrical) */}
              <path
                d={`
                  M 150 ${shoulderY}
                  L ${baseWidth - shoulderWidth / 2} ${shoulderY + 3}
                  C ${baseWidth - shoulderWidth / 2} ${shoulderY + 3}, ${baseWidth - chestWidth / 2} ${chestY - 10}, ${baseWidth - chestWidth / 2} ${chestY}
                  Q ${baseWidth - chestWidth / 2} ${chestY + 15}, ${baseWidth - waistWidth / 2} ${waistY}
                  Q ${baseWidth - waistWidth / 2} ${waistY + 15}, ${baseWidth - hipWidth / 2} ${hipY}
                  L ${baseWidth - 28} ${feetY}
                  L ${baseWidth - 20} ${feetY + 5}
                  M 150 ${shoulderY}
                  L ${baseWidth + shoulderWidth / 2} ${shoulderY + 3}
                  C ${baseWidth + shoulderWidth / 2} ${shoulderY + 3}, ${baseWidth + chestWidth / 2} ${chestY - 10}, ${baseWidth + chestWidth / 2} ${chestY}
                  Q ${baseWidth + chestWidth / 2} ${chestY + 15}, ${baseWidth + waistWidth / 2} ${waistY}
                  Q ${baseWidth + waistWidth / 2} ${waistY + 15}, ${baseWidth + hipWidth / 2} ${hipY}
                  L ${baseWidth + 28} ${feetY}
                  L ${baseWidth + 20} ${feetY + 5}
                `}
                className="stroke-primary/80 stroke-2 drop-shadow-[0_0_4px_rgba(212,175,55,0.3)] transition-all duration-500"
              />

              {/* Spine Line */}
              <line x1="150" y1={shoulderY} x2="150" y2={hipY} className="stroke-primary/30 stroke-1" />

              {/* Chest Indicator (Right Side) */}
              <g className="stroke-primary/70 fill-primary font-mono text-[8px] font-bold">
                <line x1={baseWidth - chestWidth / 2} y1={chestY} x2={baseWidth + chestWidth / 2} y2={chestY} className="stroke-primary stroke-[1.5]" />
                <polygon points={`${baseWidth - chestWidth / 2},${chestY} ${baseWidth - chestWidth / 2 + 4},${chestY - 3} ${baseWidth - chestWidth / 2 + 4},${chestY + 3}`} />
                <polygon points={`${baseWidth + chestWidth / 2},${chestY} ${baseWidth + chestWidth / 2 - 4},${chestY - 3} ${baseWidth + chestWidth / 2 - 4},${chestY + 3}`} />
                
                <rect x={baseWidth - 22} y={chestY - 7} width="44" height="13" rx="4" className="fill-black stroke-primary/30 stroke" />
                <text x={baseWidth} y={chestY + 2} textAnchor="middle" className="fill-primary text-[8px] tracking-wider font-mono">
                  B: {chestVal}"
                </text>
              </g>

              {/* Waist Indicator (Right Side) */}
              <g className="stroke-primary/70 fill-primary font-mono text-[8px] font-bold">
                <line x1={baseWidth - waistWidth / 2} y1={waistY} x2={baseWidth + waistWidth / 2} y2={waistY} className="stroke-primary stroke-[1.5]" />
                <polygon points={`${baseWidth - waistWidth / 2},${waistY} ${baseWidth - waistWidth / 2 + 4},${waistY - 3} ${baseWidth - waistWidth / 2 + 4},${waistY + 3}`} />
                <polygon points={`${baseWidth + waistWidth / 2},${waistY} ${baseWidth + waistWidth / 2 - 4},${waistY - 3} ${baseWidth + waistWidth / 2 - 4},${waistY + 3}`} />
                
                <rect x={baseWidth - 22} y={waistY - 7} width="44" height="13" rx="4" className="fill-black stroke-primary/30 stroke" />
                <text x={baseWidth} y={waistY + 2} textAnchor="middle" className="fill-primary text-[8px] tracking-wider font-mono">
                  W: {waistVal}"
                </text>
              </g>

            </g>
          </svg>
        </div>
      </div>

      {/* Calibration Alert */}
      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-2.5 z-10 text-[10px] text-primary font-mono text-left leading-relaxed">
        <Info className="h-4 w-4 shrink-0 text-primary mt-0.5" />
        <div>
          <strong className="font-bold">SYSTEM ALERT:</strong> Real-time bone contour calibration active. Presets alter pattern drape weights in the primary ledger.
        </div>
      </div>
    </div>
  )
}
