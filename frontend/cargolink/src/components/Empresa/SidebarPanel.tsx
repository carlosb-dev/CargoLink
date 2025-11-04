import { RUTAS } from "../../rutas";
import PanelItem from "./PanelItem";
import VolverBoton from "./VolverBoton";

export type PanelLink = { to: string; label: string };

type Props = {
  mostrarVolver?: boolean;
  items?: PanelLink[];
};

// TODO: mover links a parametros

function SidebarPanel({ mostrarVolver = false, items }: Props) {
  const defaultItems: PanelLink[] = [
    { to: RUTAS.HISTORIAL, label: "ee" },
    { to: RUTAS.ADMINISTRADORES, label: "Administradores" },
    { to: RUTAS.CONDUCTORES, label: "Conductores" },
    { to: RUTAS.VEHICULOS, label: "Vehículos" },
    { to: RUTAS.FLOTA, label: "Flota" },
  ];
  const list = items ?? defaultItems;

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900/60 border-r border-slate-800 p-4">
      <h2 className="text-lg font-semibold mb-3">Panel</h2>
      {mostrarVolver && (
        <div className="mb-4">
          <VolverBoton to={RUTAS.EMPRESA} />
        </div>
      )}
      <nav>
        <ul className="divide-y divide-slate-800">
          {list.map((it) => (
            <PanelItem key={it.to} to={it.to} label={it.label} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SidebarPanel;

