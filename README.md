# PadiSquare - Multi-Vendor Mini Sites

A multi-vendor marketplace application built as a technical assignment demonstrating multi-tenant routing, vendor-specific branding, and product discovery features.

**Author:** Saheed Kehinde  
**Live Demo:** [padisquare.lovable.app](https://padisquare.lovable.app)

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

## 📝 License

This project was built as a technical assessment and is available for review purposes.

---

**Built with ❤️ by Saheed Kehinde**
