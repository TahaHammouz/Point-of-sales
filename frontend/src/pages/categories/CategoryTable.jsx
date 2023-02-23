import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../components/UI/Table/Table";
import { columns } from "./CategoriesColumns";
import { Input } from "antd";

const { Search } = Input;

const CategoryTable = () => {
  const categories = useSelector((state) => state.categories.categories);
  const [searchInput, setSearchInput] = useState("");

  const filteredCategories = categories.filter((category) => {
    return (
      category.category
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase()) ||
      category.id.toString().includes(searchInput.trim().toLowerCase())
    );
  });

  const getKey = (record, index) => record.id;

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
        rowKey={getKey}
      />
    </>
  );
};

export default CategoryTable;
