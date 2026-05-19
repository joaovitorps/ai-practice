import { Link } from "@tanstack/react-router";

export function ItemsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-lg text-gray-500">No items yet</p>
      <Link to="/items" className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800">
        Create your first item
      </Link>
    </div>
  );
}