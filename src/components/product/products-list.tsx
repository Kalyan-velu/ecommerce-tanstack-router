import { memo } from "react";
import { ProductCard } from "@/components/product/product-card.tsx";
import type { ProductInterface } from "@/types/product.type.ts";

interface ProductsListProps {
  products: ProductInterface[];
}

export const ProductsList = memo<ProductsListProps>(({ products }) => {
  return (
    <div className="columns-1 sm:columns-3 md:columns-3 lg:columns-3 xl:columns-4 gap-4 lg:gap-6 px-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
ProductsList.displayName = "ProductsList";
