import { type ReactNode, type FormHTMLAttributes } from "react";
import { FormField as FormFieldUI, FormLabel, FormError, FormControl } from "@ui/form";
import { Input } from "@ui/input";
import { cx } from "@ui/variants";

type PatternFormProps = FormHTMLAttributes<HTMLFormElement> & {
  onSubmit: (data: FormData) => Promise<void> | void;
  children: ReactNode;
  className?: string;
  "data-slot"?: string;
};

export function PatternForm({
  onSubmit,
  children,
  className,
  "data-slot": dataSlot = "pattern-form",
  ...props
}: PatternFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    void onSubmit(formData);
  };

  return (
    <form
      data-slot={dataSlot}
      onSubmit={handleSubmit}
      className={cx("space-y-4", className)}
      {...props}
    >
      {children}
    </form>
  );
}

PatternForm.displayName = "PatternForm";

type PatternFormFieldProps = {
  name: string;
  label?: string;
  description?: string;
  className?: string;
};

export function PatternFormField({ name, label, description, className }: PatternFormFieldProps) {
  return (
    <FormFieldUI className={className}>
      {label && <label className="text-sm font-medium leading-none text-gray-700" htmlFor={name}>{label}</label>}
      <FormControl>
        <Input id={name} name={name} />
      </FormControl>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </FormFieldUI>
  );
}

export { PatternFormField as FormField };