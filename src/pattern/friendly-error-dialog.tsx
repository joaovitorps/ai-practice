import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@ui/dialog";
import { Button } from "@ui/button";
import { FriendlyError } from "@core/http-resource";

type FriendlyErrorDialogProps = { open: boolean; onOpenChange: (open: boolean) => void; error: Error | FriendlyError | null; onRetry?: () => void; "data-slot"?: string };

export function FriendlyErrorDialog({ open, onOpenChange, error, onRetry, "data-slot": dataSlot = "friendly-error-dialog" }: FriendlyErrorDialogProps) {
  if (!error) return null;
  const isFriendly = error instanceof FriendlyError;
  const title = isFriendly ? error.message : "Something went wrong";
  const detail = isFriendly ? error.detail : error.message;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
      <DialogContent>{detail && <p className="text-sm text-gray-600">{detail}</p>}</DialogContent>
      <DialogFooter>
        {onRetry && <Button variant="outline" onClick={onRetry}>Try again</Button>}
        <Button variant="secondary" onClick={() => onOpenChange(false)}>Close</Button>
      </DialogFooter>
    </Dialog>
  );
}