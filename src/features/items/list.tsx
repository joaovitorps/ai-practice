import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useItems } from "@features/items/hooks";
import { DataGrid } from "@pattern/data-grid";
import { DataGridTable } from "@pattern/data-grid-table";
import { DataGridFooter } from "@pattern/data-grid-footer";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Loading } from "@ui/loading";
import { ItemsEmptyState } from "@features/items/empty-state";
import { DeleteConfirmation } from "@features/items/delete-confirmation";

type ItemsListProps = { page?: number; search?: string; showArchived?: boolean };

export function ItemsList({ page = 1, search, showArchived = false }: ItemsListProps) {
  const { data, isLoading, error } = useItems(page, search);

  const filteredItems = useMemo(() => {
    if (!data) return [];
    if (showArchived) return data.items;
    return data.items.filter((item) => item.status !== "archived");
  }, [data, showArchived]);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-600">Error loading items</p>;
  if (!data || data.items.length === 0) return <ItemsEmptyState />;

  const totalPages = Math.ceil(data.total / 10);

  return (
    <DataGrid>
      <DataGridTable
        data={filteredItems}
        columns={[
          { id: "name", header: "Name", cell: (row) => row.name },
          { id: "status", header: "Status", cell: (row) => <Badge variant={row.status === "active" ? "success" : "default"}>{row.status}</Badge> },
          { id: "createdAt", header: "Created", cell: (row) => row.createdAt },
          {
            id: "actions",
            header: "Actions",
            cell: (row) => (
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <Link to="/items/$itemId/edit" params={{ itemId: row.id }}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <DeleteConfirmation itemId={row.id} />
              </div>
            ),
          },
        ]}
        onRowClick={(row) => {}}
      />
      <DataGridFooter page={page} totalPages={totalPages} onPageChange={() => {}} totalItems={data.total} />
    </DataGrid>
  );
}