'use client'

import { useState } from 'react'
import { Sparkles, Scissors, Compass, ScrollText, ArrowRight } from 'lucide-react'
import { useAppState } from '@/lib/state-context'
import { sounds } from '@/lib/sound-utils'
import Link from 'next/link'

interface CraftStage {
  id: number
  num: string
  title: string
  subtitle: string
  icon: any
  philosophy: string
  designerLog: string
  serviceDescription: string
  details: string[]
  image: string
  supportImages: string[]
}

export default function AtelierCraft() {
  const { soundEnabled } = useAppState()
  const [activeStageId, setActiveStageId] = useState<number>(1)

  const stages: CraftStage[] = [
    {
      id: 1,
      num: '01',
      title: 'Creative Moodboarding & Research',
      subtitle: 'Setting seasonal thematic structures and references.',
      icon: Compass,
      philosophy: 'Deconstructing architectural shapes to formulate wear patterns.',
      designerLog: 'Sourcing concrete textures and structural raw lines. Setting the tension between loose drapes and structured posture forms. We reject flat sketch sheets; lookbook acts are drafted directly around dynamic gravity curves.',
      serviceDescription: 'We offer private seasonal runway preview consultations at the studio workshop. Register for previews under the Atelier Registry.',
      details: ['Industrial Architecture Inspiration', 'Dynamic Posture Geometry', 'Act I & Act II Chronology Mapping'],
      image: '/runway/bts-01.avif',
      supportImages: ['/runway/bts-02.avif', '/runway/bts-07.avif'],
      visualAesthetic: 'border-primary/20 bg-primary/5'
    },
    {
      id: 2,
      num: '02',
      title: 'Textile Engineering & Sourcing',
      subtitle: 'Fusing raw fibers with organic certified loops.',
      icon: ScrollText,
      philosophy: 'Fabric must possess structural weight without restricting breathing comfort.',
      designerLog: 'Custom weaving organic long-staple cotton and Belgian flax linen rolls. We test fabric densities under wind chambers to determine drape weights. Recycled nylon membranes are reinforced with geometric grids to withstand elements.',
      serviceDescription: 'Inspect textile swatches and custom blends during booking. Clients can order specific fabric cuts for bespoke commissions.',
      details: ['GOTS Cotton & Certified Organic Linen', 'GRS Recycled Heavy Nylon Weaves', 'Zero-Chemical Waterproof Coatings'],
      image: '/runway/bts-03.avif',
      supportImages: ['/runway/bts-04.avif', '/runway/bts-05.avif'],
      visualAesthetic: 'border-accent/20 bg-accent/5'
    },
    {
      id: 3,
      num: '03',
      title: 'Draping & Pattern Drafting',
      subtitle: 'Calibrating fabric layouts directly on dress forms.',
      icon: Scissors,
      philosophy: 'Draping represents the physical dialogue between textile weight and bone contours.',
      designerLog: 'Pinning raw muslin on custom mannequin silhouettes. We adjust fabric grain directions to ensure jackets remain balanced during quick movements. Standard sizing blocks are optimized with gussets to allow infinite rotation.',
      serviceDescription: 'Physical pattern blocks are custom drafted for bespoke suit orders at our atelier workshop.',
      details: ['Manual Muslin Drape Calibration', 'Laser Grid Pattern Compression', 'Under 3% Waste Cutting Grids'],
      image: '/runway/look-07.avif',
      supportImages: ['/runway/look-05.avif', '/runway/look-06.avif'],
      visualAesthetic: 'border-primary/20 bg-primary/5'
    },
    {
      id: 4,
      num: '04',
      title: 'Haute Couture & Bespoke Fitting',
      subtitle: 'Tailoring unique silhouettes for individual clients.',
      icon: Sparkles,
      philosophy: 'Bespoke tailoring is clothing reconstructed as a personal signature.',
      designerLog: 'Taking precise physical measurements (height, chest, waist, inseam). Every line is hand-basted and fitted twice. We record every customer dimension in our digital ledger to ensure seamless re-orders of seasonal capsules.',
      serviceDescription: 'Book physical fitting appointments directly on the reservation deck. Tailor bookings generate digital atelier passes.',
      details: ['Digital Sizing Record Archiving', 'Manual Hand-Basted Fittings', 'Custom Atelier Studio Sessions'],
      image: '/runway/look-08.avif',
      supportImages: ['/runway/look-09.avif', '/runway/look-10.avif'],
      visualAesthetic: 'border-accent/20 bg-accent/5'
    }
  ]

  const handleStageSelect = (id: number) => {
    if (soundEnabled) sounds.playClick()
    setActiveStageId(id)
  }

  const activeStage = stages.find(s => s.id === activeStageId) || stages[0]
  const ActiveIcon = activeStage.icon

  return (
    <div id="atelier-craft" className="bg-background px-6 py-24 md:px-8 border-b border-border/30 transition-colors duration-500 relative">
      <div className="absolute inset-0 bg-primary/2 opacity-[0.01] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary mb-4">
            <Sparkles className="h-3 w-3" />
            <span className="text-[9px] uppercase tracking-widest font-black">THE CRAFT & SERVICES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            What We Do: The Design Process
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl font-light">
            Luxury fashion is not manufactured; it is engineered. Explore the steps our designers take to construct garments and the atelier services available to you.
          </p>
        </div>

        {/* Visual Columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Service list (6 Columns) */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
            {stages.map((stage) => {
              const StageIcon = stage.icon
              const isActive = activeStageId === stage.id
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageSelect(stage.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer focus:outline-none ${
                    isActive
                      ? 'border-primary bg-primary/5 shadow-md shadow-primary/5'
                      : 'border-border/60 hover:bg-secondary/40 hover:border-border'
                  }`}
                >
                  <span className="text-sm font-mono font-bold text-primary shrink-0 mt-0.5">{stage.num}</span>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <StageIcon className="h-4 w-4 text-primary" />
                      <span>{stage.title}</span>
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-1 font-light leading-relaxed">{stage.subtitle}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right: Visual Atelier Gallery (6 Columns) */}
          <div className="lg:col-span-6 grid gap-4">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/80 shadow-2xl">
              <img
                src={activeStage.image}
                alt={activeStage.title}
                className="w-full h-95 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute left-6 bottom-6 text-white max-w-[80%]">
                <span className="text-[10px] uppercase tracking-[0.35em] text-primary font-bold">Atelier Preview</span>
                <h3 className="mt-3 text-2xl font-black tracking-tight">{activeStage.title}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {activeStage.supportImages.map((image, idx) => (
                <div key={idx} className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-lg">
                  <img src={image} alt={`Atelier detail ${idx + 1}`} className="w-full h-44 object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/40 p-6 glass-panel">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                  <ActiveIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">Detailed Atelier Mission</p>
                  <h4 className="text-base font-bold text-foreground">{activeStage.philosophy}</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{activeStage.serviceDescription}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {activeStage.details.map((dt) => (
                  <span key={dt} className="text-[9px] px-2 py-1 rounded-full border border-border bg-secondary/70 text-muted-foreground font-mono">
                    {dt}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
