# PadiSquare - Multi-Vendor Mini Sites

A multi-vendor marketplace application built as a technical assignment demonstrating multi-tenant routing, vendor-specific branding, and product discovery features.

**Author:** Saheed Kehinde  
**Live Demo:** [padisquare.vercel.app](https://padisquare.vercel.app)
This Project was previosly built on react 18 + vite and convertion to Next.js  is in the process.
---

## 📋 Project Overview

PadiSquare is a multi-vendor e-commerce platform that allows vendors to have their own branded mini-sites within a unified marketplace. The application simulates the experience of platforms like Shopify or Etsy, where each seller has a unique storefront while customers can browse products across all vendors.

### Key Features

- **Multi-Vendor Mini Sites** (`/site/:vendorSlug`) - Each vendor has a dedicated storefront
- **Vendor Directory** (`/vendors`) - Browse all verified sellers
- **Product Discovery** (`/products`) - Aggregated product catalog with filtering
- **Dark/Light Mode** - Persistent theme switching
- **Responsive Design** - Mobile-first approach with bottom navigation
- **AI Chat Assistant** - Integrated conversational interface

---

## 🛠 Technical Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks-based architecture |
| **Vite** | Fast build tool and development server |
| **TypeScript** | Type safety and improved developer experience |
| **Tailwind CSS** | Utility-first styling with custom design tokens |
| **React Router v6** | Client-side routing with dynamic segments |
| **TanStack Query** | Data fetching, caching, and state management |
| **shadcn/ui** | Accessible, customizable component library |
| **Lucide React** | Consistent iconography |

---

## 🏗 Architecture Decisions

### Why React + Vite Instead of Next.js?

While the original assignment specified Next.js with App Router, I made a deliberate decision to use React with Vite for the following reasons:

1. **Platform Compatibility** - The deployment environment doesn't support Next.js server-side features natively
2. **Simulated SSR Patterns** - I implemented patterns that mirror Next.js conventions:
   - File-based mental model for routes
   - Dynamic route segments (`/site/:vendorSlug`)
   - SEO metadata injection via `useEffect`
3. **Equivalent Functionality** - All functional requirements are met:
   - Dynamic routing ✓
   - Data fetching with caching ✓
   - SEO metadata ✓
   - Loading/error states ✓

### Folder Structure

```
src/
├── assets/              # Static images and SVGs
│   └── products/        # Product images
├── components/
│   ├── home/            # Homepage-specific components
│   ├── ui/              # shadcn/ui base components
│   └── vendor/          # Vendor site components
├── data/
│   └── mockData.ts      # Mock API simulation
├── hooks/               # Custom React hooks
├── integrations/        # External service clients
├── lib/                 # Utility functions
└── pages/               # Route components
```

### Component Architecture

I followed a **composition-based architecture** where:

- **Page components** handle routing, data fetching, and layout
- **Feature components** encapsulate business logic (e.g., `ProductGrid`, `VendorHero`)
- **UI components** are reusable primitives (e.g., `Button`, `Card`, `Badge`)

---

## 🔧 Core Functionality

### 1. Multi-Tenant Routing

The `/site/:vendorSlug` route implements vendor-specific pages:

```tsx
// src/pages/VendorSite.tsx
const { vendorSlug } = useParams<{ vendorSlug: string }>();
const vendor = getVendorBySlug(vendorSlug);
```

Each vendor page includes:
- Dynamic SEO metadata (title, description, Open Graph tags)
- Vendor-specific branding (hero image, logo, colors)
- Filtered product catalog

### 2. Product Search & Filtering

I implemented a client-side search and filter system:

```tsx
// src/data/mockData.ts
export const filterProducts = (products: Product[], category: string, search: string): Product[] => {
  return products.filter((product) => {
    const matchesCategory = category === "All products" || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};
```

**Why client-side?** With mock data, client-side filtering provides instant feedback. In production, this would be replaced with server-side filtering via API calls.

### 3. Sorting Implementation

Three sorting options are available:

| Option | Logic |
|--------|-------|
| Price: Low to High | `products.sort((a, b) => a.price - b.price)` |
| Price: High to Low | `products.sort((a, b) => b.price - a.price)` |
| Most Recent | `products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))` |

```tsx
// src/data/mockData.ts
export const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  const sorted = [...products]; // Immutable sort
  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    // ... other cases
  }
};
```

### 4. Pagination

I implemented a custom pagination system:

```tsx
// src/components/vendor/ProductGrid.tsx
const ITEMS_PER_PAGE = 8;
const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
const paginatedProducts = filteredProducts.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);
```

**Design Decision:** 8 items per page provides a balanced grid (4x2 on desktop, 2x4 on mobile) without excessive scrolling.

### 5. State Management

I used a combination of:

- **React Query** for server-state (data fetching, caching)
- **useState** for UI state (search, filters, pagination)
- **Context API** for global state (theme)

```tsx
// Theme persistence with localStorage
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || "system";
  });
  // ...
};
```

---

## 🎨 Design System

### Color Tokens

I implemented a semantic color system using CSS custom properties:

```css
/* src/index.css */
:root {
  --primary: 142.1 76.2% 36.3%;      /* Brand green */
  --secondary: 142.1 64% 32%;         /* Darker green */
  --background: 0 0% 100%;            /* White */
  --foreground: 240 10% 3.9%;         /* Near black */
  /* ... */
}

.dark {
  --background: 20 14.3% 4.1%;        /* Dark background */
  --foreground: 0 0% 95%;             /* Light text */
  /* ... */
}
```

### Component Variants

Using `class-variance-authority` for type-safe variants:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
        // ...
      },
    },
  }
);
```

---

## 📱 Responsive Design

### Breakpoint Strategy

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, bottom nav |
| Tablet | 640px - 1024px | 2-column grid |
| Desktop | > 1024px | 3-4 column grid, sidebar nav |

### Mobile-First Components

```tsx
// Bottom navigation for mobile
<nav className="fixed bottom-4 left-4 right-4 md:hidden">
  {/* Mobile nav items */}
</nav>

// Desktop header
<header className="hidden md:flex">
  {/* Desktop nav */}
</header>
```

---

## 🔍 SEO Implementation

Since Vite doesn't support server-side rendering, I implemented client-side SEO:

```tsx
// src/pages/VendorSite.tsx
useEffect(() => {
  if (vendor) {
    document.title = `${vendor.name} | PadiSquare`;
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", vendor.description);
    }
    
    // Open Graph tags
    updateMetaTag("og:title", vendor.name);
    updateMetaTag("og:description", vendor.description);
    updateMetaTag("og:image", vendor.heroImage);
  }
}, [vendor]);
```

**Trade-off:** Client-side SEO works for social sharing but isn't optimal for search engine crawlers. In production, I would use:
- Pre-rendering with a service like Prerender.io
- Or migrate to Next.js/Remix for true SSR

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/saheedkehinde/padisquare.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📊 Data Model

### Vendor Interface

```typescript
interface Vendor {
  slug: string;           // URL-friendly identifier
  name: string;
  logo: string;
  heroImage: string;
  description: string;
  verified: boolean;
  products: Product[];
  rating: number;         // 1-5 scale
  reviewCount: number;
  location: string;
  joinedDate: string;
  responseTime: string;
  totalSales: number;
  category: string;
  contactPhone?: string;
  contactEmail?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    whatsapp?: string;
  };
}
```

### Product Interface

```typescript
interface Product {
  id: string;
  name: string;
  price: number;          // In Nigerian Naira
  image: string;
  category: string;
  createdAt: string;      // ISO date string
  verified: boolean;
  vendor?: string;
}
```

---

## 🔮 Future Improvements

If I had more time, I would implement:

1. **Server-Side Rendering** - Migrate to Next.js for better SEO
2. **Real Database** - Replace mock data with database tables
3. **User Authentication** - Vendor login and dashboard
4. **Shopping Cart** - Add-to-cart and checkout flow
5. **Reviews System** - Customer ratings and feedback
6. **Real-time Updates** - Live inventory and pricing
7. **Search Autocomplete** - Debounced search with suggestions

---

## 🔄 Next.js Migration Guide (Detailed)

This section provides a complete, step-by-step guide to migrate from React/Vite to Next.js App Router.

### Prerequisites

```bash
# Create a new Next.js project
npx create-next-app@latest padisquare-nextjs --typescript --tailwind --eslint --app --src-dir

cd padisquare-nextjs
```

---

### Step 1: Project Structure Transformation

**Current React/Vite Structure → Next.js App Router Structure**

```
# BEFORE (React/Vite)                    # AFTER (Next.js)
├── src/                                 ├── src/
│   ├── pages/                           │   ├── app/
│   │   ├── Index.tsx          →         │   │   ├── page.tsx
│   │   ├── Products.tsx       →         │   │   ├── products/page.tsx
│   │   ├── Vendors.tsx        →         │   │   ├── vendors/page.tsx
│   │   ├── Search.tsx         →         │   │   ├── search/page.tsx
│   │   ├── Messages.tsx       →         │   │   ├── messages/page.tsx
│   │   ├── Profile.tsx        →         │   │   ├── profile/page.tsx
│   │   ├── VendorSite.tsx     →         │   │   ├── site/[vendorSlug]/page.tsx
│   │   └── NotFound.tsx       →         │   │   └── not-found.tsx
│   ├── components/                      │   ├── components/
│   ├── hooks/                           │   ├── hooks/
│   ├── data/                            │   ├── lib/
│   ├── assets/                →         │   └── assets/
│   └── index.css              →         │       └── globals.css
├── public/                              ├── public/
└── index.html                 →         └── (handled by Next.js)
```

---

### Step 2: Create the Root Layout

**File to Create:** `src/app/layout.tsx`

This replaces your `App.tsx` and `main.tsx`. It wraps all pages with global providers.

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import your providers
import { ThemeProvider } from "@/hooks/useTheme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/QueryProvider"; // Create this wrapper

const inter = Inter({ subsets: ["latin"] });

// Global metadata (replaces index.html <head>)
export const metadata: Metadata = {
  title: "PadiSquare - Multi-Vendor Marketplace",
  description: "Discover verified vendors and quality products on PadiSquare",
  openGraph: {
    title: "PadiSquare",
    description: "Multi-Vendor Marketplace",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
```

**Also Create:** `src/components/QueryProvider.tsx`

React Query requires a client component wrapper:

```tsx
// src/components/QueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

---

### Step 3: Convert Each Page Component

#### 3a. Home Page

**File to Create:** `src/app/page.tsx`

```tsx
// src/app/page.tsx
import { HomePageClient } from "@/components/home/HomePageClient";

export default function HomePage() {
  return <HomePageClient />;
}
```

**File to Create:** `src/components/home/HomePageClient.tsx`

Move all the interactive logic from `Index.tsx` here with "use client":

```tsx
// src/components/home/HomePageClient.tsx
"use client";

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
import { getAllVendors, categories, filterProducts, type Product } from "@/lib/mockData";
import logoLight from "@/assets/padis-logo-light.svg";
import logoDark from "@/assets/padis-logo-dark.svg";
import Image from "next/image";

export function HomePageClient() {
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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredProducts = filterProducts(allProducts, activeCategory, searchQuery);
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Image 
            src={theme === "dark" ? logoDark : logoLight} 
            alt="PadiSquare" 
            className="h-7 w-auto"
            width={100}
            height={28}
          />
          <ThemeToggle />
        </div>
      </header>

      <HeroSection />
      <AiAssistantSection onOpenChat={() => setIsChatOpen(true)} />
      
      {/* ... rest of your component */}
      
      <BottomNav activeTab="home" />
    </div>
  );
}
```

#### 3b. Vendor Site Page (Dynamic Route)

**File to Create:** `src/app/site/[vendorSlug]/page.tsx`

```tsx
// src/app/site/[vendorSlug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVendorBySlug, getAllVendors } from "@/lib/mockData";
import { VendorSiteClient } from "@/components/vendor/VendorSiteClient";

// TypeScript interface for route params
interface PageProps {
  params: {
    vendorSlug: string;
  };
}

// Generate static params for all vendors (optional, for SSG)
export async function generateStaticParams() {
  const vendors = getAllVendors();
  return vendors.map((vendor) => ({
    vendorSlug: vendor.slug,
  }));
}

// Dynamic SEO metadata based on vendor
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vendor = getVendorBySlug(params.vendorSlug);
  
  if (!vendor) {
    return {
      title: "Vendor Not Found | PadiSquare",
    };
  }
  
  return {
    title: `${vendor.name} | PadiSquare`,
    description: vendor.description,
    openGraph: {
      title: vendor.name,
      description: vendor.description,
      images: [vendor.heroImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: vendor.name,
      description: vendor.description,
      images: [vendor.heroImage],
    },
  };
}

// Server Component (default)
export default function VendorSitePage({ params }: PageProps) {
  const vendor = getVendorBySlug(params.vendorSlug);
  
  // Handle 404
  if (!vendor) {
    notFound();
  }
  
  // Pass vendor data to client component
  return <VendorSiteClient vendor={vendor} />;
}
```

**File to Create:** `src/components/vendor/VendorSiteClient.tsx`

```tsx
// src/components/vendor/VendorSiteClient.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VendorHero } from "@/components/vendor/VendorHero";
import { ProductGrid } from "@/components/vendor/ProductGrid";
import { type Vendor } from "@/lib/mockData";
import logoLight from "@/assets/padis-logo-light.svg";
import logoDark from "@/assets/padis-logo-dark.svg";

interface VendorSiteClientProps {
  vendor: Vendor;
}

export function VendorSiteClient({ vendor }: VendorSiteClientProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All products");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Your existing filtering/sorting logic here...
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Use Next.js Link instead of react-router-dom Link */}
            <Link 
              href="/" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <Image 
              src={theme === "dark" ? logoDark : logoLight} 
              alt="PadiSquare" 
              className="h-7 w-auto"
              width={100}
              height={28}
            />
          </div>
          <ThemeToggle />
        </div>
      </header>

      <VendorHero vendor={vendor} />
      
      {/* Rest of your vendor site content */}
    </div>
  );
}
```

#### 3c. Products Page

**File to Create:** `src/app/products/page.tsx`

```tsx
// src/app/products/page.tsx
import { Metadata } from "next";
import { ProductsPageClient } from "@/components/products/ProductsPageClient";

export const metadata: Metadata = {
  title: "All Products | PadiSquare",
  description: "Browse all verified products from trusted vendors",
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
```

---

### Step 4: Update Navigation (Replace react-router-dom)

#### 4a. Replace Link Component

**Before (React Router):**
```tsx
import { Link } from "react-router-dom";

<Link to="/vendors">View Vendors</Link>
<Link to={`/site/${vendor.slug}`}>Visit Store</Link>
```

**After (Next.js):**
```tsx
import Link from "next/link";

<Link href="/vendors">View Vendors</Link>
<Link href={`/site/${vendor.slug}`}>Visit Store</Link>
```

#### 4b. Replace useNavigate Hook

**Before (React Router):**
```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/products");
navigate(-1); // Go back
```

**After (Next.js):**
```tsx
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/products");
router.back(); // Go back
```

#### 4c. Replace useParams Hook

**Before (React Router):**
```tsx
import { useParams } from "react-router-dom";

const { vendorSlug } = useParams<{ vendorSlug: string }>();
```

**After (Next.js):**
```tsx
// In Server Component - params come from props
export default function Page({ params }: { params: { vendorSlug: string } }) {
  const { vendorSlug } = params;
}

// In Client Component - use the hook
"use client";
import { useParams } from "next/navigation";

const params = useParams();
const vendorSlug = params.vendorSlug as string;
```

#### 4d. Update BottomNav Component

**File to Update:** `src/components/home/BottomNav.tsx`

```tsx
// src/components/home/BottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageCircle, User, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Store, label: "Vendors", href: "/vendors" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
  { icon: User, label: "Profile", href: "/profile" },
];

interface BottomNavProps {
  activeTab?: string;
}

export function BottomNav({ activeTab }: BottomNavProps) {
  const pathname = usePathname();
  
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="flex items-center justify-around rounded-2xl border border-border bg-card/95 backdrop-blur py-2 shadow-lg">
        {navItems.map((item) => {
          // Determine if this nav item is active
          const isActive = activeTab 
            ? activeTab === item.label.toLowerCase()
            : pathname === item.href;
            
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

---

### Step 5: Update ThemeProvider for Next.js

**File to Update:** `src/hooks/useTheme.tsx`

```tsx
// src/hooks/useTheme.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Only run on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("padisquare-theme") as Theme;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("padisquare-theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Prevent flash of incorrect theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

---

### Step 6: Move and Update Static Assets

```bash
# Move assets to public folder
mv src/assets/products/* public/products/
mv src/assets/*.png public/
mv src/assets/*.jpg public/

# Keep SVG logos in src for importing
mkdir -p src/assets
# Keep: padis-logo-light.svg, padis-logo-dark.svg in src/assets
```

**Update Image References:**

```tsx
// Before (Vite)
import heroImage from "@/assets/hero-vendors.jpg";
<img src={heroImage} alt="Hero" />

// After (Next.js) - Option 1: Public folder
<Image src="/hero-vendors.jpg" alt="Hero" width={1200} height={600} />

// After (Next.js) - Option 2: Import (for optimization)
import heroImage from "@/assets/hero-vendors.jpg";
<Image src={heroImage} alt="Hero" />
```

---

### Step 7: Create 404 Page

**File to Create:** `src/app/not-found.tsx`

```tsx
// src/app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
```

---

### Step 8: Update Package Dependencies

```bash
# Remove React Router
npm uninstall react-router-dom @types/react-router-dom

# Next.js already includes:
# - next/link (replaces react-router-dom Link)
# - next/navigation (replaces useNavigate, useParams, useLocation)
# - next/image (optimized images)
```

---

### Migration Checklist

| Task | Status |
|------|--------|
| Create `app/layout.tsx` with providers | ⬜ |
| Create `app/page.tsx` (home) | ⬜ |
| Create `app/products/page.tsx` | ⬜ |
| Create `app/vendors/page.tsx` | ⬜ |
| Create `app/search/page.tsx` | ⬜ |
| Create `app/messages/page.tsx` | ⬜ |
| Create `app/profile/page.tsx` | ⬜ |
| Create `app/site/[vendorSlug]/page.tsx` | ⬜ |
| Create `app/not-found.tsx` | ⬜ |
| Create `app/globals.css` (copy from index.css) | ⬜ |
| Update all `Link` imports to `next/link` | ⬜ |
| Update all `useNavigate` to `useRouter` | ⬜ |
| Update all `useParams` to page props or hook | ⬜ |
| Add `"use client"` to interactive components | ⬜ |
| Move assets to appropriate locations | ⬜ |
| Update image imports to use `next/image` | ⬜ |
| Remove react-router-dom dependency | ⬜ |
| Test all routes | ⬜ |
| Verify SEO metadata generation | ⬜ |

---

## 📝 License

This project was built as a technical assessment and is available for review purposes.

---

**Built with ❤️ by Saheed Kehinde**
