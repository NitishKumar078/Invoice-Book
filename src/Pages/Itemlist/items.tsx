import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Define the structure of an item
interface Item {
  itemId: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  description: string;
}

/**
 * Renders a table of items fetched from the server.
 *
 * @return {JSX.Element} A table of item data.
 */
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
    <div className="p-4 w-[calc(80vw)]  left-[calc(19vw)] createcart absolute">
      <NavLink
        to="/Items/newItem"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4 inline-block"
      >
        Add Item
      </NavLink>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <caption className="text-2xl font-semibold mb-4">Items</caption>
        <thead>
          <tr>
            <th className="border-b py-2 px-4 text-left">Item ID</th>
            <th className="border-b py-2 px-4 text-left">Name</th>
            <th className="border-b py-2 px-4 text-left">Unit</th>
            <th className="border-b py-2 px-4 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemId}>
              <td className="border-b py-2 px-4">{item.itemId}</td>
              <td className="border-b py-2 px-4">{item.name}</td>
              <td className="border-b py-2 px-4">{item.unit}</td>
              <td className="border-b py-2 px-4">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
