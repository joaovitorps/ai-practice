import { useForm as useTanStackForm } from "@tanstack/react-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import type { GenericSchema, InferOutput } from "valibot";

export function createFormHook<TFormData, TSchema extends GenericSchema>(schema: TSchema) {
  type FormDataType = InferOutput<TSchema> & TFormData;

  function useForm(options?: { defaultValues?: FormDataType }) {
    return useTanStackForm<FormDataType>({
      defaultValues: options?.defaultValues,
      validatorAdapter: valibotValidator(),
      validators: {
        onChange: schema as GenericSchema,
      },
    });
  }

  return { useForm };
}

export function createFormSubmitHandler<TFormData>(onSubmit: (data: TFormData) => Promise<void> | void) {
  return async (data: TFormData) => { await onSubmit(data); };
}