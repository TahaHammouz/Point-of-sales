import React from "react";
import { Table } from "antd";

const CustomTable = ({
  columns,
  dataSource,
  isLoading,
  rowKey,
  pagination,
  bordered,
  width,
  height,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      rowKey={rowKey}
      pagination={pagination}
      bordered={bordered}
      scroll={{ x: width, y: height }}
    />
  );
};

export default CustomTable;
