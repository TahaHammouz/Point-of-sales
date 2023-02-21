import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    product: productSlice.reducer,
  },
});
export default store;
