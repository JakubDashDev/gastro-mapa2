import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { MapProvider } from 'react-map-gl';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminRoute from './components/AdminRoute.jsx';
import RestaurantList from './pages/admin/HomePage.jsx';
import LoginPage from './pages/admin/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin/main',
    element: <AdminRoute />,
    children: [
      {
        path: '',
        element: <RestaurantList />,
      },
    ],
  },
  {
    path: '/admin/auth',
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MapProvider>
        <RouterProvider router={router} />
      </MapProvider>
    </Provider>
  </React.StrictMode>
);
