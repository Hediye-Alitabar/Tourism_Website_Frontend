import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage.jsx';
import Users from './Pages/Users/Users.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  }
  ,
  {
    path: "/users",
    element: <Users />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
