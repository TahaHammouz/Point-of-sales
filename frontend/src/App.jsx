import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error/Error";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import RootLayout from "./pages/Root/Root";
import Categories from "./pages/categories/Categories";
import React, { useState, useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
    ],
  },
]);

function App() {
  const [isLoading, setLoading] = useState(true);
  function someRequest() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
  }
  useEffect(() => {
    someRequest().then(() => {
      const loaderElement = document.querySelector(".loader-container");
      if (loaderElement) {
        loaderElement.remove();
        setLoading(!isLoading);
      }
    });
  });
  if (isLoading) {
    return null;
  }

  return <RouterProvider router={router} />;
}

export default App;
