"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

/**
 * Scope note: this switches the *interface chrome* only — nav labels,
 * header controls, footer sections. Brand/product data, editorial briefs,
 * and page body copy stay in their source language (mostly English, with
 * Korean brand names shown alongside English ones throughout, by design).
 * Full content localization would need a real i18n data pipeline — this
 * is the honest, currently-shipped scope, not a placeholder pretending to
 * be more.
 */

export type Lang = "en" | "ko";

const STORAGE_KEY = "kbr:lang";

const DICTIONARY = {
  en: {
    nav_radar: "Radar",
    nav_rankings: "Rankings",
    nav_brands: "Brands",
    nav_products: "Products",
    nav_celebrity: "Celebrity Impact",
    nav_briefs: "Briefs",
    header_search: "Search",
    header_language: "Language",
    header_saved: "Saved",
    header_signin: "Sign in",
    header_profile: "Profile",
    footer_explore: "Explore",
    footer_signals: "Signals",
    footer_about: "About",
    footer_compare: "Compare",
    footer_countries: "Country Radar",
    footer_ingredients: "Ingredient Radar",
    footer_briefs: "Radar Brief",
    footer_methodology: "Methodology",
    footer_about_link: "About",
    footer_admin: "Admin",
    footer_tagline: "What the world really thinks about K-Beauty.",
  },
  ko: {
    nav_radar: "레이더",
    nav_rankings: "랭킹",
    nav_brands: "브랜드",
    nav_products: "제품",
    nav_celebrity: "셀럽 임팩트",
    nav_briefs: "브리프",
    header_search: "검색",
    header_language: "언어",
    header_saved: "저장",
    header_signin: "로그인",
    header_profile: "프로필",
    footer_explore: "둘러보기",
    footer_signals: "시그널",
    footer_about: "소개",
    footer_compare: "비교",
    footer_countries: "국가별 레이더",
    footer_ingredients: "성분 레이더",
    footer_briefs: "레이더 브리프",
    footer_methodology: "산정 방식",
    footer_about_link: "소개",
    footer_admin: "관리자",
    footer_tagline: "세계 소비자들이 K-뷰티를 실제로 어떻게 평가하는지 보여줍니다.",
  },
} as const;

export type DictKey = keyof (typeof DICTIONARY)["en"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: DictKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "ko") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe sync from localStorage (no window during SSR)
        setLangState(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback((key: DictKey) => DICTIONARY[lang][key], [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
