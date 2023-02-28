import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((index) => index.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
          total: item.price,
        });
      }
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { addItemToCart, setLoading } = cartSlice.actions;

export default cartSlice;

export const addToCart = (item) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cart`, {
      ...item,
      quantity: 1,
      total: item.price,
    });
    dispatch(addItemToCart(response.data));
  } catch (error) {
    console.log("Error:", error);
  }
};


