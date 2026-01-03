import {ProductCardSkeleton} from "./product-card-skeleton";

export default function ProductListSkeleton() {
  return(
    <div className="columns-1 animate-pulse sm:columns-2 lg:columns-3 xl:columns-4 gap-6 lg:gap-8 px-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={`skeleton-card-${index}`} />
      ))}
    </div>
  )
}