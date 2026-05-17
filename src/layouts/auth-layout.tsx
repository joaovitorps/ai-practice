import { type ReactNode } from "react";
import { cx } from "@ui/variants";

type AuthLayoutProps = { children: ReactNode; className?: string };

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className={cx("flex min-h-screen items-center justify-center bg-gray-50", className)}>
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">{children}</div>
    </div>
  );
}