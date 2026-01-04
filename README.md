# E-Commerce Task Application

A modern e-commerce product listing and management application built with the latest React ecosystem.

## 🚀 Overview

This application serves as a comprehensive example of a product catalog where users can browse, filter, search, and
manage their favorite products. It demonstrates best practices in routing, state management, data fetching, and
automated testing.

### Key Features

- **Product Discovery**: Browse a diverse collection of products with a clean and responsive UI.
- **Dynamic Filtering**: Filter products by categories (e.g., Electronics, Clothing, Jewelry).
- **Advanced Sorting**: Sort products by Price (Low to High, High to Low) and Name (A-Z, Z-A).
- **Real-time Search**: Find specific products using the search bar with instant feedback.
- **Favorites Management**: Save products to your favorites list for quick access.
- **Product Details**: View detailed information for each product.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Mocked Backend**: Uses MSW (Mock Service Worker) for reliable data fetching without a real backend.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Testing
  **: [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/), [React Testing Library](https://testing-library.com/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)
- **API Mocking**: [MSW](https://mswjs.io/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 recommended)
- [pnpm](https://pnpm.io/) (v10 recommended)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
pnpm build
```

## 🧪 Testing

This project has a robust testing setup. For detailed information, see [Testing Documentation](./docs/testing.md).

```bash
# Run unit and integration tests
pnpm test:unit

# Run browser and E2E tests
pnpm test:e2e
```

## ⚙️ CI/CD

The project uses GitHub Actions for continuous integration. For details on the architecture and rationale,
see [CI Documentation](./docs/ci.md).

## 🧹 Linting & Formatting

We use Biome for maintaining code quality:

```bash
pnpm lint      # Check for linting issues
pnpm format    # Format the codebase
pnpm check     # Run both linting and formatting checks
```

## 📂 Project Structure

- `src/routes/`: File-based routing definitions.
- `src/components/`: Reusable UI components.
- `src/features/`: Feature-specific logic (e.g., favorites, filters).
- `src/integrations/`: Third-party integration setups (TanStack Query, Redux).
- `e2e/`: Browser-based tests and visual regression baselines.
- `docs/`: Detailed project documentation.
