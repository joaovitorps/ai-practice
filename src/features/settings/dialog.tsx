import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@ui/dialog";
import { Button } from "@ui/button";

type SettingsDialogProps = { open: boolean; onOpenChange: (open: boolean) => void };

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader><DialogTitle>Settings</DialogTitle></DialogHeader>
      <DialogContent><p className="text-sm text-gray-600">Settings dialog content placeholder.</p></DialogContent>
      <DialogFooter>
        <Button variant="secondary" onClick={() => onOpenChange(false)}>Close</Button>
        <Button onClick={() => onOpenChange(false)}>Save</Button>
      </DialogFooter>
    </Dialog>
  );
}