import { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../components/UI/Table/Table";
import { columns } from "./CategoriesColumns";

const CategoryTable = () => {
  const categories = useSelector((state) => state.categories.categories);
  const getKey = (record, index) => record.id;

  return (
    <CustomTable
      pagination={{ pageSize: 6 }}
      bordered
      columns={columns}
      dataSource={categories}
      rowKey={getKey}
    />
  );
};

export default CategoryTable;
