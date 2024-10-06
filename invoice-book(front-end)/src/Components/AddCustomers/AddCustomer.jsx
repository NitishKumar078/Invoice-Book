import { useState } from "react";

const AddCustomer = () => {
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
  ];

  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [gstno, setgstno] = useState("");
  const [name, setName] = useState("");
  const [nick_name, setNick_name] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone2, setPhone2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !nick_name || !gstno || !state || !phone) {
      alert("Please fill all required fields");
      return;
    }
    console.log("submitted");
  };
  return (
    <div className="form-container">
      <h2 className="form-title" style={{ textAlign: "center" }}>
        Customer Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nick_name">Nick Name</label>
          <input
            type="text"
            id="name"
            value={nick_name}
            onChange={(e) => setNick_name(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone2">Phone 2</label>
          <input
            type="text"
            id="phone"
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="gstno">GST Number.</label>
          <input type="text" id="gstno" value={gstno} onChange={(e) => setgstno(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)} required>
            <option value="" >Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
            
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
