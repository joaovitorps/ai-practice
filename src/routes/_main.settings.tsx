import { createFileRoute } from "@tanstack/react-router";
import { useSettings } from "@features/settings/hooks";
import { Button } from "@ui/button";
import { FormField } from "@ui/form";
import { Select } from "@ui/select";

export const Route = createFileRoute("/_main/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { locale, setLocale } = useSettings();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="space-y-4">
        <FormField>
          <label htmlFor="language" className="text-sm font-medium text-gray-700">Language</label>
          <Select id="language" value={locale} onChange={(e) => setLocale(e.target.value as "en" | "pt")}>
            <option value="en">English</option>
            <option value="pt">Português</option>
          </Select>
        </FormField>
        <Button onClick={() => setLocale(locale)}>Save</Button>
      </div>
    </div>
  );
}