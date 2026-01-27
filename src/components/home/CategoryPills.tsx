import { cn } from "@/lib/utils";

interface CategoryPillsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryEmojis: Record<string, string> = {
  "All products": "🏷️",
  "Electronics": "📱",
  "Clothing": "👕",
  "Vehicles": "🚗",
};

export function CategoryPills({ categories, activeCategory, onCategoryChange }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
            activeCategory === category
              ? "gradient-primary text-primary-foreground shadow-md"
              : "bg-card text-foreground hover:bg-accent border border-border"
          )}
        >
          <span className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full text-xs",
            activeCategory === category ? "bg-primary-foreground/20" : "bg-secondary/20"
          )}>
            {categoryEmojis[category] || "•"}
          </span>
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
}
