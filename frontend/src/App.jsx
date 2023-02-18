import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/Error/Error";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import RootLayout from "./pages/Root/Root"
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/categories",
        element: <h1>hello</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
