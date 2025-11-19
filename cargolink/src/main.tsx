import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import Home from "./pages/landing/Home";
import Login from "./pages/landing/Login";
import Signup from "./pages/landing/Signup";
import Nosotros from "./pages/landing/Nosotros";
import Empresa from "./pages/empresa/Panel";
import Administradores from "./pages/empresa/Administradores";
import Conductores from "./pages/empresa/Conductores";
import Vehiculos from "./pages/empresa/Vehiculos";
import Flota from "./pages/empresa/Flota";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RUTAS } from "./data/rutas";
// import EmpresaHistorial from "./pages/empresa/Historial";
// import ConductorEnvios from "./pages/conductor/Envios";
// import ConductorPanel from "./pages/conductor/Panel";
// import Administrador from "./pages/administrador/Panel";
// import ListaPedidos from "./pages/administrador/ListaPedidos";
// import ListaOrdenes from "./pages/administrador/ListaOrdenes";
// import AdministradorHistorial from "./pages/administrador/Historial";

const router = createBrowserRouter([
  { path: RUTAS.HOME, element: <Home /> },
  { path: RUTAS.LOGIN, element: <Login /> },
  { path: RUTAS.NOSOTROS, element: <Nosotros /> },
  { path: RUTAS.SIGNUP, element: <Signup /> },

  { path: RUTAS.EMPRESA_PANEL, element: <Empresa /> },
  { path: RUTAS.EMPRESA_ADMINISTRADORES, element: <Administradores /> },
  { path: RUTAS.EMPRESA_CONDUCTORES, element: <Conductores /> },
  { path: RUTAS.EMPRESA_VEHICULOS, element: <Vehiculos /> },
  { path: RUTAS.EMPRESA_FLOTA, element: <Flota /> },
  // { path: RUTAS.EMPRESA_HISTORIAL, element: <EmpresaHistorial /> },

  // { path: RUTAS.CONDUCTOR_PANEL, element: <ConductorPanel /> },
  // { path: RUTAS.CONDUCTOR_ENVIOS, element: <ConductorEnvios /> },

  // { path: RUTAS.ADMIN_PANEL, element: <Administrador /> },
  // { path: RUTAS.ADMIN_LISTA_PEDIDOS, element: <ListaPedidos /> },
  // { path: RUTAS.ADMIN_LISTA_ORDENES, element: <ListaOrdenes /> },
  // { path: RUTAS.ADMIN_HISTORIAL, element: <AdministradorHistorial /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
