import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Tooltip from "./Tooltip";
import "@testing-library/jest-dom";

// Helper function to retrieve tooltip content from document.body
const getTippyContent = () => document.querySelector(".tippy-content");

describe("Tooltip component", () => {
  const defaultText = "desired tooltip text here";

  const renderTooltip = (
    props: Partial<React.ComponentProps<typeof Tooltip>> = {}
  ) =>
    render(
      <Tooltip text={defaultText} {...props}>
        <span data-testid="tooltip-target" className="custom-content">
          Desired Element to attach a tooltip
        </span>
      </Tooltip>
    );

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should show tooltip with text after mouse hover the element in slot", async () => {
    await waitFor(() => {
      renderTooltip({ text: defaultText });
    });

    const targetElement = screen.findByTestId("tooltip-target");

    expect(getTippyContent()).toBeNull();

    fireEvent.mouseEnter(await targetElement);
  });

  it("should show tooltip when `show` prop is true", async () => {
    renderTooltip({ show: true });

    await waitFor(() => {
      expect(getTippyContent()).not.toBeNull();
      expect(getTippyContent()).toHaveTextContent(defaultText);
    });
  });

  it("should update tooltip text when `text` prop changes", async () => {
    const { rerender } = renderTooltip({ show: true });

    await waitFor(() => {
      expect(getTippyContent()).toHaveTextContent(defaultText);
    });

    const newText = "updated tooltip text";
    rerender(
      <Tooltip text={newText} show={true}>
        <span data-testid="tooltip-target">
          Desired Element to attach a tooltip
        </span>
      </Tooltip>
    );
  });

  it("should hide tooltip when `disable` prop is true", async () => {
    renderTooltip({ disable: true, show: true });

    await waitFor(() => {
      expect(getTippyContent()).toBeNull();
    });
  });

  it("should hide tooltip when `show` prop is false", async () => {
    const { rerender } = renderTooltip({ show: true });

    await waitFor(() => {
      expect(getTippyContent()).not.toBeNull();
      expect(getTippyContent()).toHaveTextContent(defaultText);
    });

    rerender(
      <Tooltip text={defaultText} show={false}>
        <span data-testid="tooltip-target">
          Desired Element to attach a tooltip
        </span>
      </Tooltip>
    );

    await waitFor(() => {
      expect(getTippyContent()).toBeNull();
    });
  });
});
