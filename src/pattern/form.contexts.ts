import { createContext, useContext } from "react";
import type { FormApi, FieldApi } from "@tanstack/react-form";

export function createFormContext<TFormData>() {
  const FormContext = createContext<FormApi<TFormData> | null>(null);
  const FieldContext = createContext<FieldApi<TFormData, unknown, unknown, unknown> | null>(null);

  function useFormContext() {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error("useFormContext must be used within a FormProvider");
    return ctx;
  }

  function useFieldContext() {
    const ctx = useContext(FieldContext);
    if (!ctx) throw new Error("useFieldContext must be used within a FieldProvider");
    return ctx;
  }

  return { FormContext, FieldContext, useFormContext, useFieldContext };
}