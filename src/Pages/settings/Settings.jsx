import { useState } from "react";
import "./settings.css";

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

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [gstno, setGstno] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState({});

  const validate = () => {
    const error = {};
    if (!name) error.name = "Name is required";
    if (!email) error.email = "Email is required";
    if (!phone) error.phone = "Phone is required";
    if (!company) error.company = "Company is required";
    if (!gstno) error.company = "Gst number is required";
    if (!address) error.address = "Address is required";
    if (!state) error.state = "State is required";
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    setError(error);
    if (Object.keys(error).length === 0) {
      console.log("Form submitted successfully");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={error.name ? "input-error" : ""}
          />
          {error.name && <p className="error-text">{error.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error.email ? "input-error" : ""}
          />
          {error.email && <p className="error-text">{error.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={error.phone ? "input-error" : ""}
          />
          {error.phone && <p className="error-text">{error.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={error.company ? "input-error" : ""}
          />
          {error.company && <p className="error-text">{error.company}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="gstno">GST Number.</label>
          <input
            type="text"
            id="gstno"
            value={gstno}
            onChange={(e) => setGstno(e.target.value.toUpperCase())}
            className={error.gstno ? "input-error" : ""}
          />
          {error.company && <p className="error-text">{error.company}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={error.address ? "input-error" : ""}
          />
          {error.address && <p className="error-text">{error.address}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={error.state ? "input-error" : ""}
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
          {error.state && <p className="error-text">{error.state}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="logo">Logo (Optional)</label>
          {logo && (
            <div className="logo-preview">
              <img
                src={URL.createObjectURL(logo)}
                alt="Logo Preview"
                className="logo-img"
              />
            </div>
          )}
          <input
            type="file"
            id="logo"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-btn">
          Save
        </button>
      </form>
    </div>
  );
}
