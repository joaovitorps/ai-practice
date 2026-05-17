import { cx } from "@ui/variants";

type LoadingProps = { size?: "sm" | "md" | "lg"; className?: string; "data-slot"?: string };
export function Loading({ size = "md", className, "data-slot": dataSlot = "loading" }: LoadingProps) {
  const sizeClasses = { sm: "h-4 w-4 border-2", md: "h-6 w-6 border-2", lg: "h-8 w-8 border-3" };
  return <div data-slot={dataSlot} data-size={size} className={cx("animate-spin rounded-full border-gray-200 border-t-gray-900", sizeClasses[size], className)} role="status" aria-label="Loading" />;
}