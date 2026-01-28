import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    />
  );
}
