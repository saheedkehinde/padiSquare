import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VendorHero } from "@/components/vendor/VendorHero";
import { CategoryTabs } from "@/components/vendor/CategoryTabs";
import { SearchBar } from "@/components/vendor/SearchBar";
import { SortSelect } from "@/components/vendor/SortSelect";
import { ProductGrid } from "@/components/vendor/ProductGrid";
import { ProductDetailModal } from "@/components/vendor/ProductDetailModal";
import { Pagination } from "@/components/vendor/Pagination";
import { LoadingState } from "@/components/vendor/LoadingState";
import { ErrorState } from "@/components/vendor/ErrorState";
import {
  getVendorBySlug,
  filterProducts,
  sortProducts,
  type SortOption,
  type Product,
} from "@/data/mockData";

const ITEMS_PER_PAGE = 8;

export default function VendorSite() {
  const { vendorSlug } = useParams<{ vendorSlug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const vendor = vendorSlug ? getVendorBySlug(vendorSlug) : undefined;

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [vendorSlug]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortOption]);

  // Filter and sort products
  const processedProducts = useMemo(() => {
    if (!vendor) return [];
    const filtered = filterProducts(vendor.products, activeCategory, searchQuery);
    return sortProducts(filtered, sortOption);
  }, [vendor, activeCategory, searchQuery, sortOption]);

  // Pagination
  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [processedProducts, currentPage]);

  // SEO - Update document title and meta tags
  useEffect(() => {
    if (vendor) {
      document.title = `${vendor.name} | PadiSquare`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", vendor.description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = vendor.description;
        document.head.appendChild(meta);
      }
    }
  }, [vendor]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!vendor) {
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen bg-background">
      <VendorHeader vendor={vendor} />
      
      <main>
        <VendorHero vendor={vendor} heroImage={vendor.heroImage} />
        
        {/* Filters Section */}
        <section className="border-b border-border bg-card/50">
          <div className="container py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <CategoryTabs
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search products..."
                />
                <SortSelect value={sortOption} onChange={setSortOption} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Products Section */}
        <section className="py-8">
          <div className="container">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {activeCategory === "All products" ? "All Products" : activeCategory}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({processedProducts.length} items)
                </span>
              </h2>
            </div>
            
            <ProductGrid 
              products={paginatedProducts} 
              onProductClick={handleProductClick}
            />
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </main>
      
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        vendor={vendor}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      
      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 PadiSquare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
