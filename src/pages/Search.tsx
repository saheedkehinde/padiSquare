import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { BottomNav } from "@/components/home/BottomNav";
import { ProductDetailModal } from "@/components/vendor/ProductDetailModal";
import { getAllVendors, categories, filterProducts, type Product } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { ProductListing } from "@/components/home/ProductListing";
import logoLight from "@/assets/padis-logo-light.svg";
import logoDark from "@/assets/padis-logo-dark.svg";

const Search = () => {
  const { theme } = useTheme();
  const vendors = getAllVendors();
  
  const allProducts: Product[] = vendors.flatMap(vendor => 
    vendor.products.map(product => ({
      ...product,
      vendor: vendor.name,
    }))
  );
  
  const [activeCategory, setActiveCategory] = useState("All products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredProducts = filterProducts(allProducts, activeCategory, searchQuery);
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-14 items-center justify-between">
          <img src={theme === "dark" ? logoDark : logoLight} alt="PadiSquare" className="h-7 w-auto" />
          <ThemeToggle />
        </div>
      </header>

      {/* Search Section */}
      <section className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Search Products</h1>
        
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products, vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <ProductListing 
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
      </section>

      <BottomNav activeTab="search" />
      
      <ProductDetailModal
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedProduct(null);
        }}
      />
    </div>
  );
};

export default Search;
