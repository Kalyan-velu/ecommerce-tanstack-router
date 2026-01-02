import {describe, expect, it} from "vitest";
import {render, screen, userEvent} from "../../test-utils";
import AppBar from "../app-navigation";

describe("AppNavigation Component", () => {
  it("should render the header with menu button", async () => {
    render(<AppBar />);

    const menuButton = await screen.findByLabelText("Open menu");
    expect(menuButton).toBeInTheDocument();

    const logo = screen.getByAltText("TanStack Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should open sidebar when menu button is clicked", async () => {
    const user = userEvent.setup();
    render(<AppBar />);

    const menuButton = await screen.findByLabelText("Open menu");
    await user.click(menuButton);

    // Sidebar should now be visible
    const navigation = await screen.findByText("Navigation");
    expect(navigation).toBeInTheDocument();

    const closeButton = screen.getByLabelText("Close menu");
    expect(closeButton).toBeInTheDocument();
  });

  it("should close sidebar when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<AppBar />);

    // Open sidebar
    const menuButton = await screen.findByLabelText("Open menu");
    await user.click(menuButton);

    // Close sidebar
    const closeButton = await screen.findByLabelText("Close menu");
    await user.click(closeButton);

    // Sidebar should have the translation class for hiding
    const aside = screen.getByRole("complementary");
    expect(aside).toHaveClass("-translate-x-full");
  });

  it("should render navigation links", async () => {
    const user = userEvent.setup();
    render(<AppBar />);

    // Open sidebar
    const menuButton = await screen.findByLabelText("Open menu");
    await user.click(menuButton);

    // Check for navigation links
    const homeLink = await screen.findByText("Home");
    expect(homeLink).toBeInTheDocument();

    const tanstackQueryLink = screen.getByText("TanStack Query");
    expect(tanstackQueryLink).toBeInTheDocument();
  });

  it("should close sidebar when navigation link is clicked", async () => {
    const user = userEvent.setup();
    render(<AppBar />);

    // Open sidebar
    const menuButton = await screen.findByLabelText("Open menu");
    await user.click(menuButton);

    // Click home link
    const homeLink = await screen.findByText("Home");
    await user.click(homeLink);

    // Sidebar should be closed
    const aside = screen.getByRole("complementary");
    expect(aside).toHaveClass("-translate-x-full");
  });
});
