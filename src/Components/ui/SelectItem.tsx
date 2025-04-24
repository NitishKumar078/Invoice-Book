import Select from 'react-select';
import { TableItem } from '@/DataModels/DataModels';
import { useSelector } from 'react-redux';
import { selectItems } from '@/Store/Selectors/Selectors';

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
  setTableData: React.Dispatch<React.SetStateAction<TableItem[]>>;
  index: number;
  tableData: TableItem[];
  setIteamDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectItem = ({
  setTableData,
  index,
  tableData,
  setIteamDialogBox,
}: CustomerListPops) => {
  const ListItems = useSelector(selectItems);

  const itemOptions = [
    ...ListItems.map((item) => ({
      value: item.item || '',
      label: item.item || '',
    })),
    { value: 'Add Item', label: 'Add Item' },
  ];

  const handleSelectChange = (selectedOption: any, rowIndex: number) => {
    if (selectedOption.value === 'Add Item') {
      setIteamDialogBox(true);
    }

    const newTableData: TableItem[] = [...tableData];
    const selectedItem = ListItems.find(
      (item) => item.item === selectedOption.value
    );
    if (selectedItem) {
      newTableData[rowIndex] = {
        id: rowIndex + 1,
        item: selectedItem.item,
        hsnCode: selectedItem.hsnCode.toString(),
        price: selectedItem.price?.toString() || '0',
        unit: selectedItem.unit,
        quantity: selectedItem.quantity?.toString() || '0',
        amount: (
          parseFloat(selectedItem.price || '0') *
          parseFloat(selectedItem.quantity || '0')
        ).toFixed(2),
        customUnit: selectedItem.customUnit,
      };
    }
    setTableData(newTableData);
  };

  const highlightOption = (option: any) => {
    return option.value === 'Add Item'
      ? {
          backgroundColor: 'white',
          color: 'blue',
          fontWeight: 'bold',
        }
      : {};
  };

  const modifiedOptions = itemOptions.map((option: any) => ({
    ...option,
    customStyle: highlightOption(option),
  }));

  return (
    <div>
      <Select
        key={`itemName-${index}`}
        value={
          tableData[index]?.item
            ? { value: tableData[index].item, label: tableData[index].item }
            : null
        }
        onChange={(selectedOption) => handleSelectChange(selectedOption, index)}
        options={modifiedOptions}
        className="w-36 p-1 border rounded"
        styles={{
          ...customStyles,
          option: (provided, state) => {
            const customStyle = modifiedOptions.find(
              (option) => option.value === state.data.value
            )?.customStyle;
            return {
              ...customStyles.option(provided, state),
              ...customStyle,
            };
          },
        }}
      />
    </div>
  );
};

export default SelectItem;
