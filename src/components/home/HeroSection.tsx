import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryPills } from "./CategoryPills";
import heroIllustration from "@/assets/hero-illustration.png";

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
  searchQuery,
  onSearchChange,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden gradient-hero py-6 md:py-10">
      <div className="container">
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
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Sign up as a vendor"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" className="gradient-primary h-12 px-6 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow">
                Sign up as a vendor
              </Button>
              <Button 
                size="lg" 
                className="h-12 px-6 text-sm font-semibold rounded-xl bg-foreground text-background hover:bg-foreground/90"
              >
                Create listing
              </Button>
            </div>
          </div>
          
          {/* Right - Hero Illustration */}
          <div className="relative hidden lg:flex justify-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative">
              <img
                src={heroIllustration}
                alt="PadiSquare users"
                className="h-auto w-full max-w-md object-contain"
              />
              {/* Floating verification badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 shadow-lg">
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
