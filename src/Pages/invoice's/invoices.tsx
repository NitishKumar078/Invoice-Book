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
    setItems(
      Array.from({ length: 20 }, (_, i) => ({
        itemId: i + 1,
        name: `Item ${i + 1}`,
        price: (i + 1) * 10,
        unit: ["each", "pack", "liter"][i % 3],
        quantity: i + 1,
        description: `Description ${i + 1}`,
      }))
    );
  }, []);

  return (
    <div className="createcart itemList absolute right-[10px] w-[calc(78vw)]  p-2 left-[calc(20vw)] bg-white  border border-gray-300 shadow-lg transition-all duration-300 ease-in-out">
      <NavLink to="/Items/newItem" id="add-item-button">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Item
        </button>
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
