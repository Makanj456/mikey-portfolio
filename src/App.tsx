import { lazy, Suspense, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"

import { BlurFade } from "@/components/magicui/blur-fade"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { MagicCard } from "@/components/magicui/magic-card"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import Aurora from "@/components/reactbits/Aurora"
import { about, profile, projects, skills } from "@/content"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { cn } from "@/lib/utils"

// three.js is loaded in its own chunk so the text renders first
const HeroScene = lazy(() => import("@/components/HeroScene"))

const nav = ["About", "Projects", "Skills", "Contact"]

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="border-border/60 bg-background/70 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="scroll-progress from-accent absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r to-sky-400" />
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-lg">
          mikey<span className="text-accent">.dev</span>
        </a>
        <button
          className="p-2 sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="bg-foreground mb-1.5 block h-0.5 w-6" />
          <span className="bg-foreground mb-1.5 block h-0.5 w-6" />
          <span className="bg-foreground block h-0.5 w-6" />
        </button>
        <ul
          className={cn(
            "border-border bg-background absolute inset-x-0 top-16 flex-col gap-5 border-b p-6 sm:static sm:flex sm:flex-row sm:gap-8 sm:border-0 sm:bg-transparent sm:p-0",
            open ? "flex" : "hidden"
          )}
        >
          {nav.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-muted hover:text-foreground text-sm transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
      {/* React Bits: Aurora background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-60">
        <Aurora colorStops={["#7c3aed", "#38bdf8", "#7c3aed"]} amplitude={1.0} blend={0.6} speed={0.6} />
      </div>
      <div className="from-background/0 to-background pointer-events-none absolute inset-0 bg-gradient-to-b from-40%" />
      {/* three.js: wireframe shape on the right (faint behind the text on phones) */}
      <div className="hero-scene absolute top-[12%] right-[-25%] h-[55%] w-[100%] opacity-30 md:top-[15%] md:right-0 md:h-[70%] md:w-[50%] md:opacity-100">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6">
        <BlurFade delay={0.1}>
          <p className="text-accent mb-4 font-mono">Hi, my name is</p>
        </BlurFade>
        <BlurFade delay={0.25}>
          <h1 className="text-5xl leading-tight font-bold tracking-tight sm:text-7xl">
            {profile.name} <span className="text-muted">{profile.lastName}</span>
          </h1>
        </BlurFade>
        <BlurFade delay={0.4}>
          <h2 className="text-muted mt-3 max-w-3xl text-2xl font-semibold sm:text-4xl">{profile.role}</h2>
        </BlurFade>
        <BlurFade delay={0.55}>
          <p className="text-muted mt-6 max-w-xl text-lg">{profile.pitch}</p>
        </BlurFade>
        <BlurFade delay={0.7}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects">
              <ShimmerButton background="rgba(24, 24, 27, 1)" shimmerColor="#c4b5fd">
                <span className="text-sm font-medium">See my work</span>
              </ShimmerButton>
            </a>
            <a
              href="#contact"
              className="border-border hover:border-accent rounded-full border px-6 py-3 text-sm font-medium transition-colors"
            >
              Get in touch
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <BlurFade inView>
        <h2 className="mb-10 flex items-center gap-3 text-3xl font-bold">
          <span className="text-accent font-mono text-lg font-normal">{num}</span>
          {title}
          <span className="section-rule bg-border ml-3 hidden h-px max-w-xs flex-1 origin-left sm:block" />
        </h2>
      </BlurFade>
      {children}
    </section>
  )
}

function About() {
  return (
    <Section id="about" num="01." title="About me">
      <div className="grid items-start gap-12 md:grid-cols-[3fr_2fr]">
        <div className="text-muted space-y-4">
          {about.map((p, i) => (
            <BlurFade key={i} inView delay={0.1 + i * 0.1}>
              <p>{p}</p>
            </BlurFade>
          ))}
        </div>
        <BlurFade inView delay={0.2}>
          {/* Replace with <img src={`${import.meta.env.BASE_URL}profile.jpg`} ... /> after adding public/profile.jpg */}
          <div className="border-accent/50 bg-accent/10 relative grid aspect-square max-w-64 place-items-center overflow-hidden rounded-2xl border">
            <DotPattern className="text-accent/30" />
            <span className="text-accent relative text-7xl font-bold">M</span>
          </div>
        </BlurFade>
      </div>
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects" num="02." title="Projects">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <BlurFade key={p.title} inView delay={0.1 + i * 0.1} className="h-full">
            <MagicCard
              className="h-full rounded-xl"
              gradientColor="#1e1b4b"
              gradientFrom="#a78bfa"
              gradientTo="#38bdf8"
            >
              <article className="flex h-full flex-col p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-accent text-2xl">◆</span>
                  <div className="flex gap-4 text-sm">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener" className="text-muted hover:text-accent">
                        GitHub
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener" className="text-muted hover:text-accent">
                        Live
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
                <p className="text-muted mb-6 flex-1 text-sm">{p.description}</p>
                <Tags items={p.tags} />
              </article>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}

function Tags({ items, itemClassName }: { items: string[]; itemClassName?: string }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className={cn("bg-accent/10 text-accent rounded-full px-3 py-1 font-mono text-xs", itemClassName)}>
          {t}
        </li>
      ))}
    </ul>
  )
}

function Skills() {
  return (
    <Section id="skills" num="03." title="Skills">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s, i) => (
          <BlurFade key={s.group} inView delay={0.1 + i * 0.08}>
            <div className="border-border h-full rounded-xl border p-6">
              <h3 className="mb-4 font-semibold">{s.group}</h3>
              <Tags items={s.items} itemClassName="skill-tag" />
            </div>
          </BlurFade>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <DotPattern
        glow
        className="text-accent/25 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
      />
      <div className="relative mx-auto max-w-2xl px-4 text-center">
        <BlurFade inView>
          <p className="text-accent mb-3 font-mono">04. What's next?</p>
          <h2 className="mb-5 text-4xl font-bold sm:text-5xl">Get in touch</h2>
          <p className="text-muted mb-10 text-lg">
            I'm open to internships, thesis collaborations and interesting projects. My inbox is always open.
          </p>
          <a href={`mailto:${profile.email}`} className="inline-block">
            <ShimmerButton background="rgba(24, 24, 27, 1)" shimmerColor="#c4b5fd">
              <span className="font-medium">Say hello</span>
            </ShimmerButton>
          </a>
          <ul className="mt-10 flex justify-center gap-8">
            {profile.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener" className="text-muted hover:text-accent text-sm">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Thin progress bar under the header, tied to page scroll
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      })

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The 3D shape drifts up and fades as you scroll past the hero
        gsap.to(".hero-scene", {
          yPercent: -25,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: 1 },
        })

        // Section heading rules draw in from the left
        gsap.utils.toArray<HTMLElement>(".section-rule").forEach((rule) => {
          gsap.from(rule, {
            scaleX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: rule, start: "top 85%" },
          })
        })

        // Skill tags pop in, staggered, as each card enters
        gsap.set(".skill-tag", { autoAlpha: 0, y: 12, scale: 0.9 })
        ScrollTrigger.batch(".skill-tag", {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.04, ease: "back.out(2)", overwrite: true }),
        })
      })
    },
    { scope: root }
  )

  return (
    <div ref={root}>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-border text-muted border-t py-8 text-center text-sm">
        © {new Date().getFullYear()} {profile.name}. Built with React, Magic UI &amp; React Bits.
      </footer>
    </div>
  )
}
