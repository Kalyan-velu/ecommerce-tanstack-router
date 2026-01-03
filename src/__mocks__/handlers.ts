import { HttpResponse, http } from "msw";
import { mockProducts } from "@/__mocks__/mock-product.ts";
import { baseApiUrl } from "@/query/base-query.ts";

export const handlers = [
  http.get(`${baseApiUrl}/products`, () => {
    return HttpResponse.json(mockProducts);
  }),
  http.get(`${baseApiUrl}/products/1`, () =>
    HttpResponse.json(mockProducts[1]),
  ),
];
