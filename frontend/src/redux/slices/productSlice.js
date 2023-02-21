import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
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
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice;
