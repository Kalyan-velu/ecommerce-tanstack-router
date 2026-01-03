import {
  combineReducers,
  configureStore,
  type PreloadedStateShapeFromReducersMapObject,
} from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type AnyRouter,
  createMemoryHistory,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import {
  type RenderOptions,
  render as rtlRender,
} from "@testing-library/react";

import type { ReactElement, ReactNode } from "react";

import { Provider } from "react-redux";
import { favoritesSlice } from "@/integrations/store/features/favorites.slice.ts";
import { filtersSlice } from "@/store/features/filters.slice.ts";

/* -------------------------------------------------------------------------- */
/*                               Redux Store Factory                          */
/* -------------------------------------------------------------------------- */

const rootReducer = combineReducers({
  [favoritesSlice.name]: favoritesSlice.reducer,
  [filtersSlice.name]: filtersSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function createTestStore(
  preloadedState?: PreloadedStateShapeFromReducersMapObject<typeof rootReducer>,
) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type TestStore = ReturnType<typeof createTestStore>;

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
  preloadedState?: PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;
  store?: TestStore;
  withRouter?: boolean;
}

function render(
  ui: ReactElement,
  {
    initialRoute = "/",
    router: customRouter,
    queryClient: customQueryClient,
    preloadedState,
    store: customStore,
    withRouter = false,
    ...renderOptions
  }: CustomRenderOptions = {},
) {
  const store = customStore ?? createTestStore(preloadedState);
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

  // Case 1: Simple render without router (for unit testing components)
  if (!withRouter && !customRouter) {
    const Wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    );

    return {
      ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
      store,
      queryClient,
    };
  }

  // Case 2: Render with router
  if (!customRouter) {
    const { router, queryClient: routerQueryClient } = createTestRouter(
      ui,
      initialRoute,
    );

    const Wrapper = () => (
      <Provider store={store}>
        <QueryClientProvider client={routerQueryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    );

    return {
      ...rtlRender(null, { wrapper: Wrapper, ...renderOptions }),
      router,
      queryClient: routerQueryClient,
      store,
    };
  }

  // Case 3: External router provided
  const Wrapper = () => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={customRouter} />
      </QueryClientProvider>
    </Provider>
  );

  return {
    ...rtlRender(null, { wrapper: Wrapper, ...renderOptions }),
    router: customRouter,
    queryClient,
    store,
  };
}

/* -------------------------------------------------------------------------- */
/*                               Re-exports                                   */
/* -------------------------------------------------------------------------- */

export * from "@testing-library/react";
export { render };
export { default as userEvent } from "@testing-library/user-event";
