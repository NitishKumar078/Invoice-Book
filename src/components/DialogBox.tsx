import { useState, useEffect, FormEvent } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/Store/Reducers/userSlice';
import { addItem, updateItem } from '@/Store/Reducers/ItemsSlice';
import { ValidatingInteger } from '@/utils/common_Methods';
import { selectCustomer } from '@/Store/Selectors/Selectors';

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
  const [isOpen, setisOpen] = useState(false); // State for warning dialog
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
    if (!selectedUnit) {
      setisOpen(true); // Open the dialog if unit is not selected
      return;
    }
    console.log('Customer Data:', formData); // Log the collected data
    if (Editdata) {
      dispatch(updateItem(formData));
    } else {
      dispatch(addItem(formData)); // Dispatch the action to add customer
    }
    setDialogOpen(false); // Close the dialog
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
              defaultValue={formData.item}
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
                  defaultValue={formData.customUnit}
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
              defaultValue={formData.hsnCode}
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
      <DialogBox
        dialogOpen={isOpen}
        setDialogOpen={setisOpen}
        warningTitle={'Warning'}
        dialogDescription={'Please select the Unit.'}
      />
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

  const customers = useSelector(selectCustomer);
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
  const [isOpen, setisOpen] = useState(false);
  const [warning_msg, setwarning_msg] = useState('');
  const dispatch = useDispatch(); // Initialize dispatch
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ValidatingInteger(e, e.target.id); // Call the validation function
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
    if (!selectedState) {
      setisOpen(true); // Open the dialog if state is not selected
      setwarning_msg('Please select the state.');
      return;
    }
    const customerData = {
      ...formData,
      state: selectedState === 'Other' ? formData.customState : selectedState,
    };
    console.log('Customer Data:', customerData); // Log the collected data
    if (Editdata) {
      dispatch(updateCustomer(customerData));
    } else {
      // check if the same company name already exists
      const isAlreadyExist = customers.some(
        (c) => c.company === customerData.company
      );
      if (isAlreadyExist) {
        setwarning_msg(
          `${customerData.company} already Exist. Please make sure you provide the unique company name`
        );
        setisOpen(true);
      } else {
        dispatch(addCustomer(customerData)); // Dispatch the action to add customer
        setDialogOpen(false);
      }
    }
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
              defaultValue={formData.name}
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
              defaultValue={formData.company}
              onChange={handleChange}
              required
            />

            <Label htmlFor="phoneNo">Phone No.</Label>
            <Input
              id="phoneNo"
              placeholder="Enter Phone no..."
              type="text"
              defaultValue={formData.phoneNo}
              onChange={handleChange}
            />

            <Label htmlFor="Email">Email </Label>
            <Input
              id="email"
              placeholder="Enter Email Address"
              type="email"
              defaultValue={formData.email}
              onChange={handleChange}
            />

            <Label htmlFor="gstNo">
              GST Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="gstNo"
              placeholder="Enter GST no..."
              type="text"
              defaultValue={formData.gstNo}
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
              defaultValue={formData.address}
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
                defaultValue={formData.customState}
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
      <DialogBox
        dialogOpen={isOpen}
        setDialogOpen={setisOpen}
        warningTitle={'Warning'}
        dialogDescription={warning_msg}
      />
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
    BankName: '',
    AccountNo: '',
    IFSC_code: '',
    AccountName: '',
  });

  const [selectedState, setSelectedState] = useState<string>('');
  const [isOpen, setisOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ValidatingInteger(e, e.target.id); // Call the validation function
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSaveUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload

    if (!selectedState) {
      setisOpen(true); // Open the dialog if state is not selected
      return;
    }

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
      <DialogContent className="max-h-[90vh] overflow-y-auto">
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
              defaultValue={formData.name}
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
              defaultValue={formData.company}
              onChange={handleChange}
              required
            />

            <Label htmlFor="phoneNo">Phone No.</Label>
            <Input
              id="phoneNo"
              placeholder="Enter Phone No."
              type="text"
              defaultValue={formData.phoneNo}
              onChange={handleChange}
            />

            <Label htmlFor="Email">Email </Label>
            <Input
              id="email"
              placeholder="Enter Email Address"
              type="email"
              defaultValue={formData.email}
              onChange={handleChange}
            />

            <Label htmlFor="gstNo">
              GST Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="gstNo"
              placeholder="Enter GST Number"
              type="text"
              defaultValue={formData.gstNo}
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
              defaultValue={formData.address}
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
                defaultValue={formData.customState}
                onChange={handleChange}
                className="mt-2"
                required
              />
            )}
            <Label htmlFor="BankName">
              Bank Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="BankName"
              placeholder="Enter Bank Name"
              type="text"
              defaultValue={formData.BankName}
              onChange={handleChange}
              required
            />

            <Label htmlFor="AccountNo">
              Account Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="AccountNo"
              placeholder="Enter Account Number"
              type="text"
              defaultValue={formData.AccountNo}
              onChange={handleChange}
              required
            />

            <Label htmlFor="IFSC_code">
              IFSC Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="IFSC_code"
              placeholder="Enter IFSC Code"
              type="text"
              defaultValue={formData.IFSC_code}
              onChange={handleChange}
              required
            />

            <Label htmlFor="AccountName">
              Account Holder Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="AccountName"
              placeholder="Enter Account Holder Name"
              type="text"
              defaultValue={formData.AccountName}
              onChange={handleChange}
              required
            />
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
      <DialogBox
        dialogOpen={isOpen}
        setDialogOpen={setisOpen}
        warningTitle={'Warning'}
        dialogDescription={'Please select the state.'}
      />
    </Dialog>
  );
};

export { DialogBox, AddIteamDialogBox, AddCustomerDialogBox, AddUserDialogBox };
