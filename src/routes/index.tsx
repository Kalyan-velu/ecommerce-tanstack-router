import {createFileRoute} from "@tanstack/react-router";
import {ProductsList} from "@/components/products-list.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select.tsx";
import {useSuspenseGetAllProducts} from "@/query/hooks/use-get-all-products.tsx";
import {getProductsQueryOptions} from "@/query/options/production.options.ts";
import {getContext} from "@/query/root-provider.tsx";

const queryClient = getContext().queryClient;

export const Route = createFileRoute("/")({
  loader: () => queryClient.ensureQueryData(getProductsQueryOptions),
  component: App,
});

function App() {
  const { data } = useSuspenseGetAllProducts();

  const products = data.data;

  return (
    <div className="text-center max-w-7xl mx-auto">
      {/* Hero/Welcome Section */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover Our Collection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our curated selection of premium products
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button variant="outline" className="rounded-full">
          All
        </Button>
        <Button variant="outline" className="rounded-full">
          Electronics
        </Button>
        <Button variant="outline" className="rounded-full">
          Clothing
        </Button>
      </div>
      <div className="flex items-center justify-between mb-6 px-2">
        <p className="text-gray-600">{products.length} products</p>
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ProductsList products={products} />
    </div>
  );
}
