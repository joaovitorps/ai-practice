import { type HTMLAttributes } from "react";
import { cx } from "@ui/variants";

type FormFieldProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};

export function FormField({ className, "data-slot": dataSlot = "form-field", ...props }: FormFieldProps) {
  return <div data-slot={dataSlot} className={cx("space-y-1", className)} {...props} />;
}

type FormLabelProps = HTMLAttributes<HTMLLabelElement> & {
  "data-slot"?: string;
};

export function FormLabel({ className, "data-slot": dataSlot = "form-label", ...props }: FormLabelProps) {
  return (
    <label
      data-slot={dataSlot}
      className={cx("text-sm font-medium leading-none text-gray-700", className)}
      {...props}
    />
  );
}

type FormErrorProps = HTMLAttributes<HTMLParagraphElement> & {
  "data-slot"?: string;
};

export function FormError({ className, "data-slot": dataSlot = "form-error", children, ...props }: FormErrorProps) {
  if (!children) return null;
  return (
    <p
      data-slot={dataSlot}
      className={cx("text-sm text-red-600", className)}
      {...props}
    >
      {children}
    </p>
  );
}

type FormDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  "data-slot"?: string;
};

export function FormDescription({ className, "data-slot": dataSlot = "form-description", ...props }: FormDescriptionProps) {
  return (
    <p
      data-slot={dataSlot}
      className={cx("text-sm text-gray-500", className)}
      {...props}
    />
  );
}

type FormControlProps = HTMLAttributes<HTMLDivElement> & {
  "data-slot"?: string;
};

export function FormControl({ className, "data-slot": dataSlot = "form-control", ...props }: FormControlProps) {
  return <div data-slot={dataSlot} className={cx("", className)} {...props} />;
}