import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cx } from "@ui/variants";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  "data-slot"?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, "data-slot": dataSlot = "textarea", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot={dataSlot}
        className={cx(
          "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
          "placeholder:text-gray-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };