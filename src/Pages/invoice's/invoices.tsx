import { invoiceItem } from '@/DataModels/DataModels';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Items() {
  const [InvoiceList, setInvoiceList] = useState<invoiceItem[]>([]);
  let invoicelist = useSelector(
    (state: { invoiceDB: any; customer: invoiceItem[] }) =>
      state?.invoiceDB.invoices
  );

  useEffect(() => {
    setInvoiceList(invoicelist);
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
            <th className="border-b p-2 text-left bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {InvoiceList.map((invoice) => (
            <tr key={invoice.Iid} className="hover:bg-gray-200">
              <td className="border-b p-2">{invoice.Iid}</td>
              <td className="border-b p-2">{invoice.cname}</td>
              <td className="border-b p-2">{invoice.totalgstamt}</td>
              <td className="border-b p-2">{invoice.tamt}</td>
              <td className="border-b p-2">
                <button className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200 mr-2">
                  Edit
                </button>
                <button className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200">
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
