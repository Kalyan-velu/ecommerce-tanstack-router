import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { mockProducts } from "@/__mocks__/mock-product.ts";
import { HomePage } from "@/routes";
import { renderAct as renderApp } from "./e2e-test.utils.tsx";

describe("Product Listing Page - E2E", () => {
  describe("Page Load", () => {
    it("should display the page title", async () => {
      await renderApp(<HomePage />);
      const heading = page.getByRole("heading", { level: 1 });
      await expect
        .element(heading)
        .toHaveTextContent("Discover Our Collection");
    });

    it("should display the page description", async () => {
      await renderApp(<HomePage />);
      const description = page.getByText(
        "Browse through our curated selection of premium products",
      );
      await expect.element(description).toBeVisible();
    });
  });

  describe("Product Display", () => {
    it("should display product cards", async () => {
      await renderApp(<HomePage />);
      const productCards = page.getByTestId("product-card");
      await expect.element(productCards.first()).toBeVisible();
    });

    it("should display correct product count", async () => {
      const { getByTestId } = await renderApp(<HomePage />);
      const productCount = getByTestId("product-count");
      await expect.element(productCount).toBeVisible();
      await expect
        .element(productCount)
        .toHaveTextContent(`${mockProducts.length} products`);
    });
  });

  describe("Category Filtering", () => {
    it("should display all category filter tabs", async () => {
      await renderApp(<HomePage />);

      const allTab = page.getByRole("tab", { name: /all/i });
      const electronicsTab = page.getByRole("tab", { name: /electronics/i });
      const clothingTab = page.getByRole("tab", { name: /clothing/i });
      const jewelryTab = page.getByRole("tab", { name: /jewelry/i });

      await expect.element(allTab).toBeVisible();
      await expect.element(electronicsTab).toBeVisible();
      await expect.element(clothingTab).toBeVisible();
      await expect.element(jewelryTab).toBeVisible();
    });

    it("should have All tab selected by default", async () => {
      await renderApp(<HomePage />);
      const allTab = page.getByRole("tab", { name: /all/i });
      await expect.element(allTab).toHaveAttribute("aria-selected", "true");
    });

    it("should filter products when clicking electronics tab", async () => {
      await renderApp(<HomePage />);
      const electronicsTab = page.getByRole("tab", { name: /electronics/i });
      await electronicsTab.click();

      // Wait for the tab to become active
      await expect
        .element(electronicsTab)
        .toHaveAttribute("aria-selected", "true");

      // Product count should change to 2 (electronics only)
      const productCount = page.getByText("2 products");
      await expect.element(productCount).toBeVisible();
    });

    it("should filter products when clicking clothing tab", async () => {
      await renderApp(<HomePage />);

      const clothingTab = page.getByRole("tab", { name: /clothing/i });
      await clothingTab.click();
      await expect
        .element(clothingTab)
        .toHaveAttribute("aria-selected", "true");

      // Product count should change to 2 (men's + women's clothing)
      const productCount = page.getByText("2 products");
      await expect.element(productCount).toBeVisible();
    });
  });

  describe("Sorting Functionality", () => {
    it("should display sort dropdown", async () => {
      await renderApp(<HomePage />);
      const sortDropdownTrigger = page.getByTestId("sort-by-trigger");
      await expect.element(sortDropdownTrigger).toBeVisible();
    });

    it.skip("should open sort dropdown when clicked", async () => {
      await renderApp(<HomePage />);

      const sortDropdownTrigger = page.getByTestId("sort-by-trigger");
      await sortDropdownTrigger.click();
      const sortDropdown = page.getByTestId("sort-by-content");
      await expect
        .element(sortDropdown, {
          timeout: 10000,
        })
        .toBeInTheDocument();
    }, 30000);

    it.skip("should sort products when selecting price low to high", async () => {
      await renderApp(<HomePage />);

      const sortDropdownTrigger = page.getByTestId("sort-by-trigger");
      await sortDropdownTrigger.click();

      const dropdown = page.getByTestId("sort-by-content");

      // Wait for the dropdown to be visible (data-closed attribute should disappear)
      await expect
        .element(dropdown, {
          timeout: 10000,
        })
        .toBeVisible();

      const lowToHighOption = dropdown.getByTestId("sort-by-item-price-asc");
      await lowToHighOption.click();

      await expect
        .element(sortDropdownTrigger)
        .toHaveTextContent(/Price: Low to High/i);
    }, 30000);
  });

  describe("Search Functionality", () => {
    it("should show empty state when no products match search", async () => {
      await renderApp(<HomePage />, {
        preloadedState: {
          favorites: { favourites: [] },
          filters: {
            category: "all",
            sort: null,
            search: "nonexistentproduct12345",
          },
        },
      });
      const title = page.getByTestId("empty-state-title");
      await expect.element(title).toHaveTextContent("No products found");
    });
  });

  describe("Favourites Functionality", () => {
    it("should add product to favourites when clicking favourite button", async () => {
      await renderApp(<HomePage />);

      // Find the first favourite toggle button
      const favouriteToggle = page
        .getByRole("button", { name: /add to favorites/i })
        .first();
      await favouriteToggle.click();

      // Verify the button text changed to "Remove from Favorites"
      const removeButton = page
        .getByRole("button", { name: /remove from favorites/i })
        .first();
      await expect.element(removeButton).toBeVisible();
    });

    it("should remove product from favourites when clicking again", async () => {
      await renderApp(<HomePage />);

      // Add to favourites first
      const addButton = page
        .getByRole("button", { name: /add to favorites/i })
        .first();
      await addButton.click();

      // Then remove
      const removeButton = page
        .getByRole("button", { name: /remove from favorites/i })
        .first();
      await removeButton.click();

      // Verify it's back to "Add to Favorites"
      const addButtonAgain = page
        .getByRole("button", { name: /add to favorites/i })
        .first();
      await expect.element(addButtonAgain).toBeVisible();
    });
  });
});
