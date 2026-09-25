import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TROPHIES } from '../data';
import { Trophy as TrophyIcon, Shield, Award, Flame, Calendar, History, Star } from 'lucide-react';

const HISTORICAL_TIMELINE = [
  {
    year: '2012',
    title: 'A Storm is Born',
    description: 'Ronz FC is founded by visionary local players. Choosing the colors Crimson Red and Obsidian Black to symbolize fire and rock-solid defiance.'
  },
  {
    year: '2017',
    title: 'The Professional Dawn',
    description: 'Secured three back-to-back tier promotions to enter the national professional division ranks, turning heads with a relentless offensive high-press.'
  },
  {
    year: '2021',
    title: 'First Super League Gold',
    description: 'Clinched our maiden domestic championship on the final matchday of the season, creating a massive wave of crimson fandom across the country.'
  },
  {
    year: '2024',
    title: 'The Rain Invincibles',
    description: 'Recorded a legendary 100% undefeated home stadium run in all games played under rain or storm conditions at the Obsidian Arena.'
  },
  {
    year: '2026',
    title: 'The Continental Treble',
    description: 'Secured the prestigious Continental Champions Cup in a legendary dramatic final, cementing Ronz FC as a titan of global soccer.'
  }
];

export default function TrophyCabinet() {
  const [selectedTrophyId, setSelectedTrophyId] = useState<string>(TROPHIES[0].id);

  const activeTrophy = TROPHIES.find((t) => t.id === selectedTrophyId) || TROPHIES[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Trophy': return <TrophyIcon className="w-6 h-6 text-brand-gold" />;
      case 'Shield': return <Shield className="w-6 h-6 text-brand-gold" />;
      case 'Award': return <Award className="w-6 h-6 text-brand-gold" />;
      case 'Flame': return <Flame className="w-6 h-6 text-brand-gold" />;
      default: return <TrophyIcon className="w-6 h-6 text-brand-gold" />;
    }
  };

  return (
    <section id="trophies" className="py-24 bg-brand-dark relative overflow-hidden">
      
      {/* Decorative timeline mesh background */}
      <div className="absolute inset-0 bg-radial-[circle_at_bottom_left_rgba(234,88,12,0.04)_10%,transparent_60%] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div id="trophies-header" className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-4 py-1.5 rounded-full border border-brand-red/20">
            CHAMPIONS ARCHIVE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-display font-black tracking-tight text-white mt-4">
            A COATED LEGACY
          </h2>
          <p className="text-gray-400 mt-3 font-sans font-medium text-base">
            Every cup we raise represents blood, sweat, and tactical defiance under the floodlights. Trace our legendary history and champions collection.
          </p>
        </div>

        {/* Timeline vs Trophies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Timeline of Rise (5 Cols) */}
          <div id="timeline-column" className="lg:col-span-5 bg-slate-950/40 border border-white/5 p-6 sm:p-8 rounded-3xl backdrop-blur-xl relative">
            
            <div className="flex items-center gap-2.5 mb-8 pb-4 border-b border-white/5">
              <History className="w-5 h-5 text-brand-red" />
              <span className="font-display font-bold text-lg text-white">THE CRIMSON RISE TIMELINE</span>
            </div>

            {/* Vertical timeline line */}
            <div className="absolute left-11 sm:left-13 top-28 bottom-12 w-[1.5px] bg-white/10" />

            <div className="space-y-8 relative">
              {HISTORICAL_TIMELINE.map((item, idx) => (
                <div key={item.year} className="flex gap-4 sm:gap-6 group items-start">
                  
                  {/* Year Tag badge */}
                  <div className="relative z-10 flex flex-col items-center justify-center min-w-[50px] h-11 rounded-xl bg-slate-900 border border-white/10 text-center shadow-md">
                    <span className="font-display font-black text-[12px] text-white tracking-tight leading-none">{item.year}</span>
                    <Star className="w-2.5 h-2.5 text-brand-gold mt-1 group-hover:rotate-45 transition-transform duration-300" />
                  </div>

                  {/* Text details */}
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-brand-red transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="font-sans font-medium text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Interactive Trophy Cabinet Display (7 Cols) */}
          <div id="trophies-cabinet-column" className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Horizontal Trophies select strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/40 p-3 border border-white/5 rounded-2xl backdrop-blur-xl">
              {TROPHIES.map((trophy) => {
                const isSelected = trophy.id === selectedTrophyId;
                return (
                  <button
                    id={`trophy-select-${trophy.id}`}
                    key={trophy.id}
                    onClick={() => setSelectedTrophyId(trophy.id)}
                    className={`flex flex-col items-center p-4.5 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-brand-gold/40 shadow-lg'
                        : 'bg-transparent border-white/5 hover:bg-white/3'
                    }`}
                  >
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isSelected ? 'bg-brand-gold/15 scale-110' : 'bg-white/3'
                    }`}>
                      {getIcon(trophy.iconName)}
                    </div>
                    <span className={`block font-display text-[11px] font-bold tracking-tight mt-3 truncate w-full ${
                      isSelected ? 'text-white' : 'text-gray-400'
                    }`}>
                      {trophy.name.split(' ')[0]} Cup
                    </span>
                    <span className="block font-mono text-[9px] font-bold text-brand-gold mt-1">
                      {trophy.count} TITLE{trophy.count > 1 ? 'S' : ''}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Display Card of active trophy */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrophy.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-slate-950/65 border border-white/8 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl relative overflow-hidden"
              >
                
                {/* Glowing radial accent */}
                <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-brand-gold/8 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-start gap-6 pb-6 border-b border-white/5 relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 shadow-md">
                    {getIcon(activeTrophy.iconName)}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/10 px-2.5 py-1 rounded-md">
                      Official Title Trophy
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-display font-black text-white mt-2">
                      {activeTrophy.name}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 relative z-10">
                  
                  {/* Left stats summary */}
                  <div className="md:col-span-4 flex flex-col gap-4">
                    <div>
                      <span className="block font-mono text-[9px] text-gray-500 uppercase">CHAMPIONS COUNT</span>
                      <span className="block font-display text-4xl font-black text-white mt-1">{activeTrophy.count} Times</span>
                    </div>

                    <div>
                      <span className="block font-mono text-[9px] text-gray-500 uppercase mb-2">VICTORY YEARS</span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeTrophy.years.map((year) => (
                          <span key={year} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-mono text-[10px] font-bold">
                            {year}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right description */}
                  <div className="md:col-span-8 flex flex-col justify-between">
                    <div>
                      <span className="block font-mono text-[9px] text-gray-500 uppercase">VICTORY SUMMARY</span>
                      <p className="font-sans font-medium text-xs sm:text-sm text-gray-300 mt-2.5 leading-relaxed">
                        {activeTrophy.description}
                      </p>
                      <p className="font-sans font-medium text-xs text-gray-400 mt-4 leading-relaxed">
                        Under storm and lightning floodlights at home turf, or on tough continental grounds, Ronz FC fans have roared as one to push our players across the line. This title stands as a symbol of our collective defiance.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5">
                      <div className="w-2 h-2 rounded-full bg-brand-gold" />
                      <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-wider">Crest-Authentic Champion Log</span>
                    </div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
