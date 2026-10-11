import { useRef } from "react"
import { useGSAP } from "@gsap/react"

import DistortImage from "@/components/gl/DistortImage"
import { about, intro, projects } from "@/content"
import { gsap, SplitText } from "@/lib/gsap"

// A large statement that inks in word by word as you read, followed by a
// loose collage of plates drifting at different depths.
export default function Intro() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const split = SplitText.create(".intro-text", { type: "words" })
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          split.words,
          { color: "var(--color-mist)" },
          {
            color: "var(--color-ink)",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ".intro-text", start: "top 80%", end: "bottom 45%", scrub: true },
          }
        )

        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
          const depth = Number(el.dataset.depth)
          gsap.fromTo(
            el,
            { yPercent: depth * 60 },
            {
              yPercent: depth * -60,
              ease: "none",
              scrollTrigger: { trigger: ".collage", start: "top bottom", end: "bottom top", scrub: true },
            }
          )
        })

        gsap.utils.toArray<HTMLElement>(".collage-plate").forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 90%" },
          })
        })
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="px-5 pt-[18vh] pb-[10vh] md:px-10 md:pt-[24vh]">
      <div className="grid grid-cols-12 gap-x-6">
        <p className="eyebrow text-stone col-span-12 mb-8 md:col-span-3 md:mb-0 md:pt-4">(Introduction)</p>
        <p className="intro-text col-span-12 font-serif text-[clamp(2rem,4.2vw,4.4rem)] leading-[1.06] tracking-[-0.005em] md:col-span-9">
          {intro}
        </p>
        <p className="text-stone col-span-12 mt-12 max-w-md text-[15px] leading-relaxed md:col-span-4 md:col-start-10">
          {about[0]}
        </p>
      </div>

      <div className="collage relative mt-[16vh] h-[95vh] md:h-[120vh]">
        <div data-depth="0.15" className="absolute top-[4%] left-0 w-[64%] md:w-[38%]">
          <DistortImage src={projects[1].image} alt={projects[1].title} className="collage-plate aspect-[4/5]" />
          <p className="eyebrow text-stone mt-3">{projects[1].title}</p>
        </div>
        <div data-depth="0.45" className="absolute top-[30%] right-0 w-[58%] md:top-[12%] md:right-[6%] md:w-[30%]">
          <DistortImage src={projects[2].image} alt={projects[2].title} className="collage-plate aspect-[3/4]" />
          <p className="eyebrow text-stone mt-3">{projects[2].title}</p>
        </div>
        <div data-depth="0.8" className="absolute bottom-[2%] left-[18%] w-[56%] md:bottom-[6%] md:left-[34%] md:w-[26%]">
          <DistortImage src={projects[3].image} alt={projects[3].title} className="collage-plate aspect-square" />
          <p className="eyebrow text-stone mt-3">{projects[3].title}</p>
        </div>
      </div>
    </section>
  )
}
