import { columns } from "./CategoriesColumns";
import CustomTable from "../../components/UI/Table/Table";
import { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

const CategoryTable = ({ categories }) => {
  const [searchInput, setSearchInput] = useState("");

  const filteredCategories = categories.filter((category) => {
    return (
      category.category
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase()) ||
      category.id.toString().includes(searchInput.trim().toLowerCase())
    );
  });

  return (
    <>
      <Search
        type="text"
        placeholder="Search categories"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ width: 300, marginBottom: 20 }}
      />
      <CustomTable
        pagination={{ pageSize: 6 }}
        bordered
        columns={columns}
        dataSource={filteredCategories}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default CategoryTable;
