import * as v from "valibot";

export const settingsSchema = v.object({
  language: v.picklist(["en", "pt"], "Select a language"),
  notifications: v.boolean(),
});

export type SettingsInput = v.InferOutput<typeof settingsSchema>;