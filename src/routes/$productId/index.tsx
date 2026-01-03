import {ShoppingCart01FreeIcons} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {createFileRoute, Link} from "@tanstack/react-router";
import {memo, useState} from "react";
import {ToggleFavourite} from "@/components/product/toggle-favourite.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useSuspenseGetProductById} from "@/query/hooks/use-get-product-by-id.tsx";
import {getProductByIdQueryOptions} from "@/query/options/production.options.ts";
import {getContext} from "@/query/root-provider.tsx";

const queryClient = getContext().queryClient;

export const Route = createFileRoute("/$productId/")({
  loader: ({ params }) =>
    queryClient.ensureQueryData(getProductByIdQueryOptions(params.productId)),
  component: ProductViewPage,
});

const sizes = ["XS", "S", "M", "L", "XL"] as const;
type Size = (typeof sizes)[number];

function ProductViewPage() {
  const { productId } = Route.useParams();
  const { data } = useSuspenseGetProductById(productId);
  const product = data.data;

  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [selectedImage, setSelectedImage] = useState(0);

  const images = Array.from({ length: 4 }, (_) => product.image);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="mb-8">
        <Link
          to="/"
          className="text-gray-500 hover:text-primary transition-colors"
        >
          ← Back to Products
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {images.map((image, index) => (
              <button
                key={`$image-${index + 1}`}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === index
                    ? "border-primary shadow-md"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <img
            src={images[selectedImage]}
            alt={product.title}
            className="w-full h-auto object-contain max-h-150"
          />
        </div>
        <div className="lg:pl-8">
          <span className="inline-block bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full capitalize mb-4">
            {product.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="bg-green-100 text-green-700 text-sm font-medium px-2.5 py-1 rounded-full">
              Save 20%
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 font-medium text-sm">
                In Stock
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-sm">
              SKU: {product.id.toString().padStart(6, "0")}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center gap-3">
              <StarRating rating={4} />
              <span className="text-gray-600 font-medium">4.0</span>
              <span className="text-gray-400">|</span>
              <button
                type="button"
                className="text-primary hover:underline text-sm"
              >
                117 reviews
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Size</h3>
              <button
                type={"button"}
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                Size guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  disabled={size === "S"}
                  className={`w-12 h-12 rounded-xl font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-primary text-white shadow-md"
                      : size === "S"
                        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Button size="lg" className="flex-1 rounded-xl text-lg py-6">
              <HugeiconsIcon
                icon={ShoppingCart01FreeIcons}
                className="size-5 mr-2"
              />
              Add to Cart
            </Button>
            <ToggleFavourite
              product={product}
              props={{
                className: "rounded-xl px-6",
                size: "lg",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Free Shipping</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Secure Payment</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  Secure Payment
                </p>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Refunds</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 mt-12 lg:mt-16">
          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Product Description
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Key Benefits</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Quality Assurance</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      Premium quality materials for long-lasting durability
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Easy Installation</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      Versatile design for any lifestyle or occasion
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Easy Installation</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      Carefully crafted with attention to detail
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Quality Assurance</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-600">
                      Exceptional value and trusted quality
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Specifications</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Specifications
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Category</dt>
                      <dd className="text-gray-900 font-medium capitalize">
                        {product.category}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3">
                      <dt className="text-gray-500">Product ID</dt>
                      <dd className="text-gray-900 font-medium">
                        #{product.id}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3">
                      <dt className="text-gray-500">Availability</dt>
                      <dd className="text-green-600 font-medium">In Stock</dd>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3">
                      <dt className="text-gray-500">Shipping</dt>
                      <dd className="text-gray-900 font-medium">
                        Free over $50
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3">
                      <dt className="text-gray-500">Returns</dt>
                      <dd className="text-gray-900 font-medium">30 Days</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-r from-primary/5 to-primary/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Why Choose This Product?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This product represents the perfect blend of style and
                functionality. Whether you're looking for everyday essentials or
                something special, this item delivers exceptional value and
                quality that you can trust. Backed by our satisfaction guarantee
                and dedicated customer support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StarRating = memo<{ rating: number }>(({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 shrink-0 ${
            star <= rating ? "text-yellow-400" : "text-gray-200"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
});
StarRating.displayName = "StarRating";
