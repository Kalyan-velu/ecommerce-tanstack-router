import {memo} from "react";

export const ProductCardSkeleton = memo(function ProductCardSkeleton() {
  return (
    <div className="break-inside-avoid mb-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden">
      <div className="relative aspect-square bg-gray-200" />

      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-full" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        <div className="pt-3">
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
});