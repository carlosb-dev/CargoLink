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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Analytics />
    <SpeedInsights />
  </StrictMode>
);
