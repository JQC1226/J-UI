import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "../../src/component/Button/Button"; // Adjust the path based on your structure

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    messages: { buttonLabel: "Click Me " },
    a11yMessages: { buttonLabel: "Press this button to submit the form" },
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithA11yMessage: Story = {
  args: {
    messages: { buttonLabel: "Visible Text " },
    a11yMessages: { buttonLabel: "This message is for screen readers" },
  },
};

export const Disabled: Story = {
  args: {
    messages: { buttonLabel: "Disabled Button" },
    a11yMessages:{buttonLabel: ""},
    onClick: undefined, // Prevents clicking
  },
};
