import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, Star, Plus } from 'lucide-react';
import { useDataStore, StoreItem } from '../store/dataStore';
import { useCartStore } from '../store/cartStore';

export default function RonzStore() {
  const { store } = useDataStore();
  const { addItem, openCart } = useCartStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track selected size for each item id (id -> size)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const handleSizeSelect = (itemId: string, size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const handleAddToCart = (item: StoreItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const isApparel = item.category === 'Kits' || item.category === 'Training' || item.name.toLowerCase().includes('shirt') || item.name.toLowerCase().includes('jersey');
    const size = isApparel ? (selectedSizes[item.id] || 'M') : 'One Size';

    addItem(item, size as any);
    // Removed openCart() so the panel does not open automatically
  };

  if (!store || store.length === 0) return null;

  return (
    <section id="ronz-store" className="relative bg-white text-slate-900 pt-16 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-8 lg:px-16 overflow-hidden">

      {/* Invisible SVG Filter for Aggressive Torn Paper */}
      <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none">
        <defs>
          {/* Main Tear Filter */}
          <filter id="torn-edges-aggressive" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.06"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="25"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Torn Edge Background Container */}
      <div
        className="absolute top-6 bottom-6 -inset-x-12 z-0"
        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.08))' }}
      >
        {/* Layer 2: Main Painted Red Paper Block */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-br from-[#dc2626] via-[#991b1b] to-[#7f1d1d]"
          style={{ filter: 'url(#torn-edges-aggressive)' }}
        >
          {/* Deep Shadow overlay to emphasize material depth */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Glowing Specular Highlights */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#fecaca]/10 to-transparent mix-blend-overlay" />

          {/* Heavy Paper Texture Grain */}
          <div
            className="absolute inset-0 mix-blend-multiply opacity-25"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-4 pb-2">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 gap-6 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="w-4 h-4 text-white/80" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/70">
                Official Merchandise
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
              The <span className="text-white/90">Ronz Store</span>
            </h2>
          </div>
          <a href="#store" className="inline-flex items-center gap-2 text-xs font-bold font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors group">
            Shop Everything
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#dc2626] transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>

        {/* Store Carousel */}
        <div className="relative group/carousel">

          {/* Scroll Prev Button */}
          <button
            onClick={scrollLeft}
            className="absolute lg:-left-16 sm:-left-12 left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl border border-slate-200 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-[#dc2626] hover:text-white hover:border-[#dc2626] cursor-pointer -translate-x-4 group-hover/carousel:translate-x-0 disabled:hidden"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scroll Next Button */}
          <button
            onClick={scrollRight}
            className="absolute lg:-right-16 sm:-right-12 right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl border border-slate-200 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-[#dc2626] hover:text-white hover:border-[#dc2626] cursor-pointer translate-x-4 group-hover/carousel:translate-x-0 disabled:hidden"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {store.map((item, i) => {
              // Now we use the INR price directly from DB
              const convertedPrice = item.price ? item.price.toLocaleString('en-IN') : '0';
              // Random rating count based on index for variety
              const ratingCount = 124 + (i * 17);

              return (
                <div key={item.id} className="flex-none w-[85%] sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] snap-start">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group flex flex-col w-full cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[3/4] bg-slate-900 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-slate-200">

                      {/* Item Tag (Top Left) */}
                      {item.tag && (
                        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[9px] font-bold font-mono uppercase tracking-[0.2em] rounded border border-white/20 shadow-md">
                          {item.tag}
                        </div>
                      )}

                      {/* Fallback pattern if no image string provided */}
                      {!item.image ? (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                            <ShoppingBag className="w-8 h-8 text-white/20" />
                          </div>
                          <span className="font-display font-black text-2xl text-white/10 tracking-widest uppercase">RONZ</span>
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // prevent infinite loop if fallback fails
                            target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%230f172a" width="100" height="100"/><text fill="%23334155" font-family="sans-serif" font-size="20" dy="7" font-weight="bold" x="50" y="50" text-anchor="middle">RONZ</text></svg>';
                          }}
                          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      )}

                      {/* Overlay controls - Size & Cart */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-4 translate-y-4 group-hover:translate-y-0 ease-out">

                         {/* Size Selector for Apparel */}
                         {(item.category === 'Kits' || item.category === 'Training' || item.name.toLowerCase().includes('shirt') || item.name.toLowerCase().includes('jersey')) && (
                           <div className="flex justify-center gap-2 mb-4" onClick={(e) => e.stopPropagation()}>
                             {['S', 'M', 'L', 'XL'].map(size => (
                               <button
                                 key={size}
                                 onClick={(e) => handleSizeSelect(item.id, size, e)}
                                 className={`w-8 h-8 rounded-full text-xs font-bold font-mono transition-all border ${
                                   (selectedSizes[item.id] || 'M') === size
                                   ? 'bg-white text-slate-900 border-white shadow-md scale-110'
                                   : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                 }`}
                               >
                                 {size}
                               </button>
                             ))}
                           </div>
                         )}

                         <button
                           onClick={(e) => handleAddToCart(item, e)}
                           className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-slate-900 font-bold text-[10px] font-mono uppercase tracking-[0.2em] rounded-xl hover:bg-[#dc2626] hover:text-white shadow-xl transition-colors"
                         >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Add to Cart</span>
                         </button>
                      </div>

                      {/* Subtle darkening mask on hover for button readability */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10 pointer-events-none" />
                    </div>

                    {/* Content Below the Image */}
                    <div className="mt-5 flex flex-col items-start px-2 text-left">
                       {/* Name */}
                       <h3 className="text-lg font-black font-display text-white leading-tight mb-2 truncate w-full">
                          {item.name || 'Official Item'}
                       </h3>

                       {/* Price */}
                       <div className="text-base font-sans font-bold text-white mb-2.5">
                          ₹ {convertedPrice}
                       </div>

                       {/* Rating (Stars + Count) */}
                       <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5 text-amber-400">
                             <Star className="w-3.5 h-3.5 fill-current" />
                             <Star className="w-3.5 h-3.5 fill-current" />
                             <Star className="w-3.5 h-3.5 fill-current" />
                             <Star className="w-3.5 h-3.5 fill-current" />
                             <Star className="w-3.5 h-3.5 fill-current opacity-40" />
                          </div>
                          <span className="text-xs font-sans font-semibold text-white/90 pt-0.5">({ratingCount})</span>
                       </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
