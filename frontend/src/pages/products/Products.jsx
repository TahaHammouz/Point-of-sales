import React, { useState, useEffect } from "react";
import { columns } from "./ProductsColumns";
import Button from "../../components/UI/Button/Button";
import ProductForm from "./ProductForm";
import Modal from "../../components/UI/Modal/Modal";
import { Input } from "antd";
import CustomTable from "../../components/UI/Table/Table";
const { Search } = Input;
const Products = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [originalProductList, setOriginalProductList] = useState([]);
  const [error, setError] = useState();

  const handleSearch = (event) => {
    const value = event.target.value;
    const filteredList = originalProductList.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setProductList(filteredList);
  };
  const handleClearSearch = () => {
    setProductList(originalProductList);
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
      <div className="d-flex justify-content-between">
        <h3>Products</h3>

        <Button>Add Item</Button>
      </div>

      <Search
        placeholder="Search by product name"
        onKeyUp={handleSearch}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        style={{ width: 300, marginBottom: 20 }}
      />
      <CustomTable
        columns={columns}
        dataSource={productList}
        isLoading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 4 }}
        bordered
      />
    </>
  );
};

export default Products;
