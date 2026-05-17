import { ValidationError, Validator, ValidatorAdapterParams } from '@tanstack/form-core';
import { GenericIssue, GenericSchema, GenericSchemaAsync } from 'valibot';
type Params = ValidatorAdapterParams<GenericIssue>;
type TransformFn = NonNullable<Params['transformErrors']>;
export declare function prefixSchemaToErrors(valiErrors: GenericIssue[], transformErrors: TransformFn): Record<string, ValidationError>;
export declare function defaultFormTransformer(transformErrors: TransformFn): (zodErrors: GenericIssue[]) => {
    form: ValidationError;
    fields: Record<string, ValidationError>;
};
/**
 * @deprecated With valibot 1.0.0 the adapter is no longer needed and will be soon removed.
 * If you were passing some parameters you can use the `standardSchemaValidator` instead.
 */
export declare const valibotValidator: (params?: Params) => Validator<unknown, GenericSchema | GenericSchemaAsync>;
export {};
