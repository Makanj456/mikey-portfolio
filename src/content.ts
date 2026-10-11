// All the text on the site lives here. Replace the [bracketed placeholders]
// with your own details; the layout picks up changes automatically.

const img = (name: string) => `${import.meta.env.BASE_URL}work/${name}`

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

// The large statement under the hero
export const intro =
  "I study Software Engineering and Management in Gothenburg, and I like building things that meet the real world: self-driving miniature cars, connected hardware, and an asteroid impact simulator built in a weekend for NASA."

export const about = [
  "I'm a student in the Software Engineering and Management programme at the University of Gothenburg, where I combine hands-on programming with the methods, processes and people side of building software.",
  "[Add a few sentences about what got you into software, what you enjoy working on, and what you are looking for next, for example an internship, thesis or part-time role.]",
  "Outside of studies, I [hobbies / interests].",
]

export type Project = {
  title: string
  context: string
  description: string
  role?: string
  tags: string[]
  /** Placeholder artwork in public/work. Swap for real screenshots or photos. */
  image: string
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    title: "Impactor",
    image: img("impactor.jpg"),
    context: "NASA Space Apps Hackathon",
    description:
      "An asteroid impact simulator on a 3D globe. Pick a real near-Earth asteroid from NASA's NEO data, change its size, velocity and trajectory, and see the crater, shockwave, tsunami and affected population.",
    tags: ["React", "TypeScript", "CesiumJS", "Python", "NASA NEO API"],
  },
  {
    title: "Autonomous miniature car",
    image: img("car.jpg"),
    context: "Cyber-Physical Systems, 2026",
    description:
      "Software for a self-driving miniature car. It detects blue and yellow cones with OpenCV, finds the midline between them and steers with a proportional controller. Built in a team of four with CI and coverage on GitLab.",
    tags: ["C++", "OpenCV", "CMake", "GitLab CI", "Docker"],
  },
  {
    title: "Carduino",
    image: img("carduino.jpg"),
    context: "System Development",
    description:
      "An affordable IoT remote-control car on a Wio Terminal, driven from a web app over MQTT, with live temperature and accelerometer diagnostics, lights, a buzzer, auto power-off and auto-stop when the connection drops.",
    role: "Built the car's motors and movement in a team of five.",
    tags: ["Arduino C++", "MQTT", "Vue", "IoT"],
    links: [{ label: "Demo", href: "https://youtu.be/xkcIwFoFTME" }],
  },
  {
    title: "CineMate",
    image: img("cinemate.jpg"),
    context: "Web Engineering",
    description:
      "A movie and series discovery app with likes, a watchlist, recommendations and games like Tinder-style swiping, \"This or That\" and \"Match the Quote\".",
    role: "Architected the REST API, modelled the data, imported thousands of titles from an external movie API, built the Vue frontend and added real-time comments.",
    tags: ["Node.js", "Express", "MongoDB", "Vue", "Socket.IO", "JWT"],
  },
  {
    title: "Bank System",
    image: img("bank.jpg"),
    context: "Agile Software Project Management",
    description:
      "A desktop banking app with accounts, cards, transfers, loans, savings, a currency converter and stock tracking, delivered over eight Scrum sprints.",
    role: "Product Owner: wrote the product vision, goal and roadmap, owned the backlog and helped plan work on a 1,200-hour budget.",
    tags: ["Python", "PySimpleGUI", "Scrum", "Product ownership"],
  },
]

export const experience = [
  {
    title: "Research Assistant",
    org: "Ericsson",
    period: "Ongoing",
    description:
      "Building a pipeline that tests whether AI can detect, and possibly resolve, inconsistencies in technical documentation.",
  },
  {
    title: "Teaching Assistant, Systems Development",
    org: "University of Gothenburg",
    period: "Feb 2025 – May 2026",
    description: "Mentored student teams on Arduino, React/Vue and Git.",
  },
  {
    title: "Teaching Assistant, Object-Oriented Programming",
    org: "University of Gothenburg",
    period: "Oct 2025 – Jan 2026",
    description: "Supported around 150 students learning Java.",
  },
  {
    title: "Teaching Assistant, Fundamentals of Programming",
    org: "University of Gothenburg",
    period: "Aug – Oct 2025",
    description: "Supported around 150 students learning Python.",
  },
]

export const skills = [
  { group: "Languages", items: ["Python", "Java", "C / C++", "TypeScript", "JavaScript", "Go", "SQL"] },
  { group: "Web & Tools", items: ["React", "Vue", "Node.js", "MongoDB", "OpenCV", "Docker", "Git & CI"] },
  { group: "Engineering practice", items: ["Agile / Scrum", "Testing", "CI/CD", "Software architecture", "IoT"] },
  { group: "Management", items: ["Product ownership", "Backlog & roadmaps", "Teaching & mentoring"] },
]
