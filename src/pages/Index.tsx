import { Link } from "react-router-dom";
import { getAllVendors } from "@/data/mockData";
import { CheckCircle, ArrowRight, Store, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoLight from "@/assets/padis-logo-light.svg";
import logoDark from "@/assets/padis-logo-dark.svg";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const vendors = getAllVendors();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-16 items-center justify-between">
          <img src={theme === "dark" ? logoDark : logoLight} alt="PadiSquare" className="h-8 w-auto" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button className="gradient-primary">Sign up as a vendor</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              Verified Vendor Platform
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Tired of trying to find{" "}
              <span className="text-gradient">buyers or sellers</span>{" "}
              around you?
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Say hello to <strong className="text-foreground">PadiSquare</strong>, 
              the easiest way to connect with verified vendors and buyers around you. 
              Looking to sell products or find what you need? PadiSquare makes it simple.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" className="gradient-primary h-12 px-8 text-base">
                Sign up as a vendor
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Create listing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Store,
                title: "Multi-Vendor Stores",
                description: "Each vendor gets their own customizable storefront",
              },
              {
                icon: ShieldCheck,
                title: "Verified Sellers",
                description: "Shop with confidence from verified vendors",
              },
              {
                icon: TrendingUp,
                title: "Growing Network",
                description: "Join thousands of buyers and sellers",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg gradient-primary">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendors Section */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Verified Vendors
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore stores from our trusted vendor network
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor, index) => (
              <Link
                key={vendor.slug}
                to={`/site/${vendor.slug}`}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full overflow-hidden border-border bg-card shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                  <div className="aspect-[3/2] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card shadow-lg">
                        <span className="text-4xl font-bold text-primary">
                          {vendor.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {vendor.name}
                          </h3>
                          {vendor.verified && (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {vendor.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        {vendor.products.length} products
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Visit store
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <img src={theme === "dark" ? logoDark : logoLight} alt="PadiSquare" className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground">
              © 2024 PadiSquare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
