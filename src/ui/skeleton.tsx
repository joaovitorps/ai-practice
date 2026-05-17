import { cx } from "@ui/variants";

type SkeletonProps = { className?: string; "data-slot"?: string };
export function Skeleton({ className, "data-slot": dataSlot = "skeleton" }: SkeletonProps) {
  return <div data-slot={dataSlot} className={cx("animate-pulse rounded-md bg-gray-200", className)} />;
}