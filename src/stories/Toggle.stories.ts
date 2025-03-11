import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Toggle from "../component/Toggle/Toggle"; // Adjust the import path

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    messages: { collapse: "Hide Content", expand: "Show Content" },
    a11yMessages: { collapse: "Click to hide", expand: "Click to show" },
    collapsed: true, 
    onToggle: fn(), 
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Expanded: Story = {
  args: {
    collapsed: false, 
  },
};

export const CustomStyled: Story = {
  args: {
    className: "button",
  },
};

export const WithLongContent: Story = {
  args: {
    collapsed: false,
    children: (`
        This is a longer paragraph of content inside the toggle component. You can add as much content as
        you need to test how it expands and collapses.
      `)
  },
};
