import { CheckCircle } from "lucide-react";
import type { Vendor } from "@/data/mockData";

interface VendorHeroProps {
  vendor: Vendor;
  heroImage: string;
}

export function VendorHero({ vendor, heroImage }: VendorHeroProps) {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container relative py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 ring-2 ring-primary/20">
                <span className="text-2xl font-bold text-primary">
                  {vendor.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                    {vendor.name}
                  </h1>
                  {vendor.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Official Store</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-lg">
              {vendor.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 shadow-card">
                <span className="text-xl font-bold text-primary">{vendor.products.length}</span>
                <span className="text-sm text-muted-foreground">Products</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 shadow-card">
                <span className="text-xl font-bold text-secondary">
                  {vendor.products.filter(p => p.verified).length}
                </span>
                <span className="text-sm text-muted-foreground">Verified</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-elevated">
              <img
                src={heroImage}
                alt={`${vendor.name} store`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 rounded-xl bg-card p-3 shadow-card">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground">Online Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
