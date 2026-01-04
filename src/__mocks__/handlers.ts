import { HttpResponse, http } from "msw";
import { mockProducts } from "@/__mocks__/mock-product.ts";
import { baseApiUrl } from "@/query/base-query.ts";

export const handlers = [
  http.get(`${baseApiUrl}/products`, () => {
    return HttpResponse.json(mockProducts);
  }),
  http.get(`${baseApiUrl}/products/:id`, ({ params }) => {
    const { id } = params;
    const product = mockProducts.find((p) => p.id === Number(id));
    if (product) {
      return HttpResponse.json(product);
    }
    return new HttpResponse(null, { status: 404 });
  }),
];
