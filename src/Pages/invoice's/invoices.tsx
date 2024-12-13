import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Define types for the item
interface Item {
  itemId: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  description: string;
}

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems([
      {
        itemId: 1,
        name: "Item 1",
        price: 10,
        unit: "each",
        quantity: 2,
        description: "Description 1",
      },
      {
        itemId: 2,
        name: "Item 2",
        price: 20,
        unit: "pack",
        quantity: 3,
        description: "Description 2",
      },
      {
        itemId: 3,
        name: "Item 3",
        price: 30,
        unit: "liter",
        quantity: 4,
        description: "Description 3",
      },
    ]);
  }, []);

  return (
    <div className="itemList w-full h-[90vh] fixed left-[calc(21.5vw)] right-[1vw] bg-white p-5 border border-gray-300 shadow-lg overflow-y-auto transition-all duration-300 ease-in-out">
      <NavLink to="/Items/newItem" id="add-item-button" className="fixed bottom-8 right-5">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Item</button>
      </NavLink>

      <table className="w-full border-collapse mt-5">
        <caption className="text-2xl font-bold mb-4">Items</caption>
        <thead>
          <tr>
            <th className="border-b p-2 text-left bg-gray-100">Item ID</th>
            <th className="border-b p-2 text-left bg-gray-100">Name</th>
            <th className="border-b p-2 text-left bg-gray-100">Unit</th>
            <th className="border-b p-2 text-left bg-gray-100">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemId} className="hover:bg-gray-200">
              <td className="border-b p-2">{item.itemId}</td>
              <td className="border-b p-2">{item.name}</td>
              <td className="border-b p-2">{item.unit}</td>
              <td className="border-b p-2">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
