import type { ButtonProps } from "@base-ui/react";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { VariantProps } from "class-variance-authority";
import React, {
  createElement,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import { Button, type buttonVariants } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { toggledFavorite } from "@/store/features/favorites.slice.ts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { ProductInterface } from "@/types/product.type.ts";

interface BaseProps {
  product: ProductInterface;
  children?: ReactElement | undefined;
  props?:
    | HTMLAttributes<HTMLButtonElement>
    | (ButtonProps & VariantProps<typeof buttonVariants>);
}

interface ToggleFavouriteProps extends BaseProps {
  children: ReactElement;
  props?: HTMLAttributes<HTMLButtonElement>;
}

interface WithoutChildren extends BaseProps {
  children?: undefined;
  props?: ButtonProps & VariantProps<typeof buttonVariants>;
}

export const ToggleFavourite = ({
  product,
  children,
  props,
}: ToggleFavouriteProps | WithoutChildren) => {
  const isFavorite = useAppSelector((state) =>
    state.favorites.favourites.some((fav) => fav.id === product.id),
  );
  const dispatch = useAppDispatch();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggledFavorite(product));
  };
  if (React.isValidElement(children)) {
    return createElement(
      "button",
      {
        type: "button",
        onClick: handleToggleFavorite,
        "data-favorite": isFavorite,
        ...props,
        className: cn("focus:outline-none group/toggle", props?.className),
      },
      children,
    );
  }
  return (
    <Button
      size="sm"
      variant="ghost"
      {...props}
      data-favorite={isFavorite}
      className={cn("rounded-full group/toggle", props?.className)}
      onClick={handleToggleFavorite}
    >
      <HugeiconsIcon
        icon={FavouriteIcon}
        className={cn("size-4 ", isFavorite && "text-primary fill-pink-900")}
      />
      <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
    </Button>
  );
};
