import { forwardRef, type InputHTMLAttributes } from "react";
import { cx } from "@ui/variants";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  "data-slot"?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, "data-slot": dataSlot = "checkbox", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        data-slot={dataSlot}
        className={cx(
          "h-4 w-4 rounded border border-gray-300",
          "focus-visible:outline-none focus-visible:ring-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };