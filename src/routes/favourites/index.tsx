import { createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "@/components/product/empty-state.tsx";
import { ProductsList } from "@/components/product/products-list.tsx";
import { favoritesState } from "@/store/features/favorites.slice.ts";
import { useAppSelector } from "@/store/hooks";

export const Route = createFileRoute("/favourites/")({
  component: RouteComponent,
});

function RouteComponent() {
  const favourites = useAppSelector(favoritesState).favourites;
  return (
    <div className="text-center max-w-7xl my-8 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Favourites</h1>

      {favourites.length > 0 ? (
        <ProductsList products={favourites} />
      ) : (
        <EmptyState hasFilters={false} />
      )}
    </div>
  );
}
