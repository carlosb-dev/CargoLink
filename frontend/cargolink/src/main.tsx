import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import Home from "./pages/landing/Home";
import Login from "./pages/landing/Login";
import EmpresaSignup from "./pages/landing/EmpresaSignup";
import Nosotros from "./pages/landing/Nosotros";
import Empresa from "./pages/empresa/Empresa";
import Administradores from "./pages/empresa/Administradores";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RUTAS } from "./rutas";

const router = createBrowserRouter([
  { path: RUTAS.HOME, element: <Home /> },
  { path: RUTAS.LOGIN, element: <Login /> },
  { path: RUTAS.NOSOTROS, element: <Nosotros /> },
  { path: RUTAS.EMPRESASIGNUP, element: <EmpresaSignup /> },
  { path: RUTAS.EMPRESA, element: <Empresa /> },
  { path: RUTAS.ADMINISTRADORES, element: <Administradores /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
