import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { ProductGrid } from "@/components/vendor/ProductGrid";
import { ProductDetailModal } from "@/components/vendor/ProductDetailModal";
import { CategoryTabs } from "@/components/vendor/CategoryTabs";
import { SortSelect } from "@/components/vendor/SortSelect";
import { BottomNav } from "@/components/home/BottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  getAllVendors, 
  categories, 
  filterProducts, 
  sortProducts,
  type Product,
  type SortOption 
} from "@/data/mockData";
import logoLight from "@/assets/padis-logo-light.svg";
import logoDark from "@/assets/padis-logo-dark.svg";

const Products = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const vendors = getAllVendors();
  
  // Get all products from all vendors with vendor name
  const allProducts: Product[] = vendors.flatMap(vendor => 
    vendor.products.map(product => ({
      ...product,
      vendor: vendor.name,
    }))
  );
  
  const [activeCategory, setActiveCategory] = useState("All products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter and sort products
  const filteredProducts = sortProducts(
    filterProducts(allProducts, activeCategory, searchQuery),
    sortOption
  );
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/")}
              className="h-9 w-9"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={theme === "dark" ? logoDark : logoLight} alt="PadiSquare" className="h-7 w-auto" />
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Search and Filters */}
      <section className="container py-6 space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">All Verified Listings</h1>
          <p className="text-sm text-muted-foreground">
            Browse {allProducts.length} verified products from trusted vendors
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-11 pr-4 rounded-xl bg-muted/50 border-border"
          />
        </div>
        
        {/* Category Tabs & Sort */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <SortSelect value={sortOption} onChange={setSortOption} />
        </div>
      </section>

      {/* Product Grid */}
      <section className="container pb-8">
        <ProductGrid 
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
      </section>

      {/* Bottom Navigation (Mobile) */}
      <BottomNav activeTab="search" />
      
      {/* Product Detail Modal */}
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

export default Products;
