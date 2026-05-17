import { useForm as useTanStackForm } from "@tanstack/react-form";

export function createFormHook<TFormData>() {
  function useForm(options?: { defaultValues?: TFormData }) {
    return useTanStackForm({
      defaultValues: options?.defaultValues as Record<string, unknown>,
    });
  }

  return { useForm };
}

export function createFormSubmitHandler<TFormData>(
  onSubmit: (data: TFormData) => Promise<void> | void,
) {
  return async (data: TFormData) => {
    await onSubmit(data);
  };
}