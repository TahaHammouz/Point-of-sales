import React, { useEffect } from "react";
import ProductForm from "./component/AddProduct";
import ProductTable from "./component/ProductsTable";
import { fetchProducts } from "src/redux/slices/productSlice";
import { useDispatch } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <ProductForm />
      <ProductTable />
    </>
  );
};

export default Products;
