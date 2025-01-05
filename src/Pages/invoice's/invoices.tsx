import { useState, useEffect } from 'react';

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
        unit: ['each', 'pack', 'liter'][i % 3],
        quantity: i + 1,
        description: `Description ${i + 1}`,
      }))
    );
  }, []);

  return (
    <div className="createcart itemList absolute left-[calc(17rem)] right-[5px]  p-2  bg-white  border border-gray-300 shadow-lg transition-all duration-300 ease-in-out">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Export button
      </button>

      <table className="w-full border-collapse mt-5">
        <caption className="text-2xl font-bold mb-4">Invoice</caption>
        <thead>
          <tr>
            <th className="border-b p-2 text-left bg-gray-100">Invoice ID</th>
            <th className="border-b p-2 text-left bg-gray-100">Company</th>
            <th className="border-b p-2 text-left bg-gray-100">Tax amount</th>
            <th className="border-b p-2 text-left bg-gray-100">Total amount</th>
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
