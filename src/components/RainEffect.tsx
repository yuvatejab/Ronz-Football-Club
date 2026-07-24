import { useEffect, useRef, useState } from 'react';

interface RainEffectProps {
  intensity: 'Mist' | 'Downpour' | 'Storm';
  enableSpotlight?: boolean;
}

export default function RainEffect({ intensity, enableSpotlight = true }: RainEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track container resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Configure rain settings based on intensity
    let dropCount = 180;
    let minSpeed = 8;
    let maxSpeed = 15;
    let minLength = 10;
    let maxLength = 25;
    let angle = -0.05; // falling slightly to the right/left

    if (intensity === 'Mist') {
      dropCount = 80;
      minSpeed = 4;
      maxSpeed = 8;
      minLength = 4;
      maxLength = 12;
      angle = -0.02;
    } else if (intensity === 'Storm') {
      dropCount = 350;
      minSpeed = 15;
      maxSpeed = 26;
      minLength = 18;
      maxLength = 38;
      angle = -0.12; // more wind tilt
    }

    interface Drop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      width: number;
    }

    const drops: Drop[] = [];

    // Initialize drops
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        length: Math.random() * (maxLength - minLength) + minLength,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        opacity: Math.random() * 0.4 + 0.15,
        width: Math.random() * 1.5 + 0.5,
      });
    }

    // Dynamic wind shift
    let windShift = 0;
    let windTime = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw the dramatic floodlight beam matching the uploaded image
      if (enableSpotlight) {
        const lightX = width / 2;
        const lightY = 0;
        
        // Spotlight cone
        const coneGrad = ctx.createRadialGradient(
          lightX, lightY, 10,
          lightX, lightY, height * 0.85
        );
        coneGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        coneGrad.addColorStop(0.15, 'rgba(255, 255, 255, 0.22)');
        coneGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.08)');
        coneGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.015)');
        coneGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = coneGrad;
        ctx.beginPath();
        ctx.moveTo(lightX, lightY);
        // Draw spotlight cone path downwards
        ctx.lineTo(lightX - width * 0.45, height);
        ctx.lineTo(lightX + width * 0.45, height);
        ctx.closePath();
        ctx.fill();

        // Add a brilliant point glow at the very center floodlight source
        const sourceGlow = ctx.createRadialGradient(
          lightX, lightY, 0,
          lightX, lightY, 90
        );
        sourceGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        sourceGlow.addColorStop(0.2, 'rgba(255, 255, 255, 0.7)');
        sourceGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        sourceGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = sourceGlow;
        ctx.beginPath();
        ctx.arc(lightX, lightY, 95, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw falling drops
      windTime += 0.01;
      windShift = Math.sin(windTime) * 0.03; // Gentle swaying wind

      ctx.strokeStyle = 'rgba(224, 231, 255, 0.85)';
      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        // Apply drop falling movement
        const currentAngle = angle + windShift;
        const dx = Math.sin(currentAngle) * d.speed;
        const dy = Math.cos(currentAngle) * d.speed;

        d.x += dx;
        d.y += dy;

        // Reset if offscreen
        if (d.y > height || d.x < -50 || d.x > width + 50) {
          d.y = -d.length;
          d.x = Math.random() * (width + 100) - 50;
          d.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        }

        // Spotlight illumination amplifier
        // If drop is closer to the center top light, increase its visibility
        let dropOpacity = d.opacity;
        if (enableSpotlight) {
          const distanceToLightX = Math.abs(d.x - width / 2);
          // Simple cone intersection check
          const coneWidthAtY = (d.y / height) * (width * 0.45);
          if (distanceToLightX < coneWidthAtY + 60) {
            // Brighten up the drop
            const illuminationFactor = (1 - (distanceToLightX / (coneWidthAtY + 60))) * 1.5;
            // Also drops closer to top are brighter
            const heightFactor = Math.max(0.2, 1 - (d.y / height));
            dropOpacity = Math.min(0.95, d.opacity * (1 + illuminationFactor * heightFactor * 1.8));
          }
        }

        // Draw individual rain drop line
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + Math.sin(currentAngle) * d.length, d.y + Math.cos(currentAngle) * d.length);
        ctx.lineWidth = d.width * (intensity === 'Storm' ? 1.3 : 1.0);
        ctx.strokeStyle = `rgba(235, 243, 255, ${dropOpacity})`;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [intensity, enableSpotlight]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full object-cover" />
      {/* Heavy dark atmospheric vignettes overlays */}
      <div className="absolute inset-0 bg-radial-[circle_at_top_rgba(0,0,0,0)_15%,rgba(3,4,11,0.85)_80%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/10 via-brand-dark/65 to-brand-dark" />
    </div>
  );
}
