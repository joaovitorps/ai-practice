import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useCreateItem } from "@features/items/hooks";
import { itemCreateSchema, type ItemCreateInput } from "@features/items/schemas";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@ui/dialog";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { Button } from "@ui/button";

type CreateItemModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateItemModal({ open, onOpenChange }: CreateItemModalProps) {
  const createItem = useCreateItem();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    } as ItemCreateInput,
    validators: { onSubmit: itemCreateSchema },
    onSubmit: async ({ value }) => {
      createItem.mutate(value, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-slot="create-item-modal">
      <DialogHeader>
        <DialogTitle>Create Item</DialogTitle>
      </DialogHeader>
      <form
        data-slot="create-item-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <DialogContent>
          <div className="space-y-4">
            <form.Field name="name" children={(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none text-gray-700" htmlFor="create-name">
                  Name
                </label>
                <Input
                  id="create-name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {field.state.meta.errors?.map((error) => error && (
                  <p key={error.message} className="text-sm text-red-600">
                    {error.message}
                  </p>
                ))}
              </div>
            )} />

            <form.Field name="description" children={(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none text-gray-700" htmlFor="create-description">
                  Description
                </label>
                <Textarea
                  id="create-description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {field.state.meta.errors?.map((error) => error && (
                  <p key={error.message} className="text-sm text-red-600">
                    {error.message}
                  </p>
                ))}
              </div>
            )} />
          </div>
        </DialogContent>
        <DialogFooter>
          {createItem.isError && (
            <p className="text-sm text-red-600">{createItem.error?.message ?? "Failed to create item"}</p>
          )}
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={createItem.isPending}>
            Create Item
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
