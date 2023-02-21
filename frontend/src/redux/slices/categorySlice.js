import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = { id: action.payload.id, category: action.payload.category };
      state.categories.push(newCategory);
    },
  },
});

export const { addCategory } = categoriesSlice.actions;
export default categoriesSlice;

