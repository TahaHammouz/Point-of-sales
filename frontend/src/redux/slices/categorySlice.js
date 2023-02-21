import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  categories: JSON.parse(localStorage.getItem("categories")) || [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: action.payload.id,
        category: action.payload.category,
      };
      state.categories.push(newCategory);
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { addCategory } = categoriesSlice.actions;
export default categoriesSlice;

export const saveCategory = (category) => async (dispatch, getState) => {
  try {
    notification.info({message:"loading..."})
    const response = await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    dispatch(addCategory(data));
    notification.destroy()
    notification.success({
      message: "Product added successfully",
    });

    const state = getState();
    const categories = state.categories.categories;
    localStorage.setItem("categories", JSON.stringify(categories));

   
  } catch (error) {
    notification.error({
      message: "Product adding failed",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/categories");
    const data = await response.json();
    dispatch(setCategories(data));
    localStorage.setItem("categories", JSON.stringify(data));
  } catch (error) {
    toast.error("Error fetching categories");
  }
};

export const setCategories = (categories) => ({
  type: "categories/setCategories",
  payload: categories,
});
