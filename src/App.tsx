import { useSmoothScroll } from "@/lib/smooth-scroll"
import Capabilities from "@/sections/Capabilities"
import Contact from "@/sections/Contact"
import Hero from "@/sections/Hero"
import Intro from "@/sections/Intro"
import Marquee from "@/sections/Marquee"
import Nav from "@/sections/Nav"
import Practice from "@/sections/Practice"
import Work from "@/sections/Work"

export default function App() {
  useSmoothScroll()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Work />
        <Marquee />
        <Practice />
        <div className="h-[16vh]" />
        <Capabilities />
        <Contact />
      </main>
    </>
  )
}
