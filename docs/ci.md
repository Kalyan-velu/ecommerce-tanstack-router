# CI Documentation

This document explains the architecture and rationale of the Continuous Integration (CI) pipeline for this project.

## CI Architecture

The CI pipeline is implemented using GitHub Actions, defined in `.github/workflows/ci.yml`. It is designed to ensure
code quality, functional correctness, and buildability on every push and pull request to the `main` branch.

### Pipeline Stages

1. **Lint & Format (`quality` job)**:
    - Runs [Biome](https://biomejs.dev/) to check for linting errors and formatting inconsistencies.
    - This is the first line of defense and a prerequisite for subsequent steps.

2. **Unit Tests (`test` job)**:
    - Executes unit and integration tests using Vitest in a JSDOM environment.
    - Runs in parallel with browser tests after the quality check passes.
    - Generates a JSON report for potential annotations.

3. **Browser Tests (`test-browser` job)**:
    - Runs browser-based tests using Vitest Browser Mode and Playwright.
    - Installs necessary browser binaries and uses caching for faster execution.
    - Captures screenshots and test results as artifacts in case of failure.

4. **Merge Gate (`gate` job)**:
    - Acts as a synchronization point.
    - Evaluates the results of both `test` and `test-browser` jobs.
    - Explicitly fails if any test suite failed, effectively blocking the pipeline and preventing merging of broken
      code.

5. **Build (`build` job)**:
    - Performs the final production build (`pnpm build`).
    - Only runs if all quality checks and tests have passed.

## Rationale

### Why this architecture?

- **Fast Feedback Loop**: By running Lint/Format first, we catch trivial errors quickly before spinning up more
  resource-intensive browser tests.
- **Parallelization**: Unit tests and Browser tests run in parallel to minimize the total execution time of the
  pipeline.
- **Non-Blocking Test Execution with a Hard Gate**:
    - The test jobs are configured with `continue-on-error: true`. This allows the pipeline to continue so that we can
      collect results from *all* test suites even if one fails.
    - The `gate` job then consolidates these results. This approach provides a complete picture of the failure state (
      e.g., "Unit tests passed but Browser tests failed") rather than stopping at the first failure.
- **Environment Consistency**: Using a shared `setup-node-pnpm` action and environment variables (like `NODE_VERSION`,
  `PNPM_VERSION`, `VITE_MSW`) ensures that the CI environment closely matches the development environment.
- **Artifact Preservation**: Test reports and screenshots are uploaded as GitHub artifacts, making it easy for
  developers to debug failures that only occur in the CI environment.
