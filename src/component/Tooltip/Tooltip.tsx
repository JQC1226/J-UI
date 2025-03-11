import React, { useEffect, useRef } from "react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import "tippy.js/dist/tippy.css";

interface TooltipProps {
  text: string; 
  options?: Partial<TippyInstance["props"]>;
  show?: boolean; 
  disable?: boolean;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  options = {},
  show = false,
  disable = false,
  children,
}) => {
  const tooltipRef = useRef<HTMLElement | null>(null); 
  const tippyInstance = useRef<TippyInstance | null>(null);
  const defaultTippyOptions: Partial<TippyInstance["props"]> = {
    arrow: true,
    duration: 0,
    hideOnClick: true,
    interactive: false,
    placement: "bottom",
    theme: "nectar",
    touch: false,
    aria: {
      content: "auto",
      expanded: "auto",
    },
  };

  useEffect(() => {
    if (!tooltipRef.current) return;
    tippyInstance.current = tippy(tooltipRef.current, {
      ...defaultTippyOptions,
      ...options,
      content: text,
    });
    if (disable) {
      tippyInstance.current.disable();
    }

    return () => {
      tippyInstance.current?.destroy();
    };
  }, [options, disable, text]);

  useEffect(() => {
    if (!tippyInstance.current) return;
    show ? tippyInstance.current.show() : tippyInstance.current.hide();
  }, [show]);


  useEffect(() => {
    if (!tippyInstance.current) return;
    tippyInstance.current.setContent(text);
  }, [text]);

  return (
    <span ref={tooltipRef} className="tooltip">
      {children}
    </span>
  );
};

export default Tooltip;
