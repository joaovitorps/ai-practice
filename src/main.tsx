import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import { queryClient } from "@query-client";
import { i18n, initializeI18n } from "@core/i18n";
import { AuthProvider } from "@core/auth-provider";
import { Route } from "@routes/__root";
import { MOCK_MODE, IS_DEV } from "@core/constants";
import "./app.css";

const router = createRouter({
  routeTree: Route,
  context: { queryClient },
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

async function bootstrap() {
  if (IS_DEV && MOCK_MODE) {
    const { worker } = await import("@mocks/browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }

  await initializeI18n();

  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Root element not found");

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
        </I18nextProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}

bootstrap();