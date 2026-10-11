import { useRef } from "react"
import { useGSAP } from "@gsap/react"

import { skills } from "@/content"
import { gsap } from "@/lib/gsap"

export default function Capabilities() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".cap-group").forEach((g) => {
          gsap.from(g.querySelector(".cap-rule"), {
            scaleX: 0,
            transformOrigin: "left",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: g, start: "top 85%" },
          })
          gsap.from(g.querySelectorAll(".cap-item"), {
            y: 16,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: g, start: "top 85%" },
          })
        })
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="grid grid-cols-12 gap-x-6 px-5 pb-[18vh] md:px-10">
      <p className="eyebrow text-stone col-span-12 mb-10 md:col-span-3">(Capabilities)</p>
      <div className="col-span-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 md:col-span-9">
        {skills.map((s) => (
          <div key={s.group} className="cap-group">
            <div className="cap-rule bg-ink/20 mb-5 h-px" />
            <h3 className="cap-item font-serif text-3xl">{s.group}</h3>
            <ul className="mt-4 space-y-1.5">
              {s.items.map((item) => (
                <li key={item} className="cap-item text-stone text-[15px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
