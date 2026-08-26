"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { FaAws } from "react-icons/fa6";
import {
  SiCloudflare,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFlask,
  SiGit,
  SiGithubactions,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiRedis,
  SiSupabase,
  SiVercel,
} from "react-icons/si";
import { Counter } from "@/components/Counter";
import { RevealWords } from "@/components/RevealWords";
import { SkillsMenu, type SkillsMenuItemData } from "@/components/SkillsMenu";

gsap.registerPlugin(ScrollTrigger);

const UDAY_IMAGE = "/assets/uday.png";
const PC_IMAGE = "/assets/pc-CUA4L57Q.jfif";
const CONTENT_IMAGE_1 = "/assets/conntent-CJYjiJU2.jfif";
const CONTENT_IMAGE_2 = "/assets/ritcontent-CRG20fba.jpeg";
const CONTENT_IMAGE_3 = "/assets/content 2-CqU4pB8E.jpeg";
const CONTENT_IMAGE_4 = "/assets/networking-Dcuhsfjy.jpeg";

const skillsItems: SkillsMenuItemData[] = [
  {
    link: "#",
    text: "SYSTEMS I WORK WITH",
    logos: [
      { node: <SiNextdotjs />, title: "Next.js" },
      { node: <SiReact />, title: "React" },
      { node: <SiNodedotjs />, title: "Node.js" },
      { node: <SiExpress />, title: "Express" },
      { node: <SiMongodb />, title: "MongoDB" },
      { node: <SiRedis />, title: "Redis" },
      { node: <SiSupabase />, title: "Supabase" },
      { node: <SiPython />, title: "Python" },
      { node: <SiFlask />, title: "Flask" },
    ],
  },
  {
    link: "#",
    text: "CURRENT FOCUS",
    logos: [
      { node: <SiDocker />, title: "Docker" },
      { node: <SiGithubactions />, title: "GitHub Actions" },
      { node: <FaAws />, title: "AWS" },
    ],
  },
  {
    link: "#",
    text: "TOOLS I USE DAILY",
    logos: [
      { node: <SiVercel />, title: "Vercel" },
      { node: <SiFigma />, title: "Figma" },
      { node: <SiLinux />, title: "Linux" },
      { node: <SiGit />, title: "Git" },
      { node: <SiCloudflare />, title: "Cloudflare" },
    ],
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const firstBioRef = useRef<HTMLDivElement>(null);
  const secondBioRef = useRef<HTMLDivElement>(null);
  const originStoryRef = useRef<HTMLDivElement>(null);
  const udayImageRef = useRef<HTMLImageElement>(null);
  const pcImageRef = useRef<HTMLImageElement>(null);
  const pcClipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      const narrativePin = section.querySelector(".narrative-pin");
      const narrativeSteps = gsap.utils.toArray<HTMLElement>(".narrative-step");

      if (narrativePin && narrativeSteps.length > 0) {
        gsap.set(narrativeSteps, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          filter: "blur(10px)",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: narrativePin,
            start: "top top",
            end: `+=${narrativeSteps.length * 120}%`,
            pin: true,
            scrub: 1,
          },
        });

        narrativeSteps.forEach((step, index) => {
          timeline.to(step, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out",
          });
          timeline.to({}, { duration: 2 });

          if (index !== narrativeSteps.length - 1) {
            timeline.to(step, {
              opacity: 0,
              y: -40,
              scale: 1.05,
              filter: "blur(10px)",
              duration: 1.5,
              ease: "power2.in",
            });
          }
        });
      }
    });

    mm.add("(min-width: 768px)", () => {
      const narrativeHeadline = section.querySelector(".narrative-headline");

      if (narrativeHeadline) {
        gsap.fromTo(
          narrativeHeadline,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: narrativeHeadline,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (udayImageRef.current) {
        gsap.set(udayImageRef.current, {
          opacity: 0,
          filter: "blur(12px)",
          scale: 0.95,
        });
      }

      if (firstBioRef.current && udayImageRef.current) {
        gsap.to(udayImageRef.current, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: firstBioRef.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5,
          },
        });
      }

      if (
        secondBioRef.current &&
        pcClipRef.current &&
        pcImageRef.current
      ) {
        gsap.set(pcClipRef.current, {
          clipPath: "inset(100% 0% 0% 0%)",
        });
        gsap.set(pcImageRef.current, { scale: 1.15 });

        gsap.to(pcClipRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: secondBioRef.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5,
          },
        });

        gsap.to(pcImageRef.current, {
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: secondBioRef.current,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5,
          },
        });
      }
    });

    mm.add("all", () => {
      const skillsSection = section.querySelector(".skills-section");
      const menuItems = section.querySelectorAll(".menu__item");

      if (skillsSection && menuItems.length) {
        gsap.fromTo(
          menuItems,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsSection,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const contentStack = section.querySelector(".content-stack-container");
      const contentImages = section.querySelectorAll(".content-stack-img");

      if (contentStack && contentImages.length) {
        gsap.set(contentImages, {
          clipPath: "inset(0% 0% 100% 0%)",
          y: 40,
          scale: 0.95,
        });

        gsap.to(contentImages, {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          scale: 1,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: contentStack,
            start: "top 90%",
            end: "center 50%",
            scrub: 1.5,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-grit-900 text-white relative overflow-clip"
    >
      <div className="absolute inset-0 grit-texture opacity-40 pointer-events-none" />

      <div className="relative z-10">
        <div className="md:hidden narrative-pin h-[100svh] w-full relative overflow-hidden flex items-center justify-center">
          <div className="narrative-step absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/25 mb-6 sm:mb-8">
              003 // NARRATIVE
            </span>
            <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-poster font-bold tracking-[-0.04em] leading-[0.85] uppercase text-white drop-shadow-2xl">
              REAL
              <br />
              CONTEXT.
            </h2>
          </div>

          <div className="narrative-step absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-16 max-w-4xl mx-auto text-center md:text-left">
            <p className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl font-body font-light text-white leading-[1.6] sm:leading-[1.5] tracking-tight">
              I&apos;m Uday G — a full-stack freelancer based in Bengaluru with
              a B.Tech in Computer Science (AI & ML) from Presidency
              University. I build websites and AI automations that save
              businesses hours every week.
            </p>
          </div>

          <div className="narrative-step absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-16 max-w-4xl mx-auto text-center md:text-left">
            <p className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl font-body font-light text-white leading-[1.6] sm:leading-[1.5] tracking-tight">
              I&apos;ve shipped real products for real clients — ecommerce
              platforms, event ticketing systems, interactive 3D web
              experiences, AI automation workflows, and blockchain data tools. I
              build systems that actually work.
            </p>
          </div>

          <div className="narrative-step absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 md:px-16 max-w-5xl mx-auto text-center">
            <span className="text-[0.45rem] sm:text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/20 block mb-6 sm:mb-8">
              MY STORY
            </span>
            <p className="text-[1.7rem] sm:text-4xl md:text-5xl lg:text-6xl font-helvetica font-bold leading-[1.2] tracking-tight uppercase text-white">
              &quot;MY PARENTS RUN A SMALL PROVISION STORE. I SAW FIRSTHAND HOW
              MUCH BETTER BUSINESSES COULD OPERATE WITH THE RIGHT DIGITAL
              SYSTEMS.&quot;
            </p>
            <div className="mt-8 md:mt-12 flex items-center justify-center gap-3">
              <div className="h-px w-6 md:w-10 bg-white/15" />
              <span className="text-[0.45rem] md:text-[0.5rem] font-header font-bold tracking-[0.3em] text-white/15 uppercase">
                THAT&apos;S STILL WHAT DRIVES ME
              </span>
              <div className="h-px w-6 md:w-10 bg-white/15" />
            </div>
          </div>

          <div className="narrative-step absolute inset-0 flex items-center justify-center px-6 sm:px-12 md:px-16 max-w-4xl mx-auto text-center md:text-left">
            <p className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl font-body font-semibold text-white leading-[1.6] sm:leading-[1.5] tracking-tight">
              When I&apos;m not building, I&apos;m documenting the journey on
              Instagram and LinkedIn — because I think more students should see
              what&apos;s actually possible when you just start building.
            </p>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 text-center relative z-10">
            <div className="narrative-headline flex flex-col items-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-white/15" />
                <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/25">
                  003 // NARRATIVE
                </span>
                <div className="h-px w-12 bg-white/15" />
              </div>
              <h2 className="flex flex-col items-center text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-[-0.04em] leading-[0.85] text-white drop-shadow-2xl">
                <span className="relative z-10 font-playfair italic font-normal tracking-normal text-[0.85em] text-white/90 mb-[-0.15em] ml-[-10%]">
                  Real
                </span>
                <span className="relative z-0 font-helvetica tracking-tighter">
                  Context.
                </span>
              </h2>
            </div>
          </div>

          <div className="flex w-full relative z-10">
            <div className="w-[55%] xl:w-[60%] flex flex-col shrink-0">
              <div
                ref={firstBioRef}
                className="min-h-screen flex items-center px-8 md:px-16 py-24"
              >
                <div className="max-w-2xl lg:max-w-3xl">
                  <RevealWords
                    className="text-xl md:text-2xl lg:text-3xl font-helvetica font-normal text-white leading-[1.6] tracking-tight"
                    highlightWords={[
                      "co-founder",
                      "of",
                      "Synflow",
                      "Studio,",
                    ]}
                  >
                    {`I'm Uday G — a full-stack freelancer based in Bengaluru with a B.Tech in Computer Science (AI & ML) from Presidency University. I build websites and AI automations that save businesses hours every week.`}
                  </RevealWords>
                </div>
              </div>

              <div
                ref={secondBioRef}
                className="min-h-screen flex items-center px-8 md:px-16 py-24"
              >
                <div className="max-w-2xl lg:max-w-3xl">
                  <RevealWords
                    className="text-xl md:text-2xl lg:text-3xl font-helvetica font-normal text-white leading-[1.6] tracking-tight"
                    highlightWords={[
                      "real",
                      "businesses",
                      "—",
                      "not",
                      "demo",
                      "apps,",
                      "not",
                      "clones.",
                    ]}
                  >
                    {`I've shipped real products for real clients — ecommerce platforms, event ticketing systems, interactive 3D web experiences, AI automation workflows, and blockchain data tools. I build systems that actually work.`}
                  </RevealWords>
                </div>
              </div>
            </div>

            <div className="w-[45%] xl:w-[40%] relative shrink-0 pointer-events-none">
              <div className="sticky top-0 h-screen flex items-center justify-center pr-12 lg:pr-16 xl:pr-24">
                <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      ref={udayImageRef}
                      src={UDAY_IMAGE}
                      className="w-full h-full object-cover"
                      alt="Uday G"
                    />
                  </div>
                  <div
                    ref={pcClipRef}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      ref={pcImageRef}
                      src={PC_IMAGE}
                      className="w-full h-full object-cover object-bottom"
                      alt="Work Setup"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={originStoryRef}
            className="min-h-screen flex items-center justify-center px-8 md:px-16 py-24 relative z-10"
          >
            <div className="max-w-4xl text-center mx-auto">
              <span className="text-[0.5rem] font-header font-bold tracking-[0.35em] uppercase text-white/20 block mb-10">
                ORIGIN_STORY
              </span>
              <RevealWords className="text-2xl md:text-4xl lg:text-5xl font-helvetica font-bold leading-[1.2] tracking-tight uppercase text-white">
                {`"I SAW FIRSTHAND HOW MUCH BETTER BUSINESSES COULD OPERATE WITH THE RIGHT DIGITAL SYSTEMS AND AUTOMATION."`}
              </RevealWords>
              <div className="mt-12 flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-white/15" />
                <span className="text-[0.5rem] font-header font-bold tracking-[0.3em] text-white/15 uppercase">
                  THAT&apos;S STILL WHAT DRIVES ME
                </span>
                <div className="h-px w-10 bg-white/15" />
              </div>
            </div>
          </div>

          <div className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 py-24 gap-12 relative z-10">
            <div className="w-full lg:w-[45%] max-w-2xl shrink-0">
              <RevealWords className="text-xl md:text-2xl lg:text-3xl font-body font-semibold text-white leading-[1.6] tracking-tight">
                {`When I'm not building, I'm documenting the journey on Instagram, X, and LinkedIn — because I think more students should see what's possible when technology meets real-world operations.`}
              </RevealWords>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 mt-10 pt-8 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <h3 className="text-5xl md:text-6xl font-helvetica font-bold tracking-tighter text-white flex items-baseline">
                    <Counter to={100} duration={2} />
                    <span className="text-3xl md:text-4xl ml-1 tracking-tight text-white/80">
                      K+
                    </span>
                  </h3>
                  <p className="text-xs md:text-sm font-header font-semibold tracking-[0.2em] uppercase text-white/50 mt-1">
                    Organic Views
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-5xl md:text-6xl font-helvetica font-bold tracking-tighter text-white flex items-baseline">
                    <Counter to={250} duration={2.5} />
                    <span className="text-3xl md:text-4xl ml-1 tracking-tight text-white/80">
                      K+
                    </span>
                  </h3>
                  <p className="text-xs md:text-sm font-header font-semibold tracking-[0.2em] uppercase text-white/50 mt-1">
                    LinkedIn Impressions
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[50%] relative h-[450px] sm:h-[550px] flex items-center justify-center mt-12 lg:mt-0">
              <div className="content-stack-container relative w-full max-w-lg h-full group">
                <img
                  src={CONTENT_IMAGE_1}
                  className="content-stack-img absolute top-[5%] left-[5%] w-[45%] aspect-[3/4] object-cover border border-white/10 shadow-2xl z-[1] transition-all duration-500 hover:z-[50] hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                  alt="Content Creation 1"
                />
                <img
                  src={CONTENT_IMAGE_2}
                  className="content-stack-img absolute top-0 right-[5%] w-[48%] aspect-[4/5] object-cover border border-white/10 shadow-2xl z-[2] transition-all duration-500 hover:z-[50] hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                  alt="RIT Content"
                />
                <img
                  src={CONTENT_IMAGE_3}
                  className="content-stack-img absolute bottom-[10%] left-[10%] w-[50%] aspect-square object-cover border border-white/10 shadow-2xl z-[3] transition-all duration-500 hover:z-[50] hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                  alt="Content Creation 2"
                />
                <img
                  src={CONTENT_IMAGE_4}
                  className="content-stack-img absolute bottom-[5%] right-0 w-[55%] aspect-[4/3] object-cover border border-white/10 shadow-2xl z-[4] transition-all duration-500 hover:z-[50] hover:scale-110 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
                  alt="Networking"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="skills-section relative z-10 bg-grit-900 border-t border-white/5 h-[60vh] md:h-[70vh] flex flex-col justify-between pt-10">
          <div className="w-full h-[40vh] md:h-[50vh] flex items-center justify-center mt-10">
            <SkillsMenu items={skillsItems} />
          </div>

          <div className="mt-auto pb-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full">
            <span className="text-[0.65rem] sm:text-xs md:text-sm font-header font-bold tracking-[0.35em] uppercase text-white/40">
              EDUCATION://
            </span>
            <span className="text-sm sm:text-base md:text-lg font-header font-bold text-white/60 tracking-tight text-center">
              B.Tech — Computer Science (AI & ML) — Presidency University, Bengaluru
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}