import {afterAll, afterEach, beforeEach} from "vitest";
import {cleanup} from "vitest-browser-react";
import {worker} from "@/__mocks__/browser";

beforeEach(() => {
  worker.start();
});
afterEach(async () => {
  await cleanup();
  worker.resetHandlers();
});

afterAll(() => {
  worker.stop();
});
