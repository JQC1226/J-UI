import React, { useState } from "react";
import { fn } from "@storybook/test";
import Modal from "../component/Modal/Modal"; 

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  args: {
    modelValue: true,
    width: "400px",
    height: "300px",
    closeButton: true,
    a11yMessage: { closeButtonAriaLabel: "Close the modal" },
    teleportTo: "body",
    appContentId: "app",
    isAlert: false,
    persistent: false,
    focusPrevElementOnModalClose: true,
    onClose: fn(),
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(args.modelValue);

  return (
    <div id="app">
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal {...args} modelValue={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Content</h2>
        <p>This is an example of the modal.</p>
      </Modal>
    </div>
  );
};

export const Default = Template.bind({});

export const WithoutCloseButton = Template.bind({});
WithoutCloseButton.args = {
  closeButton: false,
};

export const PersistentModal = Template.bind({});
PersistentModal.args = {
  persistent: true,
};
