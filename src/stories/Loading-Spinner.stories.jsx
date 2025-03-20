import LoadingSpinner from "../component/Loading-Spinner/Loading-Spinner";

const meta = {
  title: "Components/LoadingSpinner",
  component: LoadingSpinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    isLoading: true,
    a11yMessages: { loadingSpinnerLabel: "Loading" },
    isFocusable: false,
    zIndex: 10,
  },
};

export default meta;

export const Default = {};

export const WithA11yMessage = {
  args: {
    a11yMessages: { loadingSpinnerLabel: "Screen Reader Loading" },
  },
};

export const NotLoading = {
  args: {
    isLoading: false,
  },
};

export const Focusable = {
  args: {
    isFocusable: true,
  },
};
