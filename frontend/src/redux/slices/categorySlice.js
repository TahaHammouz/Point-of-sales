import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";

const initialState = {
  categories: JSON.parse(localStorage.getItem("categories")) || [],
  loading: false,
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
    setCategoriesData: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    deleteCategory: (state, action) => {
      const id = action.payload;
      state.categories = state.categories.filter(
        (category) => category.id !== id
      );
    },
  },
});

export const {
  addCategory,
  setLoading,
  setCategoriesData,
  deleteCategory,
} = categoriesSlice.actions;
export default categoriesSlice;

export const saveCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    notification.info({ message: "loading..." });
    const response = await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(addCategory(data));
    dispatch(setLoading(false));
    notification.destroy();
    notification.success({
      message: "Category added successfully",
    });

    const state = getState();
    const categories = state.categories.categories;
    localStorage.setItem("categories", JSON.stringify(categories));
  } catch (error) {
    dispatch(setLoading(false));
    notification.error({
      message: `Category adding failed: ${error.message}`,
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch("http://localhost:3000/categories");
    const data = await response.json();
    dispatch(setCategoriesData(data));
    localStorage.setItem("categories", JSON.stringify(data));
  } catch (error) {
    dispatch(setLoading(false));
    notification.error({
      message: `Category adding failed: ${error.message}`,
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteCategoryById = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    notification.info({ message: "loading..." });
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(deleteCategory(id));
    notification.destroy();
    notification.success({
      message: "Category deleted successfully",
    });
    const state = getState();
    const categories = state.categories.categories.filter(
      (category) => category.id !== id
    );
    localStorage.setItem("categories", JSON.stringify(categories));
  } catch (error) {
    notification.error({
      message: `Category deletion failed: ${error.message}`,
    });
  } finally {
    dispatch(setLoading(false)); 
  }
};

