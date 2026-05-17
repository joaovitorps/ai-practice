import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SupportedLocale } from "@core/constants";
import { DEFAULT_LOCALE } from "@core/constants";

type AppState = {
  locale: SupportedLocale;
  accessToken: string | null;
  sidebarCollapsed: boolean;
  setLocale: (locale: SupportedLocale) => void;
  setAccessToken: (token: string | null) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: DEFAULT_LOCALE as SupportedLocale,
      accessToken: null as string | null,
      sidebarCollapsed: false,
      setLocale: (locale) => set({ locale }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        locale: state.locale,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
);

export type { AppState };