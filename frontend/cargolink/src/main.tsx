import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import Home from "./pages/Home";
import ConductorLogin from "./pages/ConductorLogin";
import AdminLogin from "./pages/AdminLogin";
import Contacto from "./pages/Contacto";
import EmpresaLogin from "./pages/EmpresaLogin";
import EmpresaSignup from "./pages/EmpresaSignup";
import Nosotros from "./pages/Nosotros";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RUTAS } from "./rutas";

const router = createBrowserRouter([
  { path: RUTAS.HOME, element: <Home /> },
  { path: RUTAS.CONDUCTORLOGIN, element: <ConductorLogin /> },
  { path: RUTAS.ADMINLOGIN, element: <AdminLogin /> },
  { path: RUTAS.CONTACTO, element: <Contacto /> },
  { path: RUTAS.EMPRESALOGIN, element: <EmpresaLogin /> },
  { path: RUTAS.EMPRESASIGNUP, element: <EmpresaSignup /> },
  { path: RUTAS.NOSOTROS, element: <Nosotros /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
