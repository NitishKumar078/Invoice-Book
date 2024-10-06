import {useState} from "react";

const AddItem = () => {
  const handleSubmit = () => {
    console.log("submitted");
  };
  const handleselectunit = (e) =>{
      if (e.target.value === "Other") {
        e.target.nextSibling.style.display = "block";
      } else {
        e.target.nextSibling.style.display = "none";
        setUnit(e.target.value);
      }

  };
  
const units = [
    "Piece",
    "Kg",
    "Ton",
    "Ltr",
    "Other",
];

  const [unit, setUnit] = useState(units[0]);

  return (
    <div>
      <h1>Create items</h1>
      <div className="form-container">
        <h2 className="form-title" style={{ textAlign: "center" }}>
          Item Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required/>
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <select id="unit" onChange={handleselectunit} value={unit} required>
            <option value="">Select unit</option>
            {units.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
            
            </select>
            <input type="text" id="unit-other" placeholder="Other" style={{display: "none"}}/>
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <div style={{display:"flex",alignItems:"center"}}>
            <input type="number" id="quantity" defaultValue="1" min="1"required/>  
            <span style={{padding: "10px"}}>{unit}</span> 
            </div>
            
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" id="phone" required/>
          </div>

          <button type="submit" className="submit-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
