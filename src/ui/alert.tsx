import { type HTMLAttributes, type ReactNode } from "react";
import { cx } from "@ui/variants";

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "error" | "success" | "warning";
  title?: ReactNode;
  "data-slot"?: string;
};

export function Alert({
  variant = "default",
  title,
  className,
  children,
  "data-slot": dataSlot = "alert",
  ...props
}: AlertProps) {
  const variantClasses = {
    default: "border-gray-200 bg-gray-50 text-gray-800",
    error: "border-red-200 bg-red-50 text-red-800",
    success: "border-green-200 bg-green-50 text-green-800",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
  };

  return (
    <div
      data-slot={dataSlot}
      data-variant={variant}
      role="alert"
      className={cx("rounded-md border p-4", variantClasses[variant], className)}
      {...props}
    >
      {title && <p className="mb-1 font-medium">{title}</p>}
      {children && <div className="text-sm">{children}</div>}
    </div>
  );
}

export type { AlertProps };