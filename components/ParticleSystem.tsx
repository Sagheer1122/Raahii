"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParticleSystemProps {
  mouseX?: number;
  mouseY?: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  mouseX = 0,
  mouseY = 0,
}) => {
  const [fireflies, setFireflies] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  // Generate glowing mountain fireflies (جگنو) on mount
  useEffect(() => {
    const ambient = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 85 + 10,
      y: Math.random() * 75 + 15,
      size: Math.random() * 3.5 + 2,
      duration: Math.random() * 7 + 5,
      delay: Math.random() * 5,
    }));
    setFireflies(ambient);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10 select-none">
      {/* 1. SUNSET GOLDEN SUN RAYS & HORIZON LENS FLARE */}
      <motion.div
        animate={{
          opacity: [0.45, 0.75, 0.45],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 sm:top-10 right-8 sm:right-32 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-[#FFF5DC]/35 via-[#B98558]/20 to-transparent blur-3xl pointer-events-none"
        style={{
          transform: `translate(${mouseX * -15}px, ${mouseY * -15}px)`,
        }}
      />

      {/* 2. FLOATING MOUNTAIN MIST / FOG LAYER 1 */}
      <motion.div
        animate={{ x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-[-20%] w-[140%] h-48 sm:h-64 bg-gradient-to-r from-transparent via-[#F5EBDD]/8 to-transparent blur-2xl pointer-events-none opacity-40"
      />

      {/* FLOATING MOUNTAIN MIST / FOG LAYER 2 */}
      <motion.div
        animate={{ x: ["10%", "-10%", "10%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-[-10%] w-[130%] h-56 sm:h-72 bg-gradient-to-r from-transparent via-[#B98558]/10 to-transparent blur-3xl pointer-events-none opacity-30"
      />

      {/* 3. MULTIPLE FLYING SUNSET BIRD FLOCKS */}

      {/* FLOCK A: MAIN SUNSET FLOCK (V-Formation, High Sky) */}
      <motion.div
        initial={{ x: "115vw", y: "12vh" }}
        animate={{
          x: ["115vw", "-25vw"],
          y: ["12vh", "18vh", "14vh", "22vh"],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
        className="absolute flex items-center gap-2 opacity-75 pointer-events-none"
      >
        <svg className="w-5 h-5 text-[#21130D] fill-current animate-pulse" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
        <svg className="w-4 h-4 text-[#3B2418] fill-current -mt-3" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
        <svg className="w-3.5 h-3.5 text-[#21130D] fill-current mt-2" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
        <svg className="w-4 h-4 text-[#3B2418] fill-current -mt-1" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
        <svg className="w-3 h-3 text-[#21130D] fill-current mt-3" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
      </motion.div>

      {/* FLOCK B: MID-ALTITUDE FAST BIRDS */}
      <motion.div
        initial={{ x: "120vw", y: "24vh" }}
        animate={{
          x: ["120vw", "-20vw"],
          y: ["24vh", "29vh", "22vh", "30vh"],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
          delay: 12,
        }}
        className="absolute flex items-center gap-3 opacity-65 pointer-events-none"
      >
        <svg className="w-6 h-6 text-[#1A0E08] fill-current" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
        <svg className="w-4.5 h-4.5 text-[#3B2418] fill-current -mt-2" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
        <svg className="w-4 h-4 text-[#21130D] fill-current mt-2" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
        <svg className="w-3.5 h-3.5 text-[#3B2418] fill-current -mt-3" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
      </motion.div>

      {/* FLOCK C: DISTANT HORIZON BIRDS (GLIDING NEAR SUN) */}
      <motion.div
        initial={{ x: "-20vw", y: "8vh" }}
        animate={{
          x: ["-20vw", "115vw"],
          y: ["8vh", "14vh", "10vh", "16vh"],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
          delay: 6,
        }}
        className="absolute flex items-center gap-2.5 opacity-50 pointer-events-none"
      >
        <svg className="w-3.5 h-3.5 text-[#21130D] fill-current" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
        <svg className="w-3 h-3 text-[#3B2418] fill-current -mt-1" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
        <svg className="w-2.5 h-2.5 text-[#21130D] fill-current mt-1" viewBox="0 0 24 24">
          <path d="M2 12c4-2 7-1 10 3 3-4 6-5 10-3-4 5-7 5-10 1-3 4-6 4-10-1z" />
        </svg>
      </motion.div>

      {/* 4. GLOWING GOLDEN FIREFLIES (جگنو) */}
      {fireflies.map((f) => (
        <motion.div
          key={`firefly-${f.id}`}
          className="absolute rounded-full bg-gradient-to-r from-[#FFF7EC] to-[#B98558]"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            boxShadow: "0 0 10px rgba(245, 235, 221, 0.9), 0 0 20px rgba(185, 133, 88, 0.6)",
            transform: `translate(${mouseX * (f.id % 2 === 0 ? 12 : -12)}px, ${mouseY * 12}px)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.1, 0.85, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            delay: f.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
