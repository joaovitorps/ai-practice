import { valibotValidator } from './validator.cjs';
/**
 * Utility to define your Form type as `FormApi<FormData, ValibotValidator>`
 */
export type ValibotValidator = ReturnType<typeof valibotValidator>;
