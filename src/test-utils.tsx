import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {
  type AnyRouter,
  createMemoryHistory,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import {render as rtlRender, type RenderOptions,} from "@testing-library/react";
import type {ReactElement} from "react";

/* -------------------------------------------------------------------------- */
/*                               Router Factory                               */
/* -------------------------------------------------------------------------- */

export function createTestRouter(ui: ReactElement, initialRoute: string = "/") {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: Infinity,
      },
    },
  });

  const rootRoute = createRootRouteWithContext<{
    queryClient: QueryClient;
  }>()();

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => ui,
  });

  const routeTree = rootRoute.addChildren([indexRoute]);

  const history = createMemoryHistory({
    initialEntries: [initialRoute],
  });

  const router = createRouter({
    routeTree,
    history,
    context: {
      queryClient,
    },
  });

  return { router, queryClient };
}

/* -------------------------------------------------------------------------- */
/*                              Custom Render API                              */
/* -------------------------------------------------------------------------- */

export interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialRoute?: string;
  router?: AnyRouter;
  queryClient?: QueryClient;
}

function render(
  ui: ReactElement,
  {
    initialRoute = "/",
    router: customRouter,
    queryClient: customQueryClient,
    ...renderOptions
  }: CustomRenderOptions = {},
) {
  // Case 1: No router provided → create isolated test router
  if (!customRouter) {
    const { router, queryClient } = createTestRouter(ui, initialRoute);

    const Wrapper = () => (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    return {
      ...rtlRender(<></>, { wrapper: Wrapper, ...renderOptions }),
      router,
      queryClient,
    };
  }

  // Case 2: External router provided
  const queryClient =
    customQueryClient ??
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
          gcTime: Infinity,
        },
      },
    });

  const Wrapper = () => (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={customRouter} />
    </QueryClientProvider>
  );

  return {
    ...rtlRender(<></>, { wrapper: Wrapper, ...renderOptions }),
    router: customRouter,
    queryClient,
  };
}

/* -------------------------------------------------------------------------- */
/*                               Re-exports                                   */
/* -------------------------------------------------------------------------- */

export * from "@testing-library/react";
export { render };
export { default as userEvent } from "@testing-library/user-event";
