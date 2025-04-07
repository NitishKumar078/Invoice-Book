import { useEffect, useState } from "react";
import Select from "react-select";
import { Customer, User, option } from "@/DataModels/DataModels";
import { useSelector } from "react-redux";

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    padding: "7px",
    backgroundColor: state.isSelected
      ? "#007BFF"
      : state.isFocused
      ? "#e7f0ff"
      : "white",
    color: state.isSelected ? "black" : "#543",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#d6e4f7", // Background color on hover
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#333", // Color of selected value
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "8px",
    marginTop: "5px",
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0,
    maxHeight: "200px",
    overflowY: "auto",
  }),
};

interface CustomerListPops {
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  selectedCustomer: Customer | null;
  setgsttype: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomerDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectCustomer = ({
  setgsttype,
  setSelectedCustomer,
  selectedCustomer,
  setCustomerDialogBox,
}: CustomerListPops) => {
  const user = useSelector((state: { user: User }) => state.user);
  const ListCustomers = useSelector(
    (state: { customer: Customer[] }) => state.customer
  );

  const [defaultCustomer, setDefaultCustomer] = useState<option | null>(null);

  const customerOptions = [
    ...ListCustomers.map((customer) => ({
      value: customer.company || "",
      label: customer.company || "",
    })),
    { value: "Add Customer", label: "Add Customer" },
  ];

  const handleCustomerChange = (selectedOption: any) => {
    if (!selectedOption) return;

    if (selectedOption.value === "Add Customer") {
      setCustomerDialogBox(true);
    }

    const customer = ListCustomers.find(
      (c) => c.company === selectedOption.value
    );
    if (customer) {
      setSelectedCustomer(customer);
      const gstType =
        customer.state?.toLowerCase() === user.state.toLowerCase();
      setgsttype(gstType);

      // Set address, state, and GSTIN number
      document.getElementById("customer-address")!.textContent =
        customer.address || "N/A";
      document.getElementById("customer-contact")!.textContent =
        customer.contactNo || "N/A";
      document.getElementById("customer-state")!.textContent =
        customer.state || "N/A";
      document.getElementById("customer-gstin")!.textContent =
        customer.gstinNo || "N/A";
    }
  };

  const highlightOption = (option: any) => {
    return option.value === "Add Customer"
      ? {
          backgroundColor: "white",
          color: "blue",
          fontWeight: "bold",
        }
      : {};
  };

  const modifiedOptions = customerOptions.map((option) => ({
    ...option,
    customStyle: highlightOption(option),
  }));

  // Dynamically update the default customer when selectedCustomer changes
  useEffect(() => {
    const defaultOption = customerOptions.find(
      (option) => option.value === selectedCustomer?.company
    );
    setDefaultCustomer(defaultOption || null);
  }, [selectedCustomer]);

  return (
    <div>
      <Select
        id="customername"
        className="p-2 w-60 h-10"
        options={customerOptions}
        onChange={handleCustomerChange}
        placeholder="Select customer"
        required
        styles={{
          ...customStyles,
          option: (provided: any, state: { data: option }) => {
            const customStyle = modifiedOptions.find(
              (option) => option.value === state.data.value
            )?.customStyle;
            return {
              ...customStyles.option(provided, state),
              ...customStyle,
            };
          },
        }}
        value={defaultCustomer} // Dynamically set the default value
      />
      <div className="flex flex-col gap-2 pt-2">
        <p>
          <strong>Address:</strong>{" "}
          <span id="customer-address">
            {selectedCustomer?.address || "N/A"}
          </span>
        </p>
        <p>
          <strong>Contact No:</strong>{" "}
          <span id="customer-contact">
            {selectedCustomer?.contactNo || "N/A"}
          </span>
        </p>
        <p>
          <strong>State:</strong>{" "}
          <span id="customer-state">{selectedCustomer?.state || "N/A"}</span>
        </p>
        <p>
          <strong>GSTIN:</strong>{" "}
          <span id="customer-gstin">{selectedCustomer?.gstinNo || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default SelectCustomer;
