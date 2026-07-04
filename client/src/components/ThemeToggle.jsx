import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LanguageContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="nav-control theme-toggle"
      onClick={toggleTheme}
      aria-label={t("nav.toggleTheme")}
      title={t("nav.toggleTheme")}
    >
      {isDark ? <Sun size={20} strokeWidth={2.2} /> : <Moon size={20} strokeWidth={2.2} />}
    </button>
  );
}
