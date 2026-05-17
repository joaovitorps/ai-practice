import { createFileRoute } from "@tanstack/react-router";
import { useItem } from "@features/items/hooks";
import { Loading } from "@ui/loading";
import { Badge } from "@ui/badge";

export const Route = createFileRoute("/_main/items/$itemId")({
  component: ItemDetailPage,
});

function ItemDetailPage() {
  const { itemId } = Route.useParams();
  const { data: item, isLoading, error } = useItem(itemId);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-600">Error loading item</p>;
  if (!item) return <p className="text-gray-500">Item not found</p>;

  return (
    <div className="space-y-4">
      <a href="/items" className="text-sm text-gray-500 hover:text-gray-900">&larr; Back to items</a>
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p className="text-gray-600">{item.description}</p>
      <Badge variant={item.status === "active" ? "success" : "default"}>{item.status}</Badge>
      <p className="text-sm text-gray-400">Created: {item.createdAt}</p>
    </div>
  );
}