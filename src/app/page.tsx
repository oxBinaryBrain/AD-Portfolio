"use client";

import { AboutSection } from "@/components/AboutSection";
import { CapsulePortal } from "@/components/CapsulePortal";
import { ContactFooter } from "@/components/ContactFooter";
import { CustomCursor } from "@/components/CustomCursor";
import { LenisProvider } from "@/components/LenisProvider";
import { Loader } from "@/components/Loader";
import { WorkSection } from "@/components/WorkSection";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function HomeContent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LenisProvider>
      <div className="w-full min-h-screen">
        <CapsulePortal />
        <WorkSection />
        <AboutSection />
        <ContactFooter />
      </div>
    </LenisProvider>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="selection:bg-grit-900 selection:text-white relative cursor-none">
      <CustomCursor />
      <div className="noise-overlay" aria-hidden />
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 origin-top"
          >
            <Loader onComplete={() => setLoading(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <HomeContent />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}