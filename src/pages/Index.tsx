import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { HeroSection } from "@/components/home/HeroSection";
import { AiAssistantSection } from "@/components/home/AiAssistantSection";
import { ProductListing } from "@/components/home/ProductListing";
import { ChatAssistant, ChatAssistantTrigger } from "@/components/home/ChatAssistant";
import { BottomNav } from "@/components/home/BottomNav";
import { ProductDetailModal } from "@/components/vendor/ProductDetailModal";
import { CategoryPills } from "@/components/home/CategoryPills";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllVendors, categories, filterProducts, type Product } from "@/data/mockData";
import logoLight from "@/assets/padis-logo-light.svg";
import logoDark from "@/assets/padis-logo-dark.svg";

const Index = () => {
  const { theme } = useTheme();
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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter products
  const filteredProducts = filterProducts(allProducts, activeCategory, searchQuery);
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-14 items-center justify-between">
          <img src={theme === "dark" ? logoDark : logoLight} alt="PadiSquare" className="h-7 w-auto" />
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* AI Assistant Section */}
      <AiAssistantSection onOpenChat={() => setIsChatOpen(true)} />

      {/* Verified Listings with Category Tabs */}
      <section className="container py-6">
        <Card className="border-primary/20 shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Verified Listings</CardTitle>
            <CategoryPills
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </CardHeader>
          <CardContent>
            <ProductListing 
              products={filteredProducts}
              onProductClick={handleProductClick}
            />
          </CardContent>
        </Card>
      </section>

      {/* Chat Assistant */}
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      {!isChatOpen && <ChatAssistantTrigger onClick={() => setIsChatOpen(true)} />}

      {/* Bottom Navigation (Mobile) */}
      <BottomNav activeTab="home" />
      
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

export default Index;
