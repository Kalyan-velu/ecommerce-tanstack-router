import type {PreloadedStateShapeFromReducersMapObject} from "@reduxjs/toolkit";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {type AnyRouter, RouterProvider} from "@tanstack/react-router";
import type {ReactElement, ReactNode} from "react";
import {Provider} from "react-redux";
import {render as rtlRender, type RenderOptions} from "vitest-browser-react";
import {createTestRouter, createTestStore, type rootReducer, type TestStore,} from "@/test-utils.tsx";
import type {ArgumentsType} from "@/types";

// Ensure React 19 knows this is a test environment
// @ts-expect-error - IS_REACT_ACT_ENVIRONMENT is a global flag for React's act
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
type CustomRenderOptions = Omit<RenderOptions, "wrapper"> & {
  initialRoute?: string;
  routePath?: string;
  router?: AnyRouter;
  queryClient?: QueryClient;
  preloadedState?: PreloadedStateShapeFromReducersMapObject<typeof rootReducer>;
  store?: TestStore;
  withRouter?: boolean;
};

async function render(
  ui: ReactElement | undefined,
  {
    initialRoute = "/",
    routePath = "/",
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
      ...(await rtlRender(ui, { wrapper: Wrapper, ...renderOptions })),
      store,
      queryClient,
    };
  }

  // Case 2: Render with router (for integration testing with router)
  if (!customRouter) {
    const { router, queryClient: routerQueryClient } = createTestRouter(
      ui,
      initialRoute,
      routePath,
    );

    const Wrapper = () => (
      <Provider store={store}>
        <QueryClientProvider client={routerQueryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    );

    return {
      ...(await rtlRender(null, { wrapper: Wrapper, ...renderOptions })),
      router,
      queryClient: routerQueryClient,
      store,
    };
  }

  // Case 3: External router provided (for integration testing with external router)
  const Wrapper = () => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={customRouter} />
      </QueryClientProvider>
    </Provider>
  );
  return {
    ...(await rtlRender(null, { wrapper: Wrapper, ...renderOptions })),
    router: customRouter,
    queryClient,
    store,
  };
}

export const renderAct = async (
  ...args: Partial<ArgumentsType<typeof render>>
) => {
  return render(args[0], {
    withRouter: true,
    initialRoute: "/",
    ...(args[1] ?? {}),
  });
};

/* -------------------------------------------------------------------------- */
/*                               Re-exports                                   */
/* -------------------------------------------------------------------------- */

export * from "vitest-browser-react";
export { render };
