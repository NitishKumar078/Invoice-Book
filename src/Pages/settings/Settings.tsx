import React, { useState } from 'react';
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
    <div className="w-full max-w-3xl mx-auto p-10 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-5 text-center text-blue-600">
        User Information
      </h1>
      <form id="userForm" className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {error.name && (
            <p className="text-red-500 text-xs mt-1">{error.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {error.email && (
            <p className="text-red-500 text-xs mt-1">{error.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {error.phone && (
            <p className="text-red-500 text-xs mt-1">{error.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Enter your company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {error.company && (
            <p className="text-red-500 text-xs mt-1">{error.company}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="gstno"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            GST Number
          </label>
          <input
            type="text"
            id="gstno"
            name="gstno"
            placeholder="Enter your GST number"
            value={gstno}
            onChange={(e) => setGstno(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {error.gstno && (
            <p className="text-red-500 text-xs mt-1">{error.gstno}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {error.address && (
            <p className="text-red-500 text-xs mt-1">{error.address}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State
          </label>
          <select
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="" selected disabled>
              Select State
            </option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          {error.state && (
            <p className="text-red-500 text-xs mt-1">{error.state}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <div>
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
                name="logo"
                accept="image/*"
                className="sr-only"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-md transition-colors duration-200 mt-8"
        >
          Save Information
        </button>
      </form>
    </div>
  );
}
