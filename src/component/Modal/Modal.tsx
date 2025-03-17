import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "../../assets/scss/modal.scss";

interface A11yMessage {
  closeButtonAriaLabel?: string;
}

interface ModalProps {
  modelValue: boolean;
  closeButton?: boolean;
  a11yMessage?: A11yMessage;
  width: string;
  height: string;
  persistent?: boolean;
  teleportTo?: string;
  appContentId?: string;
  isAlert?: boolean;
  focusPrevElementOnModalClose?: boolean;
  ariaLabelledby?: string;
  classes?: string[] | string | Record<string, boolean>;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  modelValue,
  closeButton = true,
  a11yMessage = { closeButtonAriaLabel: "" },
  width,
  height,
  persistent = false,
  teleportTo = "body",
  appContentId = "app",
  isAlert = false,
  focusPrevElementOnModalClose = true,
  ariaLabelledby = "",
  classes = [],
  onClose,
  children,
}) => {
  const lastElementFocusedBeforeModalOpen = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const contentRole = isAlert ? "alertdialog" : "dialog";
  const contentStyle = { width, height };

  useEffect(() => {
    if (modelValue) {
      lastElementFocusedBeforeModalOpen.current =
        document.activeElement as HTMLElement;

      document.getElementById(appContentId)?.setAttribute("inert", "true");

      contentRef.current?.focus();
    } else {
      document.getElementById(appContentId)?.removeAttribute("inert");

      if (focusPrevElementOnModalClose) {
        lastElementFocusedBeforeModalOpen.current?.focus();
      }
    }

    return () => {
      document.getElementById(appContentId)?.removeAttribute("inert");
    };
  }, [modelValue, appContentId, focusPrevElementOnModalClose]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !persistent &&
      contentRef.current &&
      !contentRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (modelValue) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modelValue]);

  if (!modelValue) return null;

  return ReactDOM.createPortal(
    <div
      className={`modal ${
        Array.isArray(classes) ? classes.join(" ") : classes
      }`}
    >
      <div className="content-wrapper">
        <div
          ref={contentRef}
          className="content"
          role={contentRole}
          aria-labelledby={ariaLabelledby}
          aria-modal="true"
          tabIndex={-1}
          style={contentStyle}
        >
          {closeButton && (
            <button
              className="close-button"
              aria-label={a11yMessage.closeButtonAriaLabel}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <span aria-hidden="true" className="sf-symbol md" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.querySelector(teleportTo) as Element
  );
};

export default Modal;
