import { useState, useCallback, createContext, useContext, type ReactNode } from "react";
import { cx } from "@ui/variants";

type Toast = { id: string; title: string; description?: string; variant?: "default" | "success" | "error" };
type ToasterContextValue = { toasts: Toast[]; addToast: (toast: Omit<Toast, "id">) => void; removeToast: (id: string) => void };
const ToasterContext = createContext<ToasterContextValue | null>(null);

export function useToaster() {
  const ctx = useContext(ToasterContext);
  if (!ctx) throw new Error("useToaster must be used within a ToasterProvider");
  return ctx;
}

let toastCounter = 0;

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast-${++toastCounter}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => { setToasts((prev) => prev.filter((t) => t.id !== id)); }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => { setToasts((prev) => prev.filter((t) => t.id !== id)); }, []);

  return (
    <ToasterContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (<ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />))}
      </div>
    </ToasterContext.Provider>
  );
}

type ToastItemProps = { toast: Toast; onClose: () => void };
function ToastItem({ toast, onClose }: ToastItemProps) {
  const variantClasses = { default: "border-gray-200 bg-white", success: "border-green-200 bg-green-50", error: "border-red-200 bg-red-50" };
  return (
    <div className={cx("flex items-start gap-3 rounded-md border p-4 shadow-lg", variantClasses[toast.variant ?? "default"])}>
      <div className="flex-1">
        <p className="text-sm font-medium">{toast.title}</p>
        {toast.description && <p className="mt-1 text-xs text-gray-600">{toast.description}</p>}
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">×</button>
    </div>
  );
}