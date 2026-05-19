import { useState, useRef, useEffect } from "react";
import { useUpdateItem } from "@features/items/hooks";
import { Button } from "@ui/button";

type DeleteConfirmationProps = {
  itemId: string;
  onArchived?: () => void;
  className?: string;
  "data-slot"?: string;
};

export function DeleteConfirmation({
  itemId,
  onArchived,
  className,
  "data-slot": dataSlot,
}: DeleteConfirmationProps) {
  const [state, setState] = useState<"idle" | "confirming">("idle");
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const updateItem = useUpdateItem();

  useEffect(() => {
    if (state !== "confirming") return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setState("idle");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [state]);

  const handleArchive = () => {
    updateItem.mutate(
      { itemId, data: { status: "archived" } },
      { onSuccess: () => onArchived?.() },
    );
  };

  return (
    <span ref={wrapperRef} data-slot={dataSlot} className={className}>
      {state === "idle" ? (
        <Button variant="destructive" size="sm" onClick={() => setState("confirming")}>
          Delete
        </Button>
      ) : (
        <span
          className="text-red-600 cursor-pointer text-sm font-medium"
          onClick={handleArchive}
        >
          Are you sure? Click to archive
        </span>
      )}
    </span>
  );
}
