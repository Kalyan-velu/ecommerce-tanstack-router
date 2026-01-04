import { memo } from "react";
import ProductListSkeleton from "@/components/loading/product-list-skeleton.tsx";

/**
 * Loading skeleton component for the App route.
 * Displays placeholder content while the main page data is loading.
 */
export const AppLoading = memo(function AppLoading() {
  return (
    <div className="text-center max-w-7xl w-full mx-auto animate-pulse">
      <div className="my-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover Our Collection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our curated selection of premium products
        </p>
      </div>

      <div className="flex my-4 items-center justify-center">
        <div className="flex gap-2 bg-gray-100/80 p-1 rounded-full">
          <div className="h-9 w-16 bg-gray-200 rounded-full" />
          <div className="h-9 w-24 bg-gray-200 rounded-full" />
          <div className="h-9 w-20 bg-gray-200 rounded-full" />
          <div className="h-9 w-20 bg-gray-200 rounded-full" />
        </div>
      </div>
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-9 w-40 bg-gray-200 rounded-md" />
      </div>

      <ProductListSkeleton />
    </div>
  );
});
