import {http, HttpResponse} from "msw";
import {baseApiUrl} from "@/query/base-query.ts";
import {mockProducts} from "@/__mocks__/mock-product.ts";

export const handlers = [
  http.get(`${baseApiUrl}/products`, () => {
    return HttpResponse.json(mockProducts);
  }),
  http.get(`${baseApiUrl}/products/1`, () =>
    HttpResponse.json(mockProducts[1]),
  ),
];
