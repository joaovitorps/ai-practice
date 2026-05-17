import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { MainLayout } from "@layouts/main-layout";
import { useSessionStore } from "@core/session-store";
import { queryClient } from "@query-client";
import { itemQueries } from "@core/queries";

export const Route = createFileRoute("/_main")({
  beforeLoad: () => {
    const user = useSessionStore.getState().user;
if (!user) {
      // @ts-expect-error route typing
      throw redirect({ to: "/login" });
    }
  },
  loader: () => {
    void queryClient.prefetchQuery(itemQueries.list(1));
  },
  component: MainLayoutRoute,
});

function MainLayoutRoute() {
  return <MainLayout><Outlet /></MainLayout>;
}