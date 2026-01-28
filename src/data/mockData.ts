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
  vendor?: string;
}

export interface Vendor {
  slug: string;
  name: string;
  logo: string;
  heroImage: string;
  description: string;
  verified: boolean;
  products: Product[];
  // New fields
  rating: number;
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
    rating: 4.8,
    reviewCount: 342,
    location: "Lagos, Nigeria",
    joinedDate: "2019-03-15",
    responseTime: "Usually responds within 1 hour",
    totalSales: 1250,
    category: "Electronics",
    contactPhone: "+234 801 234 5678",
    contactEmail: "sales@rigaaleytech.com",
    socialLinks: {
      instagram: "rigaaleytech",
      twitter: "rigaaleytech",
      whatsapp: "+2348012345678",
    },
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
    rating: 4.6,
    reviewCount: 189,
    location: "Abuja, Nigeria",
    joinedDate: "2020-07-22",
    responseTime: "Usually responds within 2 hours",
    totalSales: 856,
    category: "Clothing",
    contactPhone: "+234 802 345 6789",
    contactEmail: "hello@anitafashion.ng",
    socialLinks: {
      instagram: "anitafashionhouse",
      facebook: "anitafashionhouse",
      whatsapp: "+2348023456789",
    },
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
    rating: 4.9,
    reviewCount: 78,
    location: "Lagos, Nigeria",
    joinedDate: "2018-11-05",
    responseTime: "Usually responds within 30 minutes",
    totalSales: 145,
    category: "Vehicles",
    contactPhone: "+234 803 456 7890",
    contactEmail: "info@motorshub.ng",
    socialLinks: {
      instagram: "motorshubnigeria",
      twitter: "motorshubng",
      facebook: "motorshubnigeria",
      whatsapp: "+2348034567890",
    },
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
  {
    slug: "gadget-zone",
    name: "Gadget Zone NG",
    logo: "/placeholder.svg",
    heroImage: heroImg,
    description: "Your one-stop shop for the latest gadgets and tech accessories. Fast delivery nationwide.",
    verified: true,
    rating: 4.5,
    reviewCount: 267,
    location: "Port Harcourt, Nigeria",
    joinedDate: "2021-02-10",
    responseTime: "Usually responds within 3 hours",
    totalSales: 720,
    category: "Electronics",
    contactPhone: "+234 804 567 8901",
    contactEmail: "support@gadgetzone.ng",
    socialLinks: {
      instagram: "gadgetzoneng",
      twitter: "gadgetzoneng",
      whatsapp: "+2348045678901",
    },
    products: [
      {
        id: "gz-001",
        name: "Wireless Charging Pad",
        price: 25000,
        image: sonyImg,
        category: "Electronics",
        createdAt: "2024-01-25",
        verified: true,
      },
      {
        id: "gz-002",
        name: "Bluetooth Speaker",
        price: 45000,
        image: sonyImg,
        category: "Electronics",
        createdAt: "2024-01-24",
        verified: true,
      },
      {
        id: "gz-003",
        name: "Smart Watch Band",
        price: 15000,
        image: iphoneImg,
        category: "Electronics",
        createdAt: "2024-01-23",
        verified: true,
      },
    ],
  },
  {
    slug: "luxury-autos",
    name: "Luxury Autos Lagos",
    logo: "/placeholder.svg",
    heroImage: heroImg,
    description: "Premium luxury vehicles for discerning buyers. Financing options available.",
    verified: true,
    rating: 4.7,
    reviewCount: 45,
    location: "Victoria Island, Lagos",
    joinedDate: "2017-06-20",
    responseTime: "Usually responds within 1 hour",
    totalSales: 89,
    category: "Vehicles",
    contactPhone: "+234 805 678 9012",
    contactEmail: "sales@luxuryautos.ng",
    socialLinks: {
      instagram: "luxuryautoslagos",
      facebook: "luxuryautoslagos",
      whatsapp: "+2348056789012",
    },
    products: [
      {
        id: "la-001",
        name: "Range Rover Sport 2023",
        price: 85000000,
        image: toyotaImg,
        category: "Vehicles",
        createdAt: "2024-01-25",
        verified: true,
      },
      {
        id: "la-002",
        name: "Porsche Cayenne",
        price: 75000000,
        image: toyotaImg,
        category: "Vehicles",
        createdAt: "2024-01-24",
        verified: true,
      },
    ],
  },
  {
    slug: "trendy-threads",
    name: "Trendy Threads",
    logo: "/placeholder.svg",
    heroImage: heroImg,
    description: "Contemporary fashion for the modern Nigerian. From casual to formal, we've got you covered.",
    verified: false,
    rating: 4.3,
    reviewCount: 156,
    location: "Ikeja, Lagos",
    joinedDate: "2022-01-08",
    responseTime: "Usually responds within 4 hours",
    totalSales: 432,
    category: "Clothing",
    contactPhone: "+234 806 789 0123",
    contactEmail: "hello@trendythreads.ng",
    socialLinks: {
      instagram: "trendythreadsng",
      twitter: "trendythreadsng",
    },
    products: [
      {
        id: "tt-001",
        name: "Ankara Print Shirt",
        price: 18000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-25",
        verified: true,
      },
      {
        id: "tt-002",
        name: "Agbada Set",
        price: 95000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-24",
        verified: true,
      },
      {
        id: "tt-003",
        name: "Senator Wear",
        price: 65000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-23",
        verified: false,
      },
    ],
  },
  {
    slug: "phone-palace",
    name: "Phone Palace",
    logo: "/placeholder.svg",
    heroImage: heroImg,
    description: "Authorized dealer for major phone brands. Genuine products with warranty.",
    verified: true,
    rating: 4.4,
    reviewCount: 421,
    location: "Computer Village, Lagos",
    joinedDate: "2016-09-12",
    responseTime: "Usually responds within 30 minutes",
    totalSales: 2340,
    category: "Electronics",
    contactPhone: "+234 807 890 1234",
    contactEmail: "orders@phonepalace.ng",
    socialLinks: {
      instagram: "phonepalaceng",
      whatsapp: "+2348078901234",
    },
    products: [
      {
        id: "pp-001",
        name: "Google Pixel 8 Pro",
        price: 850000,
        image: samsungImg,
        category: "Electronics",
        createdAt: "2024-01-25",
        verified: true,
      },
      {
        id: "pp-002",
        name: "OnePlus 12",
        price: 720000,
        image: samsungImg,
        category: "Electronics",
        createdAt: "2024-01-24",
        verified: true,
      },
      {
        id: "pp-003",
        name: "Xiaomi 14 Ultra",
        price: 680000,
        image: samsungImg,
        category: "Electronics",
        createdAt: "2024-01-23",
        verified: true,
      },
      {
        id: "pp-004",
        name: "Samsung Galaxy Z Fold 5",
        price: 1450000,
        image: samsungImg,
        category: "Electronics",
        createdAt: "2024-01-22",
        verified: true,
      },
    ],
  },
  {
    slug: "urban-kicks",
    name: "Urban Kicks Nigeria",
    logo: "/placeholder.svg",
    heroImage: heroImg,
    description: "Authentic sneakers and streetwear. 100% original products from global brands.",
    verified: true,
    rating: 4.8,
    reviewCount: 312,
    location: "Lekki, Lagos",
    joinedDate: "2020-04-18",
    responseTime: "Usually responds within 2 hours",
    totalSales: 1567,
    category: "Clothing",
    contactPhone: "+234 808 901 2345",
    contactEmail: "info@urbankicks.ng",
    socialLinks: {
      instagram: "urbankicksng",
      twitter: "urbankicksng",
      facebook: "urbankicksnigeria",
      whatsapp: "+2348089012345",
    },
    products: [
      {
        id: "uk-001",
        name: "Nike Air Jordan 1",
        price: 185000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-25",
        verified: true,
      },
      {
        id: "uk-002",
        name: "Adidas Yeezy 350",
        price: 220000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-24",
        verified: true,
      },
      {
        id: "uk-003",
        name: "New Balance 550",
        price: 145000,
        image: sneakersImg,
        category: "Clothing",
        createdAt: "2024-01-23",
        verified: true,
      },
      {
        id: "uk-004",
        name: "Nike Dunk Low",
        price: 165000,
        image: sneakersImg,
        category: "Clothing",
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
