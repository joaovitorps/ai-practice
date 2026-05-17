import { type HTMLAttributes } from "react";
import { badgeVariants, type BadgeVariantProps } from "@ui/badge.variants";
import { cx } from "@ui/variants";

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  BadgeVariantProps & {
    "data-slot"?: string;
  };

export function Badge({ className, variant, "data-slot": dataSlot = "badge", ...props }: BadgeProps) {
  return (
    <span
      data-slot={dataSlot}
      data-variant={variant}
      className={cx(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export type { BadgeProps };