import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { BottomNav } from "@/components/home/BottomNav";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  Heart, 
  ShoppingBag, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Store
} from "lucide-react";
import logoLight from "@/assets/padis-logo-light.svg";
import logoDark from "@/assets/padis-logo-dark.svg";

const Profile = () => {
  const { theme } = useTheme();

  const menuItems = [
    { icon: ShoppingBag, label: "My Orders", badge: "3" },
    { icon: Heart, label: "Wishlist", badge: "12" },
    { icon: Store, label: "Become a Vendor" },
    { icon: Bell, label: "Notifications" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-14 items-center justify-between">
          <img src={theme === "dark" ? logoDark : logoLight} alt="PadiSquare" className="h-7 w-auto" />
          <ThemeToggle />
        </div>
      </header>

      {/* Profile Section */}
      <section className="container py-6">
        {/* Profile Card */}
        <div className="flex flex-col items-center p-6 rounded-2xl bg-card border border-border shadow-card mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">Guest User</h2>
          <p className="text-sm text-muted-foreground mb-4">Sign in to access your account</p>
          <div className="flex gap-3">
            <Button className="btn-glow">Sign In</Button>
            <Button variant="outline">Create Account</Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center gap-3 p-4 rounded-xl mt-4 text-destructive hover:bg-destructive/10 transition-all">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </section>

      <BottomNav activeTab="profile" />
    </div>
  );
};

export default Profile;
