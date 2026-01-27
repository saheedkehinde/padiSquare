// Mock data for Multi-Vendor Mini Sites
// Product images - imported as ES6 modules
import iphoneImg from "@/assets/products/iphone-15-pro.jpg";
import samsungImg from "@/assets/products/samsung-s24.jpg";
import macbookImg from "@/assets/products/macbook-pro.jpg";
import sonyImg from "@/assets/products/sony-headphones.jpg";
import ipadImg from "@/assets/products/ipad-pro.jpg";
import sneakersImg from "@/assets/products/sneakers.jpg";
import toyotaImg from "@/assets/products/toyota-altis.jpg";
import heroImg from "@/assets/hero-vendors.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
  verified: boolean;
}

export interface Vendor {
  slug: string;
  name: string;
  logo: string;
  heroImage: string;
  description: string;
  verified: boolean;
  products: Product[];
}

export const productImages: Record<string, string> = {
  "rt-001": iphoneImg,
  "rt-002": samsungImg,
  "rt-003": macbookImg,
  "rt-004": sonyImg,
  "rt-005": ipadImg,
  "rt-006": iphoneImg,
  "rt-007": sonyImg,
  "rt-008": macbookImg,
  "af-001": sneakersImg,
  "af-002": sneakersImg,
  "af-003": sneakersImg,
  "af-004": sneakersImg,
  "af-005": sneakersImg,
  "af-006": sneakersImg,
  "mh-001": toyotaImg,
  "mh-002": toyotaImg,
  "mh-003": toyotaImg,
  "mh-004": toyotaImg,
};

export const vendorHeroImages: Record<string, string> = {
  "rigaaley-tech": heroImg,
  "anita-fashion": heroImg,
  "motors-hub": heroImg,
};

export const vendors: Vendor[] = [
  {
    slug: "rigaaley-tech",
    name: "Rigaaley Tech",
    logo: "/placeholder.svg",
    heroImage: heroImg,
    description: "Premium electronics and gadgets at unbeatable prices. Verified seller with 5+ years of experience.",
    verified: true,
    products: [
      {
        id: "rt-001",
        name: "iPhone 15 Pro Max",
        price: 1100000,
        image: iphoneImg,
        category: "Electronics",
        createdAt: "2024-01-25",
        verified: true,
      },
      {
        id: "rt-002",
        name: "Samsung Galaxy S24 Ultra",
        price: 980000,
        image: samsungImg,
        category: "Electronics",
        createdAt: "2024-01-24",
        verified: true,
      },
      {
        id: "rt-003",
        name: "MacBook Pro M3",
        price: 2500000,
        image: macbookImg,
        category: "Electronics",
        createdAt: "2024-01-23",
        verified: true,
      },
      {
        id: "rt-004",
        name: "Sony WH-1000XM5 Headphones",
        price: 350000,
        image: sonyImg,
        category: "Electronics",
        createdAt: "2024-01-22",
        verified: true,
      },
      {
        id: "rt-005",
        name: "iPad Pro 12.9",
        price: 850000,
        image: ipadImg,
        category: "Electronics",
        createdAt: "2024-01-21",
        verified: false,
      },
      {
        id: "rt-006",
        name: "Apple Watch Series 9",
        price: 420000,
        image: iphoneImg,
        category: "Electronics",
        createdAt: "2024-01-20",
        verified: true,
      },
      {
        id: "rt-007",
        name: "AirPods Pro 2nd Gen",
        price: 180000,
        image: sonyImg,
        category: "Electronics",
        createdAt: "2024-01-19",
        verified: true,
      },
      {
        id: "rt-008",
        name: "PS5 Console",
        price: 650000,
        image: macbookImg,
        category: "Electronics",
        createdAt: "2024-01-18",
        verified: false,
      },
    ],
  },
  {
    slug: "anita-fashion",
    name: "Anita Fashion House",
    logo: "/placeholder.svg",
    heroImage: heroImg,
    description: "Trendy and affordable fashion for everyone. Quality clothing and accessories.",
    verified: true,
    products: [
      {
        id: "af-001",
        name: "Designer Sneakers",
        price: 150000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-25",
        verified: true,
      },
      {
        id: "af-002",
        name: "Premium Cotton T-Shirt",
        price: 25000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-24",
        verified: true,
      },
      {
        id: "af-003",
        name: "Denim Jeans Classic",
        price: 45000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-23",
        verified: true,
      },
      {
        id: "af-004",
        name: "Leather Handbag",
        price: 85000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-22",
        verified: false,
      },
      {
        id: "af-005",
        name: "Summer Dress",
        price: 35000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-21",
        verified: true,
      },
      {
        id: "af-006",
        name: "Sports Jacket",
        price: 75000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-20",
        verified: true,
      },
    ],
  },
  {
    slug: "motors-hub",
    name: "Motors Hub Nigeria",
    logo: "/placeholder.svg",
    heroImage: heroImg,
    description: "Your trusted source for quality vehicles. New and pre-owned cars available.",
    verified: true,
    products: [
      {
        id: "mh-001",
        name: "Toyota Altis 2021",
        price: 15000000,
        image: toyotaImg,
        category: "Vehicles",
        createdAt: "2024-01-25",
        verified: true,
      },
      {
        id: "mh-002",
        name: "Honda Civic 2023",
        price: 22000000,
        image: toyotaImg,
        category: "Vehicles",
        createdAt: "2024-01-24",
        verified: true,
      },
      {
        id: "mh-003",
        name: "Mercedes Benz C300",
        price: 35000000,
        image: toyotaImg,
        category: "Vehicles",
        createdAt: "2024-01-23",
        verified: false,
      },
      {
        id: "mh-004",
        name: "BMW X5 2022",
        price: 42000000,
        image: toyotaImg,
        category: "Vehicles",
        createdAt: "2024-01-22",
        verified: true,
      },
    ],
  },
];

export const getVendorBySlug = (slug: string): Vendor | undefined => {
  return vendors.find((v) => v.slug === slug);
};

export const getAllVendors = (): Vendor[] => {
  return vendors;
};

export const categories = ["All products", "Electronics", "Clothing", "Vehicles"];

export type SortOption = "price-low" | "price-high" | "recent";

export const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  const sorted = [...products];
  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "recent":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    default:
      return sorted;
  }
};

export const filterProducts = (products: Product[], category: string, search: string): Product[] => {
  return products.filter((product) => {
    const matchesCategory = category === "All products" || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
