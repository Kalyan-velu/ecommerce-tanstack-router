import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getProductsQueryOptions } from "@/query/options/production.options.ts";

export const useGetAllProducts = () => {
  return useQuery(getProductsQueryOptions);
};

export const useSuspenseGetAllProducts = () => {
  return useSuspenseQuery(getProductsQueryOptions);
};
