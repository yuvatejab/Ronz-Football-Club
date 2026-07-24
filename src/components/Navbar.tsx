import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Compass, BookOpen, User, Layers, ArrowUpRight } from 'lucide-react';
import { MenuToggleIcon } from './MenuToggleIcon';

interface NavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Overview', icon: Compass },
  { id: 'profile-section', label: 'Player Profile', icon: User },
  { id: 'training-philosophy', label: 'Philosophy', icon: BookOpen },
  { id: 'our-programs', label: 'Programs', icon: Layers },
];

export default function Navbar({ activeSection, onNavClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'top-4 sm:top-5 w-[calc(100%-2rem)] max-w-5xl rounded-full bg-slate-950/65 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.75)] py-2.5 px-4 sm:px-8'
            : 'top-0 w-full max-w-7xl py-5 px-6 sm:px-8 lg:px-12 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          
          {/* Logo / Brandmark */}
          <button
            id="logo-button"
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className={`flex items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-white/30 transition-all duration-300 ${
              isScrolled ? 'w-7 h-7' : 'w-8 h-8'
            }`}>
              <Shield className={`text-white/90 stroke-[1.5] transition-all duration-300 ${
                isScrolled ? 'w-4 h-4' : 'w-4.5 h-4.5'
              }`} />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className={`font-sans font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/95 transition-all duration-300 ${
                isScrolled ? 'text-xs' : 'text-xs sm:text-sm'
              }`}>
                RONZ
              </span>
              <span className="font-mono text-[7.5px] sm:text-[8px] tracking-[0.15em] text-gray-500 font-medium mt-0.5">ATHLETIC</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-navigation" className="hidden md:flex items-center gap-6 lg:gap-8 px-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative flex items-center gap-2 pb-2 pt-1 px-0.5 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white/85'
                  }`}
                >
                  <Icon className="relative z-10 w-3.5 h-3.5 stroke-[1.5]" />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Minimalist Action CTA */}
          <div id="nav-cta-container" className="hidden md:flex items-center">
            <button
              id="cta-ticket-button"
              onClick={() => handleItemClick('profile-section')}
              className={`flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-[10px] font-mono tracking-widest border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer ${
                isScrolled ? 'px-3.5 py-1.5' : 'px-4 py-2 rounded-lg'
              }`}
            >
              <span>PROFILE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <MenuToggleIcon open={mobileMenuOpen} className="w-5.5 h-5.5" duration={350} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl flex flex-col pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    id={`mobile-nav-item-${item.id}`}
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-xs font-mono tracking-wider border transition-all duration-300 ${
                      isActive
                        ? 'bg-white/5 border-white/15 text-white'
                        : 'bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[1.5]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <button
                id="mobile-cta-button"
                onClick={() => handleItemClick('profile-section')}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs tracking-wider mt-4 transition-all duration-300"
              >
                <span>VISIT PROFILE</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
