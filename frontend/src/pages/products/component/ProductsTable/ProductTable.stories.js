import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ProductTable from "./index";

const mockStore = configureMockStore();

const products = [
  {
    id: 1,
    name: "Product 1",
    image: "https://via.placeholder.com/50",
    price: 10,
    category: "Category 1",
    code: "CODE1",
  },
  {
    id: 2,
    name: "Product 2",
    image: "https://via.placeholder.com/50",
    price: 20,
    category: "Category 2",
    code: "CODE2",
  },
  {
    id: 3,
    name: "Product 3",
    image: "https://via.placeholder.com/50",
    price: 30,
    category: "Category 1",
    code: "CODE3",
  },
];

const categories = [
  { id: 1, category: "Category 1" },
  { id: 2, category: "Category 2" },
  { id: 3, category: "Category 3" },
];

const storeWithProductsAndCategories = mockStore({
  product: { products },
  categories: { categories },
});

const storeWithoutProducts = mockStore({
  product: { products: [] },
  categories: { categories },
});

storiesOf("ProductTable", module)
  .addDecorator((story) => (
    <Provider store={storeWithProductsAndCategories}>{story()}</Provider>
  ))
  .add("with products and categories", () => (
    <ProductTable
      loading={false}
      searchInput=""
      handleDelete={() => console.log("Delete clicked")}
      handleEdit={() => console.log("Edit clicked")}
    />
  ))
  .addDecorator((story) => (
    <Provider store={storeWithoutProducts}>{story()}</Provider>
  ))
  .add("without products", () => (
    <ProductTable
      loading={false}
      searchInput=""
      handleDelete={() => console.log("Delete clicked")}
      handleEdit={() => console.log("Edit clicked")}
    />
  ));
