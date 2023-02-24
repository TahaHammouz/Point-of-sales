import { useState } from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../components/UI/Table/Table";
import { columns } from "./ProductsColumns";
import { Input } from "antd";

const { Search } = Input;

const ProductTable = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const getKey = (record, index) => record.code;

  const handleSearch = (event) => {
    const value = event.target.value;
    const filteredList = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filteredList);
  };

  return (
    <>
      <Search
        placeholder="Search by product name"
        onKeyUp={handleSearch}
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 20 }}
      />
      <CustomTable
        columns={columns}
        dataSource={filteredProducts}
        rowKey={getKey}
        pagination={{ pageSize: 4 }}
        bordered
      />
    </>
  );
};

export default ProductTable;
