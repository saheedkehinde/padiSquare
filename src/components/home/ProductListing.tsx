import { useState, useMemo } from "react";
import { CheckCircle, ArrowRight, Search, X, Loader2, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product, SortOption } from "@/data/mockData";
import { formatPrice, sortProducts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const ITEMS_PER_PAGE = 8;

export function ProductListing({ products, onProductClick }: ProductListingProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Filter products by search
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortOption);
  }, [filteredProducts, sortOption]);

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // Reset to page 1 when search or sort changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 300);
  };

  // Empty state
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-8 glow-card">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No products available</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Check back later for new listings.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 glow-card space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary glow-primary">
            <CheckCircle className="h-4 w-4 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Verified Listings</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/products")}
          className="text-primary hover:text-primary/80 hover:bg-primary/10 gap-1 btn-glow gradient-primary text-primary-foreground"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search products..."
            className="pl-10 pr-10 h-11 bg-card border-primary/30 focus:border-primary focus:ring-primary/20"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Select value={sortOption} onValueChange={(v) => handleSortChange(v as SortOption)}>
          <SelectTrigger className="w-full sm:w-[180px] bg-card border-primary/30">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading products...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        /* Empty Search State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No products found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search to find what you're looking for.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={() => handleSearchChange("")}
          >
            Clear search
          </Button>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((product, index) => {
              const imageSrc = productImages[product.image] || product.image;
              
              return (
                <div
                  key={product.id}
                  onClick={() => onProductClick?.(product)}
                  className="group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-card border-2 border-primary/20 glow-card group-hover:border-primary/40 transition-all duration-300">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.verified && (
                      <div className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-md glow-primary">
                        <CheckCircle className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 space-y-0.5">
                    <div className="flex items-center gap-1">
                      <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      {product.verified && (
                        <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {product.vendor || "Verified Vendor"}
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-primary/30 hover:bg-primary/10"
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page 
                      ? "gradient-primary btn-glow" 
                      : "border-primary/30 hover:bg-primary/10"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-primary/30 hover:bg-primary/10"
              >
                Next
              </Button>
            </div>
          )}

          {/* Results info */}
          <p className="text-center text-xs text-muted-foreground">
            Showing {paginatedProducts.length} of {sortedProducts.length} products
          </p>
        </>
      )}
    </div>
  );
}
