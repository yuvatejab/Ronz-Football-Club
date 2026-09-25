import React from 'react';
import { motion } from 'motion/react';
import { Zap, Grid3X3, Flame, Brain } from 'lucide-react';

export default function TrainingPhilosophy() {
  const pillars = [
    {
      id: 'technical',
      title: 'Technical Excellence',
      description: 'Mastering ball control, passing accuracy, and finishing under pressure.',
      icon: <Zap className="w-12 h-12 text-[#dc2626]" strokeWidth={1.5} />
    },
    {
      id: 'tactical',
      title: 'Tactical Awareness',
      description: 'Understanding positioning, spatial transitions, and game intelligence.',
      icon: <Grid3X3 className="w-12 h-12 text-[#dc2626]" strokeWidth={1.5} />
    },
    {
      id: 'physical',
      title: 'Physical Conditioning',
      description: 'Specialized drills for speed, agility, and core strength to prevent injury and boost endurance.',
      icon: <Flame className="w-12 h-12 text-[#dc2626]" strokeWidth={1.5} />
    },
    {
      id: 'mental',
      title: 'Mental Fortitude',
      description: 'Building the confidence, discipline, and leadership required for high-stakes competition.',
      icon: <Brain className="w-12 h-12 text-[#dc2626]" strokeWidth={1.5} />
    }
  ];

  return (
    <section id="training-philosophy" className="relative bg-white text-slate-900 py-16 sm:py-20 md:py-24 px-6 sm:px-12 lg:px-20 overflow-hidden font-serif">
      
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
              className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 leading-[1.15] tracking-tight max-w-lg"
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
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-sans text-slate-900 hover:text-[#dc2626] transition-colors group cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#dc2626] inline-block" />
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
              <div className="mb-2 text-[#dc2626]">
                {pillar.icon}
              </div>

              {/* Pillar Title */}
              <h3 className="text-lg sm:text-xl font-black font-display text-slate-900 tracking-tight">
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
