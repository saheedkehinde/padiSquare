import { useState } from "react";
import { X, Search, ArrowDownUp, MapPin, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickActions = [
  { icon: Search, label: "Search products" },
  { icon: ArrowDownUp, label: "Sort products" },
  { icon: MapPin, label: "Deals & offers" },
  { icon: Mail, label: "Sign up as vendor" },
];

export function ChatAssistant({ isOpen, onClose }: ChatAssistantProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-6 md:w-80 animate-fade-in">
      <div className="rounded-2xl bg-card border border-border shadow-elevated overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-primary/5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <MessageCircle className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">PadiSquare Assistant</span>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Chat Content */}
        <div className="p-4 space-y-4">
          {/* Bot Message */}
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-gold">
              <span className="text-lg">🤖</span>
            </div>
            <div className="rounded-2xl rounded-tl-none bg-muted p-3 max-w-[80%]">
              <p className="text-sm text-foreground font-medium">
                Hello! How can I assist you today?
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3 text-left hover:bg-accent hover:border-primary/30 transition-all duration-200"
              >
                <action.icon className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatAssistantTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full gradient-primary shadow-elevated hover:scale-105 transition-transform md:bottom-6"
    >
      <MessageCircle className="h-6 w-6 text-primary-foreground" />
    </button>
  );
}
