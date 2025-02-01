import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
