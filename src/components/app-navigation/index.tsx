import {
  FavouriteIcon,
  ShoppingCart01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { type ChangeEvent, memo, useMemo } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { debounce } from "@/lib/utils.ts";
import { searchChanged } from "@/store/features/filters.slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Input } from "../ui/input";

export default memo(function AppNavigation() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          FakeStore
        </Link>

        <SearchBar />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-lg">
            <HugeiconsIcon
              icon={ShoppingCart01FreeIcons}
              className={"size-6"}
            />
          </Button>
          <Button
            variant="ghost"
            data-testid={"favourite-button"}
            size="icon-lg"
            render={<Link to="/favourites" />}
            nativeButton={false}
          >
            <HugeiconsIcon icon={FavouriteIcon} className={"size-6"} />
          </Button>
        </div>
      </div>
    </header>
  );
});

const SearchBar = memo(() => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(({ filters }) => filters.search);

  const debounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(searchChanged(value));
      }, 50),
    [dispatch],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

  return (
    <Label className="flex-1 max-w-md mx-8">
      <span className={"sr-only"}>Search Products</span>
      <Input
        placeholder="Search products..."
        className="w-full"
        value={searchTerm}
        onChange={handleChange}
      />
    </Label>
  );
});
SearchBar.displayName = "SearchBar";
