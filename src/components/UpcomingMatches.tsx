import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useDataStore } from '../store/dataStore';

export default function UpcomingMatches() {
  const { matches } = useDataStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!matches || matches.length === 0) return null;

  const current = matches[currentIndex];
  const matchDate = new Date(current.date);
  const formattedDate = matchDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? matches.length - 1 : prev - 1));
  }, [matches.length]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === matches.length - 1 ? 0 : prev + 1));
  }, [matches.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <section
      id="upcoming-matches"
      className="relative bg-white py-20 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <div className="flex items-center gap-4 mb-5 w-full max-w-md justify-center">
            <span className="flex-1 h-px bg-slate-300" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#dc2626] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
              The Battlefield
            </span>
            <span className="flex-1 h-px bg-slate-300" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-slate-900 tracking-tight uppercase"
          >
            Upcoming <span className="text-[#dc2626]">Fixtures</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-slate-500 font-sans font-medium tracking-wide"
          >
            Best of the best match
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-2 flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest"
          >
            <Calendar className="w-3.5 h-3.5" />
            <AnimatePresence mode="wait">
              <motion.span
                key={current.id + '-date'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formattedDate} — {current.time}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <div className="mt-6 w-16 h-px bg-slate-300" />
        </div>

        {/* ── Match Showcase — Slim Horizontal Strip ── */}
        <div className="relative">

          {/* Scroll Arrows — slim, flush to edges */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg hover:border-[#dc2626]/30 flex items-center justify-center text-slate-500 hover:text-[#dc2626] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg hover:border-[#dc2626]/30 flex items-center justify-center text-slate-500 hover:text-[#dc2626] transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          {/* Match Strip */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 flex items-center justify-between px-14 sm:px-20 py-6 sm:py-8"
            >

              {/* ── Left: RONZ FC ── */}
              <div className="relative flex items-center gap-4 sm:gap-6">

                {/* Badge */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-slate-50 to-white border border-slate-200 flex items-center justify-center shadow-sm flex-shrink-0">
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-slate-900" strokeWidth={1.5} />
                </div>

                {/* Name & Watermark Container Wrapper */}
                <div className="relative">
                  {/* Watermark "HOME" behind Name */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 text-[48px] sm:text-[64px] md:text-[84px] font-display font-black uppercase leading-none tracking-tight select-none pointer-events-none whitespace-nowrap z-0 bg-gradient-to-r from-slate-900/20 to-slate-900/10 bg-clip-text text-transparent"
                  >
                    HOME
                  </div>

                  {/* Name */}
                  <div className="relative z-10 text-left">
                    <span className="block text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-900 uppercase tracking-wide leading-tight">
                      RONZ FC
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Center: VS ── */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0 mx-4 sm:mx-8">
                <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#dc2626] uppercase tracking-[0.2em]">
                  {current.competition}
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-900 italic tracking-wider select-none">
                  VS
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                  {current.venue === 'Home' ? 'Obsidian Arena' : current.venue}
                </span>
              </div>

              {/* ── Right: Opponent ── */}
              <div className="relative flex items-center gap-4 sm:gap-6 flex-row-reverse">

                {/* Badge */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-slate-50 to-white border border-slate-200 flex items-center justify-center shadow-sm flex-shrink-0 overflow-hidden">
                  {current.logo ? (
                    <img
                      src={current.logo}
                      alt={current.opponent}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Shield className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-slate-400" strokeWidth={1.5} />
                  )}
                </div>

                {/* Name & Watermark Container Wrapper */}
                <div className="relative">
                   {/* Watermark "AGAINST" behind Name */}
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 text-[48px] sm:text-[64px] md:text-[84px] font-display font-black uppercase leading-none tracking-tight select-none pointer-events-none whitespace-nowrap z-0 bg-gradient-to-l from-slate-900/20 to-slate-900/10 bg-clip-text text-transparent"
                  >
                    AGAINST
                  </div>

                  {/* Name */}
                  <div className="relative z-10 text-right">
                    <span className="block text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-900 uppercase tracking-wide leading-tight">
                      {current.opponent}
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Subtle top and bottom hairlines for the strip */}
          <div className="absolute top-0 left-14 right-14 sm:left-20 sm:right-20 h-px bg-slate-200/60" />
          <div className="absolute bottom-0 left-14 right-14 sm:left-20 sm:right-20 h-px bg-slate-200/60" />
        </div>

        {/* ── Match Details + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center text-center mt-10 sm:mt-14"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id + '-desc'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-sm sm:text-base text-slate-500 font-sans leading-relaxed max-w-lg"
            >
              Ronz FC faces off against{' '}
              <span className="font-bold text-slate-700">{current.opponent}</span>{' '}
              in the{' '}
              <span className="font-bold text-slate-700">{current.competition}</span>.{' '}
              Kick-off is at{' '}
              <span className="font-bold text-slate-700">{current.time}</span>{' '}
              — don't miss this electrifying fixture.
            </motion.p>
          </AnimatePresence>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 group relative inline-flex items-center gap-2 px-8 py-3 text-xs font-display font-bold uppercase tracking-[0.15em] text-slate-900 hover:text-[#dc2626] transition-colors cursor-pointer"
          >
            <span className="absolute bottom-0 left-0 w-full h-px bg-slate-300" />
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#dc2626] group-hover:w-full transition-all duration-500 ease-out" />
            Read More
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* ── Pagination Dots ── */}
        {matches.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {matches.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`cursor-pointer transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? 'w-8 h-2 bg-[#dc2626]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
