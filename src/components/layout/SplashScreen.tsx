'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Start exit transition after 2.2 seconds
    const exitTimer = setTimeout(() => {
      setShow(false);
    }, 2200);

    // Call onComplete after transition finishes (2.7s total)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2700);

    // Lock scrolling while splash screen is active
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#05070D] p-8 md:p-12 overflow-hidden select-none"
        >
          {/* Subtle Ambient Pulsing Royal Blue Gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-blue-600/10 rounded-full blur-[100px] md:blur-[160px] pointer-events-none animate-pulse -z-10" />

          {/* Spacer */}
          <div />

          {/* Center Brand Group */}
          <div className="flex flex-col items-center text-center max-w-xl">
            {/* KikWatch Logo */}
            <motion.h1
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
            >
              Kik<span className="text-[var(--color-kik-accent)]">Watch</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
              className="text-gray-400 text-sm md:text-lg font-medium mt-6 tracking-wide"
            >
              Enjoy free streaming while it lasts.
            </motion.p>
          </div>

          {/* Footer Spacer to maintain vertical flex balance */}
          <div className="h-8" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
