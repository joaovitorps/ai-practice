import { useAppStore } from "@core/app-store";
import type { SupportedLocale } from "@core/constants";

export function useSettings() {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);
  const setSidebarCollapsed = useAppStore((s) => s.setSidebarCollapsed);

  return {
    locale,
    setLocale: (newLocale: SupportedLocale) => setLocale(newLocale),
    sidebarCollapsed,
    setSidebarCollapsed,
  };
}