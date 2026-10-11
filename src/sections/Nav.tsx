import { useEffect, useState } from "react"

import { profile } from "@/content"

const links = [
  { label: "Work", href: "#work" },
  { label: "Practice", href: "#practice" },
  { label: "Contact", href: "#contact" },
]

function useGothenburgTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Stockholm" }).format(
      new Date()
    )
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000)
    return () => clearInterval(id)
  }, [])
  return time
}

// Difference blending keeps the nav legible over both the hero image
// and the light page.
export default function Nav() {
  const time = useGothenburgTime()
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <nav className="pointer-events-auto mx-auto flex items-baseline justify-between px-5 py-5 md:px-10 md:py-7">
        <a href="#top" className="font-serif text-2xl leading-none md:text-[28px]">
          {profile.name}
        </a>
        <span className="eyebrow hidden opacity-80 md:block">Gothenburg, SE · {time}</span>
        <ul className="flex gap-5 md:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="eyebrow group relative">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
