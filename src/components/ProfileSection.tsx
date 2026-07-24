import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export interface StatItem {
  label: string;
  value: string | number;
}

export interface InfoItem {
  label: string;
  value: string | number;
}

export interface SocialItem {
  platform: 'facebook' | 'instagram' | 'x' | 'youtube' | 'tiktok' | string;
  url: string;
}

export interface ProfileSectionProps {
  firstName?: string;
  lastName?: string;
  position?: string;
  positionIcon?: string;
  preferredFoot?: string;
  footIcon?: string;
  marketValue?: string;
  currency?: string;
  jerseyNumber?: string;
  photoUrl?: string;
  stats?: StatItem[];
  info?: InfoItem[];
  socials?: SocialItem[];
}

const DEFAULT_STATS: StatItem[] = [
  { label: 'APPEARANCES', value: 134 },
  { label: 'GOAL', value: 22 },
  { label: 'ASSIST', value: 56 },
  { label: 'WIN', value: 85 },
];

const DEFAULT_INFO: InfoItem[] = [
  { label: 'BORN', value: '01 - 10 - 1997' },
  { label: 'AGE', value: '32 YEARS' },
  { label: 'NATIONALITY', value: 'Indian' },
  { label: 'HEIGHT', value: '178 Cm' },
  { label: 'DEBUT', value: '2014' },
];

const DEFAULT_SOCIALS: SocialItem[] = [
  { platform: 'facebook', url: '#' },
  { platform: 'instagram', url: '#' },
  { platform: 'x', url: '#' },
  { platform: 'youtube', url: '#' },
  { platform: 'tiktok', url: '#' },
];

export function ProfileSection({
  firstName = 'Ranjeet',
  lastName = 'Thakur',
  position = 'All Rounder',
  positionIcon = '⚽',
  preferredFoot = 'Right-Foot',
  footIcon = '👟',
  marketValue = '∞',
  currency = '',
  jerseyNumber = '24',
  photoUrl = '/ron-casual.png',
  stats = DEFAULT_STATS,
  info = DEFAULT_INFO,
  socials = DEFAULT_SOCIALS,
}: ProfileSectionProps) {
  return (
    <section
      id="profile-section"
      className="relative w-full bg-[#e9e9e9] pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Hidden SVG Definition for Smooth Rounded Steep Diagonal Card ClipPath */}
      <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="diagonalCardClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.04 Q 0,0 0.04,0 L 0.96,0 Q 1,0 1,0.04 L 1,0.95 Q 1,0.98 0.96,0.98 L 0.04,0.76 Q 0,0.76 0,0.72 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Thoughtfully Placed Section Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-6xl mx-auto mb-8 sm:mb-10 text-center flex flex-col items-center"
      >
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-sans">
          The Ron in Ron FC
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-md mt-2">
          Meet the star midfielder driving our midfield engine, playmaking precision, and team spirit.
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-[#E4187E] to-[#A01157] rounded-full mt-3 shadow-xs" />
      </motion.div>

      {/* Floating Card Outer Container with Slimmer & Sleeker Bounds */}
      <div className="relative max-w-6xl mx-auto filter drop-shadow-[0_20px_40px_rgba(180,20,100,0.22)]">
        
        {/* Main Pink Card Container */}
        <div
          className="relative w-full text-white pt-6 sm:pt-8 lg:pt-9 pb-20 sm:pb-24 lg:pb-28 font-sans select-none min-h-[500px] sm:min-h-[550px] lg:min-h-[580px] overflow-hidden border border-white/20 rounded-3xl shadow-2xl"
          style={{
            background: 'radial-gradient(circle at 75% 25%, #E4187E 0%, #900C4C 45%, #4A0627 80%, #200311 100%)',
            clipPath: 'url(#diagonalCardClip)',
            WebkitClipPath: 'url(#diagonalCardClip)',
          }}
        >
          {/* Subtle Dynamic Ambient Lighting & Mesh Glows */}
          <div
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none z-0 opacity-35 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at 65% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 55%)',
            }}
          />
          {/* Subtle Top Inner Edge Highlight Beam */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />

          {/* Jersey Number Watermark Element (Top-left side behind player cutout) */}
          <div
            className="absolute top-[28%] sm:top-[25%] lg:top-[22%] left-[34%] sm:left-[38%] lg:left-[41%] -translate-x-[50%] -translate-y-[50%] z-10 font-display font-black text-white/20 select-none pointer-events-none leading-none tracking-tighter filter drop-shadow-md"
            style={{
              fontSize: 'clamp(140px, 20vw, 320px)',
            }}
          >
            {jerseyNumber}
          </div>

          {/* Main Content Grid */}
          <div className="relative z-30 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Player Name, Badges, Value, Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="lg:col-span-6 flex flex-col items-start pt-1 lg:pt-2"
            >
              {/* Player Name with Display Typography */}
              <h2 className="font-display font-black tracking-tight text-white leading-[0.92] flex flex-col gap-0.5 text-[clamp(34px,4.8vw,60px)] drop-shadow-xs">
                <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">{firstName}</span>
                <span className="bg-gradient-to-r from-white via-white/95 to-pink-100 bg-clip-text text-transparent">{lastName}</span>
              </h2>

              {/* Attribute Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5 mt-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/12 border border-white/20 backdrop-blur-md shadow-xs hover:bg-white/20 transition-all">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px] shadow-inner">
                    {positionIcon}
                  </span>
                  <span className="text-xs font-bold text-white tracking-wide font-sans">
                    {position}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/12 border border-white/20 backdrop-blur-md shadow-xs hover:bg-white/20 transition-all">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px] shadow-inner">
                    {footIcon}
                  </span>
                  <span className="text-xs font-bold text-white tracking-wide font-sans">
                    {preferredFoot}
                  </span>
                </div>
              </div>

              {/* Player Value Pill */}
              <div className="mt-4 inline-flex items-center rounded-xl bg-[#1A0310]/75 backdrop-blur-xl border border-white/20 px-4 py-2.5 shadow-xl max-w-full hover:border-white/30 transition-all">
                {/* Left half */}
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest font-mono">
                    PLAYER VALUE
                  </span>
                  <span className="text-lg sm:text-xl font-black text-[#CBF23A] tracking-tight mt-0.5 font-display drop-shadow-xs">
                    {marketValue} {currency}
                  </span>
                </div>

                {/* Vertical divider */}
                <div className="w-[1px] h-7 bg-white/20 mx-3.5 sm:mx-4 shrink-0" />

                {/* Right half */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] sm:text-[11px] font-medium text-white/85 max-w-[110px] leading-tight font-sans">
                    Is player value higher or lower?
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      aria-label="Predict higher value"
                      className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                    >
                      <ArrowUp className="w-3 h-3 stroke-[2.5]" />
                    </button>
                    <button
                      type="button"
                      aria-label="Predict lower value"
                      className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                    >
                      <ArrowDown className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Icons Pill Card (White Floating Card on Bottom Left) */}
              <div className="mt-5 lg:mt-7 inline-flex items-center gap-2.5 sm:gap-3 bg-white/95 backdrop-blur-md text-slate-900 rounded-xl sm:rounded-2xl px-4 py-2 shadow-xl border border-white/60 hover:bg-white transition-all">
                {socials.map((s) => {
                  const platform = s.platform.toLowerCase();
                  return (
                    <a
                      key={platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${s.platform}`}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer shadow-xs"
                    >
                      {platform === 'facebook' && (
                        <div className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          f
                        </div>
                      )}
                      {platform === 'instagram' && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                          📸
                        </div>
                      )}
                      {platform === 'x' && (
                        <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                          𝕏
                        </div>
                      )}
                      {platform === 'youtube' && (
                        <div className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                          ▶
                        </div>
                      )}
                      {platform === 'tiktok' && (
                        <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                          🎵
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Player Cutout Image Space on Desktop Grid */}
            <div className="lg:col-span-6 hidden lg:block" />
          </div>

          {/* 2X Enlarged Player Cutout Image Container (Clipped by steep sharp diagonal bottom line) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute bottom-0 left-1/2 -translate-x-[50%] translate-y-[28%] sm:translate-y-[30%] lg:translate-y-[32%] z-20 w-[500px] sm:w-[680px] md:w-[780px] lg:w-[860px] xl:w-[940px] pointer-events-none flex justify-center items-end"
          >
            <img
              src={photoUrl || '/ron-casual.png'}
              alt={`${firstName} ${lastName}`}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/ron-profile-casual.png')) {
                  target.src = '/ron-profile-casual.png';
                }
              }}
              className="w-full h-auto object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.75)] max-h-[650px] sm:max-h-[780px] lg:max-h-[920px] transform hover:scale-102 transition-transform duration-500"
            />
          </motion.div>

          {/* Right Column Floating Cards */}
          <div className="relative lg:absolute lg:top-8 lg:right-8 xl:right-12 z-30 max-w-6xl mx-auto px-5 sm:px-8 lg:px-0 mt-6 lg:mt-0 flex flex-col items-center lg:items-end gap-3.5">
            
            {/* STATS CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="w-full sm:w-[320px] md:w-[340px] flex flex-col"
            >
              {/* Folder Tab */}
              <div className="self-start inline-block bg-white/15 backdrop-blur-md border border-b-0 border-white/25 text-white font-mono font-bold text-[10px] uppercase px-3.5 py-1 rounded-t-lg tracking-widest shadow-xs">
                Stats
              </div>

              {/* Main Stats Card Body */}
              <div className="w-full bg-gradient-to-r from-black/45 via-[#3B0723]/75 to-black/55 backdrop-blur-2xl border border-white/20 rounded-tr-xl rounded-b-xl p-3.5 sm:p-4 shadow-xl hover:border-white/30 transition-all">
                <div className="grid grid-cols-4 gap-2 sm:gap-3 items-center">
                  {stats.map((s) => (
                    <div key={s.label} className="flex flex-col items-center text-center">
                      <span className="text-[8.5px] sm:text-[9px] font-bold text-white/70 uppercase tracking-widest font-mono whitespace-nowrap">
                        {s.label}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-[#CBF23A] mt-1 tracking-tight font-display drop-shadow-xs">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* INFO CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="w-full sm:w-[310px] md:w-[330px] bg-black/45 backdrop-blur-2xl border border-white/20 rounded-xl p-3.5 sm:p-4 shadow-xl hover:border-white/30 transition-all"
            >
              <div className="flex flex-col">
                {info.map((item, idx) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between py-1.5 sm:py-2 ${
                      idx !== info.length - 1 ? 'border-b border-white/10' : ''
                    }`}
                  >
                    <span className="text-[9.5px] font-bold text-white/70 uppercase tracking-widest font-mono">
                      {item.label}
                    </span>
                    <span className="text-xs font-semibold text-white font-sans">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
