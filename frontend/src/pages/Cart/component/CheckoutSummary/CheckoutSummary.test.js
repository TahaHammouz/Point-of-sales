import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CheckoutSummary from "./CheckoutSummary";

const mockStore = configureStore([]);

describe("CheckoutSummary", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          { id: 1, name: "Product 1", price: 10, quantity: 2 },
          { id: 2, name: "Product 2", price: 20, quantity: 1 },
        ],
      },
    });

    component = render(
      <Provider store={store}>
        <CheckoutSummary />
      </Provider>
    );
  });

  it("renders the component without crashing", () => {
    expect(component).toMatchSnapshot();
  });

  it('renders the "Cancel" and "Charge Bill" buttons', () => {
    const cancelButtonElement = component.getByText("Cancel");
    expect(cancelButtonElement).toBeInTheDocument();

    const chargeBillButtonElement = component.getByText("Charge Bill");
    expect(chargeBillButtonElement).toBeInTheDocument();
  });
});
