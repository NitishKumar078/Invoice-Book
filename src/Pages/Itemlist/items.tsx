import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { tableItem } from '@/DataModels/DataModels';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteItem } from '@/Store/Reducers/ItemsSlice';

export default function tableItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [items, setitems] = useState<tableItem[]>([]);
  let itemList = useSelector(
    (state: { ItemsDB: any; Items: tableItem[] }) => state?.ItemsDB.Items
  );

  useEffect(() => {
    setitems(itemList);
  }, [items]);

  const handleItemEdit = (tableItem: tableItem) => {
    navigate('/Items/newItem', { state: { tableItem, mode: 'Edit' } });
  };

  const handleItemDeletion = async (key: string) => {
    //delete from redux and the index Db
    dispatch(deleteItem(key));
    window.location.reload();
  };

  return (
    <div className="p-4 left-[calc(17rem)] right-[5px] createcart absolute">
      <NavLink
        to="/Items/newItem"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4 inline-block"
      >
        Add tableItem
      </NavLink>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <caption className="text-2xl font-semibold mb-4">tableItems</caption>
        <thead>
          <tr>
            <th className="border-b py-2 px-4 text-left">tableItem ID</th>
            <th className="border-b py-2 px-4 text-left">Name</th>
            <th className="border-b py-2 px-4 text-left">HSN No.</th>
            <th className="border-b py-2 px-4 text-left">Unit</th>
            <th className="border-b py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((tableItem: tableItem, index: number) => (
            <tr key={index}>
              <td className="border-b py-2 px-4">{index}</td>
              <td className="border-b py-2 px-4">{tableItem.item}</td>
              <td className="border-b py-2 px-4">{tableItem.hsnCode}</td>
              <td className="border-b py-2 px-4">{tableItem.unit}</td>
              <td className="border-b p-2">
                <button
                  className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200 mr-2"
                  onClick={() => {
                    handleItemEdit(tableItem);
                  }}
                >
                  Edit
                </button>
                <button
                  className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
                  onClick={() => {
                    handleItemDeletion(tableItem.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
