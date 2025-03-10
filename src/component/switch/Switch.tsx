import React, { useState } from "react";
import "../../assets/scss/switch.scss";

interface SwitchProps {
  id: string;
  checked?: boolean;
  text?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

function Switch({
  id,
  checked = false,
  text = "",
  disabled = false,
  onChange,
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  function handleToggle() {
    if (onChange) {
      setIsChecked((previousChecked) => !previousChecked);
    }
  }

  function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (onChange) {
        setIsChecked((previousChecked) => !previousChecked);
      }
    }
  }

  return (
    <div className="switch">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        disabled={disabled}
        onChange={handleToggle}
        onKeyDown={handleKeydown}
      />
      <label htmlFor={id} className="switch-label">
        {text && <span className="switch-text">{text}</span>}
        <span className="toggle-indicator" />
      </label>
    </div>
  );
}

export default Switch;
