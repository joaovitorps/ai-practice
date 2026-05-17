import { forwardRef, type SelectHTMLAttributes } from "react";
import { cx } from "@ui/variants";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  "data-slot"?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, "data-slot": dataSlot = "select", children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        data-slot={dataSlot}
        className={cx(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";

export { Select };
export type { SelectProps };