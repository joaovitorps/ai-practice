import { cx } from "@ui/variants";
import { Button } from "@ui/button";

type DataGridFooterProps = { page: number; totalPages: number; onPageChange: (page: number) => void; totalItems?: number; className?: string; "data-slot"?: string };

export function DataGridFooter({ page, totalPages, onPageChange, totalItems, className, "data-slot": dataSlot = "data-grid-footer" }: DataGridFooterProps) {
  if (totalPages <= 1) return null;
  return (
    <div data-slot={dataSlot} className={cx("flex items-center justify-between border-t pt-4", className)}>
      <div className="text-sm text-gray-500">{totalItems !== undefined && `${totalItems} items`}</div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>Previous</Button>
        <span className="text-sm text-gray-600">{page} / {totalPages}</span>
        <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>Next</Button>
      </div>
    </div>
  );
}