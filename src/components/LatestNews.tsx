import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Newspaper } from 'lucide-react';
import { useDataStore } from '../store/dataStore';

export default function LatestNews() {
  const { news } = useDataStore();

  if (!news || news.length === 0) return null;

  return (
    <section id="latest-news" className="bg-white py-16 sm:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden border-t border-slate-300">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#dc2626]">
                Inside The Club
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 tracking-tight">
              Latest <span className="text-[#dc2626]">News</span>
            </h2>
          </div>
          <button className="px-6 py-2 rounded-full border border-slate-300 hover:border-[#dc2626] hover:bg-[#dc2626] hover:text-white transition-all text-xs font-bold uppercase tracking-widest text-slate-800 flex items-center gap-2">
            View Archive <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {news.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group cursor-pointer flex flex-col bg-white rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              {/* Image Container with inner shadow */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle gradient overlay to make tags pop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Tag & Date Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] uppercase font-bold tracking-wider font-mono border border-white/30">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/90 uppercase tracking-widest drop-shadow-md">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-bold font-display leading-tight text-slate-900 group-hover:text-[#dc2626] transition-colors mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 font-sans leading-relaxed line-clamp-3 mb-6 flex-1">
                  {item.summary}
                </p>

                <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                  Read Article <ArrowUpRight className="w-3.5 h-3.5 ml-1 inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
