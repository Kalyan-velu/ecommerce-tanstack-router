import {http, HttpResponse} from "msw";
import {baseApiUrl} from "@/query/base-query.ts";

export const handlers = [
  http.get(`${baseApiUrl}/products`, () => {
    return HttpResponse.json([
      {
        id: 0,
        title: "string",
        price: 0.1,
        description: "string",
        category: "string",
        image: "http://example.com",
      },
      {
        id: 1,
        title: "string",
        price: 0.1,
        description: "string",
        category: "string",
        image: "http://example.com",
      },
    ]);
  }),
  http.get(`${baseApiUrl}/products/1`, () =>
    HttpResponse.json({
      id: 1,
      title: "string",
      price: 0.1,
      description: "string",
      category: "string",
      image: "http://example.com",
    }),
  ),
];
