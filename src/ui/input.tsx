import { forwardRef, type InputHTMLAttributes } from "react";
import { inputVariants, type InputVariantProps } from "@ui/input.variants";
import { cx } from "@ui/variants";

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputVariantProps & {
    "data-slot"?: string;
  };

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, state, "data-slot": dataSlot = "input", ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-slot={dataSlot}
        data-variant={state}
        data-size={size}
        className={cx(inputVariants({ size, state, className }))}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
export type { InputProps };