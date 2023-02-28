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
    updateCartItem(state, action) {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;
        state.items[itemIndex].total = state.items[itemIndex].price * quantity;
      }
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { addItemToCart, setLoading, updateCartItem } = cartSlice.actions;

export default cartSlice;

export const addToCart = (item) => async (dispatch, getState) => {
  try {
    const state = getState();
    const existingItem = state.cart.items.find((i) => i.id === item.id);
    if (existingItem) {
      const response = await axios.patch(
        `${API_BASE_URL}/cart/${existingItem.id}`,
        {
          quantity: existingItem.quantity + 1,
          total: (existingItem.quantity + 1) * existingItem.price,
        }
      );
      dispatch(addItemToCart(response.data));
    } else {
      const response = await axios.post(`${API_BASE_URL}/cart`, {
        ...item,
        quantity: 1,
        total: item.price,
      });
      dispatch(addItemToCart(response.data));
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
export const updateCartItemOnServer = (id, quantity) => async (dispatch) => {
  dispatch(setLoading(true)); 
  try {
    const response = await axios.patch(`${API_BASE_URL}/cart/${id}`, {
      quantity: quantity, 
    });
    dispatch(updateCartItem(response.data)); 
  } catch (error) {
    console.error("Error updating cart item:", error);
  } finally {
    dispatch(setLoading(false)); 
  }
};
