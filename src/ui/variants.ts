import { cva as origCva, type VariantProps } from "cva";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "cva";

export function cx(...inputs: ClassValue[]) {
  return twMerge(inputs.filter(Boolean).join(" "));
}

export { twMerge as compose };

export const cva = origCva;
export type { VariantProps };