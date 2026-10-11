import { useEffect, useRef } from "react"

import { canHover, gsap, prefersReducedMotion } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import type { DistortGL } from "./distort-engine"

type Props = { src: string; alt: string; className?: string }

// An image that picks up a soft lens distortion under the pointer.
// The WebGL layer is only created on first hover (and never on touch
// devices), and it only renders while the effect is animating.
export default function DistortImage({ src, alt, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !canHover() || prefersReducedMotion()) return

    let gl: DistortGL | null = null
    let loading = false
    let hovering = false
    let disposed = false

    const target = { x: 0.5, y: 0.5 }
    const tick = (time: number) => {
      if (!gl) return
      gl.uniforms.uTime.value = time
      const m = gl.uniforms.uMouse.value
      m.x += (target.x - m.x) * 0.12
      m.y += (target.y - m.y) * 0.12
      gl.render()
    }
    let ticking = false
    const startTicking = () => {
      if (!ticking) gsap.ticker.add(tick)
      ticking = true
    }
    const stopTicking = () => {
      gsap.ticker.remove(tick)
      ticking = false
    }

    const activate = () => {
      if (!gl || !hovering) return
      gl.uniforms.uMouse.value.set(target.x, target.y)
      startTicking()
      gsap.to(gl.uniforms.uHover, { value: 1, duration: 0.9, ease: "power3.out", overwrite: true })
    }
    const onEnter = (e: PointerEvent) => {
      hovering = true
      onMove(e)
      if (gl) return activate()
      if (loading) return
      loading = true
      import("./distort-engine").then(({ createDistortGL }) => {
        if (disposed) return
        gl = createDistortGL(el, src)
        activate()
      })
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = 1 - (e.clientY - r.top) / r.height
    }
    const onLeave = () => {
      hovering = false
      if (!gl) return
      gsap.to(gl.uniforms.uHover, { value: 0, duration: 0.9, ease: "power3.out", overwrite: true, onComplete: stopTicking })
    }

    el.addEventListener("pointerenter", onEnter)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      disposed = true
      el.removeEventListener("pointerenter", onEnter)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      stopTicking()
      if (gl) gsap.killTweensOf(gl.uniforms.uHover)
      gl?.dispose()
    }
  }, [src])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  )
}
