import { type ReactNode, useState, useRef, useEffect } from "react";
import { cx } from "@ui/variants";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  "data-slot"?: string;
};

export function Tooltip({ content, children, side = "top", className, "data-slot": dataSlot = "tooltip" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => { clearTimeout(timeoutRef.current); setVisible(true); };
  const hide = () => { timeoutRef.current = setTimeout(() => setVisible(false), 100); };

  useEffect(() => { return () => clearTimeout(timeoutRef.current); }, []);

  const sideClasses = { top: "bottom-full left-1/2 -translate-x-1/2 mb-1", bottom: "top-full left-1/2 -translate-x-1/2 mt-1", left: "right-full top-1/2 -translate-y-1/2 mr-1", right: "left-full top-1/2 -translate-y-1/2 ml-1" };

  return (
    <div data-slot={dataSlot} className={cx("relative inline-block", className)} onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && <div role="tooltip" className={cx("absolute z-50 rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white shadow-md", sideClasses[side])}>{content}</div>}
    </div>
  );
}