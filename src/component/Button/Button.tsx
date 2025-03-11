import React from "react";
import "../../assets/scss/button.scss";

interface Messages {
  buttonLabel?: string;
}

interface A11yMessages {
  buttonLabel?: string;
}

interface Props {
  messages?: Messages;
  a11yMessages?: A11yMessages;
  ariaControls?: string;
  ariaExpanded?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<Props> = ({
  messages = { buttonLabel: "" },
  a11yMessages = { buttonLabel: "" },
  ariaControls = "button",
  className = "button",
  ariaExpanded,
  onClick,
}) => {
  return (
    <button
      className={className}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      {a11yMessages.buttonLabel ? (
        <>
          <span aria-hidden="true">{messages.buttonLabel}</span>
          <span className="a11y">{a11yMessages.buttonLabel}</span>
        </>
      ) : (
        <span>{messages.buttonLabel}</span>
      )}
    </button>
  );
};

export default Button;
