import { defineApiRoute, defineApiRouteFn, httpResource } from "@core/http-resource";
import type { ItemResponse } from "@core/queries";

export const itemsListRoute = defineApiRoute({ path: "/items", method: "GET" });
export const itemDetailRoute = defineApiRouteFn<{ itemId: string }>(
  (params) => `/items/${params.itemId}`,
  "GET",
);
export const createItemRoute = defineApiRoute({ path: "/items", method: "POST" });
export const updateItemRoute = defineApiRouteFn<{ itemId: string }>(
  (params) => `/items/${params.itemId}`,
  "PUT",
);
export const deleteItemRoute = defineApiRouteFn<{ itemId: string }>(
  (params) => `/items/${params.itemId}`,
  "DELETE",
);

export type CreateItemRequest = {
  name: string;
  description: string;
};

export type UpdateItemRequest = {
  name?: string;
  description?: string;
  status?: "active" | "archived";
};

export type ItemsListResponse = {
  items: ItemResponse[];
  total: number;
};

export async function fetchItems(page: number, search?: string): Promise<ItemsListResponse> {
  return httpResource<ItemsListResponse>({
    ...itemsListRoute,
    params: { page: String(page), ...(search ? { search } : {}) },
  });
}

export async function fetchItem(itemId: string): Promise<ItemResponse> {
  return httpResource<ItemResponse>(itemDetailRoute({ itemId }));
}

export async function createItem(data: CreateItemRequest): Promise<ItemResponse> {
  return httpResource<ItemResponse>({
    ...createItemRoute,
    body: data,
  });
}

export async function updateItem(itemId: string, data: UpdateItemRequest): Promise<ItemResponse> {
  return httpResource<ItemResponse>({
    ...updateItemRoute({ itemId }),
    body: data,
  });
}

export async function deleteItem(itemId: string): Promise<void> {
  await httpResource<void>({
    ...deleteItemRoute({ itemId }),
  });
}