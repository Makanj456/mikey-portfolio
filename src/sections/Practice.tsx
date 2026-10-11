import { useRef } from "react"
import { useGSAP } from "@gsap/react"

import { experience } from "@/content"
import { gsap } from "@/lib/gsap"

// Experience as a pinned horizontal strip on large screens; a simple
// stacked list everywhere else.
export default function Practice() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!
        const distance = () => el.scrollWidth - window.innerWidth
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        gsap.utils.toArray<HTMLElement>(".practice-panel").forEach((panel) => {
          gsap.from(panel.querySelectorAll(".practice-reveal"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 85%" },
          })
        })
      })
    },
    { scope: root }
  )

  return (
    <section id="practice" ref={root} className="bg-paper-deep overflow-hidden">
      <div
        ref={track}
        className="flex flex-col gap-16 px-5 py-[16vh] md:px-10 lg:h-svh lg:w-max lg:flex-row lg:items-center lg:gap-0 lg:py-0"
      >
        <div className="shrink-0 lg:w-[38vw] lg:pr-[6vw]">
          <p className="eyebrow text-stone mb-6">(Practice)</p>
          <h2 className="font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.9]">
            Research, teaching <em>&amp;</em> the work in between.
          </h2>
        </div>
        {experience.map((e, i) => (
          <article
            key={e.title}
            className="practice-panel border-ink/15 shrink-0 border-t pt-6 lg:flex lg:h-[56vh] lg:w-[30vw] lg:flex-col lg:border-t-0 lg:border-l lg:px-[2.5vw] lg:pt-0"
          >
            <p className="practice-reveal font-serif text-accent text-[clamp(4rem,8vw,8rem)] leading-none">
              {String(i + 1).padStart(2, "0")}
            </p>
            <div className="lg:mt-auto">
              <p className="practice-reveal eyebrow text-stone mt-6">{e.period}</p>
              <h3 className="practice-reveal mt-3 font-serif text-[clamp(1.8rem,2.4vw,2.6rem)] leading-[1.02]">
                {e.title}
              </h3>
              <p className="practice-reveal eyebrow mt-3">{e.org}</p>
              <p className="practice-reveal text-stone mt-5 max-w-sm text-[15px] leading-relaxed">{e.description}</p>
            </div>
          </article>
        ))}
        <div className="hidden shrink-0 lg:block lg:w-[8vw]" />
      </div>
    </section>
  )
}
