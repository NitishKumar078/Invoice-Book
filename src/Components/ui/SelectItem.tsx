import Select from 'react-select';
import { tableItem } from '@/DataModels/DataModels';
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
  setTableData: React.Dispatch<React.SetStateAction<tableItem[]>>;
  ListItems: tableItem[];
  index: number;
  tableData: tableItem[];
}
const SelectItem = ({
  setTableData,
  ListItems,
  index,
  tableData,
}: CustomerListPops) => {
  const navigate = useNavigate();

  const itemOptions = ListItems.map((item) => ({
    value: item.item,
    label: item.item,
  }));

  const handleSelectChange = (selectedOption: any, rowIndex: number) => {
    if (selectedOption.value === 'Add Item') {
      navigate('/Items/newItem');
    }

    const newTableData: tableItem[] = [...tableData];
    const selectedItem = ListItems.find(
      (item) => item.item === selectedOption.value
    );
    if (selectedItem) {
      newTableData[rowIndex] = {
        id: rowIndex + 1,
        item: selectedItem.item,
        hsnCode: selectedItem.hsnCode.toString(),
        price: selectedItem.price.toString(),
        unit: selectedItem.unit,
        quantity: selectedItem.quantity.toString(),
        amount: (
          parseFloat(selectedItem.price) * parseFloat(selectedItem.quantity)
        ).toFixed(2),
      };
    }
    setTableData(newTableData);
  };

  const highlightOption = (option: any) => {
    return option.value === 'Add Item'
      ? {
          backgroundColor: 'white', // Highlight with a yellow background
          color: 'blue', // White text color
          fontWeight: 'bold', // Bold text for the highlighted option
        }
      : {};
  };

  // Modify options with custom styles applied
  const modifiedOptions = itemOptions.map((option: any) => ({
    ...option,
    customStyle: highlightOption(option), // Add custom styles to each option
  }));

  return (
    <div>
      <Select
        key={`itemName-${index}`}
        // value={{ value: item.itemName, label: item.itemName }}
        onChange={(selectedOption) => handleSelectChange(selectedOption, index)}
        options={modifiedOptions}
        className="w-36 p-1 border rounded "
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

export default SelectItem;
