import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import Home from "./pages/Home";
import Conductores from "./pages/Conductores";
import Administradores from "./pages/Administradores";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nosotros from "./pages/Nosotros";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/conductores", element: <Conductores /> },
  { path: "/admin", element: <Administradores /> },
  { path: "/contacto", element: <Contacto /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/nosotros", element: <Nosotros /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
