import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import type { Vendor } from "@/data/mockData";
import logoLight from "@/assets/padis-logo-light.svg";

interface VendorHeaderProps {
  vendor: Vendor;
}

export function VendorHeader({ vendor }: VendorHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoLight} alt="PadiSquare" className="h-8 w-auto" />
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">{vendor.name}</span>
            {vendor.verified && (
              <CheckCircle className="h-4 w-4 text-primary" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
