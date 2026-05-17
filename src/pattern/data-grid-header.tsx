import { type ReactNode } from "react";
import { cx } from "@ui/variants";

type DataGridHeaderProps = { title?: string; description?: string; actions?: ReactNode; filters?: ReactNode; className?: string; "data-slot"?: string };
export function DataGridHeader({ title, description, actions, filters, className, "data-slot": dataSlot = "data-grid-header" }: DataGridHeaderProps) {
  return (
    <div data-slot={dataSlot} className={cx("mb-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {filters && <div className="mt-3">{filters}</div>}
    </div>
  );
}