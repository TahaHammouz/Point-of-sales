import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import CategoryTable from ".";

const mockStore = configureMockStore();

const categories = [
  { id: 1, category: "Category 1" },
  { id: 2, category: "Category 2" },
  { id: 3, category: "Category 3" },
];

const storeWithCategories = mockStore({
  categories: { categories },
});

const storeWithoutCategories = mockStore({
  categories: { categories: [] },
});

storiesOf("CategoryTable", module)
  .addDecorator((story) => <Provider store={storeWithCategories}>{story()}</Provider>)
  .add("with categories", () => <CategoryTable />)
  .addDecorator((story) => <Provider store={storeWithoutCategories}>{story()}</Provider>)
  .add("without categories", () => <CategoryTable />);
