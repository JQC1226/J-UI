import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Switch from "./Switch";

describe("Switch Component", () => {
  const setup = (props = {}) => {
    render(<Switch id="test-switch" {...props} />);
    return screen.getByRole("checkbox") as HTMLInputElement;
  };

  test("renders switch with default props", () => {
    const checkbox = setup();
    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toBe(false);
    expect(checkbox.disabled).toBe(false);
  });

  test("renders with checked prop", () => {
    const checkbox = setup({ checked: true });
    expect(checkbox.checked).toBe(true);
  });

  test("toggles state on click when onChange is provided", () => {
    const onChangeMock = jest.fn();
    render(<Switch id="test-switch" onChange={onChangeMock} />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

    // Click to toggle ON
    fireEvent.click(checkbox);
    console.log("Checkbox clicked, checked state:", checkbox.checked);
    console.log("onChangeMock calls:", onChangeMock.mock.calls);
    expect(onChangeMock).toHaveBeenLastCalledWith(true);

    // Click to toggle OFF
    fireEvent.click(checkbox);
    expect(onChangeMock).toHaveBeenCalledTimes(2);
    expect(onChangeMock).toHaveBeenLastCalledWith(false);
  });

  test("does not toggle state when disabled", () => {
    const onChangeMock = jest.fn();
    const checkbox = setup({ disabled: true, onChange: onChangeMock });

    fireEvent.click(checkbox);
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  test("toggles state on Enter key press when onChange is provided", async () => {
    const onChangeMock = jest.fn();
    render(<Switch id="test-switch" onChange={onChangeMock} />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

    checkbox.focus();
    fireEvent.keyDown(checkbox, { key: "Enter" });

    await waitFor(() => expect(onChangeMock).toHaveBeenCalledWith(true));

    fireEvent.keyDown(checkbox, { key: "Enter" });

    await waitFor(() => expect(onChangeMock).toHaveBeenCalledWith(false));
  });

  test("renders the switch with provided text", () => {
    const switchText = "Enable Notifications";
    render(<Switch id="test-switch" text={switchText} />);

    const textElement = screen.getByText(switchText);
    expect(textElement).toBeInTheDocument();
  });

  test("does not toggle state on Enter key press when disabled", () => {
    const onChangeMock = jest.fn();
    const checkbox = setup({ disabled: true, onChange: onChangeMock });

    // Focus the checkbox before pressing Enter
    checkbox.focus();
    fireEvent.keyDown(checkbox, { key: "Enter" });

    expect(onChangeMock).not.toHaveBeenCalled();
  });
});
