import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@/test-utils";
import AppBar from "../";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    Link: ({
      children,
      to,
      ...props
    }: {
      children: React.ReactNode;
      to: string;
      [key: string]: unknown;
    }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

describe("AppNavigation Component", () => {
  it("should render a favourite button", async () => {
    render(<AppBar />, {
      preloadedState: {
        favorites: { favourites: [] },
        filters: { category: "all", sort: null, search: "" },
      },
    });

    const favouriteButton = await screen.findByTestId("favourite-button");
    expect(favouriteButton).toBeInTheDocument();
  });
});
