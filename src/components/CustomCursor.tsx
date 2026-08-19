"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let frame: number;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(".card-photo")) setHovering(true);
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(".card-photo")) setHovering(false);
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.65;
      current.y += (target.y - current.y) * 0.65;
      const transform = `translate(${current.x}px, ${current.y}px) translate(-50%, -50%)`;
      dot.style.transform = transform;
      label.style.transform = transform;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full hidden md:block"
        style={{
          width: hovering ? "80px" : "14px",
          height: hovering ? "80px" : "14px",
          backgroundColor: "white",
          mixBlendMode: "difference",
          transition:
            "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
        style={{
          width: "80px",
          height: "80px",
          opacity: hovering ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span className="text-[0.45rem] font-header font-bold tracking-[0.15em] uppercase text-grit-900 text-center leading-tight">
          VIEW
          <br />
          PROJECT
        </span>
      </div>
    </>
  );
}