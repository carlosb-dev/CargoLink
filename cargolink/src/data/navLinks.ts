import { RUTAS } from "./rutas";

export type NavLink = { to: string; label: string };

export const EMPRESA_NAV_ITEMS: NavLink[] = [
  { to: RUTAS.EMPRESA_PANEL, label: "Inicio" },
  { to: RUTAS.EMPRESA_ADMINISTRADORES, label: "Administradores" },
  { to: RUTAS.EMPRESA_CONDUCTORES, label: "Conductores" },
  { to: RUTAS.EMPRESA_VEHICULOS, label: "Vehiculos" },
  { to: RUTAS.EMPRESA_FLOTA, label: "Flota" },
];

export const CONDUCTOR_NAV_ITEMS: NavLink[] = [
  { to: RUTAS.CONDUCTOR_PANEL, label: "Panel" },
  { to: RUTAS.CONDUCTOR_ENVIOS, label: "Envios" },
];

export const ADMIN_NAV_ITEMS: NavLink[] = [
  { to: RUTAS.ADMIN_PANEL, label: "Inicio" },
  { to: RUTAS.ADMIN_LISTA_PEDIDOS, label: "Pedidos" },
  { to: RUTAS.ADMIN_LISTA_ORDENES, label: "Ordenes" },
  { to: RUTAS.ADMIN_HISTORIAL, label: "Historial" },
];

export const HOME_EMPRESA_NAV_ITEMS: NavLink[] = [
  { to: RUTAS.EMPRESA_PANEL, label: "Dashboard" },
];