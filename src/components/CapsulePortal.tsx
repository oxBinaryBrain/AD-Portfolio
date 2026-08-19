"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { DitherBackground } from "@/components/DitherBackground";
import { capsuleMetrics } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const CAPSULE_GIF = "/assets/tenor-DNPDyf8y.gif";

const HERO_CIRCLE_PATH =
  "M110 8.5C95 5.5 45 4.5 15 12.5C-5 18.5 2 34.5 25 39.5C55 44.5 105 40.5 115 28.5C122 18.5 95 10.5 75 9.5";

export function CapsulePortal() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const desktopPlaceholderRef = useRef<HTMLSpanElement>(null);
  const mobilePlaceholderRef = useRef<HTMLSpanElement>(null);
  const whiteBgRef = useRef<HTMLDivElement>(null);
  const gifContainerRef = useRef<HTMLDivElement>(null);
  const ditherRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const roleTagRef = useRef<HTMLDivElement>(null);
  const headlineWrapperRef = useRef<HTMLDivElement>(null);
  const desktopBuildingSystemsRef = useRef<HTMLSpanElement>(null);
  const desktopThatRef = useRef<HTMLSpanElement>(null);
  const desktopWorkRef = useRef<HTMLSpanElement>(null);
  const mobileBuildingRef = useRef<HTMLSpanElement>(null);
  const mobileSystemsRef = useRef<HTMLSpanElement>(null);
  const mobileThatRef = useRef<HTMLSpanElement>(null);
  const mobileWorkRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const sideLabelLeftRef = useRef<HTMLDivElement>(null);
  const sideLabelRightRef = useRef<HTMLDivElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const metricsContainerRef = useRef<HTMLDivElement>(null);
  const metricRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const getCapsuleBounds = useCallback((isDesktop: boolean) => {
    const placeholder = isDesktop
      ? desktopPlaceholderRef.current
      : mobilePlaceholderRef.current;
    const capsule = capsuleRef.current;
    if (!placeholder || !capsule) return null;

    const placeholderRect = placeholder.getBoundingClientRect();
    const capsuleRect = capsule.getBoundingClientRect();

    return {
      top: placeholderRect.top - capsuleRect.top,
      left: placeholderRect.left - capsuleRect.left,
      bottom: capsuleRect.bottom - placeholderRect.bottom,
      right: capsuleRect.right - placeholderRect.right,
    };
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const capsule = capsuleRef.current;
      if (!section || !capsule) return;

      gsap.set(capsule, { visibility: "hidden" });

      let mm: gsap.MatchMedia | undefined;
      const timeoutId = window.setTimeout(() => {
        mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          const bounds = getCapsuleBounds(true);
          if (!bounds) return;

          gsap.set(capsule, {
            clipPath: `inset(${bounds.top}px ${bounds.right}px ${bounds.bottom}px ${bounds.left}px round 9999px)`,
            visibility: "visible",
          });

          const clipWidth = capsule.getBoundingClientRect().width - bounds.left;
          gsap.set([whiteBgRef.current, gifContainerRef.current], {
            clipPath: `inset(0px ${clipWidth}px 0px 0px)`,
          });

          gsap
            .timeline()
            .to(whiteBgRef.current, {
              clipPath: "inset(0px 0px 0px 0px)",
              duration: 0.6,
              ease: "power3.inOut",
            })
            .to(
              gifContainerRef.current,
              {
                clipPath: "inset(0px 0px 0px 0px)",
                duration: 0.6,
                ease: "power3.inOut",
                onComplete: () => {
                  gsap.set([whiteBgRef.current, gifContainerRef.current], {
                    clearProps: "clipPath",
                  });
                },
              },
              "-=0.35",
            );

          const clipState = { ...bounds, radius: window.innerHeight / 2 };

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=120%",
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              refreshPriority: 100,
              onRefresh: () => {
                const refreshed = getCapsuleBounds(true);
                if (refreshed) {
                  clipState.top = refreshed.top;
                  clipState.right = refreshed.right;
                  clipState.bottom = refreshed.bottom;
                  clipState.left = refreshed.left;
                  clipState.radius = window.innerHeight / 2;
                }
              },
            },
          });

          timeline.to(
            [ditherRef.current, grainRef.current].filter(Boolean),
            { opacity: 0, duration: 0.2, ease: "power2.in" },
            0,
          );
          timeline.fromTo(
            [
              roleTagRef.current,
              dividerRef.current,
              subtextRef.current,
              sideLabelLeftRef.current,
              sideLabelRightRef.current,
              bottomNavRef.current,
            ].filter(Boolean),
            { opacity: 1 },
            { opacity: 0, duration: 0.2, ease: "power2.in" },
            0,
          );
          timeline.to(
            clipState,
            {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              radius: 0,
              duration: 0.7,
              ease: "power2.inOut",
              onUpdate: () => {
                capsule.style.clipPath = `inset(${clipState.top}px ${clipState.right}px ${clipState.bottom}px ${clipState.left}px round ${clipState.radius}px)`;
              },
            },
            0.1,
          );
          timeline.fromTo(
            desktopBuildingSystemsRef.current,
            { y: "0%", opacity: 1 },
            { y: "-150%", opacity: 0, duration: 0.6, ease: "power2.inOut" },
            0.1,
          );
          timeline.fromTo(
            desktopThatRef.current,
            { x: "0vw", opacity: 1 },
            { x: "-50vw", opacity: 0, duration: 0.6, ease: "power2.inOut" },
            0.1,
          );
          timeline.fromTo(
            desktopWorkRef.current,
            { x: "0vw", opacity: 1 },
            { x: "50vw", opacity: 0, duration: 0.6, ease: "power2.inOut" },
            0.1,
          );

          metricRefs.forEach((metricRef, index) => {
            const start = 0.4 + index * 0.05;
            timeline.fromTo(
              metricRef.current,
              { opacity: 0, y: 40, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power3.out" },
              start,
            );
            timeline.to(
              metricRef.current,
              { opacity: 0, y: -30, scale: 1.02, duration: 0.2, ease: "power2.in" },
              start + 0.3,
            );
          });

          timeline.to(
            darkOverlayRef.current,
            { opacity: 1, duration: 0.2, ease: "power2.inOut" },
            0.8,
          );

          return () => timeline.kill();
        });

        mm.add("(max-width: 767px)", () => {
          const bounds = getCapsuleBounds(false);
          if (!bounds) return;

          gsap.set(capsule, {
            clipPath: `inset(${bounds.top}px ${bounds.right}px ${bounds.bottom}px ${bounds.left}px round 9999px)`,
            visibility: "visible",
          });

          const clipWidth = capsule.getBoundingClientRect().width - bounds.left;
          gsap.set([whiteBgRef.current, gifContainerRef.current], {
            clipPath: `inset(0px ${clipWidth}px 0px 0px)`,
          });

          gsap
            .timeline()
            .to(whiteBgRef.current, {
              clipPath: "inset(0px 0px 0px 0px)",
              duration: 0.6,
              ease: "power3.inOut",
            })
            .to(
              gifContainerRef.current,
              {
                clipPath: "inset(0px 0px 0px 0px)",
                duration: 0.6,
                ease: "power3.inOut",
                onComplete: () => {
                  gsap.set([whiteBgRef.current, gifContainerRef.current], {
                    clearProps: "clipPath",
                  });
                },
              },
              "-=0.35",
            );

          const clipState = { ...bounds, radius: window.innerHeight / 2 };

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=120%",
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              refreshPriority: 100,
              onRefresh: () => {
                const refreshed = getCapsuleBounds(false);
                if (refreshed) {
                  Object.assign(clipState, refreshed);
                  clipState.radius = window.innerHeight / 2;
                }
              },
            },
          });

          timeline.to(
            [ditherRef.current, grainRef.current].filter(Boolean),
            { opacity: 0, duration: 0.2, ease: "power2.in" },
            0,
          );
          timeline.fromTo(
            [
              roleTagRef.current,
              dividerRef.current,
              subtextRef.current,
              bottomNavRef.current,
            ].filter(Boolean),
            { opacity: 1 },
            { opacity: 0, duration: 0.2, ease: "power2.in" },
            0,
          );
          timeline.to(
            clipState,
            {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              radius: 0,
              duration: 0.7,
              ease: "power2.inOut",
              onUpdate: () => {
                capsule.style.clipPath = `inset(${clipState.top}px ${clipState.right}px ${clipState.bottom}px ${clipState.left}px round ${clipState.radius}px)`;
              },
            },
            0.1,
          );
          timeline.fromTo(
            [mobileBuildingRef.current, mobileSystemsRef.current].filter(Boolean),
            { y: "0%", opacity: 1 },
            { y: "-120%", opacity: 0, duration: 0.6, ease: "power2.inOut" },
            0.1,
          );
          timeline.fromTo(
            mobileThatRef.current,
            { x: "0vw", opacity: 1 },
            { x: "-40vw", opacity: 0, duration: 0.6, ease: "power2.inOut" },
            0.1,
          );
          timeline.fromTo(
            mobileWorkRef.current,
            { x: "0vw", opacity: 1 },
            { x: "40vw", opacity: 0, duration: 0.6, ease: "power2.inOut" },
            0.1,
          );

          metricRefs.forEach((metricRef, index) => {
            const start = 0.4 + index * 0.05;
            timeline.fromTo(
              metricRef.current,
              { opacity: 0, y: 30, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power3.out" },
              start,
            );
            timeline.to(
              metricRef.current,
              { opacity: 0, y: -20, scale: 1.02, duration: 0.2, ease: "power2.in" },
              start + 0.3,
            );
          });

          timeline.to(
            darkOverlayRef.current,
            { opacity: 1, duration: 0.2, ease: "power2.inOut" },
            0.8,
          );

          return () => timeline.kill();
        });
      }, 1800);

      return () => {
        window.clearTimeout(timeoutId);
        mm?.revert();
      };
    },
    { scope: sectionRef, dependencies: [getCapsuleBounds] },
  );

  return (
    <section ref={sectionRef} className="capsule-portal">
      <div ref={viewportRef} className="capsule-portal__viewport">
        <div ref={ditherRef} className="hero-dither">
          <DitherBackground
            waveColor={[0.85, 0.85, 0.85]}
            colorNum={3}
            waveAmplitude={0.25}
            waveFrequency={2.5}
            waveSpeed={0.08}
            enableMouseInteraction
            mouseRadius={0.3}
          />
        </div>
        <div ref={grainRef} className="hero-grain" />
        <div className="hero-grid-lines">
          <div className="hero-grid-line hero-grid-line--left" />
          <div className="hero-grid-line hero-grid-line--right" />
        </div>

        <div className="hero-content" style={{ zIndex: 10 }}>
          <motion.div
            ref={roleTagRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hero-role-tag"
          >
            <span className="hero-meta-label hero-meta-label--left">
              Portfolio — 2026
            </span>
            <div className="hero-role-line" />
            <p className="hero-role-text">Product-Focused Developer</p>
            <div className="hero-role-line" />
            <span className="hero-meta-label hero-meta-label--right">
              Andrew Dominic M.
            </span>
          </motion.div>

          <motion.div
            ref={headlineWrapperRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-headline-wrapper"
          >
            <h1 className="hero-headline hero-headline--mobile">
              <span ref={mobileBuildingRef} className="hero-headline-line">
                Building
              </span>
              <span ref={mobileSystemsRef} className="hero-headline-line">
                Systems
              </span>
              <span className="hero-headline-line hero-headline-line--split">
                <span ref={mobileThatRef}>That</span>
                <span ref={mobilePlaceholderRef} className="hero-capsule-placeholder" />
                <span ref={mobileWorkRef} className="hero-headline-accent">
                  Work
                  <svg
                    className="hero-circle-svg"
                    viewBox="0 0 120 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d={HERO_CIRCLE_PATH}
                      stroke="#da2727"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 1.4, ease: "easeInOut" }}
                    />
                  </svg>
                </span>
              </span>
            </h1>

            <h1 className="hero-headline hero-headline--desktop">
              <span ref={desktopBuildingSystemsRef} className="hero-headline-line">
                Building Systems
              </span>
              <span className="hero-headline-line hero-headline-line--split">
                <span ref={desktopThatRef}>That</span>
                <span ref={desktopPlaceholderRef} className="hero-capsule-placeholder" />
                <span ref={desktopWorkRef} className="hero-headline-accent">
                  Work
                  <svg
                    className="hero-circle-svg"
                    viewBox="0 0 120 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d={HERO_CIRCLE_PATH}
                      stroke="#da2727"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 1.4, ease: "easeInOut" }}
                    />
                  </svg>
                </span>
              </span>
            </h1>
          </motion.div>

          <motion.div
            ref={dividerRef}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-divider"
          />

          <motion.p
            ref={subtextRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hero-subtext"
          >
            Full-stack developer combining Computer Science and Business to build
            high-performance digital products.
          </motion.p>
        </div>

        <motion.div
          ref={sideLabelLeftRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hero-side-label hero-side-label--left"
        >
          <span>Digital Product Architect</span>
        </motion.div>

        <motion.div
          ref={sideLabelRightRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hero-side-label hero-side-label--right"
        >
          <span>Est. 2023</span>
        </motion.div>

        <motion.div
          ref={bottomNavRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="hero-bottom-nav"
        >
          <div className="hero-bottom-nav-line" />
          <div className="hero-bottom-nav-content">
            <div className="hero-bottom-nav-left">
              <span className="hero-bottom-nav-arrow">→</span>
              <span>V3.0</span>
            </div>
            <div className="hero-bottom-nav-center">
              <a href="#">BEHANCE</a>
              <span className="hero-bottom-nav-slash">/</span>
              <a href="#">LINKEDIN</a>
              <span className="hero-bottom-nav-slash">/</span>
              <a href="#">GITHUB</a>
            </div>
            <div className="hero-bottom-nav-right">
              <Link href="#work">WORK</Link>
              <a href="#about">INFO</a>
              <a href="#contact">CONTACT</a>
            </div>
          </div>
        </motion.div>

        <div ref={capsuleRef} className="capsule-portal__capsule">
          <div
            ref={whiteBgRef}
            className="absolute inset-0 bg-white"
            style={{ zIndex: 1 }}
          />
          <div
            ref={gifContainerRef}
            className="absolute inset-0"
            style={{ zIndex: 2 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CAPSULE_GIF}
              className="capsule-portal__capsule-media"
              alt=""
              aria-hidden="true"
            />
          </div>
          <div
            ref={darkOverlayRef}
            className="capsule-portal__dark-overlay"
            style={{ zIndex: 3 }}
          />
        </div>

        <div ref={metricsContainerRef} className="capsule-portal__metrics">
          <div className="capsule-metric-wrapper">
            {capsuleMetrics.map((metric, index) => (
              <div
                key={metric.title}
                ref={metricRefs[index]}
                className="capsule-metric"
              >
                <div className="capsule-metric__line" />
                <span className="capsule-metric__text">{metric.title}</span>
                <span className="capsule-metric__sub">{metric.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}