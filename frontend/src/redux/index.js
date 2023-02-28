import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
  },
});
export default store;
