import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@core/auth-provider";
import { ToasterProvider } from "@ui/toaster";
import { NotFoundPage } from "@layouts/pages/not-found-page";

type RouterContext = {
  queryClient: import("@tanstack/react-query").QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return (
    <AuthProvider>
      <ToasterProvider>
        <Outlet />
      </ToasterProvider>
    </AuthProvider>
  );
}