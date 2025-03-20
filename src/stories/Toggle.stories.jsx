import { fn } from "@storybook/test";
import Toggle from "../component/Toggle/Toggle";

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
}

export default meta;

export const Default = {};

export const Expanded= {
  args: {
    collapsed: false,
  },
};

export const CustomStyled= {
  args: {
    className: "button",
  },
};

export const WithLongContent= {
  args: {
    collapsed: false,
    children: <p>this is the toggle</p>,
  },
};
