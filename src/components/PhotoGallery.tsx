import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Grid } from "lucide-react";

export interface GalleryItem {
  id: number;
  src: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, src: "/gal-1.jpeg" },
  { id: 2, src: "/gal-2.jpeg" },
  { id: 3, src: "/gal-3.jpeg" },
  { id: 4, src: "/gal-4.jpeg" },
  { id: 5, src: "/gal-5.jpeg" },
  { id: 6, src: "/gal-6.jpeg" },
  { id: 7, src: "/gal-7.jpeg" },
  { id: 8, src: "/gal-8.jpeg" },
];

export function PhotoGallery() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpenedFromGrid, setIsOpenedFromGrid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openLightboxFromStack = (index: number) => {
    setIsOpenedFromGrid(false);
    setSelectedIndex(index);
  };

  const openLightboxFromGrid = (index: number) => {
    setIsOpenedFromGrid(true);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    if (!isOpenedFromGrid) {
      setShowModal(false);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  // 5 overlapping preview stack items with subtle offset positions & rotations
  const stackPhotos = [
    { id: 1, src: "/gal-1.jpeg", x: isMobile ? "-100px" : "-300px", rotate: -3, zIndex: 50 },
    { id: 2, src: "/gal-2.jpeg", x: isMobile ? "-50px" : "-150px", rotate: 2, zIndex: 40 },
    { id: 3, src: "/gal-3.jpeg", x: "0px", rotate: -1, zIndex: 30 },
    { id: 4, src: "/gal-4.jpeg", x: isMobile ? "50px" : "150px", rotate: 3, zIndex: 20 },
    { id: 5, src: "/gal-5.jpeg", x: isMobile ? "100px" : "300px", rotate: -2, zIndex: 10 },
  ];

  const photoWidth = isMobile ? 150 : 230;
  const photoHeight = isMobile ? 190 : 290;

  return (
    <section id="gallery-section" className="pt-4 pb-14 my-2 relative overflow-hidden bg-[#e9e9e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E4187E] mb-2">
            A Journey Through Visual Stories
          </p>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-950 tracking-tight">
            Welcome to Our <span className="text-[#E4187E]">Stories</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#E4187E] via-slate-800 to-slate-950 rounded-full mx-auto my-4" />
        </div>

        {/* Subtle Overlapping Photo Card Stack */}
        <div className="relative mb-10 h-[240px] sm:h-[320px] w-full flex items-center justify-center select-none">
          <div className="relative flex justify-center items-center w-full max-w-5xl">
            {stackPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                animate={{
                  x: photo.x,
                  rotate: photo.rotate,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  zIndex: 100,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                style={{
                  position: "absolute",
                  width: `${photoWidth}px`,
                  height: `${photoHeight}px`,
                  zIndex: photo.zIndex,
                }}
                onClick={() => openLightboxFromStack(index)}
                className="cursor-pointer group"
              >
                <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/60 bg-slate-900 transition-shadow duration-300 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
                  <img
                    src={photo.src}
                    alt={`Ronz FC Story ${photo.id}`}
                    className="w-full h-full object-cover filter brightness-95 group-hover:brightness-105 transition-all duration-300 pointer-events-none"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Show More / View All Button */}
        <div className="flex w-full justify-center pt-2">
          <button
            onClick={() => {
              setIsOpenedFromGrid(true);
              setShowModal(true);
            }}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-950 hover:bg-[#E4187E] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer"
          >
            <Grid className="w-4 h-4 text-white/80 group-hover:text-white" />
            <span>Show More ({GALLERY_ITEMS.length} Photos)</span>
          </button>
        </div>

      </div>

      {/* Full Gallery Grid Modal (Opened via Show More button) */}
      <AnimatePresence>
        {showModal && isOpenedFromGrid && selectedIndex === null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/80 sm:bg-white/75 backdrop-blur-3xl overflow-y-auto flex flex-col"
          >
            {/* Minimalist Top Right Floating Close Button */}
            <div className="sticky top-0 z-30 w-full flex justify-end px-6 pt-6 pointer-events-none">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedIndex(null);
                }}
                className="w-11 h-11 rounded-full bg-slate-900/15 hover:bg-slate-900/25 text-slate-800 backdrop-blur-md border border-slate-900/10 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer pointer-events-auto"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Premium White Glassmorphic 8-Image Grid */}
            <div className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {GALLERY_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    onClick={() => openLightboxFromGrid(index)}
                    whileHover={{ scale: 1.04 }}
                    className="group relative h-64 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/90 bg-white/40 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  >
                    <img
                      src={item.src}
                      alt={`Ronz FC Photo ${item.id}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/5 group-hover:bg-transparent transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standalone Individual Lightbox Overlay (White Glassmorphic Finish) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-50 bg-white/80 sm:bg-white/75 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-8 select-none"
            onClick={closeLightbox}
          >
            {/* Top Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-slate-900/15 hover:bg-slate-900/25 text-slate-800 backdrop-blur-md border border-slate-900/10 flex items-center justify-center cursor-pointer transition-all shadow-md active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Prev Arrow */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-slate-900/15 hover:bg-slate-900/25 text-slate-800 backdrop-blur-md border border-slate-900/10 flex items-center justify-center cursor-pointer transition-all shadow-md active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-slate-900/15 hover:bg-slate-900/25 text-slate-800 backdrop-blur-md border border-slate-900/10 flex items-center justify-center cursor-pointer transition-all shadow-md active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Enlarged Image */}
            <div
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_ITEMS[selectedIndex].src}
                alt={`Ronz FC Photo ${selectedIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-white/90 bg-white/40"
              />

              <div className="mt-3.5 text-center">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#E4187E] uppercase tracking-widest bg-slate-900/10 px-3.5 py-1 rounded-full border border-slate-900/10">
                  PHOTO {selectedIndex + 1} OF {GALLERY_ITEMS.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default PhotoGallery;
