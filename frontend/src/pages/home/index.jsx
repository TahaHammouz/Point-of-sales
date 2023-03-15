import React, { useState } from "react";
import { useSelector } from "react-redux";
import Search from "./component/Search";
import Categories from "./component/Categories";
import Products from "./component/Products";

const POS = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const products = useSelector((state) => state.product.products);
  const categories = [...new Set(products.map((item) => item.category))];

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
