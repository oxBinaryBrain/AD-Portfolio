"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { projects } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

function ProjectDescription({
  description,
  highlight,
  className,
}: {
  description: string;
  highlight: string;
  className?: string;
}) {
  const parts = description.split(highlight);

  return (
    <p className={className}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <strong className="font-bold text-white">{highlight}</strong>
          )}
        </span>
      ))}
    </p>
  );
}

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progressBar = progressBarRef.current;
      const counter = counterRef.current;
      const pinContainer = pinRef.current;
      const content = contentRef.current;

      if (!section || !track) return;

      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 120 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              end: "top 20%",
              scrub: true,
            },
          },
        );
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const scrollDistance = (projects.length - 1) * window.innerWidth;
        const desktopCards = track.querySelectorAll(".desktop-card");
        const cardElements = Array.from(desktopCards).map((card) => ({
          el: card as HTMLElement,
          title: card.querySelector(".card-title") as HTMLElement | null,
          photo: card.querySelector(".card-photo") as HTMLElement | null,
          meta: card.querySelector(".card-meta") as HTMLElement | null,
        }));

        let lastIndex = -1;

        const st = ScrollTrigger.create({
          trigger: pinContainer,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const progress = self.progress;
            track.style.transform = `translate3d(${-scrollDistance * progress}px, 0, 0)`;

            if (progressBar) {
              progressBar.style.transform = `scaleX(${progress})`;
            }

            const index = Math.min(
              Math.floor(progress * projects.length),
              projects.length - 1,
            );
            const clampedIndex = Math.max(0, index);

            if (clampedIndex !== lastIndex && counter) {
              lastIndex = clampedIndex;
              counter.textContent = `[ ${String(clampedIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")} ]`;
            }

            for (let i = 0; i < cardElements.length; i++) {
              const { title, photo, meta } = cardElements[i];
              const cardProgress =
                projects.length > 1 ? i / (projects.length - 1) : 0;
              const offset = progress - cardProgress;

              if (title) {
                title.style.transform = `translateY(-45%) translate3d(${offset * -80}px, 0, 0)`;
              }

              if (photo) {
                const scale = 1 - Math.abs(offset) * 0.015;
                photo.style.transform = `translateY(-50%) translate3d(${offset * 160}px, 0, 0) scale(${scale})`;
              }

              if (meta) {
                const opacity = Math.max(0.55, 1 - Math.abs(offset) * 0.65);
                meta.style.transform = `translateY(-50%) translate3d(${offset * 120}px, 0, 0)`;
                meta.style.opacity = String(opacity);
              }
            }
          },
        });

        return () => {
          st.kill();
          gsap.set(
            [
              track,
              progressBar,
              ...cardElements.flatMap((card) => [card.title, card.photo, card.meta]),
            ],
            { clearProps: "transform,opacity" },
          );
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-grit-900 lg:overflow-hidden"
    >
      <div
        ref={pinRef}
        className="flex flex-col lg:h-screen will-change-transform"
      >
        <div ref={contentRef} className="flex flex-col w-full h-full">
          <div className="w-full relative lg:flex-1 lg:overflow-hidden flex flex-col">
            <div
              ref={trackRef}
              className="flex flex-col lg:flex-row h-auto lg:flex-1 w-full"
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="case-card w-full lg:w-[100vw] h-auto lg:h-full lg:flex-shrink-0 relative lg:overflow-hidden flex flex-col lg:block pt-24 pb-20 lg:py-0 px-6 sm:px-12 lg:px-0 border-b border-white/10 lg:border-none"
                >
                  {/* Mobile layout */}
                  <div className="lg:hidden flex flex-col md:flex-row md:items-start gap-8 md:gap-16 w-full max-w-4xl mx-auto">
                    <div className="flex-1 flex flex-col w-full">
                      <span className="text-[0.6rem] font-header font-bold tracking-[0.4em] uppercase text-white/40 mb-6 block">
                        PROJECT {project.number}
                      </span>
                      <h3 className="text-[3.5rem] sm:text-7xl font-poster font-bold tracking-[-0.03em] leading-[0.85] text-white whitespace-pre-line mb-8 uppercase">
                        {project.titleLines.join("\n")}
                      </h3>
                      <div className="w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] overflow-hidden mb-6 md:mb-0 relative">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover contrast-[1.2] brightness-90"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center w-full md:pt-32">
                      <div className="flex flex-wrap items-center gap-y-2 mb-6">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="flex items-center text-xs sm:text-sm font-header font-bold text-white/90 uppercase tracking-[0.15em]"
                          >
                            {tag}
                            {tagIndex < project.tags.length - 1 && (
                              <span className="mx-2 text-white/30">•</span>
                            )}
                          </span>
                        ))}
                      </div>
                      <ProjectDescription
                        description={project.description}
                        highlight={project.highlight}
                        className="text-base sm:text-lg font-body text-white/85 leading-[1.7] mb-8 max-w-sm"
                      />
                      <Link
                        href={project.link}
                        className="inline-flex justify-center items-center gap-2 text-[0.6rem] sm:text-xs font-header font-bold tracking-[0.25em] uppercase bg-white text-grit-900 w-full sm:w-auto px-8 py-4 sm:py-5 hover:bg-white/80 transition-colors group/btn"
                      >
                        VIEW CASE STUDY
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Desktop layout */}
                  <div className="desktop-card hidden lg:block w-full h-full relative">
                    <div
                      className="absolute z-20"
                      style={{ left: "14%", top: "18%" }}
                    >
                      <span className="text-[0.55rem] font-header font-bold tracking-[0.4em] uppercase text-white/40">
                        PROJECT {project.number}
                      </span>
                    </div>

                    <div
                      className="card-title absolute z-20 pointer-events-none"
                      style={{
                        left: "14%",
                        top: "50%",
                        transform: "translateY(-45%)",
                        mixBlendMode: "difference",
                      }}
                    >
                      <h3 className="text-8xl xl:text-[6.5rem] font-poster font-bold tracking-[-0.03em] leading-[0.88] text-white whitespace-pre-line uppercase">
                        {project.titleLines.join("\n")}
                      </h3>
                    </div>

                    <div
                      className="card-photo absolute z-10"
                      style={{
                        left: "32%",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "36vw",
                        maxWidth: "480px",
                      }}
                    >
                      <div className="aspect-[4/5] w-full overflow-hidden relative">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover contrast-[1.2] brightness-90"
                          sizes="36vw"
                        />
                      </div>
                    </div>

                    <div
                      className="card-meta absolute z-20"
                      style={{
                        left: "calc(32% + 36vw + 28px)",
                        top: "50%",
                        transform: "translateY(-50%)",
                        maxWidth: "280px",
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 mb-5" />
                      <div className="flex flex-col gap-2 mb-5">
                        {project.tags.map((tag) => (
                          <p
                            key={tag}
                            className="text-sm font-header font-bold text-white/90 uppercase tracking-wide border-b border-white/60 w-fit pb-0.5 cursor-default hover:text-white hover:border-white/40 transition-colors"
                          >
                            {tag}
                          </p>
                        ))}
                      </div>
                      <ProjectDescription
                        description={project.description}
                        highlight={project.highlight}
                        className="text-sm font-body text-white/85 leading-relaxed mb-5"
                      />
                      <Link
                        href={project.link}
                        className="inline-flex items-center gap-1.5 text-[0.55rem] font-header font-bold tracking-[0.25em] uppercase text-white border border-white/40 px-4 py-2 hover:bg-white hover:text-grit-900 transition-all duration-300 group/btn"
                      >
                        VIEW CASE STUDY
                        <ArrowUpRight className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop progress bar + counter footer */}
          <div className="hidden lg:flex relative bg-grit-900 z-10 flex-shrink-0 flex-col">
            <div className="relative h-[3px] w-full bg-white/10 overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full w-full bg-white transition-none origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <div className="px-16 py-5 flex justify-between items-center w-full">
              <span
                ref={counterRef}
                className="text-base font-poster font-bold text-white/80 tracking-wide"
              >
                [ 01 / {String(projects.length).padStart(2, "0")} ]
              </span>
              <Link
                href="#"
                className="flex items-center gap-2 text-[0.6rem] font-header font-bold tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors group/all"
              >
                VIEW ALL PROJECTS
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}