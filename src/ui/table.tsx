import { type HTMLAttributes } from "react";
import { cx } from "@ui/variants";

type TableProps = HTMLAttributes<HTMLTableElement> & { "data-slot"?: string };
export function Table({ className, "data-slot": dataSlot = "table", ...props }: TableProps) {
  return <div className="w-full overflow-auto"><table data-slot={dataSlot} className={cx("w-full caption-bottom text-sm", className)} {...props} /></div>;
}

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export function TableHeader({ className, ...props }: TableHeaderProps) { return <thead className={cx("[&_tr]:border-b", className)} {...props} />; }

type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export function TableBody({ className, ...props }: TableBodyProps) { return <tbody className={cx("[&_tr:last-child]:border-0", className)} {...props} />; }

type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
export function TableRow({ className, ...props }: TableRowProps) { return <tr className={cx("border-b transition-colors hover:bg-gray-50/50", className)} {...props} />; }

type TableHeadProps = HTMLAttributes<HTMLTableCellElement>;
export function TableHead({ className, ...props }: TableHeadProps) { return <th className={cx("h-10 px-2 text-left align-middle font-medium text-gray-500", className)} {...props} />; }

type TableCellProps = HTMLAttributes<HTMLTableCellElement>;
export function TableCell({ className, ...props }: TableCellProps) { return <td className={cx("px-2 py-2 align-middle", className)} {...props} />; }