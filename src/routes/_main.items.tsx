import { createFileRoute } from "@tanstack/react-router";
import { ItemsList } from "@features/items/list";

export const Route = createFileRoute("/_main/items")({
  component: ItemsPage,
});

function ItemsPage() {
  return <div><ItemsList /></div>;
}