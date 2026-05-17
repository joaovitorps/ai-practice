export const APP_NAME = "SPA Architecture";
export const APP_VERSION = "0.1.0";
export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "pt"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";
export const IS_DEV = import.meta.env.DEV;
export const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === "true";