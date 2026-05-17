import { type ReactNode, type FormHTMLAttributes } from "react";
import { Form as TanStackForm, Field } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import type { GenericSchema } from "valibot";
import { FormField, FormLabel, FormError, FormControl } from "@ui/form";
import { Input } from "@ui/input";
import { cx } from "@ui/variants";

type FormProps<TFormData> = FormHTMLAttributes<HTMLFormElement> & {
  onSubmit: (data: TFormData) => Promise<void> | void;
  defaultValues?: TFormData;
  schema?: GenericSchema;
  children: ReactNode;
  className?: string;
  "data-slot"?: string;
};

export function PatternForm<TFormData>({ onSubmit, defaultValues, schema, children, className, "data-slot": dataSlot = "pattern-form", ...props }: FormProps<TFormData>) {
  return (
    <TanStackForm
      defaultValues={defaultValues ?? ({} as TFormData)}
      onSubmit={({ value }) => onSubmit(value as TFormData)}
      validatorAdapter={valibotValidator()}
      validators={schema ? { onChange: schema } : undefined}
    >
      {(form) => (
        <form data-slot={dataSlot} onSubmit={(e) => { e.preventDefault(); void form.handleSubmit(); }} className={cx("space-y-4", className)} {...props}>
          {typeof children === "function" ? children(form) : children}
        </form>
      )}
    </TanStackForm>
  );
}

type PatternFormFieldProps<TFormData> = {
  name: string;
  label?: string;
  description?: string;
  children?: (field: { value: unknown; onChange: (value: unknown) => void; onBlur: () => void; errors: string[] }) => ReactNode;
  className?: string;
};

export function PatternFormField<TFormData>({ name, label, description, children, className }: PatternFormFieldProps<TFormData>) {
  return (
    <Field name={name}>
      {(field) => (
        <FormField className={className}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            {children ? (
              children({ value: field.state.value, onChange: (v) => field.handleChange(v), onBlur: field.handleBlur, errors: field.state.meta.errors.map(String) })
            ) : (
              <Input id={name} value={field.state.value as string ?? ""} onChange={(e) => field.handleChange(e.target.value)} onBlur={field.handleBlur} state={field.state.meta.errors.length > 0 ? "error" : "default"} />
            )}
          </FormControl>
          {description && <FormFieldDescription>{description}</FormFieldDescription>}
          <FormError>{field.state.meta.errors.map(String).join(", ")}</FormError>
        </FormField>
      )}
    </Field>
  );
}

function FormFieldDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("text-sm text-gray-500", className)}>{children}</p>;
}

export { PatternFormField as FormField };