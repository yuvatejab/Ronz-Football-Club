import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PLAYERS } from '../data';
import { PlayerPosition } from '../types';
import { Shield, Target, Award, Sparkles } from 'lucide-react';

export default function SquadSection() {
  const [filter, setFilter] = useState<PlayerPosition | 'All'>('All');

  const filteredPlayers = PLAYERS.filter(
    (p) => filter === 'All' || p.position === filter
  );

  const filterOptions: (PlayerPosition | 'All')[] = ['All', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper'];

  return (
    <section id="squad" className="py-24 bg-gradient-to-b from-brand-dark to-[#04060d] relative overflow-hidden">
      
      {/* Glow elements */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div id="squad-header" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-widest text-brand-gold uppercase bg-brand-gold/10 px-4 py-1.5 rounded-full border border-brand-gold/20">
              FIRST TEAM ROSTER
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-4">
              MEET THE CRIMSON STORM
            </h2>
            <p className="text-gray-400 mt-3 font-sans font-medium text-sm sm:text-base">
              The athletic warriors carrying the Ronz FC crest. A harmonious squad blending explosive speed, deep tactical IQ, and clinical finishing.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div id="squad-filters" className="flex flex-wrap gap-2.5 bg-slate-950/60 p-2 border border-white/5 rounded-2xl backdrop-blur-md">
            {filterOptions.map((opt) => (
              <button
                id={`filter-opt-${opt}`}
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4.5 py-2 rounded-xl font-sans text-xs font-bold tracking-wider transition-all cursor-pointer ${
                  filter === opt
                    ? 'bg-linear-to-r from-brand-red to-brand-crimson text-white shadow-md shadow-brand-red/15 border border-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {opt.toUpperCase()}S
              </button>
            ))}
          </div>
        </div>

        {/* Players Cards Grid */}
        <motion.div
          id="players-grid"
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPlayers.map((player, idx) => {
              // Calculate overall rating from standard attributes
              const rating = Math.round(
                (player.attributes.speed +
                  player.attributes.shooting +
                  player.attributes.passing +
                  player.attributes.dribbling +
                  player.attributes.defending +
                  player.attributes.physical) / 6
              );

              return (
                <motion.div
                  id={`player-card-${player.id}`}
                  key={player.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  whileHover={{ y: -8 }}
                  className="group bg-slate-950/45 border border-white/5 hover:border-brand-red/30 rounded-3xl overflow-hidden backdrop-blur-md transition-colors duration-300 relative"
                >
                  
                  {/* Rating Badge top-right */}
                  <div className="absolute top-4 right-4 z-20 flex items-center justify-center w-11 h-11 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl">
                    <div className="text-center">
                      <span className="block font-mono text-[9px] font-bold text-gray-400 leading-none">OVR</span>
                      <span className="block font-display text-sm font-black text-brand-gold mt-0.5">{rating}</span>
                    </div>
                  </div>

                  {/* Player jersey number background visual effect */}
                  <div className="absolute top-12 left-0 font-display font-black text-9xl text-white/[0.02] select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">
                    {player.number}
                  </div>

                  {/* Image container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-900 border-b border-white/5">
                    <img
                      src={player.photoUrl}
                      alt={player.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 scale-102 group-hover:scale-106 transition-all duration-500"
                    />
                    
                    {/* Dark gradient fade-out */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-95" />

                    {/* Left overlay flags */}
                    <div className="absolute bottom-4 left-4 flex flex-col gap-1 z-10">
                      <span className="font-mono text-[9px] font-bold text-brand-red bg-brand-red/10 border border-brand-red/20 px-2.5 py-0.5 rounded-full uppercase tracking-widest w-fit">
                        {player.position}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white tracking-tight mt-1">
                        {player.name}
                      </h3>
                    </div>
                  </div>

                  {/* Stats Content Footer */}
                  <div className="p-5.5 relative z-10 bg-slate-950/80">
                    
                    {/* Tiny attributes summaries */}
                    <div className="grid grid-cols-3 gap-2.5 text-center bg-white/2 border border-white/5 rounded-xl py-2 mb-4">
                      {player.position === 'Goalkeeper' ? (
                        <>
                          <div>
                            <span className="block font-mono text-[8px] text-gray-500 uppercase">Saves</span>
                            <span className="block font-display text-xs font-bold text-white mt-0.5">94%</span>
                          </div>
                          <div>
                            <span className="block font-mono text-[8px] text-gray-500 uppercase">Cleans</span>
                            <span className="block font-display text-xs font-bold text-brand-gold mt-0.5">{player.cleanSheets}</span>
                          </div>
                          <div>
                            <span className="block font-mono text-[8px] text-gray-500 uppercase">Passes</span>
                            <span className="block font-display text-xs font-bold text-gray-300 mt-0.5">70%</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <span className="block font-mono text-[8px] text-gray-500 uppercase">Goals</span>
                            <span className="block font-display text-xs font-bold text-brand-red mt-0.5">{player.goals}</span>
                          </div>
                          <div>
                            <span className="block font-mono text-[8px] text-gray-500 uppercase">Assists</span>
                            <span className="block font-display text-xs font-bold text-brand-gold mt-0.5">{player.assists}</span>
                          </div>
                          <div>
                            <span className="block font-mono text-[8px] text-gray-500 uppercase">Pace</span>
                            <span className="block font-display text-xs font-bold text-gray-300 mt-0.5">{player.attributes.speed}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Nationality & Age */}
                    <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 font-mono">
                      <span>{player.nationality}</span>
                      <span>{player.age} yrs</span>
                    </div>

                    {/* Attributes Reveal Hover Drawer */}
                    <div className="absolute inset-x-0 bottom-0 bg-slate-950 border-t border-brand-red/20 px-5.5 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] font-bold font-mono text-gray-300">
                        <div className="flex justify-between">
                          <span>PAC:</span>
                          <span className="text-white">{player.attributes.speed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SHO:</span>
                          <span className="text-white">{player.attributes.shooting}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PAS:</span>
                          <span className="text-white">{player.attributes.passing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DRI:</span>
                          <span className="text-white">{player.attributes.dribbling}</span>
                        </div>
                        <div className="flex justify-between col-span-2 pt-1.5 border-t border-white/5">
                          <span className="text-gray-400">Tactical Role:</span>
                          <span className="text-brand-gold uppercase font-black">{player.tacticalRole}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
