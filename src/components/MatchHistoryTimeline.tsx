import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Sun, Moon, ShieldCheck, Sparkles, UserCheck, Zap } from 'lucide-react';

export interface BatchScheduleItem {
  id: string;
  batchType: 'morning' | 'evening';
  badgeTitle: string;
  badgeSubtitle: string;
  timeDisplay: string;
  coach: string;
  title: string;
  description: string;
  highlights: { label: string; value: string }[];
}

const ACADEMY_BATCH_DATA: BatchScheduleItem[] = [
  {
    id: 'batch-morning',
    batchType: 'morning',
    badgeTitle: 'Morning',
    badgeSubtitle: 'Batch',
    timeDisplay: '08 : 00 AM',
    coach: 'by Head Coach Ronz',
    title: 'Sunrise Technical & Fundamental Mastery',
    description:
      'High-energy early session prioritizing technical skill acquisition, ball control under pressure, agility conditioning, and core tactical positioning.',
    highlights: [
      { label: 'Schedule', value: 'Mon, Wed, Fri' },
      { label: 'Duration', value: '120 Mins' },
      { label: 'Focus', value: 'Agility & Technique' },
    ],
  },
  {
    id: 'batch-evening',
    batchType: 'evening',
    badgeTitle: 'Evening',
    badgeSubtitle: 'Batch',
    timeDisplay: '06 : 30 PM',
    coach: 'by Senior Staff Coaches',
    title: 'Floodlight Tactical & Match Simulation',
    description:
      'Advanced tactical setup, positional playmaking, set-piece strategies, and competitive 11v11 full-pitch match scenarios under stadium lighting.',
    highlights: [
      { label: 'Schedule', value: 'Tue, Thu, Sat' },
      { label: 'Duration', value: '120 Mins' },
      { label: 'Focus', value: 'Match Play & Strategy' },
    ],
  },
];

export function MatchHistoryTimeline() {
  const [activeBatch, setActiveBatch] = useState<string>('batch-morning');

  return (
    <section
      id="match-history-timeline"
      className="relative w-full bg-[#f4efef] pt-8 sm:pt-12 pb-20 sm:pb-28 lg:pb-36 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      {/* Background Decorative Soft Radial Glow for Smooth Transition */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[250px] bg-gradient-to-b from-[#f4efef] via-pink-50/30 to-[#f4efef] pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 text-slate-800 text-xs font-mono font-bold tracking-wider uppercase mb-3 border border-slate-900/10 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#dc2626]" />
              ACADEMY TRAINING SCHEDULE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight font-display">
              Batches & Timings
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal max-w-xl mt-2 font-sans">
              Structured elite development modules tailored for modern footballers. Select a batch to view details.
            </p>
          </div>

          {/* Quick Selection Status Badge */}
          <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200/80">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Enrolling for Season 2026
            </span>
          </div>
        </motion.div>

        {/* Main 2-Column Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Player Cutout standing with foot on ball */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex justify-center lg:justify-start"
          >
            {/* Ambient Studio Lighting Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] bg-gradient-to-tr from-rose-200/40 via-amber-100/30 to-pink-100/20 rounded-full blur-[80px] pointer-events-none" />

            {/* Standing Football Player Cutout Container */}
            <div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80"
                alt="Standing Soccer Player with foot on ball"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[540px] sm:max-h-[620px] filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-[1.02]"
              />
              
              {/* Floating Sleek Glass Badge */}
              <div className="absolute bottom-6 left-2 sm:left-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#dc2626] to-[#dc2626] text-white flex items-center justify-center font-bold shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">TRAINING GROUND</span>
                  <span className="block text-xs font-black text-slate-900">Obsidian Arena Pitch 1 & 2</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Timeline Batches */}
          <div className="lg:col-span-7 relative">
            
            {/* Timeline Vertical Connecting Line */}
            <div className="absolute top-12 bottom-12 left-[54px] sm:left-[66px] w-[2px] bg-gradient-to-b from-slate-300 via-slate-300 to-slate-200 z-0" />

            <div className="space-y-12 sm:space-y-16 relative z-10">
              {ACADEMY_BATCH_DATA.map((item, index) => {
                const isActive = activeBatch === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    onClick={() => setActiveBatch(item.id)}
                    className="group cursor-pointer flex items-start gap-4 sm:gap-6"
                  >
                    {/* 1. Sleek Glass Badge Box (Morning / Evening) */}
                    <div
                      className={`shrink-0 flex flex-col items-center justify-center w-[108px] sm:w-[130px] h-[108px] sm:h-[130px] rounded-3xl transition-all duration-300 p-2 text-center border shadow-sm ${
                        isActive
                          ? 'bg-white border-[#dc2626]/30 shadow-xl scale-105 ring-4 ring-[#dc2626]/10'
                          : 'bg-white/80 border-slate-200/90 group-hover:bg-white group-hover:shadow-md'
                      }`}
                    >
                      <div className="mb-1 p-2 rounded-full bg-slate-100 text-slate-700 group-hover:bg-[#dc2626]/10 group-hover:text-[#dc2626] transition-colors">
                        {item.batchType === 'morning' ? (
                          <Sun className="w-5 h-5 text-amber-500" />
                        ) : (
                          <Moon className="w-5 h-5 text-indigo-500" />
                        )}
                      </div>
                      <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-none font-display">
                        {item.badgeTitle}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 font-mono">
                        {item.badgeSubtitle}
                      </span>
                    </div>

                    {/* 2. Timeline Connection Dot */}
                    <div className="relative mt-12 sm:mt-14 shrink-0 flex items-center justify-center">
                      <div
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-[#dc2626] ring-4 ring-[#dc2626]/20 scale-125'
                            : 'bg-slate-300 group-hover:bg-slate-500'
                        }`}
                      />
                    </div>

                    {/* 3. Details Content Container */}
                    <div className="flex-1 pt-2 sm:pt-4 pl-2 sm:pl-4">
                      {/* Timing Header */}
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="text-2xl sm:text-4xl font-display font-black text-slate-900 tracking-tight font-display">
                          {item.timeDisplay}
                        </h3>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700 font-sans">
                          {item.coach}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm sm:text-base font-bold text-slate-800 mt-1.5 font-display">
                        {item.title}
                      </h4>

                      {/* Description Paragraph */}
                      <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed mt-2 max-w-xl font-sans">
                        {item.description}
                      </p>

                      {/* Highlight Badges / Schedule Specs */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                        {item.highlights.map((h) => (
                          <div
                            key={h.label}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs text-[11px]"
                          >
                            <span className="text-slate-400 font-semibold">{h.label}:</span>
                            <span className="font-bold text-slate-900">{h.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default MatchHistoryTimeline;

