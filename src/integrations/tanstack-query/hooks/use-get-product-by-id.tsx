import {useQuery, useSuspenseQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {getProductByIdQueryOptions} from "@/query/options/production.options.ts";

export const useGetProductById = (id?: number | string) => {
  const options = useMemo(() => getProductByIdQueryOptions(id), [id]);

  return useQuery(options);
};
export const useSuspenseGetProductById = (id?: number | string) => {
  const options = useMemo(() => getProductByIdQueryOptions(id), [id]);
  return useSuspenseQuery(options);
};
