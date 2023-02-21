import CustomTable from "../../components/UI/Table/Table";
import { columns } from "./ProductsColumns";
import { useSelector } from "react-redux";

const ProductTable = ({ dataSource }) => {
  const getKey = (record, index) => record.code;
  return (
    <CustomTable
      columns={columns}
      dataSource={dataSource.map((product) => ({
        ...product,
        key: product.id,
      }))}
      rowKey={getKey}
      pagination={{ pageSize: 4 }}
      bordered
    />
  );
};

export default ProductTable;
