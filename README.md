# <p align="center"><img src="public/logo.png" alt="ORLIEN Logo" width="280"/><br>✦ ORLIEN — High-Fashion Digital Atelier & Showroom ✦</p>

<p align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js%2015-black?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Library-React%2019-black?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19"/>
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-black?style=flat-square&logo=tailwindcss&logoColor=06B6D4" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Audio-Web%20Audio%20API-black?style=flat-square" alt="Web Audio API"/>
  <img src="https://img.shields.io/badge/Language-TypeScript-black?style=flat-square&logo=typescript&logoColor=3178C6" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Performance-100%20Lighthouse-success?style=flat-square" alt="Lighthouse"/>
</p>

```
  ___  ____  _      ___ _____ _   _ 
 / _ \|  _ \| |    |_ _| ____| \ | |
| | | | |_) | |     | ||  _| |  \| |
| |_| |  _ <| |___  | || |___| |\  |
 \___/|_| \_\_____|___|_____|_| \_|
 
       TIMELESS COUTURE // CYBER-PHYSICAL EXPRESSIONS
```

**ORLIEN** is an ultra-luxury digital fashion house, editorial showroom, and bespoke atelier booking system built with **Next.js (App Router)**, **React 19**, and **Tailwind CSS**. Designed for high-end job assessments, this project showcases advanced frontend architecture, zero-dependency audio synthesis, vector-based interactive simulations, global state persistence, and pristine responsive execution across 33 static routes.

---

## ✦ Technical Highlights for Evaluators & Recruiters

### 1. Vector Sizing Blueprint Mannequin (SVG/CAD Simulation)
Instead of importing heavy 3D rendering libraries (like Three.js) which negatively impact initial page load times and mobile CPU cycles, ORLIEN uses a lightweight, highly responsive **SVG Vector Blueprint**.
* **Vector Math & Interpolation**: Standard SVG paths (`d` attributes) are calculated dynamically inside [atelier-mannequin.tsx](file:///d:/fashion-landing-page/components/atelier-mannequin.tsx). The coordinate vectors for the bust, waist, and hips are parameterized relative to user numeric inputs (Height: 150–200cm, Bust: 70–120cm, Waist: 50–100cm).
* **Dynamic Control Points**: Modifying measurements adjusts the Bézier control points of the path strings in real-time, resulting in smooth biological scaling transitions that feel natural and physically proportional.
* **Smart Size Recommender**: The user's coordinates are synced globally and compared mathematically against catalog garment charts to trigger automatic size highlights (`XS`, `S`, `M`, `L`, `XL`) during the shopping experience.

### 2. Zero-Dependency Audio Synthesizer (Web Audio API)
To maintain a 0KB asset budget for audio files and achieve absolute zero latency, ORLIEN implements a custom synthesizer built directly on the browser's native **Web Audio API** (`AudioContext`) inside [sound-utils.ts](file:///d:/fashion-landing-page/lib/sound-utils.ts).
* **Synth Architecture**: Fuses multiple oscillator nodes (`sine` and `triangle`) and routes them through automated custom gain envelopes (`GainNode`) to shape sound triggers.
* **ADSR Envelope Modulation**:
  * **Chord Sweep**: Creates an elegant `Amaj7` chord by scheduling four staggered oscillators (A3, C#4, E4, G#4) at `0.08s` intervals with exponential decay.
  * **Interactive Pops/Clicks**: Generates short frequency ramps (`600Hz -> 150Hz` over `0.06s`) to give click actions a tangible, tactile feel.
  * **State Scheduling**: Sounds are safely locked behind user interaction checks and asynchronously initialized to comply with Chrome/Safari user-engagement policies.

### 3. High-Performance Static Generation (SSG)
All **33 unique pages** are configured for full static pre-rendering, leading to instant load speeds, optimal crawler indexability (SEO), and low server overhead.
* **Dynamic Routes**: Static paths are resolved during the build phase (`next build`) to pre-generate complete static pages for dynamic catalogs like `/shop/[id]`.
* **Zero Layout Shifts (CLS)**: Hardcoded aspect ratios on custom AVIF image wrappers prevent page jumps, achieving a flawless visual stability score.

### 4. Dynamic Theme Configuration Engine
The brand's visual identity switches seamlessly between four custom aesthetic states:
* `Obsidian Gold` (Dark, luxury gold accents)
* `Parisian Ivory` (Light, minimalist editorial grid)
* `Royal Emerald` (Deep emerald velvet, regal accents)
* `Cyber Neon` (High-contrast tech-wear aesthetics)

The system manages this by binding custom CSS variables to the document root class (`theme-obsidian`, `theme-cyber`, etc.) inside the React global Context, prompting instant paint updates across the browser DOM without re-rendering individual components.

---

## ✦ Core Architecture & Patterns

* **Strict TypeScript Interface Typing**: Complete type safety for the unified shopping cart context (`CartItem`), theme modes (`Theme`), and measurement ledgers.
* **Separation of Concerns**: UI components are split into layout structures (`Header`, `Footer`), interactive micro-modules (`StyleOracle`, `AtelierMannequin`), and page route wrappers, ensuring modular testing and high reusability.
* **Persistent Context Hook**: An integrated custom context hook (`useAppState`) manages global state parameters and automatically syncs client cart items and wishlist profiles to LocalStorage.

---

## ✦ Project Directory Layout

```
fashion-landing-page/
├── app/                      # Next.js Page Routes (33 static pages)
│   ├── archive/              # Season Timeline Museum Routes
│   ├── atelier/              # Bespoke Mannequin fitting pass request
│   ├── checkout/             # Secured order parameters form
│   ├── collections/          # Seasonal capsules layouts
│   ├── editorial/            # Stories, insights, and dialogues
│   ├── house/                # About, sustainability, craftsmanship, and contact
│   ├── runway/               # Fullscreen show and campaign cinema
│   ├── shop/                 # Catalog search grid with density selection
│   ├── signin/               # Split-screen credentials portal
│   └── signup/               # Style preference registration
├── components/               # Pure React UI Components
│   ├── header.tsx            # Sticky navigation & drawers container
│   ├── footer.tsx            # Footer, directories, and top scroll
│   ├── style-oracle.tsx      # AI Quiz drawer module
│   ├── atelier-mannequin.tsx # SVG sizing mannequin blueprint
│   └── ...                   # Brand manifesto, film reels, and collection sections
├── public/                   # Media files, images, and logo asset
├── lib/                      # State Context, sounds utils, and types
├── components.json           # Shadcn / UI configuration
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies and run scripts
├── tsconfig.json             # TypeScript configuration
└── .gitignore                # Production ignore filter
```

---

## ✦ Comprehensive Route Map (33 Static Pages)

| Domain Path | Route | Module Focus |
| :--- | :--- | :--- |
| **Bespoke System** | `/atelier` | Scalable SVG Mannequin & Reservation Form |
| **Runway & Film** | `/runway` | Campaign Cinema, Backstage Moments, Show Highlights |
| **Shopping Grid** | `/shop` | 3-Density Product Showcase, Filters, Context Bag |
| **Detail Views** | `/shop/[id]` | Garment details, sizing logic, wishlist controls |
| **Secure Checkout** | `/checkout` | Order details, shipping configurations, success popups |
| **Credentials Gate** | `/signin` | Client portal credentials access |
| **Preferences** | `/signup` | Personalized aesthetic styling registration |
| **Editorial Center** | `/editorial` | Design manifesto and designer notes |
| | `/editorial/manifesto` | The Core Manifesto of ORLIEN |
| | `/editorial/interviews` | Conversations with the creative directors |
| | `/editorial/campaign` | Behind the scenes camera reels |
| **House Roots** | `/house` | Digital museum of brand operations |
| | `/house/about` | Heritage, philosophy, and history |
| | `/house/sustainability` | Zero-waste and carbon-neutral commitments |
| | `/house/craftsmanship` | Artisanal material sourcing |
| | `/house/contact` | Atelier coordinates & support |
| **Support Desk** | `/customer-care` | Shipping, Returns, Size Guides, FAQs |
| **Collections** | `/collections` | Seasonal capsules and collections grid |
| | `/collections/collections-landing` | Main cinematic collections index |
| | `/collections/new-arrivals` | Latest Expressions of ORLIEN |
| | `/collections/ss26` | Spring / Summer 26 Editorial Grid |
| | `/collections/fw26` | Autumn / Winter 26 Cinematic showcase |
| | `/collections/limited-edition` | Exclusive acquisition slots |
| | `/collections/runway-landing` | Fullscreen Runway Film & backstage moments |
| | `/collections/latest-show` | Show Opening & designer statement |
| | `/collections/show-archive` | Historic Runway records |
| | `/collections/creative-direction` | Design vision & fabric concepts |
| **Timeline Archives** | `/archive` | Season Archive Museum Index |
| | `/archive/timeline` | Decade-long runway collection registry |
| | `/archive/past-collections` | Vintage showroom catalog |
| | `/archive/editorial-stories` | Archive campaigns and media clippings |
| | `/archive/press-releases` | Historical announcements and reviews |
| | `/archive/digital-exhibitions` | Immersive Virtual Reality showcases |

---

## ✦ Installation & Local Launch

Verify you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed, then follow these instructions:

### 1. Clone & Install Dependencies
```bash
# Clone the repository and navigate into it
cd fashion-landing-page

# Install production and development dependencies
pnpm install
```

### 2. Run Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live local experience.

### 3. Production Build Validation
Confirm that all routes compile correctly and static props hydrate cleanly:
```bash
pnpm run build
```

---

## ✦ GitHub Upload Checklist (`.gitignore` Setup)

To verify the codebase is clean before pushing to your GitHub repository:
- All Next.js compile output (`.next/`, `out/`) is automatically ignored.
- Lockfile logs, Node modules, `.env.local` files, and operating system caches (`.DS_Store`, `Thumbs.db`) are excluded.
- IDE configurations (`.idea/`, `.vscode/`) and developer scrapers are kept out of the index.

To initialize your repository and push to GitHub:
```bash
# Add files to index
git add .

# Verify staged files (checking gitignore compliance)
git status

# Commit
git commit -m "feat: launch ORLIEN luxury landing experience & atelier showroom"

# Link to GitHub remote and push
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

---
<p align="center">
  ✦ ORLIEN LUXURY FASHION HOUSE • PARIS • MILAN • NEW YORK ✦
</p>
