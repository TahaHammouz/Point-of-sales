import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error/Error";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import RootLayout from "./pages/Root/Root";
import Categories from "./pages/categories/Categories";
import React, { useState, useEffect } from "react";
import Cart from "./pages/Cart/Cart";
import AuthenticationPage, {
  action as authAction,
} from "./pages/auth/Authentication";
import { action as logoutAction } from "./pages/auth/Logout";
import { checkAuthLoader } from "./util/auth";
import { tokenLoader } from "./util/auth";

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
        element: <ErrorPage />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
