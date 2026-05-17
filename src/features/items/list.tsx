import { useItems } from "@features/items/hooks";
import { DataGrid } from "@pattern/data-grid";
import { DataGridHeader } from "@pattern/data-grid-header";
import { DataGridTable } from "@pattern/data-grid-table";
import { DataGridFooter } from "@pattern/data-grid-footer";
import { Badge } from "@ui/badge";
import { Loading } from "@ui/loading";
import { ItemsEmptyState } from "@features/items/empty-state";

type ItemsListProps = { page?: number; search?: string };

export function ItemsList({ page = 1, search }: ItemsListProps) {
  const { data, isLoading, error } = useItems(page, search);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-600">Error loading items</p>;
  if (!data || data.items.length === 0) return <ItemsEmptyState />;

  const totalPages = Math.ceil(data.total / 10);

  return (
    <DataGrid>
      <DataGridHeader title="Items" />
      <DataGridTable
        data={data.items}
        columns={[
          { id: "name", header: "Name", cell: (row) => row.name },
          { id: "status", header: "Status", cell: (row) => <Badge variant={row.status === "active" ? "success" : "default"}>{row.status}</Badge> },
          { id: "createdAt", header: "Created", cell: (row) => row.createdAt },
        ]}
        onRowClick={(row) => {}}
      />
      <DataGridFooter page={page} totalPages={totalPages} onPageChange={() => {}} totalItems={data.total} />
    </DataGrid>
  );
}