import { cva as origCva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

export function cx(...inputs: ClassValue[]) {
  return twMerge(inputs.filter(Boolean).join(" "));
}

export { twMerge as compose };

export const cva = origCva;
export type { VariantProps };