import { useState, useEffect, FormEvent } from 'react';
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
import { addCustomer, updateCustomer } from '@/Store/Reducers/customersSlice';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/Store/Reducers/userSlice';
import { addItem, updateItem } from '@/Store/Reducers/ItemsSlice';

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
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [formData, setFormData] = useState({
    item: '',
    hsnCode: '',
    unit: '',
    customUnit: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const dispatch = useDispatch(); // Initialize dispatch
  // Update the selected unit state when Editdata changes
  useEffect(() => {
    if (Editdata) {
      setFormData({
        item: 'item' in Editdata ? Editdata.item || '' : '',
        hsnCode: 'hsnCode' in Editdata ? Editdata.hsnCode || '' : '',
        unit: 'unit' in Editdata ? Editdata.unit || '' : '',
        customUnit: 'customUnit' in Editdata ? Editdata.customUnit || '' : '',
      });
      setSelectedUnit(Editdata && 'unit' in Editdata ? Editdata.unit : '');
    }
  }, [Editdata]);

  const handleSaveCustomer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    const formDataWithUnit = {
      ...formData,
      unit: selectedUnit, // Use the selected unit state
    };
    console.log('Customer Data:', formDataWithUnit); // Log the collected data
    if (Editdata) {
      dispatch(updateItem(formDataWithUnit));
    } else {
      dispatch(addItem(formDataWithUnit)); // Dispatch the action to add customer
    }
    setDialogOpen(false); // Close the dialog
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <form onSubmit={handleSaveCustomer}>
          <DialogHeader>
            <DialogTitle>Create New Item</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-zinc-800 mb-2 p-2 gap-2 flex flex-col">
            <Label htmlFor="item">
              Item Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="item"
              className="-ms-px flex-1 mb-2 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="Enter Item Name"
              type="text"
              value={formData.item}
              onChange={handleChange}
            />
            <Label htmlFor="unit">Unit</Label>
            <Select
              value={selectedUnit} // Bind the selected unit state
              onValueChange={(value) => {
                setSelectedUnit(value);
                setFormData({
                  ...formData,
                  unit: value,
                  customUnit: value === 'Other' ? '' : formData.customUnit,
                });
              }}
              required
            >
              <SelectTrigger id="unit">
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
              {selectedUnit === 'Other' && (
                <Input
                  id="customUnit"
                  placeholder="Enter Unit"
                  value={formData.customUnit}
                  onChange={handleChange}
                  className="mt-2"
                  required={selectedUnit === 'Other'}
                />
              )}
            </Select>
            <Label htmlFor="hsnCode">
              HSN Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="hsnCode"
              className="-ms-px mb-2 flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="Enter HSN Code"
              type="text"
              value={formData.hsnCode}
              onChange={handleChange}
            />
          </DialogDescription>

          <DialogFooter>
            <button
              className="text-black font-bold border-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 border-gray-800 hover:text-white focus:shadow-outline"
              type="submit"
            >
              {!Editdata ? 'Create' : 'Update'}
            </button>
            <button
              className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 hover:text-white focus:shadow-outline"
              onClick={() => setDialogOpen(false)}
            >
              Close
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AddCustomerDialogBox = ({
  dialogOpen,
  setDialogOpen,
  Editdata,
}: DialogBoxProps) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phoneNo: '',
    gstNo: '',
    address: '',
    state: '',
    customState: '',
    email: '',
  });

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

  const [selectedState, setSelectedState] = useState('');
  const dispatch = useDispatch(); // Initialize dispatch
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Update formData when Editdata changes
  useEffect(() => {
    if (Editdata) {
      setFormData({
        name: 'name' in Editdata ? Editdata.name || '' : '',
        company: 'company' in Editdata ? Editdata.company || '' : '',
        phoneNo: 'phoneNo' in Editdata ? Editdata.phoneNo || '' : '',
        gstNo: 'gstNo' in Editdata ? Editdata.gstNo || '' : '',
        address: 'address' in Editdata ? Editdata.address || '' : '',
        state: 'state' in Editdata ? Editdata.state || '' : '',
        customState:
          'customState' in Editdata ? Editdata.customState || '' : '',
        email: 'email' in Editdata ? Editdata.email || '' : '',
      });
      setSelectedState('state' in Editdata ? Editdata.state || '' : '');
    }
  }, [Editdata]);

  const handleSaveCustomer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    const customerData = {
      ...formData,
      state: selectedState === 'Other' ? formData.customState : selectedState,
    };
    console.log('Customer Data:', customerData); // Log the collected data
    if (Editdata) {
      dispatch(updateCustomer(customerData));
    } else {
      dispatch(addCustomer(customerData)); // Dispatch the action to add customer
    }
    setDialogOpen(false); // Close the dialog
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <form onSubmit={handleSaveCustomer}>
          <DialogHeader>
            <DialogTitle>Create New Customer</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-zinc-800 mb-2 p-2 gap-2 flex flex-col">
            <Label htmlFor="customerName">
              Customer Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter Customer Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Label htmlFor="company">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="company"
              placeholder="Enter Company Name"
              type="text"
              value={formData.company}
              onChange={handleChange}
              required
            />

            <Label htmlFor="phoneNo">Phone No.</Label>
            <Input
              id="phoneNo"
              placeholder="Enter Phone no..."
              type="number"
              value={formData.phoneNo}
              onChange={handleChange}
            />

            <Label htmlFor="Email">Email </Label>
            <Input
              id="email"
              placeholder="Enter Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Label htmlFor="gstNo">
              GST Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="gstNo"
              placeholder="Enter GST no..."
              type="text"
              value={formData.gstNo}
              onChange={handleChange}
              required
            />

            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              placeholder="Enter Address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <Label htmlFor="state">
              State <span className="text-red-500">*</span>
            </Label>
            <Select
              value={selectedState}
              onValueChange={(value) => {
                setSelectedState(value);
                setFormData({
                  ...formData,
                  state: value,
                  customState: value === 'Other' ? '' : formData.customState,
                });
              }}
              required
            >
              <SelectTrigger id="state">
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
                id="customState"
                placeholder="Enter your State Name"
                value={formData.customState}
                onChange={handleChange}
                className="mt-2"
                required={selectedState === 'Other'}
              />
            )}
          </DialogDescription>

          <DialogFooter>
            <button
              className="text-black font-bold border-2 py-2 px-4 rounded"
              type="submit"
            >
              {!Editdata ? 'Create' : 'Update'}
            </button>
            <button
              className="text-black font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => setDialogOpen(false)}
            >
              Close
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AddUserDialogBox = ({ dialogOpen, setDialogOpen }: DialogBoxProps) => {
  const dispatch = useDispatch();

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

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phoneNo: '',
    gstNo: '',
    address: '',
    email: '',
    state: '',
    customState: '',
  });

  const [selectedState, setSelectedState] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSaveUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    const userData = {
      ...formData,
      state: selectedState === 'Other' ? formData.customState : selectedState,
    };
    console.log('User Data:', userData); // Log the collected data
    dispatch(updateUser(userData)); // Dispatch the action to add user
    setDialogOpen(false); // Close the dialog
  };

  const handleClose = () => {
    setDialogOpen(false);
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <form onSubmit={handleSaveUser}>
          <DialogHeader>
            <DialogTitle>Please Enter Your Company and Your Info</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-zinc-800 mb-2 p-2 gap-2 flex flex-col">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter Your Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Label htmlFor="company">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="company"
              placeholder="Enter Company Name"
              type="text"
              value={formData.company}
              onChange={handleChange}
              required
            />

            <Label htmlFor="phoneNo">Phone No.</Label>
            <Input
              id="phoneNo"
              placeholder="Enter Phone No."
              type="number"
              value={formData.phoneNo}
              onChange={handleChange}
            />

            <Label htmlFor="Email">Email </Label>
            <Input
              id="email"
              placeholder="Enter Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Label htmlFor="gstNo">
              GST Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="gstNo"
              placeholder="Enter GST Number"
              type="text"
              value={formData.gstNo}
              onChange={handleChange}
              required
            />

            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              placeholder="Enter Address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <Label htmlFor="state">
              State <span className="text-red-500">*</span>
            </Label>
            <Select
              value={selectedState}
              onValueChange={(value) => {
                setSelectedState(value);
                setFormData({
                  ...formData,
                  state: value,
                  customState: value === 'Other' ? '' : formData.customState,
                });
              }}
              required
            >
              <SelectTrigger id="state">
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
                id="customState"
                placeholder="Enter Your State Name"
                value={formData.customState}
                onChange={handleChange}
                className="mt-2"
                required
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
              type="submit"
            >
              Create
            </button>
            <button
              className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-800 hover:text-white focus:shadow-outline"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { DialogBox, AddIteamDialogBox, AddCustomerDialogBox, AddUserDialogBox };
