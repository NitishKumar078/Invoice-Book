import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';

interface DialogBoxProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  warningTitle: string;
  dialogDescription: string;
}

const DialogBox = ({
  dialogOpen,
  setDialogOpen,
  warningTitle,
  dialogDescription,
}: DialogBoxProps) => {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{warningTitle}</DialogTitle>
          <DialogDescription className="text-zinc-800">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 hover:text-white focus:shadow-outline"
            onClick={() => setDialogOpen(false)}
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
