import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { useNavigate } from 'react-router-dom';

interface DialogBoxProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  warningTitle: string;
  dialogDescription: string;
  url?: string;
}

const DialogBox = ({
  dialogOpen,
  setDialogOpen,
  warningTitle,
  dialogDescription,
  url,
}: DialogBoxProps) => {
  const navigate = useNavigate();
  const handleClose = () => {
    if (url && url !== '') {
      navigate(url);
    }
    setDialogOpen(false);
  };

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
            onClick={handleClose}
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
