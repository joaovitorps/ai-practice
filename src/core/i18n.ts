import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "@core/locales/en.json";
import pt from "@core/locales/pt.json";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from "@core/constants";

let initialized = false;

export async function initializeI18n(locale?: SupportedLocale): Promise<void> {
  if (initialized) return;

  await i18n.use(LanguageDetector).use(initReactI18next).init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    lng: locale ?? DEFAULT_LOCALE,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "app-locale",
    },
  });

  initialized = true;
}

export { i18n };