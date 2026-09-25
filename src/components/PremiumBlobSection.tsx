import React from 'react';
import { motion } from 'motion/react';

export default function PremiumBlobSection() {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[600px] bg-white overflow-hidden">
      {/* Premium Geometric Shape Container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
        style={{
          clipPath: `polygon(
            0% 32%,
            0% 6%,
            18% 0%,
            35% 8%,
            52% 2%,
            70% 9%,
            85% 4%,
            100% 12%,
            100% 20%,
            100% 80%,
            85% 92%,
            70% 88%,
            52% 95%,
            35% 90%,
            18% 98%,
            0% 92%,
            0% 68%
          )`,
        }}
      >
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#dc2626] via-[#b91c1c] to-[#7f1d1d] opacity-95" />

        {/* Subtle Inner Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#991b1b]/30 via-transparent to-[#fecaca]/20" />

        {/* Soft Light Accent */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-start justify-center py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.2em] text-white/80">
            Excellence In Motion
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight mt-3 leading-tight">
            Elevate Your Game
          </h2>
          <p className="text-lg sm:text-xl text-white/85 font-light mt-6 max-w-xl leading-relaxed">
            Join an elite community of athletes dedicated to transforming talent into championship performance.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 px-8 py-3.5 bg-white text-[#dc2626] rounded-full font-display font-black text-sm uppercase tracking-wider hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 cursor-pointer"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
