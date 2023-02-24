import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notification } from "antd";

import { API_BASE_URL } from "../../constants/api";
const initialState = {
  products: [],
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        name: action.payload.name,
        image: action.payload.image,
        price: action.payload.price,
        category: action.payload.category,
        code: action.payload.code,
      };
      state.products.push(newProduct);
    },
    setProductsData: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addProduct, setLoading,setProductsData } = productSlice.actions;

export default productSlice;


export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    dispatch(setProductsData(response.data));
  } catch (error) {
    dispatch(setLoading(false));
    notification.error({
      message: `Category adding failed: ${error.message}`,
    });
  } finally {
    dispatch(setLoading(false));
  }
};
