import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Navbar from "./components/Navbar.jsx";
import App from "./App.jsx";
import SkillListing from "./pages/SkillListing.jsx";
import SkillDetails from "./pages/SkillDetails.jsx";
import PostSkill from "./pages/PostSkill.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "/skill-listing",
        element: <SkillListing />
      },
      {
        path: "/:title/:skillID",
        element: <SkillDetails />
      },
      {
        path: "post-skill",
        element: <PostSkill />
      }
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
