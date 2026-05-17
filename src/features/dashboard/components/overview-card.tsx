import { type ReactNode } from "react";
import { cx } from "@ui/variants";

type OverviewCardProps = { title: string; value: string | number; description?: string; icon?: ReactNode; className?: string };

export function OverviewCard({ title, value, description, icon, className }: OverviewCardProps) {
  return (
    <div className={cx("rounded-lg border bg-white p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon}
      </div>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </div>
  );
}