import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";
import { routeTree } from "./routeTree.gen";
import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

/**
 * Bootstraps MSW in browser environments when enabled.
 * This must run BEFORE React renders.
 */
async function enableMocking(): Promise<void> {
  if (!__MSW_ENABLED__) return;

  const { worker } = await import("@/__mocks__/browser.ts");
  await worker.start({
    onUnhandledRequest: "error",
  });
}
console.log(__MSW_ENABLED__);
/**
 * Renders the React application safely.
 */
function renderApp(): void {
  const rootElement = document.getElementById("app");

  if (!rootElement) {
    throw new Error("Root element #app not found");
  }

  // Prevent double-mounting (Vitest UI / HMR safety)
  if (rootElement.innerHTML) return;

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  );
}

await enableMocking();
renderApp();

reportWebVitals();

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
