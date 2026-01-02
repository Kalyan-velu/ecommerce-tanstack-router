import {FavouriteIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {type FC, memo} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import type {ProductInterface} from "@/types/product.type.ts";
import {Button} from "./ui/button";

interface ProductCardProps {
  product: ProductInterface;
}
export const ProductCard: FC<ProductCardProps> = memo(({ product }) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm text-left ring-0 break-inside-avoid mb-8 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 group">
      <CardContent className="p-0 relative overflow-hidden">
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full">
            {product.category}
          </span>
        </div>
      </CardContent>
      <div className="p-5 space-y-3">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-relaxed group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-3">
          <span className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="rounded-full">
              <HugeiconsIcon icon={FavouriteIcon} className={"size-4"} />
            </Button>
            <Button size="sm" className="rounded-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
});
ProductCard.displayName = "ProductCard";
