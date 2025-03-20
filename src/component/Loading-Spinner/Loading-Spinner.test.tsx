import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "./Loading-Spinner";

describe("LoadingSpinner Component", () => {
  test("renders spinner correctly when isLoading is true", () => {
    render(<LoadingSpinner isLoading={true} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("does not render when isLoading is false", () => {
    render(<LoadingSpinner isLoading={false} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("renders with correct aria-label and tabIndex when isFocusable is true", () => {
    render(
      <LoadingSpinner
        isLoading={true}
        isFocusable={true}
        a11yMessages={{ loadingSpinnerLabel: "Accessible Loading" }}
      />
    );

    const spinnerElement = screen.getByRole("img");
    expect(spinnerElement).toHaveAttribute("aria-label", "Accessible Loading");
    expect(spinnerElement).toHaveAttribute("tabIndex", "0");
  });

  test("does not render when isLoading is false", () => {
    render(<LoadingSpinner isLoading={false} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("defaults isLoading to false when not provided", () => {
    render(<LoadingSpinner />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("renders with correct tabIndex when isFocusable is false", () => {
    render(
      <LoadingSpinner
        isLoading={true}
        isFocusable={false}
        a11yMessages={{ loadingSpinnerLabel: "Accessible Loading" }}
      />
    );

    const spinnerElement = screen.getByRole("img");
    expect(spinnerElement).toHaveAttribute("tabIndex", "-1");
  });

  test("applies correct z-index style", () => {
    const testZIndex = 20;
    render(<LoadingSpinner isLoading={true} zIndex={testZIndex} />);

    const container = screen.getByRole("img").parentElement;
    expect(container).toHaveStyle(`z-index: ${testZIndex}`);
  });
});
