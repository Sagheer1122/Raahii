"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParticleSystem } from "./ParticleSystem";
import { MusicPlayer } from "./MusicPlayer";
import { DualQuoteCards } from "./DualQuoteCards";

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined") return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2; // Range -1 to 1
    const y = (e.clientY / innerHeight - 0.5) * 2; // Range -1 to 1
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full bg-[#21130D] text-[#F5EBDD] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. FULLSCREEN OIL PAINTING BACKGROUND IMAGE WITH 3D PARALLAX */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1.03, 1.05, 1.03],
            x: mousePos.x * -14,
            y: mousePos.y * -14,
          }}
          transition={{
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 0.4, ease: "easeOut" },
            y: { duration: 0.4, ease: "easeOut" },
          }}
          className="relative w-full h-full"
        >
          <Image
            src="/hero-man.jpg"
            alt="Young man sitting peacefully on mountain peak oil painting at sunset"
            fill
            priority
            className="object-cover object-center sm:object-[75%_55%] transition-all duration-700 brightness-100 contrast-105"
            sizes="100vw"
          />
        </motion.div>

        {/* Atmospheric Gradient Tints */}
        <div className="absolute inset-0 bg-[#21130D]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#21130D]/85 via-[#21130D]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#21130D]/40 via-transparent to-[#0F0805]/90 pointer-events-none" />
      </div>

      {/* 2. DELUXE ANIMATIONS (SUN RAYS, MIST, BIRDS, FIREFLIES) */}
      <ParticleSystem mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* 3. TOP NAVIGATION BADGE */}
      <header className="relative z-50 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-3.5 sm:pt-5 flex items-center justify-between pointer-events-none">
        {/* Top Left RAAHI Title Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2.5 bg-[#21130D]/65 backdrop-blur-md px-3.5 sm:px-4 py-1.5 rounded-full border border-[#B98558]/35 shadow-lg pointer-events-auto"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B98558] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B98558]"></span>
          </span>
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#F5EBDD] uppercase">
            RAAHI • راہگیر
          </span>
        </motion.div>

        {/* Top Right Sub-Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-mono text-[11px] sm:text-xs text-[#D6BFA5]/90 tracking-widest uppercase bg-[#21130D]/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#B98558]/25 hidden sm:block pointer-events-auto"
        >
          VALLEY SUKOON • 24/7
        </motion.div>
      </header>

      {/* 4. MAIN CONTENT WITH COMPACT RESPONSIVE URDU CARDS ON LEFT */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 flex-1 flex items-center justify-start overflow-hidden py-2">
        <DualQuoteCards />
      </main>

      {/* 5. DELUXE FLOATING BOTTOM MUSIC PLAYER */}
      <MusicPlayer />
    </div>
  );
};
