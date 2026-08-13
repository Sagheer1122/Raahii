"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mountain, Coffee, Sparkles, Smile } from "lucide-react";

// 1. Healing / Peaceful Mountain Urdu Quotes
const HEALING_QUOTES = [
  {
    urdu: "پہاڑوں کی خاموشی میں دل کو حقیقی سکون ملتا ہے۔",
    roman: "Pahaadon ki khamoshi mein dil ko haqeeqi sukoon milta hai.",
  },
  {
    urdu: "جب دنیا شور مچائے، پہاڑ آپ کو خاموش رہنا سکھاتے ہیں۔",
    roman: "Jab duniya shor machaye, pahaad aap ko khamosh rehna sikhate hain.",
  },
  {
    urdu: "کچھ دیر یہیں ٹھہر جاؤ، ہر ذہنی طوفان گزر جائے گا۔",
    roman: "Kuch der yeheen thehr jao, har zehni toofan guzar jayega.",
  },
  {
    urdu: "پہاڑ بتاتے ہیں کہ خاموشی بھی ایک خوبصورت جواب ہے۔",
    roman: "Pahaad batate hain ke khamoshi bhi ek khoobsurat jawab hai.",
  },
  {
    urdu: "اپنے اندر کی تمام بے چینی اس خاموش وادی کے سپرد کر دو۔",
    roman: "Apne andar ki tamaam bechaini is khamosh waadi ke supurd kar do.",
  },
];

// 2. Funny / Lighthearted Baba Urdu Quotes
const FUNNY_QUOTES = [
  {
    urdu: "آپ کا باس بھی ایک دن ریٹائر ہو جائے گا، یہ پہاڑ نہیں۔",
    roman: "Aap ka boss bhi ek din retire ho jayega, yeh pahaad nahi.",
  },
  {
    urdu: "ریلیکس کرو! ڈیڈ لائن کونسا بھاگ کر جا رہی ہے۔",
    roman: "Relax karo! Deadline kaunsa bhaag kar ja rahi hai.",
  },
  {
    urdu: "انٹرنیٹ سلو ہو سکتا ہے، زندگی بھی تھوڑی سلو کر لو۔",
    roman: "Internet slow ho sakta hai, zindagi bhi thori slow kar lo.",
  },
  {
    urdu: "سب ٹھیک ہو جائے گا، اور اگر نہیں ہوا تو گرم چائے پی لیں گے۔",
    roman: "Sab theek ho jayega, aur agar nahi hua to garam chai pe lenge.",
  },
  {
    urdu: "بابا نے بھی اپنے آفس کی ای میل کا ریپلائی اگلے ہفتے ہی دیا تھا۔",
    roman: "Baba ne bhi apne office ki email ka reply aglay hafte hi diya tha.",
  },
];

export const DualQuoteCards: React.FC = () => {
  const [healingIndex, setHealingIndex] = useState(0);
  const [funnyIndex, setFunnyIndex] = useState(0);

  // Auto change Healing quote every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHealingIndex((prev) => (prev + 1) % HEALING_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto change Funny quote every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFunnyIndex((prev) => (prev + 1) % FUNNY_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentHealing = HEALING_QUOTES[healingIndex];
  const currentFunny = FUNNY_QUOTES[funnyIndex];

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 w-full max-w-[310px] sm:max-w-[350px] pointer-events-auto">
      {/* CARD 1: HEALING MOUNTAIN QUOTES */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="rounded-xl bg-[#21130D]/75 backdrop-blur-xl border border-[#B98558]/35 p-2.5 sm:p-3 shadow-lg flex flex-col gap-1.5 relative overflow-hidden group hover:border-[#B98558]/60 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#B98558] font-mono text-[10px] uppercase tracking-wider font-semibold">
            <Mountain className="w-3 h-3 text-[#B98558]" />
            <span>HEALING MOUNTAIN • روحانی سکون</span>
          </div>
          <Sparkles className="w-3 h-3 text-[#B98558]/60 animate-pulse" />
        </div>

        <div className="relative min-h-[44px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`healing-${healingIndex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-0.5"
            >
              <p className="font-serif text-[#F5EBDD] text-xs sm:text-sm leading-snug dir-rtl text-right font-medium">
                {currentHealing.urdu}
              </p>
              <p className="font-sans italic text-[#D6BFA5]/80 text-[10px] sm:text-xs font-light leading-tight">
                &ldquo;{currentHealing.roman}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle timer progress line */}
        <motion.div
          key={`bar-healing-${healingIndex}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-0.5 w-full bg-[#B98558]/40 origin-left rounded-full"
        />
      </motion.div>

      {/* CARD 2: FUNNY / WITTY BABA QUOTES */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="rounded-xl bg-[#21130D]/75 backdrop-blur-xl border border-[#B98558]/35 p-2.5 sm:p-3 shadow-lg flex flex-col gap-1.5 relative overflow-hidden group hover:border-[#B98558]/60 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#B98558] font-mono text-[10px] uppercase tracking-wider font-semibold">
            <Coffee className="w-3 h-3 text-[#B98558]" />
            <span>WANDERER&apos;S WISDOM • دانا باتیں</span>
          </div>
          <Smile className="w-3 h-3 text-[#B98558]/60" />
        </div>

        <div className="relative min-h-[44px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`funny-${funnyIndex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-0.5"
            >
              <p className="font-serif text-[#F5EBDD] text-xs sm:text-sm leading-snug dir-rtl text-right font-medium">
                {currentFunny.urdu}
              </p>
              <p className="font-sans italic text-[#D6BFA5]/80 text-[10px] sm:text-xs font-light leading-tight">
                &ldquo;{currentFunny.roman}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle timer progress line */}
        <motion.div
          key={`bar-funny-${funnyIndex}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-0.5 w-full bg-[#B98558]/40 origin-left rounded-full"
        />
      </motion.div>
    </div>
  );
};
