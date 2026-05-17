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

let appStoreInstance: ReturnType<typeof create<AppState>> | null = null;

function createAppStore() {
  return create<AppState>()(
    persist(
      (set) => ({
        locale: DEFAULT_LOCALE,
        accessToken: null,
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
}

export function getAppStore() {
  if (!appStoreInstance) {
    appStoreInstance = createAppStore();
  }
  return appStoreInstance;
}

export type AppStore = ReturnType<typeof getAppStore>;