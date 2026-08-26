"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ContactFooter() {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      document.body.style.overflowX = "hidden";

      const trigger = triggerRef.current;
      const panel = panelRef.current;
      const title = titleRef.current;
      const social = socialRef.current;
      const meta = metaRef.current;

      if (!trigger || !panel || !title || !social || !meta) return;

      const mm = gsap.matchMedia();

      mm.add("all", () => {
        const innerHeight = window.innerHeight;

        gsap.set(panel, {
          clipPath: `circle(0px at 50% ${innerHeight}px)`,
        });
        gsap.set(title, { x: "100vw" });

        gsap.to(panel, {
          clipPath: `circle(4000px at 50% ${innerHeight}px)`,
          scrollTrigger: {
            trigger,
            start: "top top",
            end: `+=${innerHeight}`,
            scrub: 1,
          },
        });

        gsap.to(title, {
          x: "0vw",
          scrollTrigger: {
            trigger,
            start: "top top",
            end: `+=${innerHeight}`,
            scrub: 1,
          },
        });

        ScrollTrigger.create({
          trigger,
          start: "top top",
          end: "max",
          pin: panel,
          pinSpacing: false,
        });

        ScrollTrigger.create({
          trigger: social,
          endTrigger: meta,
          start: "top 55%",
          end: "top 90%",
          pin: true,
          pinSpacing: false,
        });
      });

      return () => {
        document.body.style.overflowX = "";
        mm.revert();
      };
    },
    { scope: footerRef },
  );

  return (
    <footer id="contact" ref={footerRef} className="relative bg-grit-900 w-full z-10">
      <div ref={triggerRef} className="relative w-full z-10">
        <div
          ref={panelRef}
          className="relative h-screen w-full bg-[#f4f4f4] z-10 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-start pt-[10vh] md:pt-[15vh] z-0 pointer-events-none">
            <h2
              ref={titleRef}
              className="px-6 md:px-16 text-[22vw] md:text-[14vw] font-poster font-bold tracking-[-0.04em] text-grit-900 leading-[0.8] uppercase whitespace-nowrap pointer-events-auto"
            >
              Contact
            </h2>
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 pt-[80vh] md:pt-[100vh] pb-[6vh] md:pb-[10vh] z-20 pointer-events-none">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pointer-events-auto"
          >
            <div
              ref={socialRef}
              className="md:col-span-5 flex flex-col mt-[10vh] md:mt-[30vh] self-start z-30"
            >
              <div className="flex flex-col gap-1 mb-12 md:mb-24">
                <a
                  href="https://github.com/oxBinaryBrain/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-4xl md:text-5xl font-poster font-bold tracking-tight text-grit-900 leading-tight hover:text-accent transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/uday-g-601ba9266"
                  target="_blank"
                  rel="noreferrer"
                  className="text-4xl md:text-5xl font-poster font-bold tracking-tight text-grit-900 leading-tight hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-4xl md:text-5xl font-poster font-bold tracking-tight text-grit-900 leading-tight hover:text-accent transition-colors"
                >
                  Behance
                </a>
              </div>
              <a
                href="mailto:ud4yg@yandex.com"
                className="text-sm md:text-base font-body text-grit-900 hover:underline"
              >
                ud4yg@yandex.com
              </a>
            </div>

            <div className="md:col-span-7 flex flex-col gap-24 lg:gap-32">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                <p className="text-2xl md:text-3xl lg:text-4xl font-helvetica text-grit-900 leading-[1.15] tracking-tight">
                  Looking for an
                  <br />
                  <span className="font-playfair italic pr-1">apprenticeship</span>
                  <br />
                  starting
                  <br />
                  October.
                  <br />
                  Eager to join an
                  <br />
                  innovative team
                  <br />
                  and contribute to
                  <br />
                  ambitious
                  <br />
                  projects.
                </p>
                <div className="w-full aspect-[4/5] relative overflow-hidden bg-grit-200">
                  <Image
                    src="/assets/contact_abstract_1-9-QtgX7x.png"
                    alt="Abstract 3D Art"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out grayscale-[15%] contrast-110"
                  />
                  <div className="absolute top-4 left-4 text-white/50 text-xs font-light">
                    +
                  </div>
                  <div className="absolute top-4 right-4 text-white/50 text-xs font-light">
                    +
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
                <div className="w-full aspect-square relative overflow-hidden bg-grit-200 order-2 sm:order-1">
                  <Image
                    src="/assets/contact_abstract_2-Dd2Snm2F.png"
                    alt="Abstract 3D Art"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out grayscale-[15%] contrast-110"
                  />
                  <div className="absolute top-4 left-4 text-white/50 text-xs font-light">
                    +
                  </div>
                  <div className="absolute top-4 right-4 text-white/50 text-xs font-light">
                    +
                  </div>
                </div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-helvetica text-grit-900 leading-[1.15] tracking-tight order-1 sm:order-2 px-0 sm:px-4">
                  I&apos;m available for
                  <br />
                  <span className="font-playfair italic pr-1">freelance missions</span>
                  <br />
                  <span className="font-playfair italic pr-1">worldwide</span>, on
                  <br />
                  your <span className="font-playfair italic pr-1">ambitious</span>
                  <br />
                  <span className="font-playfair italic pr-1">projects</span> and
                  <br />
                  international
                  <br />
                  collaborations.
                </p>
              </div>
            </div>
          </div>

          <div
            ref={metaRef}
            className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mt-16 md:mt-24 pt-8 border-t border-grit-900/10 pointer-events-auto"
          >
            <span className="text-[0.55rem] font-header font-bold tracking-[0.3em] uppercase text-grit-900/40">
              © {year} UDAY G
            </span>
            <span className="text-[0.55rem] font-header font-bold tracking-[0.3em] uppercase text-grit-900/40">
              BUILD_REF // V4.3
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-grit-900/40 rounded-full animate-pulse" />
              <span className="text-[0.55rem] font-header font-bold tracking-[0.4em] uppercase text-grit-900/40">
                STATUS: ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}