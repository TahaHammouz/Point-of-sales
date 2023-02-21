import { useSelector } from "react-redux";
import CustomTable from "../../components/UI/Table/Table";
import { columns } from "./CategoriesColumns";
const CategoryTable = () => {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <CustomTable
      pagination={{ pageSize: 6 }}
      bordered
      columns={columns}
      dataSource={categories}
      rowKey={(record) => record.id}
    />
  );
};

export default CategoryTable;
