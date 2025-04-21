import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDataBase } from '@/utils/indexedDB';
import { TableItem } from '@/DataModels/DataModels';
const ItemStore = import.meta.env.VITE_ITEMSTORE;

interface ItemState {
  Items: TableItem[];
}

// Function to fetch initial state from IndexedDB
const fetchCustomersFromStorage = async (): Promise<TableItem[]> => {
  try {
    const Items = await getDataBase.getAll(ItemStore);
    return Items || [];
  } catch (error) {
    console.error('Failed to load initial Items:', error);
    return [];
  }
};

// Initialize state with empty Items array
const initialState: ItemState = {
  Items: [],
};

// Fetch initial state from IndexedDB
const Items = await fetchCustomersFromStorage();
initialState.Items = Items;

const ItemsSlice = createSlice({
  name: ItemStore,
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<TableItem[]>) => {
      state.Items = action.payload;
    },
    addItem: (state, action: PayloadAction<TableItem>) => {
      state.Items.push(action.payload);
      getDataBase.add(ItemStore, action.payload).catch((error) => {
        console.error('Failed to add Items to DB:', error);
      });
    },
    updateItem: (state, action: PayloadAction<TableItem>) => {
      const index = state.Items.findIndex(
        (c) => c.hsnCode === action.payload.hsnCode
      );
      if (index !== -1) {
        state.Items[index] = action.payload;
        getDataBase.update(ItemStore, action.payload).catch((error) => {
          console.error('Failed to update Items in DB:', error);
        });
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.Items = state.Items.filter((c) => c.hsnCode !== action.payload);
      getDataBase.delete(ItemStore, action.payload).catch((error) => {
        console.error('Failed to delete Items from DB:', error);
      });
    },
  },
});

export const { setItems, addItem, updateItem, deleteItem } = ItemsSlice.actions;

export default ItemsSlice.reducer;
