import React, { useState, useEffect } from "react";
import "../../assets/scss/switch.scss";

interface SwitchProps {
  id: string;
  checked?: boolean;
  text?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({
  id,
  checked = false,
  text = "",
  disabled = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    if (disabled) return;
    setIsChecked((prev) => {
      const newChecked = !prev;
      onChange?.(newChecked); 
      return newChecked;
    });
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleToggle();
    }
  };

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
};

export default Switch;
