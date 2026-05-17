import { queryOptions } from "@tanstack/react-query";
import { itemKeys, profileKeys } from "@core/keys";
import { httpResource } from "@core/http-resource";

export type ItemResponse = {
  id: string;
  name: string;
  description: string;
  status: "active" | "archived";
  createdAt: string;
};

export type ProfileResponse = {
  id: string;
  name: string;
  email: string;
};

export const itemQueries = {
  list: (page: number, search?: string) =>
    queryOptions({
      queryKey: [itemKeys.list({ page, search })],
      queryFn: () =>
        httpResource<{ items: ItemResponse[]; total: number }>({
          path: "/items",
          method: "GET",
          params: { page: String(page), ...(search ? { search } : {}) },
        }),
      staleTime: 30_000,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: [itemKeys.detail(id)],
      queryFn: () =>
        httpResource<ItemResponse>({
          path: `/items/${id}`,
          method: "GET",
        }),
      staleTime: 60_000,
    }),
};

export const profileQueries = {
  detail: (id: string) =>
    queryOptions({
      queryKey: [profileKeys.detail(id)],
      queryFn: () =>
        httpResource<ProfileResponse>({
          path: "/profile",
          method: "GET",
        }),
      staleTime: 120_000,
    }),
};