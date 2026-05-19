import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ItemsList } from "@features/items/list";
import { CreateItemModal } from "@features/items/create-modal";
import { DataGrid } from "@pattern/data-grid";
import { DataGridHeader } from "@pattern/data-grid-header";
import { Checkbox } from "@ui/checkbox";
import { Button } from "@ui/button";

export const Route = createFileRoute("/_main/items/")({
  component: ItemsPage,
});

function ItemsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <DataGrid>
      <DataGridHeader
        title="Items"
        actions={
          <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
            Add Item
          </Button>
        }
        filters={
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <Checkbox
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
            />
            Show archived
          </label>
        }
      />
      <ItemsList page={page} showArchived={showArchived} onPageChange={setPage} />
      <CreateItemModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </DataGrid>
  );
}

