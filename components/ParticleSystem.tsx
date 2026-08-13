"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  duration: number;
  color: string;
}

interface ParticleSystemProps {
  tensionTriggers: number;
  showGlow: boolean;
  onGlowComplete: () => void;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  tensionTriggers,
  showGlow,
  onGlowComplete,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ambientParticles, setAmbientParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([]);

  // Generate ambient floating particles on mount
  useEffect(() => {
    const ambient = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }));
    setAmbientParticles(ambient);
  }, []);

  // Whenever user clicks tension button, create new flying particles
  useEffect(() => {
    if (tensionTriggers === 0) return;

    const colors = ["#F5EBDD", "#D6BFA5", "#B98558"];
    const count = Math.floor(Math.random() * 3) + 3; // 3 to 5 particles per click

    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => {
      return {
        id: Date.now() + i + Math.random(),
        startX: Math.random() * 25 + 15, // left content area ~15-40%
        startY: Math.random() * 30 + 40, // ~40-70% height
        targetX: Math.random() * 10 + 72, // Baba position ~72-82%
        targetY: Math.random() * 15 + 55, // Baba position ~55-70%
        size: Math.random() * 4 + 3, // 3-7px
        duration: Math.random() * 0.8 + 0.8, // 0.8s - 1.6s
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles after animation completes
    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 2000);

    return () => clearTimeout(timer);
  }, [tensionTriggers]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {/* Ambient background particles */}
      {ambientParticles.map((p) => (
        <motion.div
          key={`ambient-${p.id}`}
          className="absolute rounded-full bg-[#B98558]/30 blur-[0.5px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: "0 0 8px rgba(185, 133, 88, 0.4)",
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 10, -10, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Tension release flying particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full shadow-[0_0_12px_rgba(245,235,221,0.8)]"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
            }}
            initial={{
              left: `${p.startX}%`,
              top: `${p.startY}%`,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              left: [`${p.startX}%`, `${(p.startX + p.targetX) / 2 - 5}%`, `${p.targetX}%`],
              top: [`${p.startY}%`, `${Math.min(p.startY, p.targetY) - 10}%`, `${p.targetY}%`],
              opacity: [0, 1, 0.9, 0],
              scale: [0.5, 1.4, 1, 0.2],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}
      </AnimatePresence>

      {/* Baba Radial Glow on Particle Arrival */}
      <AnimatePresence>
        {showGlow && (
          <motion.div
            key="baba-glow"
            className="absolute rounded-full pointer-events-none"
            style={{
              left: "76%",
              top: "62%",
              transform: "translate(-50%, -50%)",
              width: "280px",
              height: "280px",
              background: "radial-gradient(circle, rgba(245,235,221,0.28) 0%, rgba(185,133,88,0.12) 45%, transparent 70%)",
              boxShadow: "0 0 60px rgba(245,235,221,0.2)",
            }}
            initial={{ scale: 0.7, opacity: 0.4 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            onAnimationComplete={onGlowComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
