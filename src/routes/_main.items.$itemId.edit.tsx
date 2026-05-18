import { createFileRoute, Link } from "@tanstack/react-router";
import { useItem } from "@features/items/hooks";
import { EditProductForm } from "@features/items/edit-form";
import { Loading } from "@ui/loading";

export const Route = createFileRoute("/_main/items/$itemId/edit")({
  component: EditItemPage,
});

function EditItemPage() {
  const { itemId } = Route.useParams();
  const { data: item, isLoading, error } = useItem(itemId);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-600">Error loading item</p>;
  if (!item) return <p className="text-gray-500">Item not found</p>;

  return (
    <div className="space-y-4">
      <Link to="/items" className="text-sm text-gray-500 hover:text-gray-900">
        &larr; Back to items
      </Link>
      <h1 className="text-2xl font-bold">Edit {item.name}</h1>
      <p className="text-sm text-gray-400">Created: {item.createdAt}</p>
      <EditProductForm item={item} />
    </div>
  );
}
