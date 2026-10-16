"use client";
import { createContext, useContext, useEffect, useState, type ComponentProps, type ReactNode } from "react";
import NextLink from "next/link";
import { languageHref, resolveLanguage, type Language } from "../language";

const LanguageContext = createContext<Language>("zh");
const storageKey = "portfolio-language";
function savedLanguage() {
  try { return window.localStorage.getItem(storageKey); } catch { return null; }
}
function rememberLanguage(language: Language) {
  try { window.localStorage.setItem(storageKey, language); } catch { /* URL sharing still works without storage. */ }
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
}
export function usePortfolioLanguage(initialLanguage?: Language) {
  const [language, updateLanguage] = useState<Language>(initialLanguage ?? "zh");
  useEffect(() => {
    const read = () => {
      const next = resolveLanguage(new URLSearchParams(window.location.search).get("lang"), savedLanguage());
      updateLanguage(next);
      rememberLanguage(next);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  const setLanguage = (next: Language) => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.pushState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    rememberLanguage(next);
    updateLanguage(next);
  };
  return { language, english: language === "en", setLanguage };
}
export function LanguageProvider({ language, children }: { language: Language; children: ReactNode }) {
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
}
export function LanguageLink(props: ComponentProps<typeof NextLink>) {
  const language = useContext(LanguageContext);
  return <NextLink {...props} href={typeof props.href === "string" ? languageHref(props.href, language) : props.href} />;
}
export function LanguageAnchor(props: ComponentProps<"a">) {
  const language = useContext(LanguageContext);
  return <a {...props} href={props.href ? languageHref(props.href, language) : props.href} />;
}
