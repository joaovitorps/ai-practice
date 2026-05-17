import { createContext, useContext } from "react";

export function createFormContext() {
  const FormContext = createContext<unknown>(null);
  const FieldContext = createContext<unknown>(null);

  function useFormContext<T>() {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error("useFormContext must be used within a FormProvider");
    return ctx as T;
  }

  function useFieldContext<T>() {
    const ctx = useContext(FieldContext);
    if (!ctx) throw new Error("useFieldContext must be used within a FieldProvider");
    return ctx as T;
  }

  return { FormContext, FieldContext, useFormContext, useFieldContext };
}