import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCw, Play, Volume2, VolumeX } from 'lucide-react';

export default function VideoBanner() {
  // Rotation state in degrees (0, 90, 180, 270)
  const [rotation, setRotation] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('Autoplay prevented by browser policy:', err);
        setIsPlaying(false);
      }
    };

    playVideo();

    const handleUserInteraction = () => {
      if (video && video.paused) {
        playVideo();
      }
    };

    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    window.addEventListener('scroll', handleUserInteraction, { once: true });
    video.addEventListener('canplay', playVideo);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      video.removeEventListener('canplay', playVideo);
    };
  }, []);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-0">
      {/* Full-width Edge-to-Edge Container without horizontal padding */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[520px] overflow-hidden flex items-center justify-center group"
      >
        {/* Background Video Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center select-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play().catch(() => {});
            }}
            style={{
              transform: `rotate(${rotation}deg) scale(${rotation % 180 !== 0 ? 1.8 : 1.05})`,
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            className="w-full h-full object-cover object-center pointer-events-auto cursor-pointer"
            onClick={togglePlay}
          >
            <source src="/video-cont.mp4" type="video/mp4" />
            <source src="/cont-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Minimal Shadow Text Protection - Ensuring Crisp Video Clarity */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Sleek Metallic & Brand Pink Top & Bottom Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent pointer-events-none" />

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 flex items-center gap-2">
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Video' : 'Mute Video'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium hover:bg-slate-900 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#dc2626]" /> : <Volume2 className="w-3.5 h-3.5 text-[#dc2626]" />}
            <span>{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>
          
          <button
            onClick={handleRotate}
            title="Rotate Video"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium hover:bg-slate-900 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#dc2626]" />
            <span>Rotate ({rotation}°)</span>
          </button>
        </div>

        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute z-20 w-16 h-16 rounded-full bg-[#dc2626]/90 hover:bg-[#dc2626] text-white flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/30 transition-transform transform hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Play Video"
          >
            <Play className="w-8 h-8 fill-white translate-x-0.5" />
          </button>
        )}

        {/* Bold Center Headline Over the Video */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center space-y-3 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] leading-none"
          >
            Win Every Game
          </motion.h2>

          {/* Subtle Brand Pink Accent Glow Line */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-1 bg-[#dc2626] rounded-full shadow-[0_0_20px_#dc2626]"
          />
        </div>

      </motion.div>
    </section>
  );
}



