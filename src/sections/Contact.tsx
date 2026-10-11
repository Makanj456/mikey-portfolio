import { useRef } from "react"
import { useGSAP } from "@gsap/react"

import { profile } from "@/content"
import { gsap, SplitText } from "@/lib/gsap"

export default function Contact() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const split = SplitText.create(".contact-title", { type: "lines", mask: "lines" })
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".contact-title", start: "top 80%" },
        })
        gsap.from(".contact-reveal", {
          autoAlpha: 0,
          y: 20,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-title", start: "top 70%" },
        })
      })
    },
    { scope: root }
  )

  return (
    <section id="contact" ref={root} className="bg-ink text-paper px-5 pt-[20vh] pb-8 md:px-10">
      <p className="contact-reveal eyebrow mb-10 opacity-60">(Contact)</p>
      <h2 className="contact-title max-w-[16ch] font-serif text-[clamp(3rem,8.5vw,9rem)] leading-[0.92]">
        Let&rsquo;s make something <em>considered</em>.
      </h2>

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10">
        <a
          href={`mailto:${profile.email}`}
          className="contact-reveal group col-span-12 w-fit font-serif text-[clamp(1.6rem,3vw,2.8rem)] md:col-span-7"
        >
          <span className="relative">
            {profile.email}
            <span className="bg-accent absolute -bottom-1 left-0 h-px w-full origin-right transition-transform duration-700 ease-out group-hover:scale-x-0" />
          </span>
        </a>
        <ul className="contact-reveal col-span-12 flex flex-wrap gap-x-8 gap-y-3 md:col-span-5 md:justify-end">
          {profile.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener" className="eyebrow opacity-70 transition-opacity hover:opacity-100">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="border-paper/15 eyebrow mt-[18vh] flex flex-wrap justify-between gap-4 border-t pt-6 opacity-60">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Gothenburg, Sweden</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}
