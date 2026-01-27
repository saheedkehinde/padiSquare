import { CheckCircle, X, MessageCircle, Calendar, Tag } from "lucide-react";
import type { Product, Vendor } from "@/data/mockData";
import { formatPrice } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductDetailModalProps {
  product: Product | null;
  vendor?: Vendor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailModal({
  product,
  vendor,
  open,
  onOpenChange,
}: ProductDetailModalProps) {
  if (!product) return null;

  const handleContactVendor = () => {
    // Simulate contact action - could open WhatsApp, email, or in-app chat
    const message = encodeURIComponent(
      `Hi, I'm interested in "${product.name}" listed at ${formatPrice(product.price)} on your PadiSquare store.`
    );
    // For demo, we'll just show an alert - in production, this would open WhatsApp or email
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Image Gallery Section */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          {product.verified && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 shadow-lg">
              <CheckCircle className="h-4 w-4 text-primary-foreground" />
              <span className="text-xs font-medium text-primary-foreground">
                Verified
              </span>
            </div>
          )}
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm"
          >
            {product.category}
          </Badge>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-6">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold text-foreground leading-tight">
              {product.name}
            </DialogTitle>
            <p className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </DialogHeader>

          {/* Product Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>{product.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Listed {new Date(product.createdAt).toLocaleDateString("en-NG", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}</span>
            </div>
          </div>

          {/* Vendor Info */}
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <span className="text-lg font-bold text-primary">
                  {(vendor?.name || product.vendor || "V").charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {vendor?.name || product.vendor || "Verified Vendor"}
                  </span>
                  {(vendor?.verified || product.verified) && (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Verified Seller on PadiSquare
                </p>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Description</h4>
            <p className="text-muted-foreground leading-relaxed">
              This {product.name} is available from {vendor?.name || product.vendor || "our verified vendor"}. 
              {product.verified 
                ? " This product has been verified for authenticity and quality." 
                : " Contact the vendor for more details about this product."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button
              onClick={handleContactVendor}
              className="flex-1 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Vendor
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              size="lg"
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
