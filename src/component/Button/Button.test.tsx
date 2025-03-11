import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button"; // Adjust the path accordingly

describe("Button Component", () => {
  test("renders the button with default props", () => {
    render(<Button />);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("");
  });

  test("renders the button with provided text", () => {
    render(<Button messages={{ buttonLabel: "Click Me" }} />);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveTextContent("Click Me");
  });

  test("renders the a11y message correctly", () => {
    render(
      <Button
        messages={{ buttonLabel: "Visible Text" }}
        a11yMessages={{ buttonLabel: "Screen Reader Text" }}
      />
    );

    // Verify the visually hidden message is present
    const a11yMessage = screen.getByText("Screen Reader Text");
    expect(a11yMessage).toBeInTheDocument();
    expect(a11yMessage).toHaveClass("a11y"); // Ensure it's using the a11y class
  });

  test("calls onClick function when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} />);
    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("does not throw error when clicked without onClick prop", () => {
    render(<Button />);
    const buttonElement = screen.getByRole("button");

    expect(() => fireEvent.click(buttonElement)).not.toThrow();
  });
});
