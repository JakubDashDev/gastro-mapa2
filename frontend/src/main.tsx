import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MapProvider } from "react-map-gl";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/admin/LoginPage";
import HomePage from "./pages/admin/HomePage";
import RestaurantsPage from "./pages/admin/RestaurantsListPage";
import UserAccountSettingsPage from "./pages/admin/UserAccountSettingsPage";
import ReactErrorBoundary from "./components/ReactErrorBoundary";
import RouteError from "./components/RouteError";

const router = createBrowserRouter([
  {
    path: "/:query?",
    element: <App />,
    errorElement: <RouteError />,
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
        errorElement: <RouteError />,
      },
      {
        path: "/dashboard/restaurants/:id?/:query?",
        element: <RestaurantsPage />,
        errorElement: <RouteError />,
      },
      {
        path: "/dashboard/users",
        element: <span className="mt-5 w-full flex items-center justify-center text-3xl">Strona w budowie 🛠️</span>,
        errorElement: <RouteError />,
      },
      {
        path: "/dashboard/stats",
        element: <span className="mt-5 w-full flex items-center justify-center text-3xl">Strona w budowie 🛠️</span>,
        errorElement: <RouteError />,
      },
      {
        path: "/dashboard/account",
        element: <UserAccountSettingsPage />,
        errorElement: <RouteError />,
      },
    ],
  },
  {
    path: "/dashboard/auth",
    element: <LoginPage />,
    errorElement: <RouteError />,
  },
  {
    path: "*", //404 error
    element: (
      <div className="flex-col gap-2 w-screen h-[calc(100dvh)] bg-darkBg flex items-center justify-center text-white">
        <span>Chyba się zgubiłeś 🤔</span>
        <Link to="/" className="text-blue-500 underline underline-offset-4">Wróc do strony głównej</Link>
      </div>
    ),
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
