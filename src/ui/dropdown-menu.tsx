import { type ReactNode, useState, useRef, useEffect } from "react";
import { cx } from "@ui/variants";

type DropdownMenuProps = {
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "end";
  className?: string;
  "data-slot"?: string;
};

export function DropdownMenu({ trigger, children, align = "start", className, "data-slot": dataSlot = "dropdown-menu" }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const alignClass = align === "end" ? "right-0" : "left-0";

  return (
    <div ref={menuRef} data-slot={dataSlot} className={cx("relative inline-block", className)}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className={cx("absolute top-full z-50 mt-1 min-w-[180px] rounded-md border bg-white py-1 shadow-lg", alignClass)}>
          {typeof children === "function" ? (children as () => ReactNode)() : children}
        </div>
      )}
    </div>
  );
}

type DropdownMenuItemProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  destructive?: boolean;
};

export function DropdownMenuItem({ children, onClick, className, destructive }: DropdownMenuItemProps) {
  return (
    <button
      className={cx(
        "flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100",
        destructive && "text-red-600 hover:bg-red-50",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}