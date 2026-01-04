import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { mockProducts } from "@/__mocks__/mock-product.ts";
import { ToggleFavourite } from "@/components/product/toggle-favourite.tsx";
import { render, screen } from "@/test-utils";

describe("Toggle Favourite Component", () => {
  it('should render "Remove from Favorites" button when product is in favourites', () => {
    const product = mockProducts[0];
    // Preload state with product already in favorites
    render(<ToggleFavourite product={product} />, {
      preloadedState: {
        favorites: {
          favourites: [product],
        },
        filters: {
          category: "all",
          sort: "price-asc",
          search: "",
        },
      },
    });

    const button = screen.getByRole("button", {
      name: /remove from favorites/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-favorite", "true");
  });

  it('should render "Add to Favorites" button when product is not in favourites', () => {
    const product = mockProducts[1];
    // Empty favorites state
    render(<ToggleFavourite product={product} />, {
      preloadedState: {
        favorites: {
          favourites: [],
        },
        filters: {
          category: "all",
          sort: "price-asc",
          search: "",
        },
      },
    });

    const button = screen.getByRole("button", { name: /add to favorites/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-favorite");
  });

  it('should toggle from "Add" to "Remove" when button is clicked', async () => {
    const user = userEvent.setup();
    const product = mockProducts[0];

    const { store } = render(<ToggleFavourite product={product} />, {
      preloadedState: {
        favorites: {
          favourites: [],
        },
        filters: {
          category: "all",
          sort: "price-asc",
          search: "",
        },
      },
    });

    // Initially should show "Add to Favorites"
    const addButton = screen.getByRole("button", { name: /add to favorites/i });
    expect(addButton).toBeInTheDocument();
    expect(store.getState().favorites.favourites).toHaveLength(0);

    // Click to add to favorites
    await user.click(addButton);

    // Should now show "Remove from Favorites"
    const removeButton = screen.getByRole("button", {
      name: /remove from favorites/i,
    });
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveAttribute("data-favorite", "true");
    expect(store.getState().favorites.favourites).toHaveLength(1);
    expect(store.getState().favorites.favourites[0].id).toBe(product.id);
  });

  it('should toggle from "Remove" to "Add" when button is clicked', async () => {
    const user = userEvent.setup();
    const product = mockProducts[0];

    const { store } = render(<ToggleFavourite product={product} />, {
      preloadedState: {
        favorites: {
          favourites: [product],
        },
        filters: {
          category: "all",
          sort: "price-asc",
          search: "",
        },
      },
    });

    // Initially should show "Remove from Favorites"
    const removeButton = screen.getByRole("button", {
      name: /remove from favorites/i,
    });
    expect(removeButton).toBeInTheDocument();
    expect(store.getState().favorites.favourites).toHaveLength(1);

    // Click to remove from favorites
    await user.click(removeButton);

    // Should now show "Add to Favorites"
    const addButton = screen.getByRole("button", { name: /add to favorites/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute("data-favorite", "false");
    expect(store.getState().favorites.favourites).toHaveLength(0);
  });
});
