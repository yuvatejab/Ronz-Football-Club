import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, Star, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    
    // Simulate API registering delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1200);
  };

  return (
    <section id="newsletter" className="py-24 bg-gradient-to-t from-brand-dark to-[#04060d] relative overflow-hidden border-t border-white/5">
      
      {/* Background visual grids */}
      <div className="absolute inset-x-0 bottom-0 h-80 bg-linear-to-t from-brand-red/5 to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Decorative badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-8">
          <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
          <span className="font-mono text-[10px] font-bold text-brand-gold tracking-widest uppercase">RONZ MEMBERSHIP CLUB</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
          RISE WITH THE STORM
        </h2>
        
        <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Unlock exclusive ticketing pre-sales, limited-edition winter rain jackets, player interviews, and priority entry waitlist to the Obsidian Arena.
        </p>

        <div className="mt-10 max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                id="newsletter-form"
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative flex flex-col sm:flex-row gap-3 items-center"
              >
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder="Enter your email to join the waitlist..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-950/80 border border-white/10 text-white font-sans text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all"
                  />
                </div>

                <button
                  id="newsletter-submit-button"
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-linear-to-r from-brand-red to-brand-crimson text-white font-bold text-sm tracking-wider cursor-pointer hover:shadow-lg hover:shadow-brand-red/15 transition-all border border-white/10 active:scale-98"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>JOIN WAITLIST</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                id="newsletter-success-panel"
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-emerald-950/30 border border-emerald-500/20 p-6 rounded-2xl flex flex-col items-center text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
                <h4 className="font-display font-bold text-lg text-white">Welcome to the Storm, Champion!</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-sm">
                  We've successfully registered your email to our VIP waitlist. Watch your inbox for matchday pre-sale codes shortly.
                </p>
                <button
                  id="reset-newsletter-button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-[11px] font-mono font-bold text-brand-gold hover:underline cursor-pointer"
                >
                  REGISTER ANOTHER EMAIL
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-6 mt-12 text-[11px] font-mono text-gray-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> secure registration
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          <span>no spam guarantee</span>
        </div>

      </div>
    </section>
  );
}
