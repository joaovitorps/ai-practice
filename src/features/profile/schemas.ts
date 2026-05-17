import * as v from "valibot";

export const profileUpdateSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "Name is required")),
  email: v.pipe(v.string(), v.email("Invalid email")),
});

export type ProfileUpdateInput = v.InferOutput<typeof profileUpdateSchema>;