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
    link: "/project/synflow",
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
  "I'm Uday G — a full-stack freelancer based in Bengaluru with a B.Tech in Computer Science (AI & ML) from Presidency University. I build websites and AI automations that save businesses hours every week.",
  "I've shipped real products for real clients — ecommerce platforms, event ticketing systems, interactive 3D web experiences, AI automation workflows, and blockchain data tools. I build systems that actually work.",
];

export const originStory =
  '"I SAW FIRSTHAND HOW MUCH BETTER BUSINESSES COULD OPERATE WITH THE RIGHT DIGITAL SYSTEMS AND AUTOMATION."';

export const socialParagraph =
  "When I'm not building, I'm documenting the journey on Instagram, X, and LinkedIn — because I think more students should see what's possible when technology meets real-world operations.";

export const contentImages = [
  { src: "/assets/conntent-CJYjiJU2.jfif", alt: "Content Creation 1", z: 1 },
  { src: "/assets/ritcontent-CRG20fba.jpeg", alt: "Content 2", z: 2 },
  { src: "/assets/content 2-CqU4pB8E.jpeg", alt: "Content Creation 2", z: 3 },
  { src: "/assets/networking-Dcuhsfjy.jpeg", alt: "Networking", z: 4 },
];