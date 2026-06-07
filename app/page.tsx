'use client'

import Header from '@/components/header'
import Hero from '@/components/hero'
import BrandManifesto from '@/components/brand-manifesto'
import FeaturedCollections from '@/components/featured-collections'
import SignaturePieces from '@/components/signature-pieces'
import HouseAbout from '@/components/house-about'
import CraftsmanshipExperience from '@/components/craftsmanship-experience'
import FashionFilm from '@/components/fashion-film'
import EditorialJournal from '@/components/editorial-journal'
import RunwayArchive from '@/components/runway-archive'
import CreativeDirector from '@/components/creative-director'
import Sustainability from '@/components/sustainability'
import GlobalPresence from '@/components/global-presence'
import Newsletter from '@/components/newsletter'
import StyleOracle from '@/components/style-oracle'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-0">
      {/* 01. Brand Header */}
      <Header />
      
      {/* 02. Premium Immersive Hero Slider */}
      <Hero />

      {/* Modern High-Fashion Marquee Ticker */}
      <div className="w-full bg-[#030303] border-y border-border/25 py-5 overflow-hidden whitespace-nowrap select-none font-mono text-[9px] tracking-[0.2em] text-white">
        <div className="animate-marquee flex gap-16">
          <div className="shrink-0 flex items-center gap-16">
            <Link href="/runway" className="hover:text-primary transition-colors flex items-center gap-2 cursor-pointer">
              <span className="font-sans font-bold">ORLIEN HOUSE</span>
              <span className="text-[7px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-full font-mono uppercase font-black tracking-normal">SS26</span>
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/runway" className="hover:text-primary transition-colors font-serif italic text-xs tracking-normal font-light cursor-pointer">
              Crafted Beyond Trends
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/atelier" className="hover:text-primary transition-colors flex items-center gap-2 cursor-pointer">
              <span>ATELIER REGISTRY ACTIVE</span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            </Link>
            <span className="text-white/20">•</span>
            <span className="font-serif italic text-xs tracking-normal font-light text-primary">
              Timeless Fashion
            </span>
            <span className="text-white/20">•</span>
            <Link href="/shop" className="hover:text-primary transition-colors font-sans font-bold tracking-[0.25em] cursor-pointer">
              MODERN ELEGANCE
            </Link>
            <span className="text-white/20">•</span>
            <span className="opacity-50 font-mono">EST_2026 // CO_REF_ORL</span>
            <span className="text-white/20">•</span>
          </div>
          {/* Repeated block for seamless looping */}
          <div className="shrink-0 flex items-center gap-16">
            <Link href="/runway" className="hover:text-primary transition-colors flex items-center gap-2 cursor-pointer">
              <span className="font-sans font-bold">ORLIEN HOUSE</span>
              <span className="text-[7px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-full font-mono uppercase font-black tracking-normal">SS26</span>
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/runway" className="hover:text-primary transition-colors font-serif italic text-xs tracking-normal font-light cursor-pointer">
              Crafted Beyond Trends
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/atelier" className="hover:text-primary transition-colors flex items-center gap-2 cursor-pointer">
              <span>ATELIER REGISTRY ACTIVE</span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            </Link>
            <span className="text-white/20">•</span>
            <span className="font-serif italic text-xs tracking-normal font-light text-primary">
              Timeless Fashion
            </span>
            <span className="text-white/20">•</span>
            <Link href="/shop" className="hover:text-primary transition-colors font-sans font-bold tracking-[0.25em] cursor-pointer">
              MODERN ELEGANCE
            </Link>
            <span className="text-white/20">•</span>
            <span className="opacity-50 font-mono">EST_2026 // CO_REF_ORL</span>
            <span className="text-white/20">•</span>
          </div>
        </div>
      </div>

      {/* 03. Brand Manifesto */}
      <BrandManifesto />

      {/* 04. Featured Collections */}
      <FeaturedCollections />

      {/* 05. Signature Pieces (Story/Materials Showcase) */}
      <SignaturePieces />

      {/* 06. The House of ORLIEN (About) */}
      <HouseAbout />

      {/* 07. Craftsmanship Experience */}
      <CraftsmanshipExperience />

      {/* 08. Fashion Film Widescreen Trailer */}
      <FashionFilm />

      {/* 09. Editorial Journal Magazine Grid */}
      <EditorialJournal />

      {/* 10. Runway Archive Timeline */}
      <RunwayArchive />

      {/* 11. Creative Director Note */}
      <CreativeDirector />

      {/* 12. Sustainability & Vision */}
      <Sustainability />

      {/* 13. Global Presence Stats */}
      <GlobalPresence />
      
      {/* 14. Newsletter Experience (Join The ORLIEN Society) */}
      <Newsletter />
      
      {/* AI Personal Stylist Drawer */}
      <StyleOracle />
      
      {/* Footnote and Footer Info */}
      <Footer />
    </main>
  )
}
