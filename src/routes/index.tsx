import { createFileRoute } from "@tanstack/react-router";
import { Activity, memo, useDeferredValue, useMemo } from "react";
import { EmptyState } from "@/components/product/empty-state.tsx";
import { ProductsList } from "@/components/product/products-list.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { useSuspenseGetAllProducts } from "@/query/hooks/use-get-all-products.tsx";
import { getProductsQueryOptions } from "@/query/options/production.options.ts";
import { getContext } from "@/query/root-provider.tsx";
import { categorySelected, sorted } from "@/store/features/filters.slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const queryClient = getContext().queryClient;

export const Route = createFileRoute("/")({
  loader: () => queryClient.ensureQueryData(getProductsQueryOptions),
  component: App,
});

// Exported for testing purposes
export function App() {
  const { data } = useSuspenseGetAllProducts();

  const category = useAppSelector(({ filters }) => filters.category);
  const sorted = useAppSelector(({ filters }) => filters.sort);
  const search = useAppSelector(({ filters }) => filters.search);

  const deferredSearch = useDeferredValue(search);
  const products = data.data;

  const hasFilters = useMemo(
    () => category !== "all" || deferredSearch !== "" || sorted !== null,
    [category, deferredSearch, sorted],
  );

  const filteredProducts = useMemo(
    () =>
      products
        .filter(
          (product) =>
            category === "all" ||
            product.category.toLowerCase().includes(category),
        )
        .filter(
          (product) =>
            deferredSearch === "" ||
            product.title
              .toLowerCase()
              .includes(deferredSearch.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(deferredSearch.toLowerCase()),
        )
        .sort((a, b) =>
          sorted === "price-asc" ? a.price - b.price : b.price - a.price,
        ),
    [products, category, sorted, deferredSearch],
  );
  const productCount = filteredProducts.length;

  return (
    <div className="text-center max-w-7xl w-full mx-auto">
      <div className="my-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover Our Collection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our curated selection of premium products
        </p>
      </div>
      <div className="flex my-4 items-center justify-center">
        <CategoryFilterTabs category={category} />
      </div>

      <div className="flex items-center justify-between mb-6 px-2">
        <p className="text-gray-600">{productCount} products</p>
        <Sort sortBy={sorted} />
      </div>
      <Activity mode={productCount === 0 ? "hidden" : "visible"}>
        <ProductsList products={filteredProducts} />
      </Activity>
      <Activity mode={productCount !== 0 ? "hidden" : "visible"}>
        <EmptyState hasFilters={hasFilters} />
      </Activity>
    </div>
  );
}

const labels: Record<
  "price-asc" | "price-desc" | (string & {}),
  string | null
> = {
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  none: null,
};

const Sort = memo<{
  sortBy: "price-asc" | "price-desc" | "none" | (string & {}) | null;
}>(({ sortBy }) => {
  const dispatch = useAppDispatch();
  const handleChange = (value: string | null) => {
    dispatch(sorted(value));
  };

  const memoized = useMemo(
    () =>
      Object.entries(labels).map(([value, label]) => (
        <SelectItem key={value} value={value === "none" ? null : value}>
          {label ?? "Default"}
        </SelectItem>
      )),
    [],
  );

  return (
    <div className="flex items-center gap-4">
      <Select value={sortBy} onValueChange={handleChange}>
        <SelectTrigger className="w-40">
          <SelectValue>
            {(value: (string & {}) | null) =>
              value ? labels[value] : "Default"
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>{memoized}</SelectContent>
      </Select>
    </div>
  );
});

const CategoryFilterTabs = memo<{
  category: string;
}>(({ category }) => {
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(categorySelected(value));
  };

  return (
    <Tabs value={category} onValueChange={handleChange} className="w-fit">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="electronics">Electronics</TabsTrigger>
        <TabsTrigger value="clothing">Clothing</TabsTrigger>
        <TabsTrigger value="jewelery">Jewelry</TabsTrigger>
      </TabsList>
    </Tabs>
  );
});
CategoryFilterTabs.displayName = "CampaignsFilterTabs";
