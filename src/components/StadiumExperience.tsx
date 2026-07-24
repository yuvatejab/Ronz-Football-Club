import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHANTS } from '../data';
import { FanChant } from '../types';
import { Volume2, VolumeX, Play, Square, Music, MapPin, Users, Sun, ShieldAlert, Sparkles } from 'lucide-react';

export default function StadiumExperience() {
  const [activeChantId, setActiveChantId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyricsLineIndex, setLyricsLineIndex] = useState(0);
  const [audioMuted, setAudioMuted] = useState(false);

  // Audio nodes refs for the Web Audio Synthesizer
  const audioCtxRef = useRef<AudioContext | null>(null);
  const crowdGainRef = useRef<GainNode | null>(null);
  const drumIntervalRef = useRef<number | null>(null);
  const lyricsTimerRef = useRef<number | null>(null);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopSynthesizer();
    };
  }, []);

  const activeChant = CHANTS.find((c) => c.id === activeChantId);
  const lyricsLines = activeChant ? activeChant.lyrics.split('\n') : [];

  // Start the custom Web Audio stadium synthesizer
  const startSynthesizer = (chant: FanChant) => {
    try {
      stopSynthesizer();

      // Create lazy AudioContext
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // 1. Synthesize Ambient Crowd Crowd Roar (White Noise filtered)
      const bufferSize = ctx.sampleRate * 2; // 2 seconds
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Filter noise to sound like a distant deep roaring stadium
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const crowdGain = ctx.createGain();
      crowdGain.gain.setValueAtTime(audioMuted ? 0 : 0.12, ctx.currentTime);
      crowdGainRef.current = crowdGain;

      noiseSource.connect(filter);
      filter.connect(crowdGain);
      crowdGain.connect(ctx.destination);
      noiseSource.start();

      // Ambient surge wave automation
      const surgeDrone = () => {
        if (!crowdGainRef.current || ctx.state === 'closed') return;
        const targetGain = audioMuted ? 0 : Math.random() * 0.08 + 0.08;
        crowdGainRef.current.gain.exponentialRampToValueAtTime(
          targetGain,
          ctx.currentTime + Math.random() * 3 + 1
        );
        setTimeout(surgeDrone, 3500);
      };
      surgeDrone();

      // 2. Synthesize Rhythmic Stadium Bass Drum Beat (Kick Drum)
      const playDrum = () => {
        if (ctx.state === 'closed') return;
        
        // OSC
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        // Deep pitch slide for kick
        osc.frequency.setValueAtTime(130, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.35);
        
        // Volume fast decay
        gain.gain.setValueAtTime(audioMuted ? 0 : 0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      };

      // Set drum interval based on chant BPM tempo
      const beatMs = (60 / chant.tempo) * 1000;
      const drumTimer = window.setInterval(() => {
        playDrum();
      }, beatMs);
      drumIntervalRef.current = drumTimer;

      // Start scrolling lyrics timer
      setLyricsLineIndex(0);
      const lyricsTimer = window.setInterval(() => {
        setLyricsLineIndex((prev) => {
          if (prev >= lyricsLines.length - 1) {
            return 0; // loop lyrics
          }
          return prev + 1;
        });
      }, 4200);
      lyricsTimerRef.current = lyricsTimer;

    } catch (err) {
      console.warn('Web Audio failure (user gesture required/not supported):', err);
    }
  };

  const stopSynthesizer = () => {
    if (drumIntervalRef.current) {
      clearInterval(drumIntervalRef.current);
      drumIntervalRef.current = null;
    }
    if (lyricsTimerRef.current) {
      clearInterval(lyricsTimerRef.current);
      lyricsTimerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleChantPlay = (chant: FanChant) => {
    if (activeChantId === chant.id && isPlaying) {
      stopSynthesizer();
      setActiveChantId(null);
    } else {
      setActiveChantId(chant.id);
      setIsPlaying(true);
      startSynthesizer(chant);
    }
  };

  // Handle Mute trigger dynamically during playing
  const toggleMute = () => {
    const nextMuted = !audioMuted;
    setAudioMuted(nextMuted);
    if (crowdGainRef.current && audioCtxRef.current) {
      crowdGainRef.current.gain.setValueAtTime(nextMuted ? 0 : 0.12, audioCtxRef.current.currentTime);
    }
  };

  return (
    <section id="stadium" className="py-24 bg-gradient-to-b from-[#04060d] to-brand-dark relative overflow-hidden">
      
      {/* Stadium image ambient back light */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div id="stadium-header" className="max-w-3xl mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-4 py-1.5 rounded-full border border-brand-red/20">
            THE OBSIDIAN CAVERN
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-4">
            THE OBSIDIAN ARENA
          </h2>
          <p className="text-gray-400 mt-3 font-sans font-medium text-base">
            62,500 roaring fans standing in the storm. Our fortress is engineered with the advanced <span className="text-brand-red font-bold">StormGrip Hybrid Turf</span> to excel under rainy, high-speed playing conditions.
          </p>
        </div>

        {/* Stadium Info & Chant Board split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Arena Specifications (5 Cols) */}
          <div id="stadium-specs-column" className="lg:col-span-5 space-y-6">
            
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop"
                alt="The Obsidian Arena Matchday"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-brand-red/80 text-white border border-white/10">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-display text-[12px] font-extrabold text-brand-gold tracking-widest leading-none">OBSIDIAN ARENA</span>
                  <span className="block text-[11px] text-gray-300 mt-1">Ronz County, Sector 9</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl">
                <Users className="w-5 h-5 text-brand-red mb-2" />
                <span className="block font-mono text-[9px] text-gray-500 uppercase">CAPACITY</span>
                <span className="block font-display text-xl font-bold text-white mt-1">62,500 Seats</span>
              </div>

              <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl">
                <Sun className="w-5 h-5 text-brand-gold mb-2" />
                <span className="block font-mono text-[9px] text-gray-500 uppercase">TURF SURFACE</span>
                <span className="block font-display text-sm font-bold text-white mt-1.5 leading-tight">StormGrip Hybrid</span>
              </div>
            </div>

            <div className="bg-slate-950/30 border border-white/5 p-5 rounded-2xl flex items-start gap-4">
              <ShieldAlert className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
              <p className="font-sans font-medium text-xs text-gray-400 leading-relaxed">
                The stadium design features highly curved acoustic roofs which concentrate all crowd sound straight down into the field, registering an incredible <span className="text-white font-bold">118 decibels</span> during matchday goals.
              </p>
            </div>

          </div>

          {/* Right Column: Dynamic Fan Chant Audio board (7 Cols) */}
          <div id="chant-synthesizer-column" className="lg:col-span-7 bg-slate-950/50 border border-white/8 p-6 sm:p-8 rounded-3xl backdrop-blur-2xl relative overflow-hidden">
            
            {/* Header with Mute */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                  <Music className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">THE CRIMSON STAND CHANTS</h3>
                  <span className="block font-mono text-[10px] text-gray-400 mt-0.5">SYNTHESIZE THE ARENA ATMOSPHERE</span>
                </div>
              </div>

              {isPlaying && (
                <button
                  id="mute-toggle-button"
                  onClick={toggleMute}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer transition-colors"
                >
                  {audioMuted ? <VolumeX className="w-4 h-4 text-brand-red" /> : <Volume2 className="w-4 h-4 text-brand-gold" />}
                </button>
              )}
            </div>

            {/* List of Chants */}
            <div className="space-y-3 mb-6">
              {CHANTS.map((chant) => {
                const isCurrent = chant.id === activeChantId;
                return (
                  <button
                    id={`play-chant-btn-${chant.id}`}
                    key={chant.id}
                    onClick={() => handleChantPlay(chant)}
                    className={`flex items-center justify-between w-full p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'bg-gradient-to-r from-brand-red/10 to-brand-crimson/5 border-brand-red/35'
                        : 'bg-white/2 border-white/5 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isCurrent ? 'bg-brand-red text-white' : 'bg-white/5 text-gray-400'
                      }`}>
                        {isCurrent ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-gray-400 translate-x-0.5" />}
                      </div>
                      <div>
                        <span className="block font-display text-sm font-bold text-white">{chant.title}</span>
                        <span className="block font-mono text-[9px] text-gray-500 mt-1 uppercase tracking-wider">{chant.mood} • {chant.tempo} BPM</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`block font-mono text-xs font-semibold ${
                        isCurrent ? 'text-brand-gold' : 'text-gray-500'
                      }`}>
                        {isCurrent ? 'LIVE PLAYING' : chant.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Simulated Live Visualizer & Active Scrolling Lyrics Drawer */}
            <AnimatePresence mode="wait">
              {isPlaying && activeChant && (
                <motion.div
                  id="lyrics-visualizer-panel"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-slate-950 border border-brand-red/20 rounded-2xl p-5.5 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-bold text-brand-gold uppercase tracking-widest">
                      ACTIVE CHANT LYRICS
                    </span>
                    
                    {/* Tiny animated visualizer bars */}
                    <div className="flex items-end gap-1 h-3">
                      <div className="w-0.75 bg-brand-red rounded-full animate-bounce h-2" style={{ animationDelay: '0.1s' }} />
                      <div className="w-0.75 bg-brand-gold rounded-full animate-bounce h-3.5" style={{ animationDelay: '0.3s' }} />
                      <div className="w-0.75 bg-brand-red rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.5s' }} />
                      <div className="w-0.75 bg-brand-gold rounded-full animate-bounce h-2.5" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>

                  {/* Scrolling active lyrics highlights */}
                  <div className="text-center space-y-2 py-2">
                    {lyricsLines.map((line, idx) => {
                      const isActive = idx === lyricsLineIndex;
                      return (
                        <p
                          key={idx}
                          className={`font-display font-extrabold transition-all duration-500 text-xs sm:text-sm tracking-wide ${
                            isActive
                              ? 'text-white scale-103 glow-red'
                              : 'text-gray-600 scale-95 opacity-55'
                          }`}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>

                  <span className="block text-center text-[10px] font-mono text-gray-500 mt-4 leading-none">
                    *Audio context generates crowd roars and drum kicks in real-time.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
