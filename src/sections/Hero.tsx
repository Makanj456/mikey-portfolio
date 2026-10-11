import { lazy, Suspense, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"

import { profile, projects } from "@/content"
import { gsap, SplitText } from "@/lib/gsap"

// three.js arrives in its own chunk; the first image shows until it's ready
const HeroGL = lazy(() => import("@/components/gl/HeroGL"))
const images = projects.map((p) => p.image)

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const scroll = useRef(0)
  const [slide, setSlide] = useState(0)

  useGSAP(
    () => {
      const title = SplitText.create(".hero-title", { type: "lines", mask: "lines", linesClass: "line" })
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Opening: the frame opens out from the centre, then the headline rises
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-frame", { clipPath: "inset(18% 22% 18% 22%)", duration: 2 })
          .from(".hero-frame img, .hero-frame canvas", { scale: 1.25, duration: 2.4 }, 0)
          .from(title.lines, { yPercent: 110, duration: 1.4, stagger: 0.1 }, 0.7)
          .from(".hero-meta", { autoAlpha: 0, y: 12, duration: 1, stagger: 0.08 }, 1)

        // Scrolling away: the full-bleed image settles into a framed plate
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=90%",
              scrub: true,
              pin: true,
              onUpdate: (self) => (scroll.current = self.progress),
            },
          })
          .to(".hero-frame", { clipPath: "inset(7% 5% 7% 5% round 4px)", ease: "none" }, 0)
          .to(".hero-copy", { yPercent: -40, autoAlpha: 0, ease: "none" }, 0)
          .to(".hero-caption", { autoAlpha: 0, ease: "none", duration: 0.4 }, 0)
      })
    },
    { scope: root }
  )

  const current = projects[slide]

  return (
    <section id="top" ref={root} className="relative h-svh w-full overflow-hidden">
      <div className="hero-frame absolute inset-0 [clip-path:inset(0%_0%_0%_0%)]">
        <Suspense fallback={<img src={images[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />}>
          <HeroGL images={images} scrollRef={scroll} onSlide={setSlide} />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15" />
      </div>

      <div className="hero-copy absolute inset-x-0 bottom-0 px-5 pb-10 text-white md:px-10 md:pb-14">
        <p className="hero-meta eyebrow mb-6 opacity-80">Portfolio · {new Date().getFullYear()}</p>
        <h1 className="hero-title max-w-[14ch] font-serif text-[clamp(3rem,8.4vw,9rem)] leading-[0.92] tracking-[-0.01em]">
          Software, built with <em>care</em> for the real world.
        </h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="hero-meta max-w-sm text-sm leading-relaxed opacity-85">
            {profile.name}, {profile.role.replace(/\.$/, "")}.
          </p>
          <p className="hero-meta hero-caption eyebrow flex items-center gap-3 opacity-85">
            <span>({String(slide + 1).padStart(2, "0")})</span>
            <span key={current.title} className="animate-[fade_1.2s_ease]">
              {current.title} · {current.context}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
