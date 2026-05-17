import { type ReactNode, type HTMLAttributes } from "react";
import { cx } from "@ui/variants";

type HeaderProps = HTMLAttributes<HTMLElement> & { title?: string; actions?: ReactNode; navigation?: ReactNode; "data-slot"?: string };
export function Header({ title, actions, navigation, className, "data-slot": dataSlot = "header", ...props }: HeaderProps) {
  return (
    <header data-slot={dataSlot} className={cx("flex h-14 items-center border-b bg-white px-6", className)} {...props}>
      {navigation && <nav className="mr-4">{navigation}</nav>}
      {title && <h1 className="text-lg font-semibold">{title}</h1>}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </header>
  );
}