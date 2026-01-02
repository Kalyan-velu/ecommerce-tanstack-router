import {FavouriteIcon, ShoppingCart01FreeIcons,} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "../ui/input";

export default function AppNavigation() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          YourBrand
        </Link>

        <div className="flex-1 max-w-md mx-8">
          <Input placeholder="Search products..." className="w-full" />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-lg">
            <HugeiconsIcon
              icon={ShoppingCart01FreeIcons}
              className={"size-6"}
            />
          </Button>
          <Button variant="ghost" size="icon-lg">
            <HugeiconsIcon icon={FavouriteIcon} className={"size-6"} />
          </Button>
        </div>
      </div>
    </header>
  );
}
