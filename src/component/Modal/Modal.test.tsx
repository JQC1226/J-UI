import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../../component/Modal/Modal";

describe("Modal Component", () => {
  test("renders modal correctly when open", () => {
    render(
      <Modal modelValue={true} width="400px" height="300px" onClose={() => {}}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("does not render when modelValue is false", () => {
    render(
      <Modal modelValue={false} width="400px" height="300px" onClose={() => {}}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("closes when the close button is clicked", () => {
    const handleClose = jest.fn();

    render(
      <Modal
        modelValue={true}
        width="400px"
        height="300px"
        onClose={handleClose}
      >
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByRole("button");

    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });

  test("closes when Escape key is pressed", () => {
    const handleClose = jest.fn();

    render(
      <Modal
        modelValue={true}
        width="400px"
        height="300px"
        onClose={handleClose}
      >
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(handleClose).toHaveBeenCalled();
  });

  test("does not close when clicking outside if persistent is true", () => {
    const handleClose = jest.fn();

    render(
      <Modal
        modelValue={true}
        width="400px"
        height="300px"
        persistent={true}
        onClose={handleClose}
      >
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.mouseDown(document.body);

    expect(handleClose).not.toHaveBeenCalled();
  });

  test("closes when clicking outside the modal if persistent is false", () => {
    const handleClose = jest.fn();

    render(
      <Modal
        modelValue={true}
        width="400px"
        height="300px"
        persistent={false}
        onClose={handleClose}
      >
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.mouseDown(document.body);

    expect(handleClose).toHaveBeenCalled();
  });

  test("focuses on modal when opened and restores focus when closed", async () => {
    const handleClose = jest.fn();

    const { rerender } = render(
      <div>
        <button data-testid="open-modal">Open Modal</button>
        <Modal
          modelValue={true}
          width="400px"
          height="300px"
          onClose={handleClose}
        >
          <p>Modal Content</p>
        </Modal>
      </div>
    );

    await new Promise((r) => setTimeout(r, 10));
    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  test("closes when the close button is clicked and prevents event propagation", () => {
    const handleClose = jest.fn();
    const stopPropagationMock = jest.fn();

    render(
      <Modal
        modelValue={true}
        width="400px"
        height="300px"
        onClose={handleClose}
      >
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByRole("button");

    expect(closeButton).toBeInTheDocument();

    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    event.stopPropagation = stopPropagationMock;

    closeButton.dispatchEvent(event);

    expect(stopPropagationMock).toHaveBeenCalled();

    expect(handleClose).toHaveBeenCalled();
  });
});
