import React from "react";
import enJson from "./locales/en/common.json";
import ptJson from "./locales/pt/common.json";

/*
  Lightweight i18n provider:
  - Loads translations from JSON files
  - Detects browser language on first visit
  - Persists selection in localStorage
*/
type Lang = "pt" | "en";

const translations: Record<Lang, Record<string, string>> = {
  en: enJson,
  pt: ptJson,
};

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
};

const I18nContext = React.createContext<I18nContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = React.useState<Lang>("pt");

  React.useEffect(() => {
    try {
      const stored = (localStorage.getItem("lang") as Lang | null) || null;
      if (stored) {
        setLangState(stored);
        return;
      }
    } catch {}
    if (typeof navigator !== "undefined") {
      const nav = navigator.language || (navigator.languages && navigator.languages[0]) || "pt";
      if (nav.startsWith("en")) setLangState("en");
      else setLangState("pt");
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  const t = (k: string) => {
    return translations[lang]?.[k] ?? translations["en"]?.[k] ?? k;
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
