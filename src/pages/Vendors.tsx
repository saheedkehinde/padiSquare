import { Link } from "react-router-dom";
import { Star, MapPin, CheckCircle, Store, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { BottomNav } from "@/components/home/BottomNav";
import { getAllVendors, formatPrice } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logoLight from "@/assets/padis-logo-light.svg";
import logoDark from "@/assets/padis-logo-dark.svg";

export default function Vendors() {
  const { theme } = useTheme();
  const vendors = getAllVendors();

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/">
            <img
              src={theme === "dark" ? logoDark : logoLight}
              alt="PadiSquare"
              className="h-7 w-auto"
            />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Page Content */}
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">All Vendors</h1>
          <p className="text-muted-foreground mt-1">
            Browse verified sellers on PadiSquare
          </p>
        </div>

        {/* Vendor Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <Link key={vendor.slug} to={`/site/${vendor.slug}`}>
              <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/50">
                {/* Hero Image */}
                <div className="relative h-32 overflow-hidden bg-muted">
                  <img
                    src={vendor.heroImage}
                    alt={vendor.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  
                  {/* Category Badge */}
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm"
                  >
                    {vendor.category}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  {/* Vendor Info */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                      <Store className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">
                          {vendor.name}
                        </h3>
                        {vendor.verified && (
                          <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                        )}
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-foreground">
                          {vendor.rating}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({vendor.reviewCount} reviews)
                        </span>
                      </div>
                      
                      {/* Location */}
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate">{vendor.location}</span>
                      </div>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Stats */}
                  <div className="mt-4 flex items-center gap-4 pt-3 border-t border-border text-sm">
                    <div>
                      <span className="font-semibold text-foreground">
                        {vendor.products.length}
                      </span>
                      <span className="text-muted-foreground ml-1">products</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">
                        {vendor.totalSales.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground ml-1">sales</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <BottomNav />
    </div>
  );
}
