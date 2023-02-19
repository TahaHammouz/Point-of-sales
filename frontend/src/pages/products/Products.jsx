import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { columns } from "./ProductsColumns";
import Button from "../../components/UI/Button/Button";
import ProductForm from "./ProductForm";
import Modal from "../../components/UI/Modal/Modal";
const Products = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
      <Table
        columns={columns}
        dataSource={productList}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 4 }}
        bordered
      />
    </>
  );
};

export default Products;
