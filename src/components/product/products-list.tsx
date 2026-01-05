import { memo } from "react";
import { ProductCard } from "@/components/product/product-card.tsx";
import type { ProductInterface } from "@/types/product.type.ts";

interface ProductsListProps {
  products: ProductInterface[];
}

export const ProductsList = memo<ProductsListProps>(({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 pb-8 items-stretch">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
ProductsList.displayName = "ProductsList";
