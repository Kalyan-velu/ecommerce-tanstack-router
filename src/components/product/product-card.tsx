import {
  FavouriteIcon,
  ShoppingBag01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { type FC, memo } from "react";
import { ToggleFavourite } from "@/components/product/toggle-favourite.tsx";
import type { ProductInterface } from "@/types/product.type.ts";

interface ProductCardProps {
  product: ProductInterface;
}

export const ProductCard: FC<ProductCardProps> = memo(({ product }) => {
  return (
    <div
      data-testid="product-card"
      className="group relative flex flex-col h-full bg-card rounded-xl border border-border/40 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 overflow-hidden"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted/30 p-6">
        <Link
          to="/$productId"
          params={{ productId: String(product.id) }}
          className="block w-full h-full"
        >
          <img
            src={product.image}
            loading="lazy"
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </Link>

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-md text-foreground border border-border/50 shadow-sm capitalize">
            {product.category}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <ToggleFavourite
            product={product}
            props={{
              "aria-label": `Add ${product.title} to favorites`,
              className:
                "h-9 w-9 p-0 rounded-full inline-flex items-center justify-center bg-background/80 backdrop-blur-md hover:bg-background border border-border/50 text-foreground shadow-sm transition-colors",
            }}
          >
            <HugeiconsIcon
              icon={FavouriteIcon}
              className="h-5 w-5 text-muted-foreground group-data-[favorite=true]/toggle:fill-red-500 group-data-[favorite=true]/toggle:text-red-500 transition-colors"
            />
          </ToggleFavourite>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex gap-2 justify-center pb-6 bg-gradient-to-t from-black/5 to-transparent">
          <Link
            to="/$productId"
            params={{ productId: String(product.id) }}
            className="w-full"
          >
            <span className="w-full bg-primary text-primary-foreground font-medium py-2.5 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors active:scale-95">
              <HugeiconsIcon icon={ViewIcon} className="w-4 h-4" />
              Quick View
            </span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="text-left space-y-1">
          <Link
            to="/$productId"
            params={{ productId: String(product.id) }}
            className="block group-hover:text-primary transition-colors"
          >
            <h2
              className="font-bold text-base leading-tight text-foreground line-clamp-1"
              title={product.title}
            >
              {product.title}
            </h2>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem] leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-3 flex text-left items-center justify-between border-t border-dashed border-border/60">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium">
              Price
            </span>
            <span className="text-lg font-bold text-foreground tracking-tight">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            aria-label="Add to cart"
          >
            <HugeiconsIcon icon={ShoppingBag01Icon} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
});
ProductCard.displayName = "ProductCard";
