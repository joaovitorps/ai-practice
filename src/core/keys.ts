import { createQueryKeyStore } from "@lukemorales/query-key-factory";

export const keys = createQueryKeyStore({
  items: {
    all: null,
    lists: () => ({ type: "list" }),
    list: (filters: { page: number; search?: string }) => ({ type: "list", ...filters }),
    detail: (id: string) => ({ type: "detail", id }),
  },
  profiles: {
    all: null,
    detail: (id: string) => ({ type: "detail", id }),
  },
});

export const itemKeys = keys.items;
export const profileKeys = keys.profiles;