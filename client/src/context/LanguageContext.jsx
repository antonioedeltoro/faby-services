import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n";

const LANG_KEY = "lang";
const DEFAULT_LANG = "es";

function getInitialLang() {
  const stored = localStorage.getItem(LANG_KEY);
  return stored === "en" || stored === "es" ? stored : DEFAULT_LANG;
}

/** Read a dot-path ("nav.services") out of a nested dictionary. */
function getNested(obj, key) {
  return key.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l) => setLangState(l === "en" ? "en" : "es");
  const toggleLang = () => setLangState((l) => (l === "es" ? "en" : "es"));

  /* t("a.b.c") → current language, falling back to Spanish, then the key. */
  const t = (key) => {
    const fromLang = getNested(translations[lang], key);
    if (fromLang != null) return fromLang;
    const fromDefault = getNested(translations[DEFAULT_LANG], key);
    return fromDefault != null ? fromDefault : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
