import { RUTAS } from "../../rutas";
import PanelItem from "./PanelItem";

function SidebarPanel() {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900/60 border-r border-slate-800 p-4">
      <h2 className="text-lg font-semibold mb-3">Panel</h2>
      <nav>
        <ul className="divide-y divide-slate-800">
          <PanelItem to={RUTAS.ADMINISTRADORES} label="Administradores" />
          <PanelItem to={RUTAS.VEHICULOS} label="Vehículos" />
          <PanelItem to={RUTAS.CONDUCTORES} label="Conductores" />
          <PanelItem to={RUTAS.HISTORIAL} label="Historial pedidos" />
        </ul>
      </nav>
    </aside>
  );
}

export default SidebarPanel;

