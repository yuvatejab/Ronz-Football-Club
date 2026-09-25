import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Ticket, ChevronRight } from 'lucide-react';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
} from './components/ui/resizable-navbar';
import ProfileSection from './components/ProfileSection';
import TrainingPhilosophy from './components/TrainingPhilosophy';
import VideoBanner from './components/VideoBanner';
import OurPrograms from './components/OurPrograms';
import PhotoGallery from './components/PhotoGallery';
import FooterSection from './components/FooterSection';
import UpcomingMatches from './components/UpcomingMatches';
import LatestNews from './components/LatestNews';
import RonzStore from './components/RonzStore';
import JoinSection from './components/JoinSection';
import ShoppingCart from './components/ShoppingCart';
import AdminDashboard from './components/admin/AdminDashboard';
import { useDataStore } from './store/dataStore';
import { useCartStore } from './store/cartStore';
import { TextGenerateEffect } from './components/ui/text-generate-effect';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [route, setRoute] = useState(window.location.hash);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 150]);
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  const [ticketsQuantity, setTicketsQuantity] = useState(1);
  const [selectedStand, setSelectedStand] = useState('The Crimson Curve (Active)');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { showMatches, showNews, showStore } = useDataStore();
  const { cartCount, openCart } = useCartStore();

  // Handle Hash Routing
  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  const handleNavClick = (link: string) => {
    if (link === '#admin') {
      window.location.hash = '#admin';
      return;
    }
    const el = document.getElementById(link);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(link);
    }
    setMobileMenuOpen(false);
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

  if (route === '#admin') {
    return <AdminDashboard />;
  }

  const navItems = [
    { name: 'Overview', link: 'hero' },
    { name: 'Coach', link: 'profile-section' },
    { name: 'Philosophy', link: 'training-philosophy' },
    { name: 'Programs', link: 'our-programs' },
  ];

  if (showStore) navItems.push({ name: 'Store', link: 'ronz-store' });
  navItems.push({ name: 'Join Ronz', link: 'join' });

  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-brand-red selection:text-white">

      {/* Sticky Premium Navbar - Aceternity Resizable Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <div className="flex-1 flex items-center justify-center gap-1 xl:gap-2">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.link)}
                className="relative px-3 xl:px-4 py-2 transition-colors text-[15px] font-semibold group-data-[visible=false]/nav:text-white/90 group-data-[visible=false]/nav:drop-shadow-md group-data-[visible=false]/nav:hover:text-white group-data-[visible=true]/nav:text-slate-600 group-data-[visible=true]/nav:hover:text-slate-900"
              >
                {item.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleNavClick('#admin')}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[15px] font-semibold hover:bg-[#dc2626] transition-colors shadow-sm"
          >
            Admin
          </button>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.link)}
                className="text-base font-semibold text-slate-900 hover:text-[#dc2626] w-full text-left"
              >
                {item.name}
              </button>
            ))}
            <div className="w-full h-[1px] bg-slate-100 my-2"></div>
            <button
                onClick={() => handleNavClick('#admin')}
                className="text-base font-semibold text-slate-900 hover:text-[#dc2626] w-full text-left"
              >
                Admin
            </button>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-white"
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
        </div>

        {/* Hero Central Layout */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center select-none" style={{ perspective: '1200px' }}>

          {/* Central Club Name Title - Premium Metallic Silver with 3D Perspective */}
          <motion.h1
            initial={{ opacity: 0, y: 30, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 8 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-medium text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.08em] sm:tracking-[0.15em] uppercase whitespace-nowrap leading-none"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.1) 75%, rgba(255, 255, 255, 0) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))',
              transformStyle: 'preserve-3d',
              textShadow: 'none',
            }}
          >
            Ronz Football Club
          </motion.h1>

          {/* Subheading - Redesigned Premium */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 sm:mt-8"
          >
            <div className="font-display font-light text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 tracking-[0.08em] leading-relaxed"
              style={{
                letterSpacing: '0.12em',
                fontWeight: 300,
              }}
            >
              <TextGenerateEffect words="Developing Talent Shaping Dreams" />
            </div>
          </motion.div>

          {/* Premium Minimalistic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10"
          >
            {/* Primary Button - Book a Trail */}
            <motion.a
              href="#book-trail"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-3 text-white font-display font-light text-xs sm:text-sm tracking-[0.12em] uppercase overflow-hidden cursor-pointer"
            >
              {/* Premium bottom border */}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40" />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 ease-out" />

              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/3 transition-all duration-500" />

              <span className="relative z-10 font-light tracking-wider">Book a Trial</span>
            </motion.a>

            {/* Secondary Button - Join Ronz */}
            <motion.a
              href="#join-ronz"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-12 py-3 text-white font-display font-light text-xs sm:text-sm tracking-[0.12em] uppercase overflow-hidden cursor-pointer"
            >
              {/* Left accent line that grows */}
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-px bg-white group-hover:w-3 transition-all duration-500 ease-out" />

              {/* Subtle gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:from-transparent group-hover:via-white/2 group-hover:to-transparent transition-all duration-500" />

              <span className="relative z-10 font-light tracking-wider">Join Ronz</span>
              <ChevronRight className="relative z-10 w-3.5 h-3.5 text-white/60 group-hover:text-white/90 group-hover:translate-x-0.5 transition-all duration-300" />
            </motion.a>
          </motion.div>

        </div>

      </section>

      {/* Dynamic Sections */}

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

      {/* Upcoming Fixtures, Latest News & Ronz Store - After "Welcome to Our Stories" */}
      {showMatches && <UpcomingMatches />}
      {showNews && <LatestNews />}
      {showStore && <RonzStore />}

      {/* Join the Academy / Registration Section */}
      <JoinSection />

      {/* Footer Section (Exact Replica of Reference Design with "Ronz FC") */}
      <FooterSection />

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCart}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[45] bg-[#dc2626] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white focus:outline-none focus:ring-4 focus:ring-red-500/30"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              <motion.div
                key={cartCount}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-3 -right-3 bg-slate-950 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#dc2626]"
              >
                {cartCount}
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Shopping Cart Drawer */}
      <ShoppingCart />

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
