import { forwardRef, type ButtonHTMLAttributes } from "react";
import { buttonVariants, type ButtonVariantProps } from "@ui/button.variants";
import { cx } from "@ui/variants";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    "data-slot"?: string;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, "data-slot": dataSlot = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot={dataSlot}
        data-variant={variant}
        data-size={size}
        className={cx(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };