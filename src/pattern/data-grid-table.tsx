import { type ReactNode } from "react";
import { cx } from "@ui/variants";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@ui/table";

type Column<T> = { id: string; header: string; cell: (row: T) => ReactNode; size?: number };
type DataGridTableProps<T> = { data: T[]; columns: Column<T>[]; onRowClick?: (row: T) => void; emptyMessage?: string; className?: string; "data-slot"?: string };

export function DataGridTable<T>({ data, columns, onRowClick, emptyMessage = "No data", className, "data-slot": dataSlot = "data-grid-table" }: DataGridTableProps<T>) {
  if (data.length === 0) return <div data-slot={dataSlot} className={cx("py-8 text-center text-gray-500", className)}>{emptyMessage}</div>;
  return (
    <Table data-slot={dataSlot} className={className}>
      <TableHeader><TableRow>{columns.map((col) => <TableHead key={col.id} style={col.size ? { width: col.size } : undefined}>{col.header}</TableHead>)}</TableRow></TableHeader>
      <TableBody>{data.map((row, index) => (
        <TableRow key={index} className={onRowClick ? "cursor-pointer" : undefined} onClick={() => onRowClick?.(row)}>
          {columns.map((col) => <TableCell key={col.id}>{col.cell(row)}</TableCell>)}
        </TableRow>
      ))}</TableBody>
    </Table>
  );
}

export type { Column, DataGridTableProps };