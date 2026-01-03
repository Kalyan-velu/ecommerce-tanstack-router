import {describe, expect, it} from "vitest";
import {render, screen} from "@/test-utils";
import AppBar from "../";

describe("AppNavigation Component", () => {
  it("should render a favourite button", async () => {
    render(<AppBar />);

    const favouriteButton = await screen.findByTestId("favourite-button");
    expect(favouriteButton).toBeInTheDocument();
  });
});
