import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/items/$itemId")({
  beforeLoad: ({ params, location }) => {
    if (location.pathname === `/items/${params.itemId}`) {
      throw redirect({ to: "/items/$itemId/edit", params: { itemId: params.itemId } });
    }
  },
  component: ItemDetailLayout,
});

function ItemDetailLayout() {
  return <Outlet />;
}