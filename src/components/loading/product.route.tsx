import { memo } from "react";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
}

export const ProductDetailsSkeleton = memo(function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back navigation */}
      <nav className="mb-8">
        <Skeleton className="h-5 w-32 rounded-md" />
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image gallery section */}
        <div className="flex gap-4">
          {/* Thumbnail column */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-xl" />
            ))}
          </div>

          {/* Main image */}
          <Skeleton className="flex-1 h-[500px] rounded-2xl" />
        </div>

        {/* Product details section */}
        <div className="lg:pl-8">
          {/* Category badge */}
          <Skeleton className="h-7 w-24 rounded-full mb-4" />

          {/* Title */}
          <Skeleton className="h-10 w-3/4 rounded-lg mb-4" />

          {/* Description */}
          <div className="space-y-2 mb-6">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>

          {/* Price section */}
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-6 w-20 rounded-lg" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>

          {/* Stock and SKU */}
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-5 w-32 rounded" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="w-5 h-5 rounded" />
              ))}
            </div>
            <Skeleton className="h-5 w-8 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>

          {/* Size selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-5 w-12 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="w-12 h-12 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="flex-1 h-14 rounded-xl" />
            <Skeleton className="h-14 w-40 rounded-xl" />
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 rounded mb-1" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product description section */}
        <div className="lg:col-span-2 mt-12 lg:mt-16">
          <div className="border-t border-gray-200 pt-10">
            {/* Section title */}
            <Skeleton className="h-8 w-48 rounded-lg mb-6" />

            {/* Description text */}
            <div className="space-y-2 mb-8">
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-3/4 rounded" />
            </div>

            {/* Two column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Benefits column */}
              <div>
                <Skeleton className="h-6 w-32 rounded-lg mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="w-5 h-5 rounded-full shrink-0 mt-0.5" />
                      <Skeleton className="h-4 w-full rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications column */}
              <div>
                <Skeleton className="h-6 w-32 rounded-lg mb-4" />
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`flex justify-between ${i > 1 ? "border-t border-gray-200 pt-3" : ""}`}
                      >
                        <Skeleton className="h-4 w-24 rounded" />
                        <Skeleton className="h-4 w-20 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Why choose section */}
            <div className="bg-gray-100 rounded-2xl p-6">
              <Skeleton className="h-6 w-56 rounded-lg mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
