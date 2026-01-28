import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import splashLogo from "@/assets/padis-logo-splash.svg";
import splashWatermark from "@/assets/splash-watermark.png";

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 2500 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Skip splash on desktop (screen width > 1024px)
    const isDesktop = window.innerWidth > 1024;
    if (isDesktop) {
      setIsVisible(false);
      onComplete();
      return;
    }

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration - 500);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gradient-hero transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <img
          src={splashWatermark}
          alt=""
          className="w-[130%] h-[130%] object-contain opacity-[0.18] dark:opacity-[0.25] animate-watermark-float"
        />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8 animate-fade-in">
        <img src={splashLogo} alt="PadiSquare" className="h-12 md:h-16" />
      </div>

      {/* Tagline with gradient text */}
      <div className="relative z-10 text-center px-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight splash-gradient-text">
          Connect. Trade. Thrive.
        </h2>
        <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-md">
          Your trusted marketplace for verified buyers and sellers
        </p>
      </div>

      {/* Loading indicator */}
      <div className="relative z-10 mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
