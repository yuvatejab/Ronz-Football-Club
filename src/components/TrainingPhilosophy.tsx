import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, Shield, ChevronRight } from 'lucide-react';

export default function TrainingPhilosophy() {
  const pillars = [
    {
      id: 'technical',
      title: 'Technical Excellence',
      description: 'Mastering ball control, passing accuracy, and finishing under pressure.',
      icon: (
        <svg className="w-12 h-12 text-[#E4187E]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Custom football ball & target precision vector */}
          <circle cx="32" cy="32" r="22" />
          <polygon points="32,20 39,26 36,35 28,35 25,26" />
          <line x1="32" y1="10" x2="32" y2="20" />
          <line x1="39" y1="26" x2="50" y2="22" />
          <line x1="36" y1="35" x2="44" y2="46" />
          <line x1="28" y1="35" x2="20" y2="46" />
          <line x1="25" y1="26" x2="14" y2="22" />
        </svg>
      )
    },
    {
      id: 'tactical',
      title: 'Tactical Awareness',
      description: 'Understanding positioning, spatial transitions, and game intelligence.',
      icon: (
        <svg className="w-12 h-12 text-[#E4187E]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Custom tactical board vector */}
          <rect x="10" y="10" width="44" height="44" rx="6" />
          <line x1="32" y1="10" x2="32" y2="54" />
          <circle cx="32" cy="32" r="8" />
          <circle cx="21" cy="22" r="3" fill="currentColor" />
          <circle cx="43" cy="42" r="3" fill="currentColor" />
          <path d="M21 22Q32 18 43 42" strokeDasharray="3 3" />
        </svg>
      )
    },
    {
      id: 'physical',
      title: 'Physical Conditioning',
      description: 'Specialized drills for speed, agility, and core strength to prevent injury and boost endurance.',
      icon: (
        <svg className="w-12 h-12 text-[#E4187E]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Custom runner athletic power vector */}
          <circle cx="36" cy="14" r="5" fill="currentColor" />
          <path d="M18 48l12-14 6 6 12-16" />
          <path d="M30 34l-8 16" />
          <path d="M22 28l12-6 10 8" />
          <path d="M44 30l6 14" />
        </svg>
      )
    },
    {
      id: 'mental',
      title: 'Mental Fortitude',
      description: 'Building the confidence, discipline, and leadership required for high-stakes competition.',
      icon: (
        <svg className="w-12 h-12 text-[#E4187E]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Custom shield with crown/mind focus vector */}
          <path d="M32 10L14 18v16c0 14 18 22 18 22s18-8 18-22V18L32 10z" />
          <path d="M24 28l8-6 8 6-3 10H27l-3-10z" />
          <circle cx="32" cy="36" r="2" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <section id="training-philosophy" className="relative bg-[#e9e9e9] text-slate-900 py-16 sm:py-20 md:py-24 px-6 sm:px-12 lg:px-20 overflow-hidden font-serif">
      
      {/* Background Radial Sunburst Watermark Effect on Left */}
      <div className="absolute top-0 left-0 w-80 sm:w-[480px] h-80 sm:h-[480px] pointer-events-none opacity-20 -translate-x-12 -translate-y-12">
        <svg viewBox="0 0 200 200" className="w-full h-full text-slate-400 fill-current">
          {Array.from({ length: 24 }).map((_, i) => (
            <polygon
              key={i}
              points="100,100 96,0 104,0"
              transform={`rotate(${i * 15} 100 100)`}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Split Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 md:mb-20">
          
          {/* Top Left: Main Heading */}
          <div className="md:col-span-7">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-900 leading-[1.15] tracking-tight max-w-lg"
            >
              The Academy: Training Philosophy
            </motion.h2>
          </div>

          {/* Top Right: Paragraph + Learn More Link */}
          <div className="md:col-span-5 flex flex-col justify-between pt-1">
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium mb-4"
            >
              At RONZ FOOTBALL, we believe that world-class players aren’t just born they are built. Our academy provides a pathway for aspiring athletes to transition from grassroots enthusiasts to professional-grade competitors. With a focus on character building and technical precision, we don't just train players, we shape the future of the sport.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a 
                href="#profile-section"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-sans text-slate-900 hover:text-[#E4187E] transition-colors group cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#E4187E] inline-block" />
                <span>Learn More</span>
              </a>
            </motion.div>
          </div>

        </div>

        {/* Bottom Section: 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 pt-4">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="flex flex-col items-start space-y-3"
            >
              {/* Red Line-Art Icon */}
              <div className="mb-2 text-[#E4187E]">
                {pillar.icon}
              </div>

              {/* Pillar Title */}
              <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 tracking-tight">
                {pillar.title}
              </h3>

              {/* Pillar Description */}
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
