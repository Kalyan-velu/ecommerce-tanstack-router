import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { useGetAllProducts } from "@/query/hooks/use-get-all-products";
import { useGetProductById } from "@/query/hooks/use-get-product-by-id.tsx";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("getProducts", () => {
  it("returns product data", async () => {
    const { result } = renderHook(() => useGetAllProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.data.length).toBe(2);
  });
  it("should return a product with id 1", async () => {
    const { result } = renderHook(() => useGetProductById(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.data.id === 1).toBeDefined();
  });
});
