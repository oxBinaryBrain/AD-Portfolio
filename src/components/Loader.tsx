"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const LOADER_FRAMES = [
  { text: "BUILD", image: "/pinimg/5f5a29fc5937d1b355326d45eaaf05db.jpg" },
  { text: "SHIP", image: "/pinimg/8f5fa3d6fac6bc67808e3b1894ad037a.jpg" },
  { text: "SCALE", image: "/pinimg/c33463654cf0f506b76062f9c00a8870.jpg" },
  { text: "REPEAT", image: "/pinimg/d49706a3a68294424130d30bb2f85cb0.jpg" },
];

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => Math.min(prev + 1, LOADER_FRAMES.length - 1));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index !== LOADER_FRAMES.length - 1) return;
    const timeoutId = setTimeout(onComplete, 800);
    return () => clearTimeout(timeoutId);
  }, [index, onComplete]);

  const isLast = index === LOADER_FRAMES.length - 1;
  const frame = LOADER_FRAMES[index];

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-white overflow-hidden p-0 m-0">
      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] aspect-square overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              isLast
                ? { opacity: 0, scale: 2, filter: "brightness(2)" }
                : { opacity: 0 }
            }
            transition={
              isLast
                ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.1 }
            }
            className="absolute inset-0"
          >
            <motion.img
              src={frame.image}
              alt={frame.text}
              className="w-full h-full object-cover grayscale contrast-[1.4] brightness-105"
            />
            <div className="absolute inset-0 flex items-center justify-center mix-blend-difference pointer-events-none">
              <h1 className="text-white text-7xl md:text-[8rem] font-old-poster font-black tracking-[0.02em] leading-none select-none text-center">
                {frame.text}
              </h1>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none overflow-hidden select-none opacity-[0.03]">
        <h2 className="text-[12vw] font-old-poster font-black leading-none whitespace-nowrap tracking-[0.05em]">
          ANDREW DOMINIC M
        </h2>
      </div>

      <div className="absolute bottom-10 left-10 flex flex-col gap-1">
        <p className="font-header text-[0.6rem] font-bold tracking-[0.3em] uppercase text-grit-900/40">
          INITIALIZING_CORE_SYSTEM
        </p>
        <p className="font-header text-[0.6rem] font-bold tracking-[0.3em] uppercase text-grit-900/60">
          &quot;BUILDING SYSTEMS THAT ACTUALLY WORK.&quot;
        </p>
        <p className="font-header text-[0.6rem] font-bold tracking-[0.3em] uppercase text-grit-900/40">
          ROLE: PRODUCT-FOCUSED DEVELOPER
        </p>
      </div>

      <div className="absolute top-10 right-10">
        <p className="font-mono text-[0.6rem] text-grit-900/40">ADM_CORE_V4.0</p>
      </div>
    </div>
  );
}