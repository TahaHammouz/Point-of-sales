import React, { useState, useEffect } from "react";
import { columns } from "./ProductsColumns";
import Button from "../../components/UI/Button/Button";
import ProductForm from "./ProductForm";
import Modal from "../../components/UI/Modal/Modal";
import { Input } from "antd";
import CustomTable from "../../components/UI/Table/Table";
import ProductTable from "./ProductTable";
import { useSelector } from "react-redux";
const { Search } = Input;
const Products = () => {
  const prod = useSelector((state) => state.product.products);
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [originalProductList, setOriginalProductList] = useState([]);
  const [error, setError] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value;
    const filteredList = originalProductList.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setProductList(filteredList);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Fetching data failed");
        }
        const resData = await response.json();
        setProductList(resData);
        setOriginalProductList(resData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      
      <ProductForm />
      <Search
        placeholder="Search by product name"
        onKeyUp={handleSearch}
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
      />
      <ProductTable dataSource={productList} />
    </>
  );
};

export default Products;
