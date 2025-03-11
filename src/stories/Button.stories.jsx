import { fn } from "@storybook/test";

import Button from "../component/Button/Button"; 

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
}

export default meta;

export const Default = {};

export const WithA11yMessage = {
  args: {
    messages: { buttonLabel: "Visible Text " },
    a11yMessages: { buttonLabel: "This message is for screen readers" },
  },
};

export const Disabled = {
  args: {
    messages: { buttonLabel: "Disabled Button" },
    a11yMessages:{buttonLabel: ""},
    onClick: undefined, 
  },
};
