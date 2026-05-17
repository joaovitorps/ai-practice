import { type ReactNode, useState, useRef, useEffect } from "react";
import { cx } from "@ui/variants";

type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
  "data-slot"?: string;
};

export function Popover({ trigger, children, align = "start", className, "data-slot": dataSlot = "popover" }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const alignClasses = { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" };

  return (
    <div ref={popoverRef} data-slot={dataSlot} className={cx("relative inline-block", className)}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className={cx("absolute top-full z-50 mt-1 min-w-[200px] rounded-md border bg-white p-2 shadow-lg", alignClasses[align])}>
          {children}
        </div>
      )}
    </div>
  );
}