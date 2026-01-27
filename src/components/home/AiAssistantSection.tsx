import { Sparkles, MessageCircle, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AiAssistantSectionProps {
  onOpenChat: () => void;
}

export function AiAssistantSection({ onOpenChat }: AiAssistantSectionProps) {
  return (
    <section className="container py-6">
      <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 glow-card">
        <div className="flex flex-col items-center text-center gap-4 md:flex-row md:text-left md:justify-between">
          {/* Left Content */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary glow-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">PadiSquare AI Assistant</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Get personalized product recommendations, find the best deals, and discover verified vendors with our intelligent assistant.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-background px-3 py-1.5 text-xs font-medium text-foreground">
              <Search className="h-3.5 w-3.5 text-primary" />
              Smart Search
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-background px-3 py-1.5 text-xs font-medium text-foreground">
              <ShoppingBag className="h-3.5 w-3.5 text-primary" />
              Deal Finder
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-background px-3 py-1.5 text-xs font-medium text-foreground">
              <MessageCircle className="h-3.5 w-3.5 text-primary" />
              24/7 Help
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={onOpenChat}
            className="gradient-primary btn-glow text-primary-foreground gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with AI
          </Button>
        </div>
      </div>
    </section>
  );
}
