export const itemKeys = {
  all: { scope: "items" } as const,
  lists: () => ({ scope: "items", type: "list" }) as const,
  list: (filters: { page: number; search?: string }) => ({ scope: "items", type: "list", ...filters }) as const,
  detail: (id: string) => ({ scope: "items", type: "detail", id }) as const,
};

export const profileKeys = {
  all: { scope: "profiles" } as const,
  detail: (id: string) => ({ scope: "profiles", type: "detail", id }) as const,
};