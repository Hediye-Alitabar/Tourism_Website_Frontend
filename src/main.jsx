import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage.jsx';
import Users from './Pages/Users/Users.jsx';
import Places from './Pages/Places/Places.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  }
  ,
  {
    path: "/users",
    element: <Users />
  },
  {
    path: "/places/:id",
    element: <Places />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
