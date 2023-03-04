import React from "react";
import { storiesOf } from "@storybook/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "./Cart";

const mockStore = configureStore([]);

const cartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 10.0,
    image: "https://via.placeholder.com/150",
    quantity: 2,
    total: 20.0,
  },
  {
    id: 2,
    name: "Product 2",
    price: 15.0,
    image: "https://via.placeholder.com/150",
    quantity: 1,
    total: 15.0,
  },
];

const loading = false;

const store = mockStore({
  cart: {
    items: cartItems,
    loading: loading,
  },
});

storiesOf("Cart", module)
  .addDecorator((story) => <Provider store={store}>{story()}</Provider>)
  .add("default", () => <Cart />);
