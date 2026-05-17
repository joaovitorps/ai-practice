import { getAppStore } from "@core/app-store";
import type { SupportedLocale } from "@core/constants";

export function useSettings() {
  const store = getAppStore();
  const locale = store((s) => s.locale);
  const setLocale = store((s) => s.setLocale);
  const sidebarCollapsed = store((s) => s.sidebarCollapsed);
  const setSidebarCollapsed = store((s) => s.setSidebarCollapsed);

  return { locale, setLocale: (newLocale: SupportedLocale) => setLocale(newLocale), sidebarCollapsed, setSidebarCollapsed };
}