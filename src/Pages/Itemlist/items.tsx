import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { tableItem } from '@/DataModels/DataModels';
import { useSelector } from 'react-redux';

export default function tableItems() {
  const [items, setitems] = useState<tableItem[]>([]);
  let itemList = useSelector(
    (state: { ItemsDB: any; Items: tableItem[] }) => state?.ItemsDB.Items
  );
  useEffect(() => {
    setitems(itemList);
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {items.map((tableItem: tableItem, index: number) => (
            <tr key={index}>
              <td className="border-b py-2 px-4">{index}</td>
              <td className="border-b py-2 px-4">{tableItem.item}</td>
              <td className="border-b py-2 px-4">{tableItem.hsnCode}</td>
              <td className="border-b py-2 px-4">{tableItem.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
