import { type ReactNode } from "react";
import { cx } from "@ui/variants";
import { dataGridVariants, type DataGridVariantProps } from "@pattern/data-grid.variants";

type DataGridProps = DataGridVariantProps & { children: ReactNode; className?: string; "data-slot"?: string };
export function DataGrid({ size, density, children, className, "data-slot": dataSlot = "data-grid" }: DataGridProps) {
  return <div data-slot={dataSlot} className={cx(dataGridVariants({ size, density }), className)}>{children}</div>;
}