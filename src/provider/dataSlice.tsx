import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DataItem = {
  key: number;
  prefix: string;
  firstName: string;
  lastName: string;
  birthday: string;
  nationality: string;
  citizen1: string;
  citizen2: string;
  citizen3: string;
  citizen4: string;
  citizen5: string;
  gender: string;
  phone1: string;
  phone2: string;
  passport: string;
  salary: string;
};
const initialState: DataItem[] = JSON.parse(
  localStorage.getItem("data") || "[]"
);

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    addData(state: DataItem[], action: PayloadAction<DataItem>) {
      const newItem = action.payload;
      state.push(newItem);
      localStorage.setItem("data", JSON.stringify(state));
    },
    editData(state: DataItem[], action: PayloadAction<DataItem>) {
      const updatedItem = action.payload;
      const index = state.findIndex((item) => item.key === updatedItem.key);
      if (index !== -1) {
        state[index] = updatedItem;
        localStorage.setItem("data", JSON.stringify(state));
      }
    },
    deleteData(state: DataItem[], action: PayloadAction<number>) {
      const keyToDelete = action.payload;
      const updatedState = state.filter((item) => item.key !== keyToDelete);
      state = updatedState;
      localStorage.setItem("data", JSON.stringify(state));
      return updatedState;
    },
  },
});

export const { addData, deleteData, editData } = dataSlice.actions;
export default dataSlice.reducer;
