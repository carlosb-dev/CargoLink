import { RUTAS } from "./rutas";

export type NavLink = { to: string; label: string };

export const EMPRESA_NAV_ITEMS: NavLink[] = [
  { to: RUTAS.EMPRESA_ADMINISTRADORES, label: "Administradores" },
  { to: RUTAS.EMPRESA_CONDUCTORES, label: "Conductores" },
  { to: RUTAS.EMPRESA_VEHICULOS, label: "Vehículos" },
  { to: RUTAS.EMPRESA_FLOTA, label: "Flota" },
  { to: RUTAS.EMPRESA_HISTORIAL, label: "Historial" },
];

export const ADMIN_NAV_ITEMS: NavLink[] = [
  { to: RUTAS.ADMIN_CREAR_PEDIDO, label: "Crear pedido" },
  { to: RUTAS.ADMIN_HISTORIAL, label: "Ver historial de pedidos" },
];
