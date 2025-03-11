import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Toggle from "../Toggle/Toggle"; // Adjust the import path

describe("Toggle Component", () => {
  test("renders the component with default props", () => {
    render(<Toggle />);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Show Details");
  });

  test("renders children when expanded", () => {
    render(
      <Toggle collapsed={false}>
        <p>Toggle content</p>
      </Toggle>
    );

    expect(screen.getByText("Toggle content")).toBeInTheDocument();
  });

  test("does not render children when collapsed", () => {
    render(
      <Toggle collapsed={true}>
        <p>Toggle content</p>
      </Toggle>
    );

    expect(screen.queryByText("Toggle content")).not.toBeInTheDocument();
  });

  test("calls onToggle when clicked", () => {
    const onToggleMock = jest.fn();
    render(<Toggle collapsed={true} onToggle={onToggleMock} />);

    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
    expect(onToggleMock).toHaveBeenCalledWith(false);
  });

  test("toggles state on button click", () => {
    render(<Toggle />);

    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent("Hide Details");

    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent("Show Details");
  });

  test("applies the given className", () => {
    render(<Toggle className="custom-class" />);

    const toggleElement = screen.getByRole("button").closest(".toggle");

    expect(toggleElement).toHaveClass("custom-class");
  });

  test("button has correct aria attributes", () => {
    render(<Toggle ariaControls="content-id" collapsed={true} />);

    const buttonElement = screen.getByRole("button");

    console.log("Rendered Button:", buttonElement.outerHTML);

    expect(buttonElement).toHaveAttribute("aria-controls", "content-id");
    expect(buttonElement).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(buttonElement);

    expect(buttonElement).toHaveAttribute("aria-expanded", "true");
  });
});
