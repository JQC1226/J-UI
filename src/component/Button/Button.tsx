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
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  messages = { buttonLabel: "" },
  a11yMessages = { buttonLabel: "" },
  onClick,
}) => {
  return (
    <button
      className="button"
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
