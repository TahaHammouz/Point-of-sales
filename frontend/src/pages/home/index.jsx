import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "./component/Search";
import Categories from "./component/Categories";
import Products from "./component/Products";
import { fetchProducts } from "src/redux/slices/productSlice";
import { fetchCartItems } from "src/redux/slices/cartSlice";
import { fetchCategories } from "src/redux/slices/categorySlice";

const POS = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const products = useSelector((state) => state.product.products);
  const categories = [...new Set(products.map((item) => item.category))];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCartItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <Products
        products={products}
        searchValue={searchValue}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default POS;
