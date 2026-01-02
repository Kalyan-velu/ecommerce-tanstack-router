import type {ProductInterface} from "@/types/product.type.ts";

export interface CartInterface {
  id: number;
  userId: number;
  products: ProductInterface[];
}
