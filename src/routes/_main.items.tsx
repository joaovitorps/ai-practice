import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/items")({
  component: ItemsLayout,
});

function ItemsLayout() {
  return <Outlet />;
}