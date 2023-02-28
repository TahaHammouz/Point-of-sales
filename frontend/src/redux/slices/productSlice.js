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
        id: action.payload.id,
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
    deleteProduct: (state, action) => {
      const prodCode = action.payload;
      state.products = state.products.filter((prod) => prod.code !== prodCode);
    },
    editProduct: (state, action) => {
      const { id, product } = action.payload;
      const productIndex = state.products.findIndex((prod) => prod.id === id);
      state.products[productIndex] = product;
    },
  },
});

export const {
  addProduct,
  setLoading,
  setProductsData,
  deleteProduct,
  editProduct,
} = productSlice.actions;

export default productSlice;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    dispatch(setProductsData(response.data));
    localStorage.setItem("products", JSON.stringify(response.data));
  } catch (error) {
    console.error(`Failed to fetch products: ${error.message}`);
    const products = localStorage.getItem("products");
    if (products) {
      dispatch(setProductsData(JSON.parse(products)));
    }
  } finally {
    dispatch(setLoading(false));
  }
};
export const addProductData = (product) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    dispatch(addProduct(response.data));
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(response.data);
    localStorage.setItem("products", JSON.stringify(products));
  } catch (error) {
    notification.error({
      message: `product adding failed: ${error.message}`,
    });
  } finally {
    dispatch(setLoading(false));
  }
};
export const removeProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    console.log(id);
    notification.info({ message: "loading..." });
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    if (response.status >= 200 && response.status < 300) {
      dispatch(deleteProduct(id));
      notification.destroy();
      notification.success({
        message: "product deleted successfully",
      });
      const state = getState();
      const products = state.product.products.filter(
        (product) => product.id !== id
      );
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      throw new Error(
        `Failed to delete product. Response status: ${response.status}`
      );
    }
  } catch (error) {
    console.log(error);

    notification.error({
      message: `product deletion failed: ${error.message}`,
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProduct = (code, product) => async (dispatch, getState) => {
  try {
    if (!code) {
      throw new Error("Product id is undefined");
    }

    dispatch(setLoading(true));
    console.log(code);
    notification.info({ message: "loading..." });
    const response = await axios.put(
      `${API_BASE_URL}/products/${code}`,
      product
    );
    if (response.status >= 200 && response.status < 300) {
      dispatch(editProduct({ id: code, product }));
      notification.destroy();
      notification.success({
        message: "product updated successfully",
      });

      const state = getState();
      const products = state.product.products.map((p) =>
        p.code === code ? { ...p, ...product } : p
      );

      localStorage.setItem("products", JSON.stringify(products));
    } else {
      throw new Error(
        `Failed to update product. Response status: ${response.status}`
      );
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: `product update failed: ${error.message}`,
    });
  } finally {
    dispatch(setLoading(false));
  }
};

export const addProductAction = (product) => {
  return {
    type: "product/addProduct",
    payload: {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
      code: product.code,
    },
  };
};

export const setProductsDataAction = (products) => {
  return {
    type: "product/setProductsData",
    payload: products,
  };
};

export const setLoadingAction = (isLoading) => {
  return {
    type: "product/setLoading",
    payload: isLoading,
  };
};

export const deleteProductAction = (prodCode) => {
  return {
    type: "product/deleteProduct",
    payload: prodCode,
  };
};

export const editProductAction = (id, product) => {
  return {
    type: "product/editProduct",
    payload: {
      id: id,
      product: product,
    },
  };
};
