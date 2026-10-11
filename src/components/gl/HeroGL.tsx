import { useEffect, useRef } from "react"
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three"

import { gsap, prefersReducedMotion } from "@/lib/gsap"
import { heroFragment, vertex } from "./shaders"

type Props = {
  images: string[]
  interval?: number
  /** 0..1, written by the page's ScrollTrigger to zoom the image as you scroll */
  scrollRef?: React.RefObject<number>
  onSlide?: (index: number) => void
}

// Full-bleed ambient image sequence rendered in WebGL. The first image is
// also a plain <img>, so there's something on screen before the GL layer
// is ready, and when WebGL or motion are unavailable.
export default function HeroGL({ images, interval = 6, scrollRef, onSlide }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const canvasHolder = useRef<HTMLDivElement>(null)
  const onSlideRef = useRef(onSlide)
  onSlideRef.current = onSlide

  useEffect(() => {
    const mount = mountRef.current
    const holder = canvasHolder.current
    if (!mount || !holder || prefersReducedMotion()) return

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    holder.appendChild(renderer.domElement)
    renderer.domElement.style.opacity = "0"

    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const uniforms = {
      uFrom: { value: null as Texture | null },
      uTo: { value: null as Texture | null },
      uFromSize: { value: new Vector2(1, 1) },
      uToSize: { value: new Vector2(1, 1) },
      uPlane: { value: new Vector2(1, 1) },
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
      uScroll: { value: 0 },
    }
    const material = new ShaderMaterial({ uniforms, vertexShader: vertex, fragmentShader: heroFragment })
    const geometry = new PlaneGeometry(2, 2)
    scene.add(new Mesh(geometry, material))

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      renderer.setSize(w, h)
      uniforms.uPlane.value.set(w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    const loader = new TextureLoader()
    const textures: Texture[] = []
    const size = (t: Texture) => {
      const img = t.image as HTMLImageElement
      return new Vector2(img.width, img.height)
    }

    let current = 0
    let timer: gsap.core.Tween | null = null
    let disposed = false

    const next = () => {
      const from = current
      const to = (current + 1) % textures.length
      uniforms.uFrom.value = textures[from]
      uniforms.uFromSize.value = size(textures[from])
      uniforms.uTo.value = textures[to]
      uniforms.uToSize.value = size(textures[to])
      uniforms.uProgress.value = 0
      onSlideRef.current?.(to)
      gsap.to(uniforms.uProgress, {
        value: 1,
        duration: 2.4,
        ease: "power2.inOut",
        onComplete: () => {
          current = to
          timer = gsap.delayedCall(interval, next)
        },
      })
    }

    Promise.all(images.map((src) => loader.loadAsync(src))).then((loaded) => {
      if (disposed) return
      textures.push(...loaded)
      uniforms.uFrom.value = uniforms.uTo.value = textures[0]
      uniforms.uFromSize.value = uniforms.uToSize.value = size(textures[0])
      uniforms.uProgress.value = 1
      gsap.to(renderer.domElement, { opacity: 1, duration: 0.6 })
      timer = gsap.delayedCall(interval, next)
    })

    const mouse = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * -1
      mouse.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("pointermove", onMove)

    let visible = true
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(mount)

    const tick = (time: number) => {
      if (!visible || document.hidden || !uniforms.uFrom.value) return
      uniforms.uTime.value = time
      const m = uniforms.uMouse.value
      m.x += (mouse.x - m.x) * 0.04
      m.y += (mouse.y - m.y) * 0.04
      uniforms.uScroll.value = scrollRef?.current ?? 0
      renderer.render(scene, camera)
    }
    gsap.ticker.add(tick)

    return () => {
      disposed = true
      timer?.kill()
      gsap.killTweensOf(uniforms.uProgress)
      gsap.ticker.remove(tick)
      window.removeEventListener("pointermove", onMove)
      ro.disconnect()
      io.disconnect()
      textures.forEach((t) => t.dispose())
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [images, interval, scrollRef])

  return (
    <div ref={mountRef} className="absolute inset-0">
      <img src={images[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div ref={canvasHolder} className="absolute inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" />
    </div>
  )
}
