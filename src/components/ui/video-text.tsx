import React, { ElementType, ReactNode, useEffect, useRef, useId } from "react";

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface VideoTextProps {
  /**
   * The video source URL
   */
  src?: string;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Whether to autoplay the video
   */
  autoPlay?: boolean;
  /**
   * Whether to mute the video
   */
  muted?: boolean;
  /**
   * Whether to loop the video
   */
  loop?: boolean;
  /**
   * Whether to preload the video
   */
  preload?: "auto" | "metadata" | "none";
  /**
   * The content to display (will have the video "inside" it)
   */
  children: ReactNode;
  /**
   * Font size for the text mask
   * @default 180
   */
  fontSize?: string | number;
  /**
   * Font weight for the text mask
   * @default "900"
   */
  fontWeight?: string | number;
  /**
   * Text anchor for the text mask
   * @default "middle"
   */
  textAnchor?: string;
  /**
   * Dominant baseline for the text mask
   * @default "central"
   */
  dominantBaseline?: string;
  /**
   * Font family for the text mask
   * @default "sans-serif"
   */
  fontFamily?: string;
  /**
   * The element type to render for the text
   * @default "div"
   */
  as?: ElementType;
}

export function VideoText({
  src = "/video-cont.mp4",
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 180,
  fontWeight = "900",
  textAnchor = "middle",
  dominantBaseline = "central",
  fontFamily = "Space Grotesk, Montserrat, Arial Black, Impact, sans-serif",
  as: Component = "div",
}: VideoTextProps) {
  const rawId = useId();
  const maskId = React.useMemo(() => rawId.replace(/[^a-zA-Z0-9_-]/g, ""), [rawId]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const content = React.Children.toArray(children).join("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('VideoText autoplay handled:', err);
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
    video.addEventListener('loadeddata', playVideo);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      video.removeEventListener('canplay', playVideo);
      video.removeEventListener('loadeddata', playVideo);
    };
  }, [src]);

  return (
    <Component className={cn("relative w-full h-full min-h-[200px] sm:min-h-[280px] md:min-h-[360px] flex items-center justify-center overflow-hidden select-none", className)}>
      {/* Inline SVG with Native SVG Mask and ForeignObject Video Layer */}
      <svg
        className="w-full h-full max-h-[400px] pointer-events-none"
        viewBox="0 0 1000 280"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id={`vmask-ui-${maskId}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="280">
            <rect width="1000" height="280" fill="black" />
            <text
              x="50%"
              y="55%"
              fill="white"
              fontSize={fontSize}
              fontWeight={fontWeight}
              textAnchor={textAnchor}
              dominantBaseline={dominantBaseline}
              fontFamily={fontFamily}
              letterSpacing="-0.03em"
            >
              {content}
            </text>
          </mask>
        </defs>

        {/* Video inside foreignObject masked by native SVG mask */}
        <foreignObject
          x="0"
          y="0"
          width="1000"
          height="280"
          mask={`url(#vmask-ui-${maskId})`}
        >
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#E4187E] via-red-600 to-amber-500 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay={autoPlay}
              muted={muted}
              loop={loop}
              preload={preload}
              playsInline
              className="w-full h-full object-cover min-w-full min-h-full"
            >
              <source src="/video-cont.mp4" type="video/mp4" />
              <source src="/cont-video.mp4" type="video/mp4" />
              {src && <source src={src} type="video/mp4" />}
            </video>
          </div>
        </foreignObject>
      </svg>

      {/* Accessible backup text */}
      <span className="sr-only">{content}</span>
    </Component>
  );
}

export default VideoText;
