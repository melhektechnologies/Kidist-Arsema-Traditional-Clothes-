"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for cinematic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-black)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="text-[var(--color-cream)] font-heading text-4xl md:text-6xl tracking-[0.2em] font-light"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              KIDIST ARSEMA
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
