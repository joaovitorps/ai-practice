import { type ReactNode } from "react";
import { cx } from "@ui/variants";
import { Header } from "@ui/header";
import { useSessionStore } from "@core/session-store";
import { Button } from "@ui/button";
import { Link } from "@tanstack/react-router";

type MainLayoutProps = { children: ReactNode; className?: string };

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/items", label: "Items" },
  { href: "/settings", label: "Settings" },
];

export function MainLayout({ children, className }: MainLayoutProps) {
  const user = useSessionStore((s) => s.user);
  const logout = useSessionStore((s) => s.clear);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="SPA Architecture"
        actions={
          <div className="flex items-center gap-4">
            {user && <span className="text-sm text-gray-600">{user.name}</span>}
            <Button variant="ghost" size="sm" onClick={logout}>Log out</Button>
          </div>
        }
        navigation={
          <nav className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href} className="text-sm text-gray-600 hover:text-gray-900">{item.label}</Link>
            ))}
          </nav>
        }
      />
      <main className={cx("mx-auto max-w-7xl px-6 py-6", className)}>{children}</main>
    </div>
  );
}