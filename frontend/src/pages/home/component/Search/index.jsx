import { Input } from "antd";
import React from "react";

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <Input.Search
      placeholder="Search products"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      style={{ marginBottom: "20px" }}
    />
  );
};

export default Search;
