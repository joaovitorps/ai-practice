import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ItemsList } from "@features/items/list";
import { CreateProductModal } from "@features/items/create-modal";
import { DataGrid } from "@pattern/data-grid";
import { DataGridHeader } from "@pattern/data-grid-header";
import { Checkbox } from "@ui/checkbox";
import { Button } from "@ui/button";

export const Route = createFileRoute("/_main/items")({
  component: ItemsPage,
});

function ItemsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  return (
    <DataGrid>
      <DataGridHeader
        title="Items"
        actions={
          <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
            Add Product
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
      <ItemsList showArchived={showArchived} />
      <CreateProductModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </DataGrid>
  );
}