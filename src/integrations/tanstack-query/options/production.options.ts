import type { QueryOptions } from "@tanstack/react-query";
import { api } from "@/query/base-query.ts";
import type { ProductInterface } from "@/types/product.type.ts";

export const getProductsQueryOptions = {
  queryKey: ["products"],
  queryFn: () => api.get<ProductInterface[]>("/products"),
} satisfies QueryOptions;

export const getProductByIdQueryOptions = (id?: string | number) => ({
  queryKey: ["product", id],
  queryFn: async () => api.get<ProductInterface>(`/products/${id}`),
  enabled: !!id,
});
