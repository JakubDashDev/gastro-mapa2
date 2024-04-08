import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MapProvider } from "react-map-gl";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminRoute from "./components/RouteLayout";
import LoginPage from "./pages/admin/LoginPage";
import HomePage from "./pages/admin/HomePage";
import RestaurantsPage from "./pages/admin/RestaurantsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <AdminRoute />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/dashboard/restaurants",
        element: <RestaurantsPage />,
      },
    ],
  },
  {
    path: "/dashboard/auth",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MapProvider>
        <RouterProvider router={router} />
      </MapProvider>
    </Provider>
  </React.StrictMode>
);
