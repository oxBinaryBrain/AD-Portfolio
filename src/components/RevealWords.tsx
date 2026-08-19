"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type RevealWordsProps = {
  children: string;
  className?: string;
  highlightWords?: string[];
};

export function RevealWords({
  children: text,
  className = "",
  highlightWords = [],
}: RevealWordsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const words = container.querySelectorAll(".rw");
      gsap.set(words, {
        opacity: 0.1,
        filter: "blur(12px)",
        willChange: "opacity, filter",
      });
      gsap.to(words, {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          end: "center 45%",
          scrub: 1.5,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {text.split(" ").map((word, index) => {
        const isHighlighted = highlightWords.some((highlight) =>
          word.includes(highlight),
        );

        return (
          <span
            key={`${word}-${index}`}
            className={`rw inline-block mr-[0.3em] ${
              isHighlighted
                ? "font-playfair italic font-normal tracking-normal text-white"
                : ""
            }`}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}