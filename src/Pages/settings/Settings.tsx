import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  gstno: string;
  address: string;
  state: string;
  logo: FileList;
}

export default function Settings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeDataInLocalStorage = (data: User) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const userInfo: User = {
      name: data.name,
      email: data?.email,
      phone: data?.phone,
      company: data.company,
      gstno: data.gstno,
      address: data.address,
      state: data.state,
    };

    // Store data in localStorage
    storeDataInLocalStorage(userInfo);

    // Dispatch action to store data in Redux
    dispatch(updateUser(userInfo));
    navigate('/');

    console.log('Form submitted successfully');
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-10 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-5 text-center text-blue-600">
        User Information
      </h1>
      <form
        id="userForm"
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            {...register('name', { required: 'Name is required' })}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
            {...register('phone', { required: 'Phone is required' })}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            {...register('company', { required: 'Company is required' })}
            placeholder="Enter your company name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {errors.company && (
            <p className="text-red-500 text-xs mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="gstno"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            GST Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="gstno"
            {...register('gstno', { required: 'GST number is required' })}
            placeholder="Enter your GST number"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {errors.gstno && (
            <p className="text-red-500 text-xs mt-1">{errors.gstno.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            {...register('address', { required: 'Address is required' })}
            placeholder="Enter your address"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            {...register('state', { required: 'State is required' })}
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
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
          )}
        </div>

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
              {...register('logo')}
              accept="image/*"
              className="sr-only"
            />
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
