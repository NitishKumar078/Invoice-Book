import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../../DataModels/DataModels';
import { updateUser } from '../../Store/Reducers/userSlice';
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
    <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-5 text-center text-blue-600">
        User Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-3 border ${
              error.name ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {error.name && (
            <p className="text-red-500 text-xs mt-1">{error.name}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border ${
              error.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {error.email && (
            <p className="text-red-500 text-xs mt-1">{error.email}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full p-3 border ${
              error.phone ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {error.phone && (
            <p className="text-red-500 text-xs mt-1">{error.phone}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={`w-full p-3 border ${
              error.company ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {error.company && (
            <p className="text-red-500 text-xs mt-1">{error.company}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="gstno"
            className="block text-sm font-medium text-gray-700"
          >
            GST Number
          </label>
          <input
            id="gstno"
            value={gstno}
            onChange={(e) => setGstno(e.target.value)}
            className={`w-full p-3 border ${
              error.gstno ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {error.gstno && (
            <p className="text-red-500 text-xs mt-1">{error.gstno}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full p-3 border ${
              error.address ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {error.address && (
            <p className="text-red-500 text-xs mt-1">{error.address}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
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

        <div className="mb-5">
          <label
            htmlFor="logo"
            className="block text-sm font-medium text-gray-700"
          >
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
            id="logo"
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Save
        </button>
      </form>
    </div>
  );
}
