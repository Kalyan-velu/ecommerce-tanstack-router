====================================================
FRONTEND TESTING RULES (READ BEFORE WRITING A TEST)
====================================================

GOAL
----
Tests must be:

- Deterministic (same result every run)
- Fast (no real network, no real browser unless required)
- Focused on behavior, not implementation
- Easy to reason about when they fail

----------------------------------------------------

1. TEST TYPES & TOOLING (STRICT BOUNDARIES)

----------------------------------------------------

1.1 Unit / Integration Tests
----------------------------
Use:

- Vitest
- jsdom
- React Testing Library (RTL)

Purpose:

- Test components
- Test custom hooks
- Test TanStack Query behavior
- Test router logic with memory history

Rules:

- NO real browser
- NO Playwright
- NO page.goto
- NO @vitest/playwright-browser
- NO real APIs

If a test imports Playwright or `vitest-browser-*`,
it is NOT a unit/integration test.


1.2 End-to-End (E2E) Tests
-------------------------
Use:

- Playwright ONLY

Purpose:

- Full app flows
- Auth, navigation, real backend
- Production-like behavior

Rules:

- NO React Testing Library
- NO jsdom
- NO QueryClient mocking
- NO test-utils render helpers

RTL and Playwright must NEVER be mixed.


----------------------------------------------------

2. REACT QUERY (TanStack Query) RULES

----------------------------------------------------

2.1 QueryClient
---------------

- Always create a NEW QueryClient per test
- Disable retries
- Disable refetch on window focus
- Never reuse a QueryClient across tests

Required defaults:

- retry: false
- refetchOnWindowFocus: false
- gcTime: Infinity (recommended)

Never rely on the app’s real QueryClient.


2.2 Testing Custom Hooks that wrap useQuery
-------------------------------------------
DO:

- Use RTL's renderHook
- Wrap with QueryClientProvider
- Mock the network (fetch or MSW)
- Use waitFor to assert async states

DO NOT:

- Mock useQuery itself
- Assert internal query state shape
- Use browser mode
- Assert immediately without waiting

2.3 Network Control
-------------------

- Tests MUST control all network responses
- Allowed:
    - vi.spyOn(global, "fetch")
    - MSW (preferred for larger apps)

Forbidden:

- Real APIs
- Env-dependent endpoints
- Relying on timing or backend availability

----------------------------------------------------

3. ROUTER (TanStack Router) RULES

----------------------------------------------------

3.1 Router Setup
----------------

- Use memory history ONLY in tests
- Never use real browser navigation
- Define routes using patterns ("/"), not URLs

Correct:

- path: "/"
- initialEntries controls location

Incorrect:

- path: "/users/123"

3.2 Navigation Testing
----------------------

- Assert router state, not DOM side-effects
- Example:
    - router.state.location.pathname

DO NOT:

- Simulate real navigation in unit tests
- Use page.goto in Vitest

----------------------------------------------------

4. REACT TESTING LIBRARY (RTL) RULES

----------------------------------------------------

4.1 Rendering
-------------

- Use a custom render helper (test-utils)
- Providers belong in the wrapper, not the test
- Never duplicate provider setup in every test

4.2 Queries
-----------
Preferred order:

1. getByRole
2. getByLabelText
3. getByText
4. getByTestId (last resort)

Avoid:

- querySelector
- class-based selectors
- implementation details

4.3 Async Assertions
--------------------
If state is async:

- ALWAYS use waitFor or findBy*

Never:

- Assert immediately after render
- Rely on setTimeout or arbitrary delays

----------------------------------------------------

5. WHAT NOT TO TEST

----------------------------------------------------

DO NOT test:

- Library internals
- React Query implementation
- Router internals
- Styling details (unless visual regression)

If you mock the thing you’re testing,
you’re not testing anything.


----------------------------------------------------

6. PERFORMANCE RULES

----------------------------------------------------

- Unit tests should run in milliseconds
- If a test feels slow, it is wrong
- Browser mode is forbidden for logic tests
- E2E tests should be few and meaningful

----------------------------------------------------

7. FILE STRUCTURE RULES

----------------------------------------------------

Recommended:

- src/test/
    - test-utils.tsx
    - setup.ts

- tests/e2e/
    - *.spec.ts (Playwright only)

Never mix these directories.


----------------------------------------------------

8. FAILURE RULE

----------------------------------------------------

If a test is:

- Flaky
- Timing-dependent
- Environment-dependent

It must be fixed or deleted.
A flaky test is worse than no test.


----------------------------------------------------

9. GOLDEN RULE

----------------------------------------------------

Right tool > more tools.

If you feel tempted to use a browser,
stop and ask:
"Am I testing behavior or infrastructure?"

====================================================
END OF RULES
====================================================
