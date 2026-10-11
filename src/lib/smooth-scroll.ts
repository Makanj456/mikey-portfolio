import Lenis from "lenis"
import { useEffect } from "react"

import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap"

// Momentum scrolling with Lenis, driven by GSAP's ticker so ScrollTrigger
// and the smooth scroll stay in lockstep.
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 })
    lenis.on("scroll", ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Route in-page anchor links through Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a) return
      const target = document.querySelector(a.getAttribute("href")!)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { duration: 1.6 })
    }
    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}
