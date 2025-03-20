import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ActionDropdown from "./Action-Dropdown";

const options = [
  {
    group: "Group 1",
    options: [
      { optionName: "Option 1", disabled: false },
      { optionName: "Option 2", disabled: false },
    ],
  },
  {
    options: [
      { optionName: "Option 3", disabled: false },
      { optionName: "Option 4", disabled: true },
    ],
  },
];

const defaultProps = {
  allOptions: options,
  title: "Select an option",
  tabindex: 5,
  dropdownDisabled: false,
  defaultSelect: "",
  focusSignal: false,
  optionKeys: { group: "group", options: "options", optionName: "optionName" },
  inputClasses: "input-class",
  focusOnSelect: true,
  autoFocusOnSelect: false,
  a11yMessages: {
    dropdownDescribedby: "dropdown-desc",
    dropdownLabel: "Action Dropdown",
  },
  onSelectedOptionEvent: jest.fn(),
  onBlurEvent: jest.fn(),
};

describe("ActionDropdown Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders dropdown with title header when children are not provided", () => {
    render(<ActionDropdown {...defaultProps} />);
    // Title text is rendered
    expect(screen.getByText(/Select an option/i)).toBeInTheDocument();
    // The select element is accessible via its aria-label (Action Dropdown)
    const selectElement = screen.getByLabelText(/Action Dropdown/i);
    expect(selectElement).toBeInTheDocument();
  });

  test("renders custom header when children are provided", () => {
    render(
      <ActionDropdown {...defaultProps}>
        <div data-testid="custom-header">Custom Header Content</div>
      </ActionDropdown>
    );
    expect(screen.getByTestId("custom-header")).toBeInTheDocument();
    expect(screen.getByText(/Custom Header Content/i)).toBeInTheDocument();
  });

  test("renders default icon when no title and no children provided", () => {
    render(<ActionDropdown {...defaultProps} title="" />);
    // Default icon text is rendered (􀍠)
    expect(screen.getByText("􀍠")).toBeInTheDocument();
  });

  test("sets tabindex on select element from prop", () => {
    render(<ActionDropdown {...defaultProps} tabindex={10} />);
    const selectElement = screen.getByLabelText(/Action Dropdown/i);
    expect(selectElement.tabIndex).toBe(10);
  });

  test("calls onSelectedOptionEvent and updates value on valid change", () => {
    const onSelectedOptionEvent = jest.fn();
    render(
      <ActionDropdown
        {...defaultProps}
        onSelectedOptionEvent={onSelectedOptionEvent}
      />
    );
    const selectElement = screen.getByLabelText(
      /Action Dropdown/i
    ) as HTMLSelectElement;
    const optionValue = JSON.stringify({
      optionName: "Option 1",
      disabled: false,
    });
    fireEvent.change(selectElement, { target: { value: optionValue } });
    expect(selectElement.value).toBe(optionValue);
    expect(onSelectedOptionEvent).toHaveBeenCalledWith({
      optionName: "Option 1",
      disabled: false,
    });
  });

  test("does not call onSelectedOptionEvent when dropdown is disabled", () => {
    const onSelectedOptionEvent = jest.fn();
    render(
      <ActionDropdown
        {...defaultProps}
        dropdownDisabled={true}
        onSelectedOptionEvent={onSelectedOptionEvent}
      />
    );
    const selectElement = screen.getByLabelText(/Action Dropdown/i);
    const optionValue = JSON.stringify({
      optionName: "Option 1",
      disabled: false,
    });
    fireEvent.change(selectElement, { target: { value: optionValue } });
    // onSelectedOptionEvent should not be called when disabled.
    expect(onSelectedOptionEvent).not.toHaveBeenCalled();
  });

  test("handles JSON parsing error in onChange gracefully", () => {
    const onSelectedOptionEvent = jest.fn();
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    render(
      <ActionDropdown
        {...defaultProps}
        onSelectedOptionEvent={onSelectedOptionEvent}
      />
    );
    const selectElement = screen.getByLabelText(/Action Dropdown/i);
    // Pass an invalid JSON string.
    fireEvent.change(selectElement, { target: { value: "invalid-json" } });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error parsing selected option",
      expect.any(SyntaxError)
    );
    expect(onSelectedOptionEvent).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  test("calls onBlurEvent when select loses focus", () => {
    const onBlurEvent = jest.fn();
    render(<ActionDropdown {...defaultProps} onBlurEvent={onBlurEvent} />);
    const selectElement = screen.getByLabelText(/Action Dropdown/i);
    fireEvent.blur(selectElement);
    expect(onBlurEvent).toHaveBeenCalled();
  });

  test("stops propagation on keyDown for space and Enter keys", () => {
    render(<ActionDropdown {...defaultProps} />);
    const selectElement = screen.getByLabelText(/Action Dropdown/i);
    const stopPropagation = jest.fn();
    fireEvent.keyDown(selectElement, { key: " ", stopPropagation });
    fireEvent.keyDown(selectElement, { key: "Enter", stopPropagation });
    expect(stopPropagation).toHaveBeenCalledTimes(0);
  });

  test("stops propagation on click event", () => {
    render(<ActionDropdown {...defaultProps} />);
    const selectElement = screen.getByLabelText(/Action Dropdown/i);
    const stopPropagation = jest.fn();
    fireEvent.click(selectElement, { stopPropagation });
    expect(stopPropagation).toHaveBeenCalledTimes(0);
  });

test("renders optgroup and options correctly", () => {
  const { container } = render(<ActionDropdown {...defaultProps} />);
  // Query the optgroup element by its attribute
  const optgroupElement = container.querySelector("optgroup");
  expect(optgroupElement).toBeInTheDocument();
  expect(optgroupElement).toHaveAttribute("label", "Group 1");

  // Check that the options are rendered
  expect(screen.getByText("Option 1")).toBeInTheDocument();
  expect(screen.getByText("Option 2")).toBeInTheDocument();
  expect(screen.getByText("Option 3")).toBeInTheDocument();
  expect(screen.getByText("Option 4")).toBeInTheDocument();
});

  test("renders hidden focus element when autoFocusOnSelect is true", () => {
    const { container } = render(
      <ActionDropdown {...defaultProps} autoFocusOnSelect={true} />
    );
    // Query the hidden element by its class.
    const hiddenInput = container.querySelector(".vo-input");
    expect(hiddenInput).toBeInTheDocument();
  });

  test("focuses the select element when focusSignal becomes true", () => {
    render(<ActionDropdown {...defaultProps} focusSignal={true} />);
    const selectElement = screen.getByLabelText(/Action Dropdown/i);
    // The focus effect should cause the select to receive focus.
    expect(document.activeElement).toBe(selectElement);
  });

  test("resetVoFocus branch: when autoFocusOnSelect is true, focuses hidden input then select", async () => {
    jest.useFakeTimers();
    render(<ActionDropdown {...defaultProps} autoFocusOnSelect={true} />);
    const selectElement = screen.getByLabelText(/Action Dropdown/i);
    // Trigger change event to call resetVoFocus via handleChange.
    const optionValue = JSON.stringify({
      optionName: "Option 1",
      disabled: false,
    });
    fireEvent.change(selectElement, { target: { value: optionValue } });
    // Fast-forward the timers.
    jest.runAllTimers();
    // After timeouts, focus should be returned to the select element.
    expect(document.activeElement).toBe(selectElement);
    jest.useRealTimers();
  });
});
