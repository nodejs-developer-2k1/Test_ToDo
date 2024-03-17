import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from "./app/error-page";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './app/index';
import Register from './app/Auth/Register';
import Dashboard from './app/Dashboard';
import { MyProvider } from './component/context/AppContext'
import Notification from './component/notification'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyProvider>
      <RouterProvider router={router} />
      <Notification>

      </Notification>
    </MyProvider>
  </React.StrictMode>,
)
