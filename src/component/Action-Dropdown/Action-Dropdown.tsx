import React, {
  FC,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import "../../assets/scss/actionDropdown.scss";

interface Option {
  [key: string]: any;
  disabled?: boolean;
}

interface GroupOption {
  [key: string]: any;
}

interface OptionKeys {
  group: string;
  options: string;
  optionName: string;
}

interface A11yMessages {
  dropdownDescribedby?: string;
  dropdownLabel?: string;
}

export interface ActionDropdownProps {
  /**
   * Input data to the dropdown.
   */
  allOptions: GroupOption[];
  customClass?: string;
  /**
   * ID for the dropdown.
   */
  id?: string;
  /**
   * Title for the dropdown.
   */
  title?: string;
  /**
   * tabindex value for the dropdown.
   */
  tabindex?: number;
  /**
   * Disable dropdown.
   */
  dropdownDisabled?: boolean;
  /**
   * Default option to be selected.
   */
  defaultSelect?: string;
  /**
   * Indicates dropdown should be focused.
   */
  focusSignal?: boolean;
  /**
   * Data keys for the HTML select element to render the options.
   */
  optionKeys?: OptionKeys;
  inputClasses?: string;
  focusOnSelect?: boolean;
  autoFocusOnSelect?: boolean;
  /**
   * Aria messages for the dropdown.
   */
  a11yMessages?: A11yMessages;
  /**
   * Callback fired when an option is selected.
   */
  onSelectedOptionEvent?: (selectedOption: any) => void;
  /**
   * Callback fired on blur.
   */
  onBlurEvent?: () => void;
  /**
   * Children to render as a custom header.
   */
  children?: React.ReactNode;
}

const ActionDropdown: FC<ActionDropdownProps> = ({
  allOptions,
  customClass = "action-bg",
  id = "",
  title = "",
  tabindex = 0,
  dropdownDisabled = false,
  defaultSelect = "",
  focusSignal = false,
  optionKeys = { group: "group", options: "options", optionName: "optionName" },
  inputClasses = "",
  focusOnSelect = true,
  autoFocusOnSelect = false,
  a11yMessages = { dropdownDescribedby: "", dropdownLabel: "" },
  onSelectedOptionEvent,
  onBlurEvent,
  children,
}) => {
  // Use state to track the selected option.
  const [selectedValue, setSelectedValue] = useState<string>(defaultSelect);
  const selectRef = useRef<HTMLSelectElement>(null);
  const focusHiddenInputRef = useRef<HTMLSpanElement>(null);

  // Instead of a message factory, we use a hard-coded string for the role description.
  const menuButtonRoleDescription = "Menu Button";
  const ariaLabel = a11yMessages.dropdownLabel || title;
  const iconClasses = `action-button sf-symbol ${customClass} ${
    dropdownDisabled ? "disabled" : ""
  }`;

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.tabIndex = tabindex;
    }
  }, [tabindex]);

  // Watch focusSignal prop to focus the dropdown when needed.
  useEffect(() => {
    if (focusSignal) {
      focus();
    }
  }, [focusSignal]);

  const focus = () => {
    if (selectRef.current) {
      selectRef.current.tabIndex = 0;
      selectRef.current.focus();
    }
  };

  const resetVoFocus = () => {
    if (autoFocusOnSelect) {
      setTimeout(() => {
        if (focusHiddenInputRef.current) {
          focusHiddenInputRef.current.focus();
        } else {
          console.error("focusHiddenInput is not present");
        }
        setTimeout(() => {
          focus();
        }, 350);
      }, 200);
    } else {
      focus();
    }
  };

  // Instead of resetting the selected value to the default, we update it so that the selection remains visible.
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (dropdownDisabled) return;

    const newValue = e.target.value;
    setSelectedValue(newValue);

    try {
      const selectedOption = JSON.parse(newValue);
      onSelectedOptionEvent && onSelectedOptionEvent(selectedOption);
    } catch (err) {
      console.error("Error parsing selected option", err);
    }

    // Optionally, trigger focus reset if desired.
    if (focusOnSelect) {
      resetVoFocus();
    }
  };

  const handleBlur = () => {
    if (dropdownDisabled) return;
    onBlurEvent && onBlurEvent();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.stopPropagation();
    }
  };

  const handleClick = (e: ReactMouseEvent<HTMLSelectElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`action-dropdown ${dropdownDisabled ? "disabled-all" : ""} ${
        title ? "action-button-with-title" : ""
      }`}
    >
      {children ? (
        children
      ) : title ? (
        <span className="action-header">
          <span className="title lg" aria-hidden="true">
            {title}{" "}
          </span>
          {/* Chevron down icon */}
          <span aria-hidden="true" className="sf-symbol dropdown-arrow-icon">
            􀆈
          </span>
        </span>
      ) : (
        <span aria-hidden="true" className={iconClasses}>
          􀍠
        </span>
      )}

      <select
        id={id}
        ref={selectRef}
        value={selectedValue}
        title={title}
        aria-label={ariaLabel}
        aria-describedby={a11yMessages.dropdownDescribedby}
        aria-roledescription={menuButtonRoleDescription}
        disabled={dropdownDisabled}
        className={`md ${inputClasses}`}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      >
        {!dropdownDisabled &&
          allOptions.map((groupOptions, groupIndex) => {
            if (groupOptions[optionKeys.group]) {
              return (
                <optgroup
                  key={`${groupOptions[optionKeys.group]}${groupIndex}`}
                  label={groupOptions[optionKeys.group]}
                  className="muted"
                >
                  {(groupOptions[optionKeys.options] as Option[]).map(
                    (option, index2) => (
                      <option
                        key={`${option[optionKeys.optionName]}${index2}`}
                        value={JSON.stringify(option)}
                        disabled={option.disabled}
                        className="copy"
                      >
                        {option[optionKeys.optionName]}
                      </option>
                    )
                  )}
                </optgroup>
              );
            } else {
              return (groupOptions[optionKeys.options] as Option[]).map(
                (option, index3) => (
                  <option
                    key={`${option[optionKeys.optionName]}${index3}`}
                    value={JSON.stringify(option)}
                    disabled={option.disabled}
                  >
                    {option[optionKeys.optionName]}
                  </option>
                )
              );
            }
          })}
      </select>

      {autoFocusOnSelect && (
        <span
          ref={focusHiddenInputRef}
          className="a11y vo-input"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
    </div>
  );
};

export default ActionDropdown;
