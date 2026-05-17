import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itemQueries } from "@core/queries";
import { createItem, deleteItem, updateItem } from "@core/api/items";
import type { CreateItemRequest, UpdateItemRequest } from "@core/api/items";

export function useItems(page: number, search?: string) {
  return useQuery(itemQueries.list(page, search));
}

export function useItem(itemId: string) {
  return useQuery(itemQueries.detail(itemId));
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateItemRequest) => createItem(data),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ["items"] }); },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateItemRequest }) => updateItem(itemId, data),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ["items"] }); },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => deleteItem(itemId),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ["items"] }); },
  });
}