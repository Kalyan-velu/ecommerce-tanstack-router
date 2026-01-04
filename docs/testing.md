# Testing Documentation

This project employs a comprehensive testing strategy covering unit, integration, and browser-based end-to-end (E2E)
testing, including visual regression.

## 1. Unit and Integration Testing

Unit and integration tests are designed to verify the logic and behavior of individual components and their interactions
without a real browser environment.

- **Tooling**: [Vitest](https://vitest.dev/), [jsdom](https://github.com/jsdom/jsdom),
  and [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro/).
- **Location**: Test files are located alongside the code they test, typically in `__tests__` directories (e.g.,
  `src/routes/__tests__/*.test.tsx`).
- **Configuration**: Managed in `vitest.config.ts`.
- **Execution**:
  ```bash
  pnpm test:unit
  ```

### Key Practices

- Use `test-utils.tsx` for a custom `render` function that provides necessary providers (Redux, TanStack Query, TanStack
  Router).
- Mock external dependencies and APIs using `msw` or `vi.spyOn`.
- Focus on user behavior rather than implementation details.

## 2. Browser Testing (E2E / Integration)

Browser tests run in a real browser environment to ensure that the application works correctly across different engines
and handles complex interactions, styles, and layouts.

- **Tooling**: [Vitest Browser Mode](https://vitest.dev/guide/browser/) powered
  by [Playwright](https://playwright.dev/).
- **Location**: `e2e/*.spec.tsx`.
- **Configuration**: Managed in `vitest.config.browser.ts`.
- **Execution**:
  ```bash
  pnpm test:e2e
  ```
  To run with UI mode:
  ```bash
  pnpm test:e2e:ui
  ```

### Key Practices

- Use `e2e-test.utils.tsx` for rendering the application in the browser environment.
- Tests can interact with the page using the `page` object from `vitest/browser`.
- Useful for testing features that rely on browser APIs or complex CSS interactions (like dropdowns, modals, etc.).

## 3. Visual Regression Testing

Visual regression testing ensures that changes to the code do not unexpectedly alter the application's appearance.

- **Mechanism**: Captured screenshots are compared against baseline "golden" images.
- **Implementation**: Handled within Vitest Browser tests.
- **Baseline Images**: Stored in `e2e/__screenshots__`.

### How to use

To perform a visual assertion, use the `toMatchScreenshot` matcher:

```tsx
import {expect, it} from "vitest";
import {page} from "vitest/browser";

it("should match the home page design", async () => {
  await renderApp(<HomePage/>);
  await expect(page).toMatchScreenshot();
});
```

### Updating Screenshots

If a change is intentional and you need to update the baseline images, run:

```bash
pnpm test:e2e --update
```

---

## Summary of Scripts

| Script               | Description                               |
|:---------------------|:------------------------------------------|
| `pnpm test`          | Runs all tests.                           |
| `pnpm test:unit`     | Runs unit and integration tests in JSDOM. |
| `pnpm test:e2e`      | Runs browser tests in headless mode.      |
| `pnpm test:e2e:ui`   | Runs browser tests with the Vitest UI.    |
| `pnpm test:coverage` | Generates a coverage report.              |
