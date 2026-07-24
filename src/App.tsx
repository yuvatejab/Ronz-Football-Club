import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Ticket, ChevronRight } from 'lucide-react';
import Navbar from './components/Navbar';
import ProfileSection from './components/ProfileSection';
import TrainingPhilosophy from './components/TrainingPhilosophy';
import VideoBanner from './components/VideoBanner';
import OurPrograms from './components/OurPrograms';
import PhotoGallery from './components/PhotoGallery';
import FooterSection from './components/FooterSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 150]);
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  const [ticketsQuantity, setTicketsQuantity] = useState(1);
  const [selectedStand, setSelectedStand] = useState('The Crimson Curve (Active)');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Countdown clock state
  const [countdown, setCountdown] = useState({ days: 4, hours: 8, minutes: 55, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer to highlight navbar links on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['hero', 'profile-section', 'training-philosophy', 'our-programs'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleBookTicketsSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setShowTicketsModal(false);
      setBookingSuccess(false);
      setTicketsQuantity(1);
    }, 2800);
  };

  return (
    <div className="bg-[#e9e9e9] text-slate-900 min-h-screen font-sans selection:bg-brand-red selection:text-white">
      
      {/* Sticky Premium Navbar */}
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-slate-950 text-white"
      >
        {/* Underlay background images of soccer arena with premium lighting */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src="https://lh3.googleusercontent.com/d/1L0J14kNPCMc7_WVu2BdDNGKRHbZh878M"
            alt="Obsidian Arena Pitch"
            referrerPolicy="no-referrer"
            style={{ y: yBg }}
            className="absolute -top-[10%] left-0 w-full h-[120%] object-cover filter brightness-85 contrast-100"
          />
          {/* Subtle gradient overlays to ensure text readability and smooth transition to next sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent via-60% to-slate-950 pointer-events-none" />
        </div>

        {/* Hero Central Layout */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center -translate-y-12 sm:-translate-y-16 select-none">
          
          {/* Central Club Name Title - Minimalist, high-tracking, premium blending */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="font-sans font-medium text-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[0.25em] pl-[0.25em] sm:tracking-[0.4em] sm:pl-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white/50 to-white/5 mix-blend-overlay drop-shadow-sm filter whitespace-nowrap"
          >
            Ronz Football Club
          </motion.h1>


          {/* Premium Minimalistic CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="mt-6"
          >
            <a
              href="#about-section"
              className="group relative inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans font-medium text-[11px] sm:text-xs tracking-wider uppercase border border-white/20 hover:border-white/40 shadow-sm backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden"
            >
              {/* Subtle Inner Shimmer Accent */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="relative z-10">Explore Player Profile</span>
              <ChevronRight className="relative z-10 w-3.5 h-3.5 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
            </a>
          </motion.div>

        </div>

      </section>

      {/* Intro Floating Container bridging Hero and Player Profile */}
      <section id="intro-block" className="relative z-30 max-w-6xl lg:max-w-7xl mx-auto px-4 -mt-12 sm:-mt-16 mb-8 sm:mb-12 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative overflow-hidden bg-transparent backdrop-blur-xl border border-white/30 rounded-2xl sm:rounded-full py-4.5 px-6 sm:py-5 sm:px-10 lg:px-14 shadow-[0_20px_50px_rgba(0,0,0,0.35)] group flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-12"
        >
          {/* Top Glass Edge Highlight Beam */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-10" />

          {/* Left Side: Eyebrow + Authoritative Headline */}
          <div className="space-y-1 text-center lg:text-left shrink-0 relative z-10">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4187E] animate-pulse shadow-[0_0_8px_#E4187E]" />
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#E4187E]">
                EXCELLENCE IN FOOTBALL
              </span>
            </div>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold font-display tracking-tight text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Elevate Your Game <span className="text-white/80">At Ronz FC</span>
            </h2>
          </div>

          {/* Subtle Thin Vertical Separator line for Desktop */}
          <div className="hidden lg:block w-[1px] h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent shrink-0 relative z-10" />

          {/* Right Side: Executive Academy Manifesto Statement */}
          <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed tracking-normal max-w-xl text-center lg:text-left font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] relative z-10">
            Where passion meets professional rigor. Dedicated to developing elite football talent through structured academy pathways and world-class training standards.
          </p>
        </motion.div>
      </section>

      {/* Player Profile Section */}
      <ProfileSection />

      {/* The Academy: Training Philosophy Section (Matching Reference Layout) */}
      <TrainingPhilosophy />

      {/* Full-width Landscape Video Banner */}
      <VideoBanner />

      {/* Our Programs Section */}
      <OurPrograms />

      {/* Interactive Photo Gallery Section */}
      <PhotoGallery />

      {/* Footer Section (Exact Replica of Reference Design with "Ronz FC") */}
      <FooterSection />

      {/* Ticket Booking Drawer Modal (Fully Functional Client-Side) */}
      <AnimatePresence>
        {showTicketsModal && (
          <div id="ticket-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              id="ticket-modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-slate-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              
              {/* Back ambient glows inside modal */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-red/10 rounded-full blur-2xl" />

              <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/5 relative z-10">
                <div>
                  <span className="font-mono text-[9px] font-bold text-brand-gold uppercase tracking-widest">
                    SECURE MATCHDAY PASS
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mt-1">
                    Ronz FC vs. City Rangers
                  </h3>
                </div>
                <button
                  id="close-ticket-modal"
                  onClick={() => setShowTicketsModal(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {!bookingSuccess ? (
                <form id="booking-modal-form" onSubmit={handleBookTicketsSubmit} className="space-y-4 relative z-10">
                  
                  {/* Stand Selector */}
                  <div>
                    <label className="block font-mono text-[9px] text-gray-400 uppercase font-bold mb-2">
                      SELECT ARENA STAND
                    </label>
                    <select
                      id="stand-selector"
                      value={selectedStand}
                      onChange={(e) => setSelectedStand(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white font-sans text-xs font-semibold focus:outline-none focus:border-brand-red transition-all"
                    >
                      <option>The Crimson Curve (Home Fans Stand) - $45</option>
                      <option>Obsidian North (Goal Post Side) - $35</option>
                      <option>The Rain Fortress (Covered Upper deck) - $60</option>
                      <option>VIP Cavern (Lounge with hospitality) - $120</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block font-mono text-[9px] text-gray-400 uppercase font-bold mb-2">
                      QUANTITY
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        id="qty-decrement"
                        type="button"
                        onClick={() => setTicketsQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/10 cursor-pointer"
                      >
                        -
                      </button>
                      <div className="flex-1 bg-slate-900 border border-white/10 rounded-lg text-center font-display font-extrabold text-sm py-2">
                        {ticketsQuantity}
                      </div>
                      <button
                        id="qty-increment"
                        type="button"
                        onClick={() => setTicketsQuantity((q) => Math.min(6, q + 1))}
                        className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/10 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="block font-mono text-[8px] text-gray-500 mt-1.5">*Limit 6 tickets per premium member.</span>
                  </div>

                  {/* Total Calculator */}
                  <div className="bg-white/3 border border-white/5 rounded-2xl p-4 flex items-center justify-between text-sm">
                    <span className="font-sans font-bold text-gray-400">Total Price:</span>
                    <span className="font-display font-black text-lg text-brand-gold">
                      ${ticketsQuantity * (selectedStand.includes('Crimson') ? 45 : selectedStand.includes('North') ? 35 : selectedStand.includes('Fortress') ? 60 : 120)}
                    </span>
                  </div>

                  {/* Submit checkout */}
                  <button
                    id="submit-ticket-purchase"
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-linear-to-r from-brand-red to-brand-crimson text-white font-bold text-xs tracking-wider border border-white/10 hover:shadow-lg hover:shadow-brand-red/15 transition-all cursor-pointer"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>PURCHASE TICKETS</span>
                  </button>

                </form>
              ) : (
                <div id="booking-success-message" className="py-6 flex flex-col items-center text-center relative z-10">
                  <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
                    ✓
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Purchase Confirmed!</h4>
                  <p className="text-gray-400 text-xs mt-1.5 max-w-xs leading-relaxed">
                    {ticketsQuantity} matchday pass{ticketsQuantity > 1 ? 'es' : ''} for <span className="text-white font-bold">{selectedStand.split(' ')[0]}</span> have been successfully secured. E-tickets sent to your profile.
                  </p>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

