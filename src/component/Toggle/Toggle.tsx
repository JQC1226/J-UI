import React, { useState } from "react";
import Button from "../Button/Button";
import "../../assets/scss/toggle.scss";

interface A11yMessages {
  collapse: string;
  expand: string;
}

interface Messages {
  collapse: string;
  expand: string;
}

interface Props {
  a11yMessages?: A11yMessages;
  messages?: Messages;
  collapsed?: boolean;
  ariaControls?: string;
  onToggle?: (value: boolean) => void;
  children?: React.ReactNode | string;
  className?: string;
}

const Toggle: React.FC<Props> = ({
  a11yMessages = { collapse: "Hide Details", expand: "Show Details" },
  messages = { collapse: "Hide Details", expand: "Show Details" },
  collapsed = true,
  ariaControls = "",
  onToggle,
  children,
  className = "",
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
    onToggle?.(!isCollapsed);
  };

  return (
    <div className={`toggle ${className}`}>
      {/* Toggle content */}
      {!isCollapsed && <div className="slot-content-wrapper">{children}</div>}

      {/* Button for toggling */}
      <Button
        ariaControls={ariaControls}
        ariaExpanded={!isCollapsed}
        messages={{
          buttonLabel: isCollapsed ? messages.expand : messages.collapse,
        }}
        a11yMessages={{
          buttonLabel: isCollapsed
            ? a11yMessages.expand
            : a11yMessages.collapse,
        }}
        className="button button-link"
        onClick={handleToggle}
      />
    </div>
  );
};

export default Toggle;
