import { useState } from 'react';
import { openDB } from 'idb';
import { useDispatch } from 'react-redux';
import { User } from '../../DataModels/DataModels';
import { updateUser } from '../../Store/user/userSlice';
import { useNavigate } from 'react-router-dom';

// Define the possible states for the select dropdown
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
];

interface ErrorState {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  gstno?: string;
  address?: string;
  state?: string;
}

export default function Settings() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [gstno, setGstno] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [logo, setLogo] = useState<File | null>(null);
  const [error, setError] = useState<ErrorState>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const error: ErrorState = {};
    if (!name) error.name = 'Name is required';
    if (!email) error.email = 'Email is required';
    if (!phone) error.phone = 'Phone is required';
    if (!company) error.company = 'Company is required';
    if (!gstno) error.gstno = 'GST number is required';
    if (!address) error.address = 'Address is required';
    if (!state) error.state = 'State is required';
    return error;
  };

  const storeDataInLocalStorage = (data: User) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    setError(error);
    if (Object.keys(error).length === 0) {
      const userInfo: User = {
        name,
        email,
        phone,
        company,
        gstno,
        address,
        state,
      };

      // Store data in localStorage
      storeDataInLocalStorage(userInfo);

      // Dispatch action to store data in Redux
      dispatch(updateUser(userInfo));
      navigate('/');

      console.log('Form submitted successfully');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border ${
              error.name ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          />
          {error.name && <p className="text-red-500 text-xs">{error.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border ${
              error.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          />
          {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full p-2 border ${
              error.phone ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          />
          {error.phone && <p className="text-red-500 text-xs">{error.phone}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="company" className="block text-sm font-medium">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={`w-full p-2 border ${
              error.company ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          />
          {error.company && (
            <p className="text-red-500 text-xs">{error.company}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="gstno" className="block text-sm font-medium">
            GST Number
          </label>
          <input
            type="text"
            id="gstno"
            value={gstno}
            onChange={(e) => setGstno(e.target.value.toUpperCase())}
            className={`w-full p-2 border ${
              error.gstno ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          />
          {error.gstno && <p className="text-red-500 text-xs">{error.gstno}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full p-2 border ${
              error.address ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          />
          {error.address && (
            <p className="text-red-500 text-xs">{error.address}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium">
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={`w-full p-2 border ${
              error.state ? 'border-red-500' : 'border-gray-300'
            } rounded-md`}
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          {error.state && <p className="text-red-500 text-xs">{error.state}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="logo" className="block text-sm font-medium">
            Logo (Optional)
          </label>
          {logo && (
            <div className="mb-2">
              <img
                src={URL.createObjectURL(logo)}
                alt="Logo Preview"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
          )}
          <input
            type="file"
            id="logo"
            onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}
