import { cva, type VariantProps } from "@ui/variants";

export const inputVariants = cva(
  [
    "flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
    "placeholder:text-gray-400",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-8 text-sm",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
      state: {
        default: "border-gray-300",
        error: "border-red-500 focus-visible:ring-red-500",
        success: "border-green-500 focus-visible:ring-green-500",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export type InputVariantProps = VariantProps<typeof inputVariants>;