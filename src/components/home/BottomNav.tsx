import { Home, Search, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab?: string;
}

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Search, label: "Search", id: "search" },
  { icon: MessageSquare, label: "Messages", id: "messages" },
  { icon: User, label: "Profile", id: "profile" },
];

export function BottomNav({ activeTab = "home" }: BottomNavProps) {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="flex items-center justify-around rounded-2xl border border-primary/20 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/90 py-2 px-2 glow-primary">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
              activeTab === item.id
                ? "text-primary-foreground bg-primary-foreground/20"
                : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5",
              activeTab === item.id ? "text-primary-foreground" : "text-primary-foreground/70"
            )} />
            <span className={cn(
              "text-xs font-medium",
              activeTab === item.id ? "text-primary-foreground" : "text-primary-foreground/70"
            )}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
