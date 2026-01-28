import { useEffect, useState } from "react";
import padisLogoDark from "@/assets/padis-logo-dark.svg";
import padisLogoLight from "@/assets/padis-logo-light.svg";
import { useTheme } from "@/hooks/useTheme";

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 2500 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
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

  const logo = theme === "dark" ? padisLogoLight : padisLogoDark;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gradient-hero transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="mb-8 animate-fade-in">
        <img src={logo} alt="PadiSquare" className="h-16 md:h-20" />
      </div>

      {/* Tagline with gradient text */}
      <div className="text-center px-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight splash-gradient-text">
          Connect. Trade. Thrive.
        </h2>
        <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-md">
          Your trusted marketplace for verified buyers and sellers
        </p>
      </div>

      {/* Loading indicator */}
      <div className="mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
