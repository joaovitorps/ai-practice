import { useQuery } from "@tanstack/react-query";
import { itemQueries } from "@core/queries";

export function useDashboardData() {
  const itemsQuery = useQuery(itemQueries.list(1));
  return {
    items: itemsQuery.data?.items ?? [],
    totalItems: itemsQuery.data?.total ?? 0,
    isLoading: itemsQuery.isLoading,
    error: itemsQuery.error,
  };
}