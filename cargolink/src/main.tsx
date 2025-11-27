import { StrictMode, useEffect } from "react";
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
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { RUTAS } from "./data/rutas";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { getStoredUserFromCookie } from "./utils/cookies";
import AccesoDenegado from "./pages/empresa/AccesoDenegado";

const storedUser = getStoredUserFromCookie();

const titleVar = `${storedUser?.Nombre ? storedUser?.Nombre : "CargoLink"}`;

console.log("Usuario almacenado en cookie:", storedUser?.Nombre);

const TITULOS: Record<string, string> = {
  [RUTAS.HOME]: "CargoLink",
  [RUTAS.LOGIN]: "CargoLink - Inicio de Sesión",
  [RUTAS.SIGNUP]: "CargoLink - Registrate",
  [RUTAS.NOSOTROS]: "CargoLink - Nosotros",
  [RUTAS.EMPRESA_PANEL]: `${titleVar} - Panel`,
  [RUTAS.EMPRESA_ADMINISTRADORES]: `${titleVar} - Administradores`,
  [RUTAS.EMPRESA_CONDUCTORES]: `${titleVar} - Conductores`,
  [RUTAS.EMPRESA_VEHICULOS]: `${titleVar} - Vehiculos`,
  [RUTAS.EMPRESA_FLOTA]: `${titleVar} - Flota`,
  [RUTAS.ACCESO_DENEGADO]: "CargoLink - Acceso Denegado",
};

export function TitleLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = TITULOS[pathname] ?? "CargoLink";
  }, [pathname]);

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <TitleLayout />,
    children: [
      { path: RUTAS.HOME, element: <Home /> },
      { path: RUTAS.LOGIN, element: <Login /> },
      { path: RUTAS.NOSOTROS, element: <Nosotros /> },
      { path: RUTAS.SIGNUP, element: <Signup /> },
      { path: RUTAS.EMPRESA_PANEL, element: <Empresa /> },
      { path: RUTAS.EMPRESA_ADMINISTRADORES, element: <Administradores /> },
      { path: RUTAS.EMPRESA_CONDUCTORES, element: <Conductores /> },
      { path: RUTAS.EMPRESA_VEHICULOS, element: <Vehiculos /> },
      { path: RUTAS.EMPRESA_FLOTA, element: <Flota /> },
      { path: RUTAS.ACCESO_DENEGADO, element: <AccesoDenegado /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Analytics />
    <SpeedInsights />
  </StrictMode>
);
