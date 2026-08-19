import type { CapsuleMetric, Project, SkillGroup } from "@/types/content";

export const capsuleMetrics: CapsuleMetric[] = [
  { title: "5+ PROJECTS SHIPPED", subtitle: "Full-Stack Systems" },
  { title: "ACTIVE PRODUCTS", subtitle: "Live in Production" },
  { title: "INTERNATIONAL CLIENTS", subtitle: "Global Reach" },
];

export const projects: Project[] = [
  {
    id: "shitha",
    number: "01",
    title: "Shitha Clothing",
    titleLines: ["Shitha", "Clothing"],
    image: "/assets/photo-1441984904996-e0b6ba687e04",
    tags: ["E-COMMERCE", "SYSTEM SCALE", "PAYMENT FLOWS"],
    description:
      "Built and deployed a production e-commerce system for a 100K audience brand — managing payments, performance, and server infrastructure on a dedicated VPS to ensure reliability under real traffic.",
    highlight: "100K",
    link: "/project/shitha",
  },
  {
    id: "yatra",
    number: "02",
    title: "Yatra 2026",
    titleLines: ["Yatra", "2026"],
    image: "/assets/yatra_tn-bdn1zjF3.png",
    tags: ["ANTI-FRAUD TICKETING", "CRYPTOGRAPHIC ACCESS", "HIGH-CONCURRENCY"],
    description:
      "Engineered a decentralized anti-fraud ticketing & real-time access infrastructure — processing 8,000 concurrent attendees with zero race conditions.",
    highlight: "8,000",
    link: "/project/yatra",
  },
  {
    id: "isro",
    number: "03",
    title: "ISRO Drone",
    titleLines: ["ISRO", "Drone"],
    image: "/assets/photo-1473968512647-3e447244af8f",
    tags: ["AUTONOMOUS", "ONBOARD INTELLIGENCE", "REAL-TIME CONTROL"],
    description:
      "Built a GPS-independent drone system — solving real-time navigation using onboard intelligence and live control dashboards.",
    highlight: "onboard intelligence",
    link: "/project/isro",
  },
  {
    id: "synflow",
    number: "04",
    title: "Synflow Studio",
    titleLines: ["Synflow", "Studio"],
    image: "/assets/synflow_tn-NDDoYl7K.png",
    tags: ["DIGITAL SYSTEMS", "FULL-STACK", "AUTOMATION", "CLIENT WORK"],
    description:
      "Co-founded a digital studio focused on building websites and automation systems for small businesses — helping streamline operations, manage leads, and improve client workflows.",
    highlight: "small businesses",
    link: "/project/sinclo",
  },
];

export const systemsSkills: SkillGroup = {
  label: "SYSTEMS I WORK WITH",
  items: [
    "Next.js",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Redis",
    "Supabase",
    "Python",
    "Flask",
  ],
};

export const focusSkills: SkillGroup = {
  label: "CURRENT FOCUS",
  items: [
    "Docker",
    "GitHub Actions",
    "AWS",
    "Vercel",
    "Figma",
    "Linux",
    "Git",
    "Cloudflare",
  ],
};

export const aboutParagraphs = [
  "I'm Andrew Dominic M — a 19-year-old CS and Business Systems student at RIT Chennai, and co-founder of Synflow Studio, a web and AI automation agency based in Chennai.",
  "I build systems for real businesses — not demo apps, not clones. I've shipped a production e-commerce platform for a 100K audience brand, a live ticketing system for a 3,000+ attendee college fest, and an autonomous drone dashboard for the ISRO challenge.",
];

export const originStory =
  '"MY PARENTS RUN A SMALL PROVISION STORE. I SAW FIRSTHAND HOW MUCH BETTER BUSINESSES COULD OPERATE WITH THE RIGHT DIGITAL SYSTEMS."';

export const socialParagraph =
  "When I'm not building, I'm documenting the journey on Instagram and LinkedIn — because I think more students should see what's actually possible when you just start building.";

export const contentImages = [
  { src: "/assets/conntent-CJYjiJU2.jfif", alt: "Content Creation 1", z: 1 },
  { src: "/assets/ritcontent-CRG20fba.jpeg", alt: "RIT Content", z: 2 },
  { src: "/assets/content 2-CqU4pB8E.jpeg", alt: "Content Creation 2", z: 3 },
  { src: "/assets/networking-Dcuhsfjy.jpeg", alt: "Networking", z: 4 },
];