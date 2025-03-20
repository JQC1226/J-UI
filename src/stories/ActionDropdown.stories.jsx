import { fn } from "@storybook/test";
import ActionDropdown from "../component/Action-Dropdown/Action-Dropdown";

const meta = {
  title: "Components/ActionDropdown",
  component: ActionDropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    allOptions: [
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
    ],
    title: "Select an option",
    tabindex: 0,
    dropdownDisabled: false,
    defaultSelect: "",
    focusSignal: false,
    optionKeys: { group: "group", options: "options", optionName: "optionName" },
    inputClasses: "",
    focusOnSelect: true,
    autoFocusOnSelect: false,
    a11yMessages: { dropdownDescribedby: "dropdown-desc", dropdownLabel: "Action Dropdown" },
    onSelectedOptionEvent: fn(),
    onBlurEvent: fn(),
  },
};

export default meta;

export const Default = {};

export const Disabled = {
  args: {
    dropdownDisabled: true,
  },
};

export const WithCustomHeader = {
  args: {
    title: "Custom Header",
  },
  render: (args) => (
    <ActionDropdown {...args}>
      <div style={{ background: "#eee", padding: "8px" }}>
        Custom Header Content
      </div>
    </ActionDropdown>
  ),
};
