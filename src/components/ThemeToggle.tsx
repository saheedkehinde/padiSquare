import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitchPrimitives.Root
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={cn(
        "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        theme === "dark" ? "bg-primary" : "bg-muted"
      )}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md ring-0 transition-transform duration-200",
          theme === "dark" ? "translate-x-5" : "translate-x-0.5"
        )}
      >
        {theme === "dark" ? (
          <Moon className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
}
