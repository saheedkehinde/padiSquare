import { CheckCircle } from "lucide-react";
import type { Product } from "@/data/mockData";
import { formatPrice } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card 
      className="group overflow-hidden border-border bg-card shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.verified && (
          <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-md">
            <CheckCircle className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className="inline-block rounded-full bg-secondary/90 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {product.category}
          </span>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
