import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useCreateItem } from "@features/items/hooks";
import { itemCreateSchema, type ItemCreateInput } from "@features/items/schemas";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@ui/dialog";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { Button } from "@ui/button";

type CreateProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateProductModal({ open, onOpenChange }: CreateProductModalProps) {
  const createItem = useCreateItem();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    } as ItemCreateInput,
    validators: { onChange: itemCreateSchema },
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
    <Dialog open={open} onOpenChange={onOpenChange} data-slot="create-product-modal">
      <DialogHeader>
        <DialogTitle>Create Product</DialogTitle>
      </DialogHeader>
      <form
        data-slot="create-product-form"
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
                {field.state.meta.errors?.map((error) => error ? (
                  <p key={error.message} className="text-sm text-red-600">
                    {error.message}
                  </p>
                ) : null)}
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
                {field.state.meta.errors?.map((error) => error ? (
                  <p key={error.message} className="text-sm text-red-600">
                    {error.message}
                  </p>
                ) : null)}
              </div>
            )} />
          </div>
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={createItem.isPending}>
            Create Product
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
