import { useRef } from "react"
import { useGSAP } from "@gsap/react"

import { gsap, ScrollTrigger } from "@/lib/gsap"

const words = ["Engineering", "Management", "Research", "Teaching"]

// A slow line of type that speeds up and changes direction with your scroll.
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const loop = gsap.to(".marquee-track", { xPercent: -50, ease: "none", duration: 40, repeat: -1 })
        let direction = 1
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            if (self.direction !== direction) direction = self.direction
            const boost = Math.min(Math.abs(self.getVelocity()) / 220, 8)
            gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.3, overwrite: true })
            gsap.to(loop, { timeScale: direction, duration: 1.4, delay: 0.3, ease: "power2.out" })
          },
        })
      })
    },
    { scope: root }
  )

  const row = (
    <span className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-[3vw] font-serif text-[clamp(3.5rem,10vw,10rem)] leading-none italic">{w}</span>
          <span className="bg-accent h-2.5 w-2.5 rounded-full md:h-3.5 md:w-3.5" />
        </span>
      ))}
    </span>
  )

  return (
    <div ref={root} className="overflow-hidden py-[12vh] select-none" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  )
}
