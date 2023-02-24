import React, { useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import { fetchProducts } from "../../redux/slices/productSlice";
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
