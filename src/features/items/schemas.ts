import * as v from "valibot";

export const itemCreateSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "Name is required"), v.maxLength(100, "Name too long")),
  description: v.pipe(v.string(), v.minLength(1, "Description is required")),
});

export const itemUpdateSchema = v.object({
  name: v.optional(v.pipe(v.string(), v.minLength(1))),
  description: v.optional(v.pipe(v.string(), v.minLength(1))),
  status: v.optional(v.picklist(["active", "archived"])),
});

export type ItemCreateInput = v.InferOutput<typeof itemCreateSchema>;
export type ItemUpdateInput = v.InferOutput<typeof itemUpdateSchema>;