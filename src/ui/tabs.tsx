import { type ReactNode, useState, createContext, useContext } from "react";
import { cx } from "@ui/variants";

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within a Tabs component");
  return ctx;
}

type TabsProps = {
  defaultValue: string;
  children: ReactNode;
  className?: string;
  onValueChange?: (value: string) => void;
  "data-slot"?: string;
};

export function Tabs({ defaultValue, children, className, onValueChange, "data-slot": dataSlot = "tabs" }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  const contextValue = {
    value,
    onValueChange: (newValue: string) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div data-slot={dataSlot} className={cx("w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

type TabsListProps = { children: ReactNode; className?: string };
export function TabsList({ children, className }: TabsListProps) {
  return <div className={cx("inline-flex h-10 items-center gap-1 rounded-md bg-gray-100 p-1", className)}>{children}</div>;
}

type TabsTriggerProps = { value: string; children: ReactNode; className?: string };
export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabsContext();
  const isActive = selectedValue === value;
  return (
    <button
      data-slot="tabs-trigger"
      data-state={isActive ? "active" : "inactive"}
      className={cx(
        "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
        isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900",
        className,
      )}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
}

type TabsContentProps = { value: string; children: ReactNode; className?: string };
export function TabsContent({ value, children, className }: TabsContentProps) {
  const { value: selectedValue } = useTabsContext();
  if (selectedValue !== value) return null;
  return <div data-slot="tabs-content" className={cx("mt-2", className)}>{children}</div>;
}