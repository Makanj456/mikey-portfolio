import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
export const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches

export { gsap, ScrollTrigger, SplitText }
