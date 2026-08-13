"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mountain, Compass, Sparkles, Heart } from "lucide-react";

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

// Inspired English quotes about life, nature, inner peace, and the journey
const LIFE_QUOTES: Quote[] = [
  {
    id: 1,
    quote: "Nature does not hurry, yet everything is accomplished.",
    author: "Lao Tzu",
  },
  {
    id: 2,
    quote: "In the depth of winter, I finally learned that within me there lay an invincible summer.",
    author: "Albert Camus",
  },
  {
    id: 3,
    quote: "Slow down and enjoy the journey; it is not a race to the finish line.",
    author: "Wanderer's Wisdom",
  },
  {
    id: 4,
    quote: "The mountain remains calm no matter how fierce the wind blows.",
    author: "Mountain Proverb",
  },
  {
    id: 5,
    quote: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
    author: "Maya Angelou",
  },
  {
    id: 6,
    quote: "In every walk with nature, one receives far more than he seeks.",
    author: "John Muir",
  },
  {
    id: 7,
    quote: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    id: 8,
    quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
  },
  {
    id: 9,
    quote: "Turn your face to the sun and shadows will fall behind you.",
    author: "Maori Proverb",
  },
  {
    id: 10,
    quote: "Sometimes the most productive thing you can do is relax and breathe.",
    author: "Valley Sukoon",
  },
  {
    id: 11,
    quote: "The quiet mind hears the whisper of wisdom.",
    author: "Unknown Wanderer",
  },
  {
    id: 12,
    quote: "Life isn't about waiting for the storm to pass; it's about learning to dance in the rain.",
    author: "Vivian Greene",
  },
  {
    id: 13,
    quote: "The journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
  },
  {
    id: 14,
    quote: "Deep in the quiet valley, the heart finds its true rhythm.",
    author: "Raahi Wisdom",
  },
  {
    id: 15,
    quote: "Small steps in the right direction can turn out to be the biggest steps of your life.",
    author: "Anonymous",
  },
  {
    id: 16,
    quote: "Be present in all things and thankful for all things.",
    author: "Maya Angelou",
  },
  {
    id: 17,
    quote: "Your calm mind is the ultimate weapon against your challenges.",
    author: "Bryant McGill",
  },
  {
    id: 18,
    quote: "To walk in nature is to witness a thousand miracles.",
    author: "Mary Davis",
  },
  {
    id: 19,
    quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
  },
  {
    id: 20,
    quote: "The sun will rise, and we will try again.",
    author: "Twenty One Pilots",
  },
];

export const DualQuoteCards: React.FC = () => {
  const [card1Index, setCard1Index] = useState(0);
  const [card2Index, setCard2Index] = useState(1);

  const card1Ref = useRef(0);
  const card2Ref = useRef(1);

  // History queue to prevent repetition until most quotes have rotated
  const recentHistoryRef = useRef<number[]>([0, 1]);

  useEffect(() => {
    card1Ref.current = card1Index;
  }, [card1Index]);

  useEffect(() => {
    card2Ref.current = card2Index;
  }, [card2Index]);

  const getNextUniqueIndex = useCallback((currentIdx: number, otherCardIdx: number) => {
    const totalQuotes = LIFE_QUOTES.length;
    const history = recentHistoryRef.current;

    // Filter out the other card's quote index and recently shown quotes
    let available = Array.from({ length: totalQuotes }, (_, i) => i).filter(
      (i) => i !== otherCardIdx && !history.includes(i)
    );

    // If pool exhausted due to long history, reset history to active quotes
    if (available.length === 0) {
      recentHistoryRef.current = [currentIdx, otherCardIdx];
      available = Array.from({ length: totalQuotes }, (_, i) => i).filter(
        (i) => i !== otherCardIdx && i !== currentIdx
      );
    }

    const randomIndex = available[Math.floor(Math.random() * available.length)];

    // Keep history length up to 14 items
    recentHistoryRef.current = [...recentHistoryRef.current, randomIndex].slice(-14);

    return randomIndex;
  }, []);

  // Card 1 rotation timer (every 6.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      const next = getNextUniqueIndex(card1Ref.current, card2Ref.current);
      card1Ref.current = next;
      setCard1Index(next);
    }, 6500);
    return () => clearInterval(timer);
  }, [getNextUniqueIndex]);

  // Card 2 rotation timer (every 8.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      const next = getNextUniqueIndex(card2Ref.current, card1Ref.current);
      card2Ref.current = next;
      setCard2Index(next);
    }, 8500);
    return () => clearInterval(timer);
  }, [getNextUniqueIndex]);

  const quote1 = LIFE_QUOTES[card1Index];
  const quote2 = LIFE_QUOTES[card2Index];

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 w-full max-w-[310px] sm:max-w-[350px] pointer-events-auto">
      {/* CARD 1: MOUNTAIN MINDFULNESS */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="rounded-xl bg-[#21130D]/75 backdrop-blur-xl border border-[#B98558]/35 p-2.5 sm:p-3 shadow-lg flex flex-col gap-1.5 relative overflow-hidden group hover:border-[#B98558]/60 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#B98558] font-mono text-[10px] uppercase tracking-wider font-semibold">
            <Mountain className="w-3 h-3 text-[#B98558]" />
            <span>MOUNTAIN MINDFULNESS • PEACE</span>
          </div>
          <Sparkles className="w-3 h-3 text-[#B98558]/60 animate-pulse" />
        </div>

        <div className="relative min-h-[50px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`card1-${card1Index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-1"
            >
              <p className="font-serif text-[#F5EBDD] text-xs sm:text-sm leading-snug font-medium">
                &ldquo;{quote1.quote}&rdquo;
              </p>
              <p className="font-sans italic text-[#D6BFA5]/80 text-[10px] sm:text-xs font-light leading-tight">
                — {quote1.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle timer progress line */}
        <motion.div
          key={`bar-card1-${card1Index}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6.5, ease: "linear" }}
          className="h-0.5 w-full bg-[#B98558]/40 origin-left rounded-full"
        />
      </motion.div>

      {/* CARD 2: WANDERER'S WISDOM */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="rounded-xl bg-[#21130D]/75 backdrop-blur-xl border border-[#B98558]/35 p-2.5 sm:p-3 shadow-lg flex flex-col gap-1.5 relative overflow-hidden group hover:border-[#B98558]/60 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#B98558] font-mono text-[10px] uppercase tracking-wider font-semibold">
            <Compass className="w-3 h-3 text-[#B98558]" />
            <span>WANDERER&apos;S WISDOM • LIFE & JOURNEY</span>
          </div>
          <Heart className="w-3 h-3 text-[#B98558]/60" />
        </div>

        <div className="relative min-h-[50px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`card2-${card2Index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-1"
            >
              <p className="font-serif text-[#F5EBDD] text-xs sm:text-sm leading-snug font-medium">
                &ldquo;{quote2.quote}&rdquo;
              </p>
              <p className="font-sans italic text-[#D6BFA5]/80 text-[10px] sm:text-xs font-light leading-tight">
                — {quote2.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle timer progress line */}
        <motion.div
          key={`bar-card2-${card2Index}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 8.5, ease: "linear" }}
          className="h-0.5 w-full bg-[#B98558]/40 origin-left rounded-full"
        />
      </motion.div>
    </div>
  );
};
