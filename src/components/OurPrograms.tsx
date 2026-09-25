import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Target, 
  Zap, 
  Shield, 
  Dumbbell, 
  Brain, 
  Trophy, 
  Video, 
  Users, 
  Footprints, 
  Activity, 
  ChevronRight,
  CheckCircle2,
  Award
} from 'lucide-react';

interface ProgramTab {
  id: string;
  badge: string;
  title: string;
  ageGroup: string;
  subtitle: string;
  points: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const PROGRAM_TABS: ProgramTab[] = [
  {
    id: 'foundation',
    badge: 'STAGE 01',
    title: 'Foundation Phase',
    ageGroup: 'Ages 6–11',
    subtitle: 'Fun, high-energy sessions focused on fundamental motor skills and a love for the ball.',
    points: [
      {
        title: 'Fundamental Ball Mastery',
        description: 'Building multi-directional dribbling agility, balance, bilateral foot coordination, and total confidence on the ball.',
        icon: <Footprints className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      },
      {
        title: 'Small-Sided Matches (3v3 & 5v5)',
        description: 'Maximizing ball touches per minute and fostering early spatial awareness through rapid-play formats.',
        icon: <Users className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      },
      {
        title: 'Positive Passion & Teamwork',
        description: 'Cultivating intrinsic love for the game, sportsmanship, communication, and collaborative spirit.',
        icon: <Sparkles className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      },
      {
        title: 'Interactive Skill Challenges',
        description: 'Engaging weekly target drills, agility obstacle courses, and technical achievement milestones.',
        icon: <Award className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      }
    ]
  },
  {
    id: 'development',
    badge: 'STAGE 02',
    title: 'Development Phase',
    ageGroup: 'Ages 12–15',
    subtitle: 'Introduction to competitive 11-a-side tactics, specialized positional training, and fitness regimes.',
    points: [
      {
        title: '11-a-Side Tactical Systems',
        description: 'Mastering spatial geometry, pressing triggers, building out from the back, and transition phases.',
        icon: <Target className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      },
      {
        title: 'Positional Specialization',
        description: 'Role-specific tactical intelligence for defenders, midfielders, wingers, and strikers.',
        icon: <Zap className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      },
      {
        title: 'Athletic Strength & Conditioning',
        description: 'Specialized fitness regimes, speed endurance, core stability, and movement efficiency.',
        icon: <Dumbbell className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      },
      {
        title: 'Game Intelligence & Decision Making',
        description: 'Developing rapid perception-action loops to make split-second tactical decisions under match intensity.',
        icon: <Activity className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      }
    ]
  },
  {
    id: 'elite',
    badge: 'STAGE 03',
    title: 'Elite Performance',
    ageGroup: 'Ages 16+',
    subtitle: 'Intensive preparation for professional trials and club scouting. High-intensity tactical drills and video analysis.',
    points: [
      {
        title: 'Pro Trials & Scout Showcase',
        description: 'Direct pathway exposure to professional club scouts, trial opportunities, and showcase fixtures.',
        icon: <Trophy className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      },
      {
        title: 'Video Analysis & Performance Metrics',
        description: 'In-depth match film review, opponent scouting reports, GPS tracking, and personalized feedback.',
        icon: <Video className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      },
      {
        title: 'High-Intensity Tactical Drills',
        description: 'Professional match simulation, set-piece routines, counter-pressing, and high-tempo game execution.',
        icon: <Shield className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      },
      {
        title: 'Mental Fortitude & Composure',
        description: 'High-stakes trial preparation, resilience under pressure, unshakeable focus, and leadership skills.',
        icon: <Brain className="w-7 h-7 text-[#dc2626]" strokeWidth={2.2} />
      }
    ]
  }
];

export default function OurPrograms() {
  const [activeTabId, setActiveTabId] = useState<string>('foundation');
  
  // Direct Google Drive image sources with graceful fallback
  const primaryImageSrc = 'https://lh3.googleusercontent.com/d/18uwAtjRAmXqX-9PWY03_4YpzIkF_HDpG';
  const fallbackImageSrc = 'https://drive.google.com/uc?export=view&id=18uwAtjRAmXqX-9PWY03_4YpzIkF_HDpG';
  const [imgUrl, setImgUrl] = useState<string>(primaryImageSrc);

  const activeTab = PROGRAM_TABS.find((t) => t.id === activeTabId) || PROGRAM_TABS[0];

  return (
    <section id="our-programs" className="relative bg-white text-slate-900 pt-16 sm:pt-20 pb-4 sm:pb-6 px-4 sm:px-8 lg:px-16 overflow-hidden">
      
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#dc2626]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-950 tracking-tight"
          >
            Our Programs
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#dc2626] via-slate-800 to-slate-950 rounded-full mx-auto my-4" />
          <p className="text-xs sm:text-sm md:text-base font-medium text-slate-700 font-sans max-w-2xl mx-auto">
            Structured development stages engineered to nurture talent from initial grassroots enthusiasm to high-performance professional competition.
          </p>
        </div>

        {/* Main Grid: Left Content (Tabs & Points) vs Right Visual (3D Floating Image over Hollow Triangle) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Side: Program Tabs and Interactive Points */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">
            
            {/* Top 3 Interactive Program Tabs - Sleek & Minimalist Segmented Pill Navigation */}
            <div className="relative flex flex-col sm:flex-row items-stretch gap-1.5 p-1.5 bg-slate-300/40 backdrop-blur-md rounded-2xl sm:rounded-full border border-slate-300/80 shadow-inner">
              {PROGRAM_TABS.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className="relative flex-1 flex flex-col items-start text-left px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-full transition-colors duration-200 cursor-pointer select-none group"
                  >
                    {/* Sliding Active Pill Background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeProgramTabPill"
                        className="absolute inset-0 bg-slate-950 rounded-xl sm:rounded-full shadow-md shadow-slate-950/20"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between w-full mb-0.5">
                      <span className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase ${isActive ? 'text-[#dc2626]' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {tab.badge}
                      </span>
                      <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/10 text-slate-300' : 'bg-slate-900/5 text-slate-600'}`}>
                        {tab.ageGroup}
                      </span>
                    </div>

                    <h3 className={`relative z-10 text-xs sm:text-sm font-bold font-display tracking-tight transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-900 group-hover:text-slate-950'}`}>
                      {tab.title}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Active Program Details (Rendered directly on page background) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-8 pt-2"
              >
                {/* Active Subtitle / Phase Tagline sitting directly on page background */}
                <div className="relative pl-4 border-l-2 border-[#dc2626] space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#dc2626] uppercase">{activeTab.badge}</span>
                    <span className="text-slate-400 text-[10px]">•</span>
                    <span className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">{activeTab.ageGroup}</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed font-sans italic">
                    "{activeTab.subtitle}"
                  </p>
                </div>

                {/* List of Points directly on page background (Unboxed 3D Icons directly on background) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                  {activeTab.points.map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.06 }}
                      className="group flex items-start space-x-4"
                    >
                      {/* Icon placed directly on page background with 3D shadow and pop effect */}
                      <div className="shrink-0 mt-0.5 filter drop-shadow-[0_8px_16px_rgba(228,24,126,0.35)] drop-shadow-[0_4px_8px_rgba(15,23,42,0.2)] group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300 ease-out">
                        {point.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-950 font-display tracking-tight group-hover:text-[#dc2626] transition-colors duration-200">
                          {point.title}
                        </h4>
                        <p className="text-xs text-slate-700 font-sans leading-relaxed font-medium">
                          {point.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* Right Side: Circular 3D Composite Visual with Unboxed Floating Player */}
          <div className="lg:col-span-5 flex justify-center items-center py-8 sm:py-12">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center select-none">
              
              {/* SLEEK MODERN CIRCULAR RING WITH HOLLOW TRANSPARENT CENTER (Matching #e9e9e9 background) */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] flex items-center justify-center">
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)]" 
                  viewBox="0 0 400 400"
                >
                  <defs>
                    <pattern id="stadiumRingPattern" patternUnits="userSpaceOnUse" width="400" height="400">
                      <image 
                        href="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1000&q=80" 
                        x="0" y="0" width="400" height="400" 
                        preserveAspectRatio="xMidYMid slice" 
                        className="grayscale opacity-50 mix-blend-luminosity"
                      />
                      <rect width="400" height="400" fill="#0f172a" opacity="0.82" />
                    </pattern>
                    <linearGradient id="ringStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#dc2626" />
                      <stop offset="50%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>

                  {/* Outer sleek thin gradient outline */}
                  <circle cx="200" cy="200" r="185" fill="none" stroke="url(#ringStrokeGradient)" strokeWidth="3" />

                  {/* Sleek Doughnut Ring Body with stadium overlay & hollow center (r=125) showing section background */}
                  <path 
                    d="M 200,15 A 185,185 0 1,0 200,385 A 185,185 0 1,0 200,15 Z M 200,75 A 125,125 0 1,1 200,325 A 125,125 0 1,1 200,75 Z" 
                    fill="url(#stadiumRingPattern)" 
                    fillRule="evenodd"
                  />

                  {/* Inner sleek dashed pink ring stroke */}
                  <circle cx="200" cy="200" r="125" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="6 4" opacity="0.85" />
                </svg>

                {/* Inner Center Hole explicitly matching #e9e9e9 section background with subtle inset border */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-white border border-slate-900/10 shadow-inner flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-slate-900/5" />
                </div>
              </div>

              {/* UNBOXED FLOATING PLAYER IMAGE (2X Larger Size, Dramatically Floating over Ring) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto"
              >
                <img 
                  src={imgUrl} 
                  alt="RONZ FC Footballer" 
                  onError={() => {
                    if (imgUrl !== fallbackImageSrc) {
                      setImgUrl(fallbackImageSrc);
                    }
                  }}
                  className="w-[200%] h-[200%] sm:w-[220%] sm:h-[220%] max-w-none object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)] filter contrast-[1.08]"
                />
              </motion.div>

              {/* OVERLAY ACCENT 1: Red Plus Badge (Top-Left, Exactly as Reference) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-2 left-2 sm:top-4 sm:left-4 z-30 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#FF2A3A] shadow-lg shadow-[#FF2A3A]/40 flex items-center justify-center text-white"
              >
                <span className="text-2xl sm:text-3xl font-light leading-none">+</span>
              </motion.div>

              {/* OVERLAY ACCENT 2: Large Stat Metric "8 TRAINED" (Bottom-Left, Exactly as Reference) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-30 flex flex-col items-start font-mono drop-shadow-md text-slate-900"
              >
                <span className="text-4xl sm:text-6xl font-black font-display tracking-tight leading-none text-slate-950">
                  08
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-800 -mt-1 font-sans">
                  PATHWAYS TRAINED
                </span>
              </motion.div>

              {/* OVERLAY ACCENT 3: Vertical Scale Gauge "100% ... 0%" (Right Side, Exactly as Reference) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center space-y-2 text-slate-800 font-mono text-[10px] sm:text-xs font-bold"
              >
                <span>100%</span>
                <div className="w-0.5 h-20 sm:h-28 bg-slate-900/20 relative flex flex-col justify-between items-center py-1">
                  <div className="w-2 h-0.5 bg-slate-900" />
                  <div className="w-1.5 h-0.5 bg-slate-700" />
                  <div className="w-1.5 h-0.5 bg-slate-700" />
                  <div className="w-2 h-0.5 bg-[#dc2626]" />
                  <div className="w-1.5 h-0.5 bg-slate-700" />
                  <div className="w-1.5 h-0.5 bg-slate-700" />
                  <div className="w-2 h-0.5 bg-slate-900" />
                </div>
                <span>0%</span>
              </motion.div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
