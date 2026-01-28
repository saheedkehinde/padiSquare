import { Button } from "@/components/ui/button";
import { CategoryPills } from "./CategoryPills";
import heroIllustration from "@/assets/hero-illustration.png";
import heroWatermark from "@/assets/hero-watermark.png";

interface HeroSectionProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HeroSection({
  categories,
  activeCategory,
  onCategoryChange,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden gradient-hero py-6 md:py-10">
      {/* Watermark Background - Desktop */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12] dark:opacity-[0.18] animate-watermark-float hidden md:block"
        style={{
          backgroundImage: `url(${heroWatermark})`,
          backgroundSize: '120%',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Watermark Background - Mobile */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.12] animate-watermark-float md:hidden"
        style={{
          backgroundImage: `url(${heroWatermark})`,
          backgroundSize: '80%',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="container relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-3">
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl leading-tight">
                Tired of trying to find{" "}
                <span className="text-gradient">buyers or sellers</span>{" "}
                around you with little to no results?
              </h1>
              
              <p className="text-sm text-muted-foreground md:text-base leading-relaxed">
                Say hello to <strong className="text-foreground">PadiSquare</strong>, 
                the easiest way to connect with verified and buyers around you. 
                Looking to sell products or find exactly what you need? PadiSquare makes it simple.
              </p>
            </div>
            
            {/* Category Pills */}
            <CategoryPills
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={onCategoryChange}
            />
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" className="gradient-primary h-12 px-6 text-sm font-semibold rounded-xl btn-glow">
                Sign up as a vendor
              </Button>
              <Button 
                size="lg" 
                className="h-12 px-6 text-sm font-semibold rounded-xl gradient-primary btn-glow"
              >
                Create listing
              </Button>
            </div>
            
            {/* Mobile Hero Illustration */}
            <div className="relative flex justify-center lg:hidden animate-fade-in pt-2">
              <div className="relative">
                <img
                  src={heroIllustration}
                  alt="PadiSquare users"
                  className="h-auto w-full max-w-sm object-contain"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 shadow-lg glow-primary">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
                  <span className="text-[10px] font-medium text-primary-foreground">Verified</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right - Hero Illustration (Desktop) */}
          <div className="relative hidden lg:flex justify-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative">
              <img
                src={heroIllustration}
                alt="PadiSquare users"
                className="h-auto w-full max-w-lg object-contain"
              />
              {/* Floating verification badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 shadow-lg glow-primary">
                <div className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
                <span className="text-xs font-medium text-primary-foreground">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
