import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import Home from "./pages/landing/Home";
import Login from "./pages/landing/Login";
import EmpresaSignup from "./pages/landing/EmpresaSignup";
import Nosotros from "./pages/landing/Nosotros";
import Empresa from "./pages/empresa/Panel";
import Administradores from "./pages/empresa/Administradores";
import Conductores from "./pages/empresa/Conductores";
import Vehiculos from "./pages/empresa/Vehiculos";
import Flota from "./pages/empresa/Flota";
import HistorialPedidos from "./pages/empresa/HistorialPedidos";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RUTAS } from "./data/rutas";
import Administrador from "./pages/administrador/Panel";
import ListaPedidos from "./pages/administrador/ListaPedidos";
import ListaOrdenes from "./pages/administrador/ListaOrdenes";

const router = createBrowserRouter([
  { path: RUTAS.HOME, element: <Home /> },
  { path: RUTAS.LOGIN, element: <Login /> },
  { path: RUTAS.NOSOTROS, element: <Nosotros /> },
  { path: RUTAS.EMPRESASIGNUP, element: <EmpresaSignup /> },

  { path: RUTAS.EMPRESA_PANEL, element: <Empresa /> },
  { path: RUTAS.EMPRESA_ADMINISTRADORES, element: <Administradores /> },
  { path: RUTAS.EMPRESA_CONDUCTORES, element: <Conductores /> },
  { path: RUTAS.EMPRESA_VEHICULOS, element: <Vehiculos /> },
  { path: RUTAS.EMPRESA_FLOTA, element: <Flota /> },
  { path: RUTAS.EMPRESA_HISTORIAL, element: <HistorialPedidos /> },

  { path: RUTAS.ADMIN_PANEL, element: <Administrador /> },
  { path: RUTAS.ADMIN_LISTA_PEDIDOS, element: <ListaPedidos /> },
  { path: RUTAS.ADMIN_LISTA_ORDENES, element: <ListaOrdenes /> },
  { path: RUTAS.ADMIN_HISTORIAL, element: <Administrador /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
