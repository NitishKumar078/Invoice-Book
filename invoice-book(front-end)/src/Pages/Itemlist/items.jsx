import { useState, useEffect } from "react";
import "./items.css";
import { NavLink } from "react-router-dom";
// import  axios from "axios";

/**
 * Renders a table of items fetched from the server.
 *
 * @return {JSX.Element} A table of item data.
 */
export default function Items() {
  const [items, setItems] = useState([]);

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
    <div className="itemList">
      <NavLink to="/Items/newItem" id="add-item-button">
        <button>Add Item</button>
      </NavLink>

      <table>
        <caption>Items</caption>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Unit</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.name}</td>
              <td>{item.unit}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
