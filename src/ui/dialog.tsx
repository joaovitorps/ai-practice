import { type ReactNode, useEffect, useRef } from "react";
import { cx } from "@ui/variants";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  "data-slot"?: string;
};

export function Dialog({ open, onOpenChange, children, "data-slot": dataSlot = "dialog" }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      data-slot={dataSlot}
      className={cx(
        "rounded-lg border-none bg-white p-0 shadow-lg",
        "backdrop:bg-black/50",
        "max-h-[85vh] max-w-[90vw] w-[480px]",
      )}
      onClose={() => onOpenChange(false)}
      onClick={(e) => {
        if (e.target === dialogRef.current) onOpenChange(false);
      }}
    >
      {children}
    </dialog>
  );
}

type DialogHeaderProps = { children: ReactNode; className?: string };
export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={cx("px-6 pt-6 pb-2", className)}>{children}</div>;
}

type DialogTitleProps = { children: ReactNode; className?: string };
export function DialogTitle({ children, className }: DialogTitleProps) {
  return <h2 className={cx("text-lg font-semibold leading-none", className)}>{children}</h2>;
}

type DialogContentProps = { children: ReactNode; className?: string };
export function DialogContent({ children, className }: DialogContentProps) {
  return <div className={cx("px-6 py-4", className)}>{children}</div>;
}

type DialogFooterProps = { children: ReactNode; className?: string };
export function DialogFooter({ children, className }: DialogFooterProps) {
  return <div className={cx("flex justify-end gap-2 px-6 pb-6 pt-2", className)}>{children}</div>;
}