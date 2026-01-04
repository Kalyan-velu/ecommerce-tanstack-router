import { memo } from "react";
import { Button } from "@/components/ui/button";
import { resetFilters } from "@/store/features/filters.slice";
import { useAppDispatch } from "@/store/hooks";

interface EmptyStateProps {
  hasFilters: boolean;
}

export const EmptyState = memo<EmptyStateProps>(({ hasFilters }) => {
  const dispatch = useAppDispatch();

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div
      data-testid="empty-state"
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-24 h-24 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>No products found</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      </div>

      <h3
        data-testid="empty-state-title"
        className="text-lg font-semibold text-gray-900 mb-2"
      >
        {hasFilters ? "No products found" : "No products available"}
      </h3>
      <p
        data-testid="empty-state-description"
        className="text-gray-500 text-center max-w-md mb-6"
      >
        {hasFilters
          ? "No products match your current filters. Try adjusting your search term or selecting a different category."
          : "There are no products available at the moment. Please check back later."}
      </p>

      {hasFilters && (
        <Button
          data-testid="clear-filters-button"
          type={"button"}
          onClick={handleClearFilters}
          variant="outline"
          className="rounded-full"
        >
          Clear all filters
        </Button>
      )}
    </div>
  );
});

EmptyState.displayName = "EmptyState";
