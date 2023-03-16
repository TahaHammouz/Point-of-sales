import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Categories from "src/pages/categories";
import ErrorPage from "src/pages/Error";
import LandPage from "src/pages/LandPage";
import AuthenticationPage, { action as authAction } from "./pages/auth";
import RootLayout from "./pages/Root";

import { checkAuthLoader, tokenLoader } from "./util/auth";
import {
  fetchProducts,
  fetchCartItems,
} from "src/redux/slices/productSlice";
import { fetchCategories } from "src/redux/slices/categorySlice";
import { action as logoutAction } from "./pages/auth/Logout";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthenticationPage />,
    action: authAction,
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        path: "/",
        element: <LandPage />,
      },
      {
        path: "/home",
        element: <Home />,
        loader: checkAuthLoader,
      },
      {
        path: "/products",
        element: <Products />,
        loader: checkAuthLoader,
      },
      {
        path: "/categories",
        element: <Categories />,
        loader: checkAuthLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
        loader: checkAuthLoader,
      },
      {
        path: "/logout",
        action: logoutAction,
        loader: checkAuthLoader,
      },
      {
        path: "*",
        action: () => {
          return { redirect: "/home" };
        },
      },
    ],
  },
]);
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCartItems());
    dispatch(fetchCategories());
  }, [dispatch]);
  return <RouterProvider router={router} />;
};

export default App;
