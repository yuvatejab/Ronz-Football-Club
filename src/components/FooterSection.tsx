import React from 'react';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';
import { VideoText } from './ui/video-text';

export function FooterSection() {
  return (
    <footer className="w-full text-white font-sans relative overflow-hidden bg-[#e9e9e9]">
      {/* Bridging Header with Pitch Grass Background starting at top-[68%] */}
      <div className="relative w-full flex flex-col items-center justify-center select-none pointer-events-none px-4 pt-10 sm:pt-14">
        
        {/* Clear Pitch Grass Background starting at top-[68%] */}
        <div className="absolute inset-x-0 bottom-0 top-[68%] z-0 pointer-events-none overflow-hidden border-t-2 border-white/30 shadow-lg">
          <img
            src="/footer-grass.jpg"
            alt="Footer Stadium Pitch Grass"
            className="w-full h-full object-cover object-top filter brightness-95 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Video Text Mask for "Ronz FC" straddling the boundary */}
        <div className="relative z-10 h-[220px] sm:h-[300px] md:h-[380px] w-full max-w-[1400px] flex justify-center items-center py-2">
          <VideoText
            src="/video-cont.mp4"
            fontSize={185}
            fontWeight={900}
            fontFamily="Space Grotesk, Montserrat, Arial Black, Impact, sans-serif"
            className="w-full h-full"
          >
            Ronz FC
          </VideoText>
        </div>

        {/* Realistic 3D Ground Shadow cast by VideoText onto the grass pitch below */}
        <div className="w-4/5 max-w-[1100px] h-7 bg-black/75 blur-md rounded-[100%] mx-auto -mt-10 relative z-20 pointer-events-none" />

        {/* Subtle Bottom Transition Gradient into main footer */}
        <div className="w-full h-16 -mt-8 bg-gradient-to-b from-transparent via-black/20 to-transparent relative z-10 pointer-events-none" />
      </div>

      {/* Main Footer Links & Info Grid with Clear Pitch Grass Background */}
      <div className="w-full relative z-10 pt-4 pb-16 overflow-hidden">
        {/* Clear Pitch Grass Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/footer-grass.jpg"
            alt="Footer Stadium Pitch Grass"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
          />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          
          {/* Left Column: Address, System Status Pill, Socials */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Address */}
            <div className="text-neutral-200 text-xs sm:text-sm font-sans leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              <p>2261 Market Street #5039</p>
              <p>San Francisco, CA 94114</p>
            </div>

            {/* Status Pill Badge */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-neutral-700/80 text-xs text-neutral-200 font-sans shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-medium text-neutral-100">All systems normal</span>
              </div>
            </div>

            {/* Social Media Circular Buttons */}
            <div>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="#twitter"
                  aria-label="Twitter"
                  className="w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-neutral-700/80 hover:border-neutral-500 hover:bg-black text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#github"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-neutral-700/80 hover:border-neutral-500 hover:bg-black text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-neutral-700/80 hover:border-neutral-500 hover:bg-black text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              {/* Subtle Ground Shadow cast by Social Buttons onto the grass image */}
              <div className="w-36 h-2 bg-black/75 blur-[4px] rounded-[100%] mt-3 pointer-events-none" />
            </div>

          </div>

          {/* Right Columns: 4 Nav Link Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 text-xs sm:text-sm">
            
            {/* Column 1: Documentation */}
            <div className="space-y-3.5">
              <h4 className="font-semibold text-white text-xs sm:text-sm tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                Documentation
              </h4>
              <ul className="space-y-2.5 text-neutral-200 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                <li>
                  <a href="#getting-started" className="hover:text-white transition-colors">
                    Getting Started
                  </a>
                </li>
                <li>
                  <a href="#api-reference" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#integrations" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#examples" className="hover:text-white transition-colors">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="#sdks" className="hover:text-white transition-colors">
                    SDKs
                  </a>
                </li>
              </ul>
              {/* Subtle Ground Shadow cast by Column 1 onto the grass image */}
              <div className="w-full h-2 bg-black/70 blur-[4px] rounded-[100%] mt-3 pointer-events-none" />
            </div>

            {/* Column 2: Resources */}
            <div className="space-y-3.5">
              <h4 className="font-semibold text-white text-xs sm:text-sm tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                Resources
              </h4>
              <ul className="space-y-2.5 text-neutral-200 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                <li>
                  <a href="#changelog" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#status" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#webhooks" className="hover:text-white transition-colors">
                    Webhooks
                  </a>
                </li>
              </ul>
              {/* Subtle Ground Shadow cast by Column 2 onto the grass image */}
              <div className="w-full h-2 bg-black/70 blur-[4px] rounded-[100%] mt-3 pointer-events-none" />
            </div>

            {/* Column 3: Company */}
            <div className="space-y-3.5">
              <h4 className="font-semibold text-white text-xs sm:text-sm tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                Company
              </h4>
              <ul className="space-y-2.5 text-neutral-200 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                <li>
                  <a href="#blog" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#customers" className="hover:text-white transition-colors">
                    Customers
                  </a>
                </li>
                <li>
                  <a href="#brand" className="hover:text-white transition-colors">
                    Brand
                  </a>
                </li>
              </ul>
              {/* Subtle Ground Shadow cast by Column 3 onto the grass image */}
              <div className="w-full h-2 bg-black/70 blur-[4px] rounded-[100%] mt-3 pointer-events-none" />
            </div>

            {/* Column 4: Legal */}
            <div className="space-y-3.5">
              <h4 className="font-semibold text-white text-xs sm:text-sm tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                Legal
              </h4>
              <ul className="space-y-2.5 text-neutral-200 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                <li>
                  <a href="#privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
              {/* Subtle Ground Shadow cast by Column 4 onto the grass image */}
              <div className="w-full h-2 bg-black/70 blur-[4px] rounded-[100%] mt-3 pointer-events-none" />
            </div>

          </div>

        </div>
      </div>
    </div>
  </footer>
);
}

export default FooterSection;
