import { cn } from "@/lib/utils";
import { categories } from "@/data/mockData";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons: Record<string, string> = {
  "All products": "🏷️",
  "Electronics": "📱",
  "Clothing": "👕",
  "Vehicles": "🚗",
};

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            activeCategory === category
              ? "gradient-primary text-primary-foreground shadow-md"
              : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border"
          )}
        >
          <span>{categoryIcons[category]}</span>
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
}
