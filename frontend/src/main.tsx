import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MapProvider } from "react-map-gl";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/admin/LoginPage";
import HomePage from "./pages/admin/HomePage";
import RestaurantsPage from "./pages/admin/RestaurantsListPage";
import UserAccountSettingsPage from "./pages/admin/UserAccountSettingsPage";
import ReactErrorBoundary from "./components/ReactErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    async lazy() {
      const AdminRoute = (await import("./components/RouteLayout")).default;
      return { Component: AdminRoute };
    },
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/dashboard/restaurants/:id?",
        element: <RestaurantsPage />,
      },
      {
        path: "/dashboard/users",
        element: <span className="mt-5 w-full flex items-center justify-center text-3xl">Strona w budowie 🛠️</span>,
      },
      {
        path: "/dashboard/stats",
        element: <span className="mt-5 w-full flex items-center justify-center text-3xl">Strona w budowie 🛠️</span>,
      },
      {
        path: "/dashboard/account",
        element: <UserAccountSettingsPage />,
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
    <ReactErrorBoundary>
      <Provider store={store}>
        <MapProvider>
          <RouterProvider router={router} />
        </MapProvider>
      </Provider>
    </ReactErrorBoundary>
  </React.StrictMode>
);
