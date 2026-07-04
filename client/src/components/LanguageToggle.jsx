import { Languages } from "lucide-react";
import { useLang } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang, t } = useLang();
  // Show the language you'll switch TO.
  const target = lang === "es" ? "EN" : "ES";

  return (
    <button
      type="button"
      className="nav-control lang-toggle"
      onClick={toggleLang}
      aria-label={t("nav.switchToEnglish")}
      title={t("nav.switchToEnglish")}
    >
      <Languages size={18} strokeWidth={2.2} />
      <span className="lang-toggle__code">{target}</span>
    </button>
  );
}
