import { cva, type VariantProps } from "@ui/variants";

export const dataGridVariants = cva(["w-full"], {
  variants: {
    size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
    density: { compact: "[&_td]:py-1 [&_th]:py-1", normal: "[&_td]:py-2 [&_th]:py-2", comfortable: "[&_td]:py-3 [&_th]:py-3" },
  },
  defaultVariants: { size: "md", density: "normal" },
});

export type DataGridVariantProps = VariantProps<typeof dataGridVariants>;