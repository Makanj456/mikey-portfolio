import { useRef } from "react"
import { useGSAP } from "@gsap/react"

import DistortImage from "@/components/gl/DistortImage"
import { projects } from "@/content"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"

// Each project is an editorial spread: a large plate that unmasks as it
// enters, with the image drifting inside its frame for depth.
export default function Work() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".work-heading-line", {
          yPercent: 110,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".work-heading", start: "top 85%" },
        })

        gsap.utils.toArray<HTMLElement>(".work-item").forEach((item) => {
          const clip = item.querySelector(".work-clip")
          const inner = item.querySelector(".work-inner")
          gsap.fromTo(
            clip,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.8,
              ease: "expo.inOut",
              scrollTrigger: { trigger: item, start: "top 80%" },
            }
          )
          gsap.fromTo(
            inner,
            { yPercent: -7 },
            { yPercent: 7, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true } }
          )
          gsap.from(item.querySelectorAll(".work-reveal"), {
            y: 30,
            autoAlpha: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: item, start: "top 70%" },
          })
        })
      })
    },
    { scope: root }
  )

  return (
    <section id="work" ref={root} className="px-5 pt-[14vh] md:px-10">
      <div className="work-heading border-ink/15 flex items-end justify-between border-b pb-6">
        <h2 className="font-serif text-[clamp(3.5rem,11vw,11rem)] leading-[0.85]">
          <span className="line-mask block">
            <span className="work-heading-line block">Selected</span>
          </span>
          <span className="line-mask block">
            <span className="work-heading-line block italic">work</span>
          </span>
        </h2>
        <p className="eyebrow text-stone pb-3">({String(projects.length).padStart(2, "0")})</p>
      </div>

      {projects.map((p, i) => {
        const flip = i % 2 === 1
        return (
          <article key={p.title} className="work-item grid grid-cols-12 gap-x-6 gap-y-8 py-[10vh] md:py-[16vh]">
            <div
              className={cn(
                "col-span-12 md:col-span-8",
                flip ? "md:order-2 md:col-start-5" : "md:col-start-1",
                i === 0 && "md:col-span-9"
              )}
            >
              <div className="work-clip overflow-hidden">
                <div className="work-inner -my-[6%]">
                  <DistortImage src={p.image} alt={p.title} className="aspect-[3/2] w-full" />
                </div>
              </div>
            </div>

            <div
              className={cn(
                "col-span-12 flex flex-col justify-end md:col-span-4",
                flip ? "md:order-1 md:col-span-3 md:col-start-1" : "md:col-start-auto",
                i === 0 && "md:col-span-3"
              )}
            >
              <p className="work-reveal eyebrow text-accent mb-5">({String(i + 1).padStart(2, "0")})</p>
              <h3 className="work-reveal font-serif text-[clamp(2.4rem,4vw,3.8rem)] leading-[0.95]">{p.title}</h3>
              <p className="work-reveal eyebrow text-stone mt-4">{p.context}</p>
              <p className="work-reveal mt-6 text-[15px] leading-relaxed">{p.description}</p>
              {p.role && <p className="work-reveal text-stone mt-4 text-[15px] leading-relaxed">{p.role}</p>}
              <p className="work-reveal text-stone border-ink/10 mt-6 border-t pt-4 text-[13px]">{p.tags.join(" / ")}</p>
              {p.links?.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="work-reveal eyebrow group mt-5 inline-flex w-fit items-center gap-2"
                >
                  <span className="relative">
                    {l.label}
                    <span className="bg-ink absolute -bottom-1 left-0 h-px w-full origin-left transition-transform duration-500 group-hover:scale-x-0" />
                  </span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </a>
              ))}
            </div>
          </article>
        )
      })}
    </section>
  )
}
