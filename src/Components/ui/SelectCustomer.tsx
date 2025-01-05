import Select from 'react-select';
import { Customer, User } from '@/DataModels/DataModels';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    padding: '7px',
    backgroundColor: state.isSelected
      ? '#007BFF'
      : state.isFocused
      ? '#e7f0ff'
      : 'white',
    color: state.isSelected ? 'black' : '#543',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#d6e4f7', // Background color on hover
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#333', // Color of selected value
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: '8px',
    marginTop: '5px',
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0,
    maxHeight: '200px',
    overflowY: 'auto',
  }),
};

interface CustomerListPops {
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  setgsttype: React.Dispatch<React.SetStateAction<boolean | true>>;
  ListCustomers: Customer[];
}
const SelectCustomer = ({
  setgsttype,
  setSelectedCustomer,
  ListCustomers,
}: CustomerListPops) => {
  const navigate = useNavigate();
  const user = useSelector((state: { user: User }) => state.user);

  const customerOptions = ListCustomers.map((customer) => ({
    value: customer.name,
    label: customer.name,
  }));
  const handleCustomerChange = (selectedOption: any) => {
    if (selectedOption.value === 'Add Customer') {
      navigate('/Customers/newCustomer');
      setSelectedCustomer(null);
    }

    const customer = ListCustomers.find((c) => c.name === selectedOption.value);
    if (customer) {
      setSelectedCustomer(customer);
      const gstType: boolean =
        customer.state?.toLowerCase() === user.state.toLowerCase()
          ? true
          : false;
      setgsttype(gstType);
    }
  };

  const highlightOption = (option: any) => {
    return option.value === 'Add Customer'
      ? {
          backgroundColor: 'white', // Highlight with a yellow background
          color: 'blue', // White text color
          fontWeight: 'bold', // Bold text for the highlighted option
        }
      : {};
  };

  // Modify options with custom styles applied
  const modifiedOptions = customerOptions.map((option) => ({
    ...option,
    customStyle: highlightOption(option), // Add custom styles to each option
  }));
  return (
    <div>
      <Select
        id="customername"
        className="p-2 w-60 h-10 "
        options={modifiedOptions}
        onChange={handleCustomerChange}
        placeholder="Select customer"
        required
        styles={{
          ...customStyles,
          option: (provided, state) => {
            const customStyle = modifiedOptions.find(
              (option) => option.value === state.data.value
            )?.customStyle;
            return {
              ...customStyles.option(provided, state),
              ...customStyle, // Apply the custom styles if any
            };
          },
        }}
      />
    </div>
  );
};

export default SelectCustomer;
