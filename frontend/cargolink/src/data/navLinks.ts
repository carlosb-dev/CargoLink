import { RUTAS } from "./rutas";

export type NavLink = { to: string; label: string };

export const EMPRESA_NAV_ITEMS: NavLink[] = [
  { to: RUTAS.EMPRESA_PANEL, label: "Inicio" },
  { to: RUTAS.EMPRESA_ADMINISTRADORES, label: "Administradores" },
  { to: RUTAS.EMPRESA_CONDUCTORES, label: "Conductores" },
  { to: RUTAS.EMPRESA_VEHICULOS, label: "Vehículos" },
  { to: RUTAS.EMPRESA_FLOTA, label: "Flota" },
  { to: RUTAS.EMPRESA_HISTORIAL, label: "Historial" },
];

export const ADMIN_NAV_ITEMS: NavLink[] = [
  { to: RUTAS.ADMIN_PANEL, label: "Inicio" },
  { to: RUTAS.ADMIN_LISTA_PEDIDOS, label: "Pedidos" },
  { to: RUTAS.ADMIN_LISTA_ORDENES, label: "Órdenes" },
  { to: RUTAS.ADMIN_HISTORIAL, label: "Historial" },
];
