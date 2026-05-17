import { type ReactNode } from "react";
import { cx } from "@ui/variants";

type RadioOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  "data-slot"?: string;
};

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  className,
  "data-slot": dataSlot = "radio-group",
}: RadioGroupProps) {
  return (
    <div data-slot={dataSlot} className={cx("flex flex-col gap-2", className)} role="radiogroup">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={(e) => onChange?.(e.target.value)}
            className="h-4 w-4 border-gray-300"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export type { RadioGroupProps, RadioOption };