import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import React from "react";
import HomePage from "./pages/homePage/HomePage";
import { createRoot } from "react-dom/client";
import About from "./pages/About";
import AdDetails from "./pages/adDetails/AdDetails";
import Layout from "./pages/layout/Layout";
import CategoryList from "./pages/CategoryList";
import AdAddsForm from "./pages/addAdsForm/AddAdsForm";
import ModifyAdsForm from "./pages/modifyAdsForm/ModifyAdsForm";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage />},
      { path: "/ads/:id", element: <AdDetails />},
      { path: "/categoryList/:id", element: <CategoryList />},
      { path: "/ads/new", element: <AdAddsForm />},
      { path: "/about", element: <About /> },
      { path: "/ads/modify/:id", element: <ModifyAdsForm /> },
    ],
  },
  { path: "/*", element: <Navigate to="/" />},
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);