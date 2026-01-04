import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "vitest-browser-react";
import { worker } from "@/__mocks__/browser";

beforeAll(() => {
  worker.start();
});
afterEach(async () => {
  await cleanup();
  worker.resetHandlers();
});

afterAll(() => {
  worker.stop();
});
