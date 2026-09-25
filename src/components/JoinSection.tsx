import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Mail, User, Phone, Crosshair, Loader2 } from 'lucide-react';
import { generateJoinWhatsAppLink } from '../lib/whatsapp';

export default function JoinSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Send the email via our Resend API endpoint
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        console.warn("Backend API response warning. Assuming development mode and proceeding to WhatsApp.");
      }
    } catch (error) {
      console.error("Failed to execute email API request:", error);
    }

    // 2. Generate and open WhatsApp Action
    const waLink = generateJoinWhatsAppLink('+918142001400', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      playerPhone: formData.phone,
      position: formData.position
    });

    // Launch WhatsApp
    window.open(waLink, '_blank', 'noopener,noreferrer');

    // Reset Form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: ''
    });

    setIsLoading(false);
    setIsSubmitted(true);

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="join" className="relative bg-white text-slate-900 pt-24 pb-16 lg:py-0 overflow-hidden font-sans border-t border-slate-100">

      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-[#dc2626]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[10%] w-[40%] h-[40%] bg-[#b91c1c]/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full flex flex-col-reverse lg:flex-row items-stretch min-h-[850px] relative z-10 lg:justify-end">

        {/* Left Column - Image (Anchored on Left) */}
        <div className="hidden sm:block w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-auto relative lg:absolute lg:top-0 lg:left-0 lg:bottom-0 overflow-hidden pointer-events-none fade-in-left">

          {/* Gradients blending image into the background (white-aware) */}
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white via-white/80 to-transparent z-10 hidden lg:block" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/80 to-transparent z-10 lg:hidden" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white via-white/80 to-transparent z-10 lg:hidden" />

          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            src="/shoot.png"
            alt="Player Action Outline"
            className="w-full h-full object-cover object-left sm:object-contain lg:object-contain relative z-0 opacity-95 drop-shadow-lg"
          />
        </div>

        {/* Right Column - Form & Content */}
        <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-20 py-12 lg:py-24 flex flex-col justify-center relative z-20">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-slate-600 uppercase mb-5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dc2626]"></span>
              </span>
              Academy Registrations Open
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-black font-display tracking-tight leading-[1.05] mb-5 text-slate-900">
              Secure Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] via-[#991b1b] to-[#7f1d1d] drop-shadow-sm">Spot.</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md font-sans font-medium">
              Enter the proving grounds. Register your interest for the upcoming trials and elite development programs. Excellence demands action.
            </p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="relative"
          >
            {/* Success Overlay */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 rounded-2xl border border-slate-200"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  className="flex flex-col items-center text-center px-6"
                >
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">Application Logged</h3>
                  <p className="text-slate-600 text-sm max-w-[250px] font-medium">Our recruitment staff will evaluate your profile and contact you soon.</p>
                </motion.div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Names Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 relative group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono pl-1">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#dc2626] transition-colors" />
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] focus:bg-white transition-all font-sans text-sm font-medium shadow-sm"
                      placeholder="Enter first name"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 relative group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono pl-1">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#dc2626] transition-colors" />
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] focus:bg-white transition-all font-sans text-sm font-medium shadow-sm"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 relative group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono pl-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#dc2626] transition-colors" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] focus:bg-white transition-all font-sans text-sm font-medium shadow-sm"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 relative group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono pl-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#dc2626] transition-colors" />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] focus:bg-white transition-all font-sans text-sm font-medium shadow-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Position */}
              <div className="space-y-1.5 relative group">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono pl-1">Primary Role / Position</label>
                <div className="relative">
                  <Crosshair className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#dc2626] transition-colors z-10 pointer-events-none" />
                  <select
                    required
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] focus:bg-white transition-all font-sans text-sm font-medium shadow-sm appearance-none relative z-0 cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                  >
                    <option value="" disabled className="text-slate-400">Select your position...</option>
                    <option value="forward" className="text-slate-900">Forward (ST / LW / RW)</option>
                    <option value="midfielder" className="text-slate-900">Midfield (CAM / CM / CDM)</option>
                    <option value="defender" className="text-slate-900">Defender (CB / LB / RB)</option>
                    <option value="goalkeeper" className="text-slate-900">Goalkeeper (GK)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-75 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold font-sans text-xs uppercase tracking-[0.15em] transition-all shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:-translate-y-0.5 group overflow-hidden relative"
              >
                {/* Shine effect on hover */}
                <span className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>

              <p className="text-center text-[10px] text-slate-500 font-sans mt-3 font-medium">
                By submitting, you agree to our <a href="#privacy" className="underline hover:text-slate-900 transition-colors">Privacy Policy</a> and <a href="#terms" className="underline hover:text-slate-900 transition-colors">Terms of Service</a>.
              </p>

            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}