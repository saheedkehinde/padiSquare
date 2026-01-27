import { CheckCircle } from "lucide-react";
import type { Product } from "@/data/mockData";
import { formatPrice } from "@/data/mockData";
import { cn } from "@/lib/utils";

// Import product images
import iphone15Pro from "@/assets/products/iphone-15-pro.jpg";
import samsungS24 from "@/assets/products/samsung-s24.jpg";
import macbookPro from "@/assets/products/macbook-pro.jpg";
import sonyHeadphones from "@/assets/products/sony-headphones.jpg";
import sneakers from "@/assets/products/sneakers.jpg";
import toyotaAltis from "@/assets/products/toyota-altis.jpg";
import ipadPro from "@/assets/products/ipad-pro.jpg";

const productImages: Record<string, string> = {
  "iphone-15-pro.jpg": iphone15Pro,
  "samsung-s24.jpg": samsungS24,
  "macbook-pro.jpg": macbookPro,
  "sony-headphones.jpg": sonyHeadphones,
  "sneakers.jpg": sneakers,
  "toyota-altis.jpg": toyotaAltis,
  "ipad-pro.jpg": ipadPro,
};

interface ProductListingProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export function ProductListing({ products, onProductClick }: ProductListingProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Verified Listings</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 4).map((product, index) => {
          const imageSrc = productImages[product.image] || product.image;
          
          return (
            <div
              key={product.id}
              onClick={() => onProductClick?.(product)}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.verified && (
                  <div className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-md">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              
              <div className="mt-2 space-y-0.5">
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {product.name}
                  </h3>
                  {product.verified && (
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {product.vendor || "Verified Vendor"}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
