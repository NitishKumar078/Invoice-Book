import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Customer, TableItem } from '@/DataModels/DataModels';

interface DialogBoxProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  warningTitle?: string;
  dialogDescription?: string;
  Editdata?: TableItem | Customer | null;
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
        </DialogHeader>
        <DialogDescription className="text-zinc-800">
          {dialogDescription}
        </DialogDescription>

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

const AddIteamDialogBox = ({
  dialogOpen,
  setDialogOpen,
  Editdata,
}: DialogBoxProps) => {
  const units = ['Piece', 'Kg', 'Ton', 'Ltr', 'inch', 'cm', 'Other']; // Dummy data

  // Initialize the selected unit state with Editdata.unit if available
  const [selectedUnit, setSelectedUnit] = useState<string>(
    Editdata && 'unit' in Editdata ? Editdata.unit : '' // Use Editdata.unit if it exists and is valid
  );

  // Update the selected unit state when Editdata changes
  useEffect(() => {
    if (Editdata && 'unit' in Editdata) {
      setSelectedUnit(Editdata.unit);
    }
  }, [Editdata]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-zinc-800 mb-2 p-2 gap-2 flex flex-col">
          <Label htmlFor="item-name">
            Item Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="item-name"
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter Item Name"
            type="text"
            defaultValue={Editdata && 'item' in Editdata ? Editdata.item : ''} // Use Editdata.item if available and valid
          />
          <Label htmlFor="unit-select">Unit</Label>
          <Select
            value={selectedUnit} // Bind the selected unit state
            onValueChange={(value) => setSelectedUnit(value)}
            defaultValue={selectedUnit} // Update the state on selection
          >
            <SelectTrigger id="unit-select">
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label htmlFor="HSN-Code">
            HSN Code <span className="text-red-500">*</span>
          </Label>
          <Input
            id="hsn-code"
            className="-ms-px mb-2 flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter HSN Code"
            type="text"
            defaultValue={
              Editdata && 'hsnCode' in Editdata ? Editdata.hsnCode : ''
            } // Use Editdata.hsnCode if available and valid
          />
        </DialogDescription>

        <DialogFooter>
          <button
            className="text-black font-bold border-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 border-gray-800 hover:text-white focus:shadow-outline"
            onClick={() => setDialogOpen(false)}
          >
            Create
          </button>
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

const AddCustomerDialogBox = ({
  dialogOpen,
  setDialogOpen,
}: DialogBoxProps) => {
  const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Other',
  ];
  const [selectedState, setSelectedState] = useState<string>('');
  const [customState, setCustomState] = useState<string>(''); // State for manual input

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Create New Customer </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-zinc-800 mb-2 p-2 gap-2 flex flex-col">
          <Label htmlFor="iteam-name">
            Customer Name <span className="text-red-500">*</span>
          </Label>{' '}
          <Input
            id={`customer-name`}
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter Customer Name"
            type="text"
          />
          <Label htmlFor="iteam-name">
            Company Name <span className="text-red-500">*</span>{' '}
          </Label>{' '}
          <Input
            id={`customer-company_name`}
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter Company Name"
            type="text"
          />
          <Label htmlFor="iteam-name">Phone No.</Label>{' '}
          <Input
            id={`customer-phno`}
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter Phone no..."
            type="number"
          />
          <Label htmlFor="iteam-name">
            GST Number <span className="text-red-500">*</span>
          </Label>{' '}
          <Input
            id={`customer-gstno`}
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter GST no..."
            type="text"
          />
          <Label htmlFor="iteam-name">
            {' '}
            Address <span className="text-red-500">*</span>
          </Label>{' '}
          <Input
            id={`customer-address`}
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter Address"
            type="text"
          />
          <Label htmlFor="state-select">
            State <span className="text-red-500">*</span>
          </Label>
          <Select
            value={selectedState}
            onValueChange={(value) => {
              setSelectedState(value);
              if (value !== 'Other') setCustomState(''); // Clear custom input if not "Other"
            }}
          >
            <SelectTrigger id="state-select">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedState === 'Other' && (
            <Input
              id="custom-state"
              value={customState}
              onChange={(e) => setCustomState(e.target.value)}
              placeholder="Enter State"
              className="mt-2"
            />
          )}
        </DialogDescription>

        <DialogFooter>
          <button
            className="text-black font-bold border-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 border-gray-800 hover:text-white focus:shadow-outline"
            onClick={() => setDialogOpen(false)}
          >
            Create
          </button>
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

const AddUserDialogBox = ({ dialogOpen, setDialogOpen }: DialogBoxProps) => {
  const navigate = useNavigate();
  const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Other',
  ];
  const [selectedState, setSelectedState] = useState<string>('');
  const [customState, setCustomState] = useState<string>(''); // State for manual input
  const createuser = () => {
    setDialogOpen(false);
    navigate('/dashboard');
  };

  const handleclose = () => {
    setDialogOpen(false);
    navigate('/dashboard');
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Please Enter your Company and your Info </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-zinc-800 mb-2 p-2 gap-2 flex flex-col">
          <Label htmlFor="iteam-name">
            Name <span className="text-red-500">*</span>
          </Label>{' '}
          <Input
            id={`customer-name`}
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter Customer Name"
            type="text"
          />
          <Label htmlFor="iteam-name">
            Company Name <span className="text-red-500">*</span>{' '}
          </Label>{' '}
          <Input
            id={`customer-company_name`}
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter Company Name"
            type="text"
          />
          <Label htmlFor="iteam-name">Phone No.</Label>{' '}
          <Input
            id={`customer-phno`}
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter Phone no..."
            type="number"
          />
          <Label htmlFor="iteam-name">
            GST Number <span className="text-red-500">*</span>
          </Label>{' '}
          <Input
            id={`customer-gstno`}
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter GST no..."
            type="text"
          />
          <Label htmlFor="iteam-name">
            {' '}
            Address <span className="text-red-500">*</span>
          </Label>{' '}
          <Input
            id={`customer-address`}
            className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="Enter Address"
            type="text"
          />
          <Label htmlFor="state-select">
            State <span className="text-red-500">*</span>
          </Label>
          <Select
            value={selectedState}
            onValueChange={(value) => {
              setSelectedState(value);
              if (value !== 'Other') setCustomState(''); // Clear custom input if not "Other"
            }}
          >
            <SelectTrigger id="state-select">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedState === 'Other' && (
            <Input
              id="custom-state"
              value={customState}
              onChange={(e) => setCustomState(e.target.value)}
              placeholder="Enter State"
              className="mt-2"
            />
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo (Optional)
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="logo"
                className="inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50 cursor-pointer"
              >
                Choose file
              </label>
              <span id="file-name" className="ml-3 text-sm text-gray-500">
                No file chosen
              </span>
              <input
                type="file"
                id="logo"
                accept="image/*"
                className="sr-only"
              />
            </div>
          </div>
        </DialogDescription>

        <DialogFooter>
          <button
            className="text-black font-bold border-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 border-gray-800 hover:text-white focus:shadow-outline"
            onClick={createuser}
          >
            Create
          </button>
          <button
            className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 hover:text-white focus:shadow-outline"
            onClick={handleclose}
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DialogBox, AddIteamDialogBox, AddCustomerDialogBox, AddUserDialogBox };
