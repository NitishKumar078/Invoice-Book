import { useState } from 'react';
import Select from 'react-select';
import { SingleValue, tableItem } from '@/DataModels/DataModels';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '@/Store/Reducers/ItemsSlice';
import ShortUniqueId from 'short-unique-id';
const { sequentialUUID } = new ShortUniqueId();

// update the code to set the fomate data and store it in the database
const AddItem = () => {
  const units = ['Piece', 'Kg', 'Ton', 'Ltr', 'inch', 'cm', 'Other'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemname, setitemname] = useState<string>('');
  const [hsnCode, sethsnCode] = useState<string>('');
  const [unit, setUnit] = useState<string>(units[0]);
  const customerOptions = units.map((unit) => ({
    value: unit,
    label: unit,
  }));
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Item: tableItem = {
      id: sequentialUUID(),
      item: itemname,
      hsnCode: hsnCode,
      unit: unit,
    };
    dispatch(addItem(Item));
    console.log('submitted');
    navigate('/Items');
  };

  const handleselectunit = (selectedOption: any) => {
    if (selectedOption) {
      setUnit(selectedOption.value);
    }
  };

  return (
    <div className="createcart w-[calc(78vw)] absolute left-[calc(19vw)] mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Create Items</h1>
      <h2 className="text-2xl font-bold text-center mb-6">Item Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Item Name
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setitemname(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-gray-700"
          >
            Unit
          </label>
          <Select
            id="customername"
            className="mt-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            options={customerOptions}
            onChange={handleselectunit}
            placeholder="Select customer"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            HSN Code
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="quantity"
              onChange={(e) => sethsnCode(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddItem;
