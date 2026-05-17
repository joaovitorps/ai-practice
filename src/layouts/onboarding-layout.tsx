import { type ReactNode } from "react";
import { cx } from "@ui/variants";

type OnboardingLayoutProps = { children: ReactNode; step?: number; totalSteps?: number; className?: string };

export function OnboardingLayout({ children, step, totalSteps, className }: OnboardingLayoutProps) {
  return (
    <div className={cx("flex min-h-screen flex-col items-center justify-center bg-gray-50", className)}>
      {step !== undefined && totalSteps !== undefined && (
        <div className="mb-8 w-full max-w-md">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Step {step}</span>
            <span>{step} of {totalSteps}</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-gray-900 transition-all" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>
      )}
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">{children}</div>
    </div>
  );
}