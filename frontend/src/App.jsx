import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "src/pages/Error";
import Home from "./pages/home";
import Products from "./pages/products";
import RootLayout from "./pages/Root";
import Categories from "src/pages/categories";
import React, { useEffect } from "react";
import LandPage from "src/pages/LandPage";
import Cart from "./pages/cart";
import AuthenticationPage, { action as authAction } from "./pages/auth";
import { action as logoutAction } from "./pages/auth/Logout";
import { checkAuthLoader } from "./util/auth";
import { tokenLoader } from "./util/auth";
import { fetchProducts } from "src/redux/slices/productSlice";
import { fetchCartItems } from "src/redux/slices/cartSlice";
import { fetchCategories } from "src/redux/slices/categorySlice";
import { useDispatch } from "react-redux";

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
