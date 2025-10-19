import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmpresaSignup from "./pages/EmpresaSignup";
import Nosotros from "./pages/Nosotros";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RUTAS } from "./rutas";

const router = createBrowserRouter([
  { path: RUTAS.HOME, element: <Home /> },
  { path: RUTAS.LOGIN, element: <Login /> },
  { path: RUTAS.EMPRESASIGNUP, element: <EmpresaSignup /> },
  { path: RUTAS.NOSOTROS, element: <Nosotros /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
