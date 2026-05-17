import { type ReactNode, type HTMLAttributes } from "react";
import { cx } from "@ui/variants";

type ScrollAreaProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode; "data-slot"?: string };
export function ScrollArea({ className, children, "data-slot": dataSlot = "scroll-area", ...props }: ScrollAreaProps) {
  return <div data-slot={dataSlot} className={cx("overflow-auto", className)} {...props}>{children}</div>;
}