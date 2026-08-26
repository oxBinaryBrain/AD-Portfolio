"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLayoutEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      anchors: true,
      infinite: false,
      autoRaf: true,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    lenis.start();

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}