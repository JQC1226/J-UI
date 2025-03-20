import React from "react";
import "../../assets/scss/loading-spinner.scss"

interface A11yMessages {
  loadingSpinnerLabel?: string;
}

interface SpinnerProps {
  isLoading?: boolean;
  a11yMessages?: A11yMessages;
  isFocusable?: boolean;
  zIndex?: number;
}

const LoadingSpinner: React.FC<SpinnerProps> = ({
  isLoading = false,
  a11yMessages = { loadingSpinnerLabel: "Loading" },
  isFocusable = false,
  zIndex = 10,
}) => {
  if (!isLoading) return null;

  const style: React.CSSProperties = {
    zIndex,
  };

  return (
    <div className="loading-spinner" style={style}>
      <span
        aria-label={a11yMessages.loadingSpinnerLabel}
        tabIndex={isFocusable ? 0 : -1}
        className="loading-indicator"
        role="img"
      />
    </div>
  );
};

export default LoadingSpinner;
