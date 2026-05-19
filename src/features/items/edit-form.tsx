import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useUpdateItem } from "@features/items/hooks";
import { itemUpdateSchema, type ItemUpdateInput } from "@features/items/schemas";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { Select } from "@ui/select";
import { Button } from "@ui/button";
import { cx } from "@ui/variants";

type EditItemFormProps = {
  item: {
    id: string;
    name: string;
    description: string;
    status: "active" | "archived";
  };
};

export function EditItemForm({ item }: EditItemFormProps) {
  const navigate = useNavigate();
  const updateItem = useUpdateItem();

  const form = useForm({
    defaultValues: {
      name: item.name,
      description: item.description,
      status: item.status,
    } as ItemUpdateInput,
    validators: { onSubmit: itemUpdateSchema },
    onSubmit: async ({ value }) => {
      updateItem.mutate(
        { itemId: item.id, data: value },
        { onSuccess: () => navigate({ to: "/items" }) },
      );
    },
  });

  return (
    <form
      data-slot="edit-item-form"
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="name" children={(field) => (
        <div className="space-y-1">
          <label className="text-sm font-medium leading-none text-gray-700" htmlFor="edit-name">
            Name
          </label>
          <Input
            id="edit-name"
            value={field.state.value ?? ""}
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
          <label className="text-sm font-medium leading-none text-gray-700" htmlFor="edit-description">
            Description
          </label>
          <Textarea
            id="edit-description"
            value={field.state.value ?? ""}
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

      <form.Field name="status" children={(field) => (
        <div className="space-y-1">
          <label className="text-sm font-medium leading-none text-gray-700" htmlFor="edit-status">
            Status
          </label>
          <Select
            id="edit-status"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value as "active" | "archived")}
            onBlur={field.handleBlur}
          >
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </Select>
        </div>
      )} />

      <div className={cx("flex justify-end gap-2")}>
        {updateItem.isError && (
          <p className="text-sm text-red-600 self-center">{updateItem.error?.message ?? "Failed to save changes"}</p>
        )}
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/items" })}>
          Cancel
        </Button>
        <Button type="submit" disabled={updateItem.isPending}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
