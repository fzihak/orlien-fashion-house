'use client'

import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { sounds } from '@/lib/sound-utils'
import { useAppState } from '@/lib/state-context'
import { Info } from 'lucide-react'

interface Product3DCarouselProps {
  images: string[]
  activeIndex: number
  onChangeIndex: (index: number) => void
}

export default function Product3DCarousel({ images, activeIndex, onChangeIndex }: Product3DCarouselProps) {
  const { soundEnabled } = useAppState()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  
  // Track WebGL compatibility
  const [webglError, setWebglError] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const carouselGroupRef = useRef<THREE.Group | null>(null)
  const targetRotationYRef = useRef<number>(0)
  const imagesLengthRef = useRef<number>(images.length)

  // Sync length changes
  useEffect(() => {
    imagesLengthRef.current = images.length
  }, [images])

  // Sync external activeIndex changes back into Three.js target rotation
  useEffect(() => {
    const theta = (Math.PI * 2) / imagesLengthRef.current
    // Align target rotation to place active image directly in front (angle = 0, so rotation = -angle)
    targetRotationYRef.current = -activeIndex * theta
  }, [activeIndex])

  useEffect(() => {
    if (!canvasRef.current) return

    let renderer: THREE.WebGLRenderer
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let carouselGroup: THREE.Group
    let requestFrameId: number
    const clock = new THREE.Clock()
    const meshes: THREE.Mesh[] = []

    const width = canvasRef.current.clientWidth
    const height = canvasRef.current.clientHeight

    try {
      // 1. Setup Scene, Camera, and Renderer
      scene = new THREE.Scene()
      
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
      camera.position.set(0, 0, 7) // View from front

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height, false)

      // 2. Add Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
      scene.add(ambientLight)

      const dirLight = new THREE.DirectionalLight(0xffffff, 2.5)
      dirLight.position.set(0, 5, 5)
      scene.add(dirLight)

      // 3. Load Textures & Build Carousel Group
      carouselGroup = new THREE.Group()
      carouselGroupRef.current = carouselGroup
      scene.add(carouselGroup)

      const textureLoader = new THREE.TextureLoader()
      const theta = (Math.PI * 2) / imagesLengthRef.current
      const radius = 3.0 // Radius of the cylinder carousel

      // Build individual image panels
      images.forEach((imgSrc, idx) => {
        // High quality standard geometry panel with 3:4 aspect ratio
        const geometry = new THREE.PlaneGeometry(2.1, 2.8, 16, 16)
        
        // Load textures asynchronously
        const texture = textureLoader.load(imgSrc, (tex) => {
          tex.generateMipmaps = true
          tex.minFilter = THREE.LinearMipmapLinearFilter
        })

        // Standard material with specs and reflections
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
          roughness: 0.2,
          metalness: 0.05
        })

        const mesh = new THREE.Mesh(geometry, material)
        const angle = idx * theta

        // Position on the perimeter of the cylinder
        mesh.position.set(
          radius * Math.sin(angle),
          0,
          radius * Math.cos(angle)
        )

        // Rotate panels outwards to face the camera
        mesh.rotation.y = angle
        mesh.userData = { index: idx }

        carouselGroup.add(mesh)
        meshes.push(mesh)
      })

      // 4. Mouse / Touch Interactions Setup
      let isPointerDown = false
      let startPointerX = 0
      let startRotationY = 0
      let lastMoveTime = 0
      let isActuallyDrag = false

      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      let hoveredMeshIndex: number | null = null

      const getPointerX = (e: MouseEvent | TouchEvent) => {
        if ('touches' in e) {
          return e.touches[0].clientX
        }
        return e.clientX
      }

      const getPointerY = (e: MouseEvent | TouchEvent) => {
        if ('touches' in e) {
          return e.touches[0].clientY
        }
        return e.clientY
      }

      const handlePointerDown = (e: MouseEvent | TouchEvent) => {
        isPointerDown = true
        isActuallyDrag = false
        startPointerX = getPointerX(e)
        startRotationY = targetRotationYRef.current
        lastMoveTime = Date.now()
      }

      const handlePointerMove = (e: MouseEvent | TouchEvent) => {
        // Compute pointer normalization for raycasting hover effects
        const rect = canvasRef.current!.getBoundingClientRect()
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
        
        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1

        if (!isPointerDown) return

        const currentX = getPointerX(e)
        const deltaX = currentX - startPointerX

        // Determine if dragging or tapping
        if (Math.abs(deltaX) > 6) {
          isActuallyDrag = true
          setIsDragging(true)
        }

        // Adjust rotation speed based on drag delta
        targetRotationYRef.current = startRotationY + deltaX * 0.0065
        lastMoveTime = Date.now()
      }

      const handlePointerUp = (e: MouseEvent | TouchEvent) => {
        isPointerDown = false
        setIsDragging(false)
        
        // If it was a simple tap/click (not drag), perform hit detection/focus
        if (!isActuallyDrag) {
          raycaster.setFromCamera(mouse, camera)
          const intersects = raycaster.intersectObjects(carouselGroup.children)
          
          if (intersects.length > 0) {
            const hitMesh = intersects[0].object as THREE.Mesh
            const clickedIdx = hitMesh.userData.index
            
            if (soundEnabled) sounds.playClick()
            onChangeIndex(clickedIdx)
          }
        } else {
          // Play sweeping sound on drag release
          if (soundEnabled) sounds.playSweep()
        }
      }

      // Bind Canvas Listeners
      const canvas = canvasRef.current
      canvas.addEventListener('mousedown', handlePointerDown)
      canvas.addEventListener('mousemove', handlePointerMove)
      window.addEventListener('mouseup', handlePointerUp)

      canvas.addEventListener('touchstart', handlePointerDown, { passive: true })
      canvas.addEventListener('touchmove', handlePointerMove, { passive: true })
      window.addEventListener('touchend', handlePointerUp)

      // 5. Window Resize Handler
      const handleResize = () => {
        if (!canvasRef.current || !renderer || !camera) return
        const w = canvasRef.current.clientWidth
        const h = canvasRef.current.clientHeight
        
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h, false)
      }
      window.addEventListener('resize', handleResize)

      // 6. Animation Render Loop
      const animate = () => {
        requestFrameId = requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()

        // Cylinder rotation damping
        carouselGroup.rotation.y += (targetRotationYRef.current - carouselGroup.rotation.y) * 0.075

        // Smooth floating bobbing motion on Y axis
        carouselGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.08

        // Hover raycasting detection
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(carouselGroup.children)

        let newHoverIndex: number | null = null
        if (intersects.length > 0) {
          const intersectedObj = intersects[0].object as THREE.Mesh
          newHoverIndex = intersectedObj.userData.index
        }

        // Play subtle tick on hover changes
        if (newHoverIndex !== hoveredMeshIndex) {
          if (newHoverIndex !== null && soundEnabled) {
            sounds.playPop()
          }
          hoveredMeshIndex = newHoverIndex
        }

        // Apply scale & opacity transitions to meshes
        meshes.forEach((mesh, idx) => {
          const isFocused = idx === activeIndex
          const isHovered = idx === hoveredMeshIndex
          
          let targetScale = 1.0
          let targetOpacity = 0.7

          if (isFocused) {
            targetScale = 1.05
            targetOpacity = 0.95
          } else if (isHovered) {
            targetScale = 1.02
            targetOpacity = 0.85
          }

          // Smoothly interpolate scale and opacity
          mesh.scale.x += (targetScale - mesh.scale.x) * 0.1
          mesh.scale.y += (targetScale - mesh.scale.y) * 0.1
          mesh.scale.z += (targetScale - mesh.scale.z) * 0.1
          
          const mat = mesh.material as THREE.MeshStandardMaterial
          mat.opacity += (targetOpacity - mat.opacity) * 0.1
          
          // Subtle emissive glow on focused panel
          if (isFocused) {
            mat.emissive.setHex(0x111111)
          } else if (isHovered) {
            mat.emissive.setHex(0x050505)
          } else {
            mat.emissive.setHex(0x000000)
          }
        })

        renderer.render(scene, camera)
      }
      
      animate()

      // Cleanup
      return () => {
        cancelAnimationFrame(requestFrameId)
        window.removeEventListener('resize', handleResize)
        
        if (canvas) {
          canvas.removeEventListener('mousedown', handlePointerDown)
          canvas.removeEventListener('mousemove', handlePointerMove)
          canvas.removeEventListener('touchstart', handlePointerDown)
          canvas.removeEventListener('touchmove', handlePointerMove)
        }
        window.removeEventListener('mouseup', handlePointerUp)
        window.removeEventListener('touchend', handlePointerUp)

        // Dispose WebGL resources
        meshes.forEach(m => {
          m.geometry.dispose()
          if (Array.isArray(m.material)) {
            m.material.forEach(mat => mat.dispose())
          } else {
            m.material.dispose()
          }
        })
        renderer.dispose()
      }
    } catch (e) {
      console.error('WebGL Initialization failed:', e)
      setWebglError(true)
    }
  }, [images, soundEnabled, onChangeIndex])

  if (webglError) {
    // Elegant standard image slider fallback if WebGL fails
    return (
      <div className="relative w-full h-full flex flex-col justify-center items-center bg-secondary/15 rounded-3xl p-6 border border-border/40 select-none">
        <div className="relative aspect-[3/4] w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-border/40">
          <img src={images[activeIndex]} alt="Product view" className="w-full h-full object-cover animate-fade-in" />
          <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-[10px] font-mono text-white/90">
            VIEW {activeIndex + 1} OF {images.length}
          </div>
        </div>

        {/* Thumbnail shortcuts */}
        <div className="flex gap-2.5 mt-6 overflow-x-auto max-w-full pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { if (soundEnabled) sounds.playClick(); onChangeIndex(i) }}
              className={`h-12 w-12 rounded-xl overflow-hidden border transition-all shrink-0 ${
                i === activeIndex ? 'border-primary scale-110 shadow-lg' : 'border-border opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-none flex items-center justify-center select-none overflow-hidden bg-gradient-to-b from-transparent to-secondary/5 rounded-3xl border border-border/20">
      
      {/* 3D Canvas wrapper */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full outline-none cursor-grab active:cursor-grabbing" />

      {/* Floating User Helper Guidelines */}
      <div className={`absolute bottom-6 inset-x-6 z-10 flex flex-col items-center gap-1.5 pointer-events-none transition-opacity duration-500 ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/10 bg-background/60 backdrop-blur-md text-[9px] font-mono text-muted-foreground uppercase tracking-widest select-none">
          <Info className="h-3 w-3 text-primary animate-pulse" />
          <span>Drag screen to rotate 3D viewport • Click card to center</span>
        </div>
      </div>

      {/* Overlay active index bullets indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { if (soundEnabled) sounds.playPop(); onChangeIndex(i) }}
            className={`h-2.5 rounded-full transition-all border ${
              i === activeIndex 
                ? 'w-7 bg-primary border-primary' 
                : 'w-2.5 bg-foreground/15 border-transparent hover:bg-foreground/35'
            }`}
            title={`Go to view ${i + 1}`}
          />
        ))}
      </div>
      
    </div>
  )
}
