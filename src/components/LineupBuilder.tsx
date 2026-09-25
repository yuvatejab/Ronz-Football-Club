import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PLAYERS, TACTICAL_LINEUP } from '../data';
import { Player } from '../types';
import { Shield, Zap, TrendingUp, Compass, Star, Eye } from 'lucide-react';

export default function LineupBuilder() {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('p1'); // ST (Marcus Vance) as default

  const selectedPlayer = PLAYERS.find((p) => p.id === selectedPlayerId) || PLAYERS[0];

  const getAttributeColor = (val: number) => {
    if (val >= 90) return 'bg-emerald-500 shadow-emerald-500/20';
    if (val >= 80) return 'bg-amber-500 shadow-amber-500/20';
    return 'bg-blue-500 shadow-blue-500/20';
  };

  return (
    <section id="tactics" className="relative py-24 bg-brand-dark overflow-hidden">
      
      {/* Background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div id="tactics-header" className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-4 py-1.5 rounded-full border border-brand-red/20">
            TACTICAL ENGINE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-display font-black tracking-tight text-white mt-4">
            THE CRIMSON FORMATION
          </h2>
          <p className="text-gray-400 mt-4 text-base font-sans font-medium leading-relaxed">
            Ronz FC deploys a fluid, high-pressing <span className="text-brand-gold font-bold">4-3-3 Attacking Storm</span>. Explore our starting lineup's attributes and positional roles by interacting with the tactical matrix.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Soccer Pitch (7 Cols) */}
          <div id="tactical-pitch-container" className="lg:col-span-7 xl:col-span-8 bg-slate-950/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
            
            {/* Ambient glows behind pitch */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
                <span className="font-mono text-xs font-bold text-gray-300 tracking-wider">ACTIVE FORMATION: 4-3-3 ATTACKING</span>
              </div>
              <span className="font-mono text-[10px] text-gray-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">PRESS SQUAD POSITION</span>
            </div>

            {/* Stylized Football Pitch canvas container */}
            <div className="relative aspect-[3/4] w-full max-w-[520px] mx-auto bg-gradient-to-b from-emerald-950/50 to-emerald-900/40 rounded-2xl border-2 border-white/10 p-4 shadow-2xl overflow-hidden shadow-black">
              
              {/* Pitch Markings */}
              {/* Outer boundary margin offset */}
              <div className="absolute inset-4 border border-white/15 pointer-events-none rounded-sm">
                
                {/* Center Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/15" />
                
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-white/15 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full" />

                {/* Top Penalty Area (Away Box) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-18 border-x border-b border-white/15" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 border-x border-b border-white/10" />
                <div className="absolute top-18 left-1/2 -translate-x-1/2 w-14 h-6 border-b border-white/5 rounded-b-full opacity-30" />

                {/* Bottom Penalty Area (Home Box) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-18 border-x border-t border-white/15" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-6 border-x border-t border-white/10" />
                {/* Penalty Spot */}
                <div className="absolute bottom-11 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/30 rounded-full" />
                {/* Penalty Arc */}
                <div className="absolute bottom-18 left-1/2 -translate-x-1/2 w-16 h-8 border-t border-white/15 rounded-t-full opacity-30" />
                
              </div>

              {/* Rain Streaks overlay just on pitch */}
              <div className="absolute inset-0 bg-radial-[circle_at_top_rgba(255,255,255,0.06)_10%,transparent_60%] pointer-events-none" />

              {/* Interactive Player Nodes */}
              {TACTICAL_LINEUP.map((node) => {
                const player = PLAYERS.find((p) => p.id === node.playerId);
                if (!player) return null;
                
                const isSelected = player.id === selectedPlayerId;
                
                return (
                  <button
                    id={`tactical-node-${player.id}`}
                    key={player.id}
                    onClick={() => setSelectedPlayerId(player.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                  >
                    {/* Pulsing selection background ring */}
                    <div className={`absolute -inset-4.5 rounded-full transition-all duration-300 ${
                      isSelected 
                        ? 'bg-brand-red/30 scale-105 border border-brand-red/40 animate-pulse' 
                        : 'bg-transparent scale-75 group-hover:bg-white/10 group-hover:scale-95'
                    }`} />

                    {/* Node Core Jersey/Badge */}
                    <div className={`relative flex flex-col items-center justify-center w-10 h-10 rounded-full border shadow-xl transition-all duration-300 ${
                      isSelected 
                        ? 'bg-brand-red border-brand-gold text-white scale-110 shadow-brand-red/35' 
                        : 'bg-slate-900 border-white/25 text-gray-300 group-hover:border-white/50 group-hover:scale-105 group-hover:text-white'
                    }`}>
                      <span className="font-display font-bold text-xs">{player.number}</span>
                      
                      {/* Floating tactical role badge */}
                      <span className={`absolute -top-3.5 px-1.5 py-0.5 rounded-md font-mono text-[8px] font-bold border ${
                        isSelected 
                          ? 'bg-brand-gold text-slate-950 border-brand-gold' 
                          : 'bg-slate-950/80 text-brand-red border-white/10'
                      }`}>
                        {node.role}
                      </span>
                    </div>

                    {/* Short Name Label */}
                    <div className="absolute top-11 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300">
                      <span className={`block whitespace-nowrap px-2 py-0.5 rounded-md font-sans text-[10px] font-bold tracking-wide border shadow-md ${
                        isSelected 
                          ? 'bg-white text-slate-950 border-white font-black scale-105' 
                          : 'bg-slate-950/90 text-gray-300 border-white/5 group-hover:text-white'
                      }`}>
                        {player.name.split(' ').pop()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Player Bio & Stats HUD Panel (5 Cols) */}
          <div id="tactical-hud-panel" className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlayer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-950/60 border border-white/8 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden"
              >
                {/* Glow border overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/10 rounded-full blur-2xl" />

                {/* Player Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-18 h-18 rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg bg-slate-900">
                    <img
                      src={selectedPlayer.photoUrl}
                      alt={selectedPlayer.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top scale-102 hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 bg-brand-red text-white text-[9px] font-black px-1.5 py-0.5 rounded-tr-md font-mono">
                      #{selectedPlayer.number}
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold text-brand-gold tracking-widest uppercase">
                      {selectedPlayer.position} • {selectedPlayer.tacticalRole}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white tracking-tight mt-0.5">
                      {selectedPlayer.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-gray-400">{selectedPlayer.nationality}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span className="text-[11px] text-gray-400">{selectedPlayer.age} Years Old</span>
                    </div>
                  </div>
                </div>

                {/* Key Season Statistics */}
                <div className="grid grid-cols-3 gap-2.5 bg-white/3 border border-white/5 rounded-2xl p-3.5 mb-6 text-center">
                  <div>
                    <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-wider">Matches</span>
                    <span className="block font-display text-lg font-black text-white mt-0.5">{selectedPlayer.matches}</span>
                  </div>
                  {selectedPlayer.position === 'Goalkeeper' ? (
                    <>
                      <div>
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-wider">Clean Sheets</span>
                        <span className="block font-display text-lg font-black text-brand-gold mt-0.5">{selectedPlayer.cleanSheets || 18}</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-wider">Save Ratio</span>
                        <span className="block font-display text-lg font-black text-brand-red mt-0.5">92%</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-wider">Goals</span>
                        <span className="block font-display text-lg font-black text-brand-red mt-0.5">{selectedPlayer.goals}</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-wider">Assists</span>
                        <span className="block font-display text-lg font-black text-brand-gold mt-0.5">{selectedPlayer.assists}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Bio Description */}
                <p className="text-gray-300 text-xs font-sans font-medium leading-relaxed italic mb-6 border-l-2 border-brand-red/30 pl-3">
                  "{selectedPlayer.bio}"
                </p>

                {/* Technical Attributes Grid */}
                <div className="space-y-4">
                  <h4 className="font-mono text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">Technical Skill Matrix</h4>
                  
                  <div className="space-y-3">
                    {/* Speed Attribute */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold font-mono text-gray-300 mb-1">
                        <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-brand-red" /> PACE</span>
                        <span>{selectedPlayer.attributes.speed}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedPlayer.attributes.speed}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className={`h-full rounded-full ${getAttributeColor(selectedPlayer.attributes.speed)}`}
                        />
                      </div>
                    </div>

                    {/* Shooting Attribute */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold font-mono text-gray-300 mb-1">
                        <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-brand-gold" /> SHOOTING</span>
                        <span>{selectedPlayer.attributes.shooting}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedPlayer.attributes.shooting}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className={`h-full rounded-full ${getAttributeColor(selectedPlayer.attributes.shooting)}`}
                        />
                      </div>
                    </div>

                    {/* Passing Attribute */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold font-mono text-gray-300 mb-1">
                        <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-brand-cyan" /> PASSING</span>
                        <span>{selectedPlayer.attributes.passing}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedPlayer.attributes.passing}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className={`h-full rounded-full ${getAttributeColor(selectedPlayer.attributes.passing)}`}
                        />
                      </div>
                    </div>

                    {/* Dribbling Attribute */}
                    <div>
                      <div className="flex justify-between text-[11px] font-bold font-mono text-gray-300 mb-1">
                        <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-purple-400" /> DRIBBLING</span>
                        <span>{selectedPlayer.attributes.dribbling}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedPlayer.attributes.dribbling}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className={`h-full rounded-full ${getAttributeColor(selectedPlayer.attributes.dribbling)}`}
                        />
                      </div>
                    </div>

                    {/* Defending & Physical */}
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div>
                        <div className="flex justify-between text-[10px] font-bold font-mono text-gray-400 mb-1">
                          <span>DEFENDING</span>
                          <span>{selectedPlayer.attributes.defending}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedPlayer.attributes.defending}%` }}
                            className="h-full bg-blue-500 rounded-full"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-bold font-mono text-gray-400 mb-1">
                          <span>PHYSICALITY</span>
                          <span>{selectedPlayer.attributes.physical}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedPlayer.attributes.physical}%` }}
                            className="h-full bg-emerald-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
            
            {/* Direct Squad link helper */}
            <div className="bg-slate-950/20 border border-white/5 rounded-2xl p-4.5 text-center flex items-center justify-between gap-4">
              <span className="font-sans text-[11px] font-semibold text-gray-400 text-left">Want to view full statistical summaries for all 25 first-team squad members?</span>
              <a href="#squad" className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl border border-white/10 transition-all">
                <Eye className="w-3.5 h-3.5" /> SQUAD
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
