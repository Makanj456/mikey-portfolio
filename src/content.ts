// All the text on the site lives here. Replace the [bracketed placeholders]
// with your own details; the layout picks up changes automatically.

export const profile = {
  name: "Mikey",
  lastName: "[Last name]",
  role: "Software Engineering & Management student at the University of Gothenburg.",
  pitch:
    "I build software and think about how teams build it well. Currently exploring AI engineering, web development and agile ways of working.",
  email: "you@example.com",
  links: [
    { label: "GitHub", href: "https://github.com/Makanj456" },
    { label: "LinkedIn", href: "#" },
    { label: "CV (PDF)", href: "#" },
  ],
}

export const about = [
  "I'm a student in the Software Engineering and Management programme at the University of Gothenburg, where I combine hands-on programming with the methods, processes and people side of building software.",
  "[Add a few sentences about what got you into software, what you enjoy working on, and what you are looking for next, for example an internship, thesis or part-time role.]",
  "Outside of studies, I [hobbies / interests].",
]

export type Project = {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
}

export const projects: Project[] = [
  {
    title: "AI Engineering coursework",
    description:
      "[Describe the project: the problem, what you built, and what you learned. Mention results if you have them.]",
    tags: ["Python", "Machine Learning", "LLMs"],
    github: "#",
  },
  {
    title: "Team software project",
    description:
      "[A course project built in a team using Scrum. What was your role, and what did the team deliver?]",
    tags: ["Java", "Scrum", "Git"],
    github: "#",
    live: "#",
  },
  {
    title: "This portfolio",
    description:
      "Built with React, Tailwind CSS, GSAP and three.js, plus components from Magic UI and React Bits. Deployed on GitHub Pages.",
    tags: ["React", "GSAP", "three.js"],
    github: "https://github.com/Makanj456/mikey-portfolio",
  },
]

export const skills = [
  { group: "Languages", items: ["Java", "Python", "TypeScript", "SQL"] },
  { group: "Tools & Frameworks", items: ["Git & GitHub", "Docker", "React", "PyTorch"] },
  { group: "Engineering practice", items: ["Agile / Scrum", "Testing", "CI/CD", "Requirements"] },
  { group: "Management", items: ["Project planning", "Team leadership", "Stakeholder communication"] },
]
