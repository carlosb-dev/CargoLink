import PanelItem from "./PanelItem";
import VolverBoton from "./VolverBoton";
import type { NavLink } from "../../data/navLinks";

type Props = {
  rutaVolver?: string;
  mostrarVolver?: boolean;
  items: NavLink[];
};

function SidebarPanel({ mostrarVolver = false, rutaVolver, items }: Props) {
  const list = items;

  return (
    <aside className="fixed inset-y-0 left-0 flex w-64 flex-col bg-slate-900/60 border-r border-slate-800 p-4">
      <h2 className="text-lg font-semibold mb-3">Panel</h2>

      <nav>
        <ul className="divide-y divide-slate-800">
          {list.map((it) => (
            <PanelItem key={it.to} to={it.to} label={it.label} />
          ))}
        </ul>
      </nav>

      {mostrarVolver && (
        <div className="mt-auto pt-4">
          <VolverBoton to={`${rutaVolver ? rutaVolver : ""}`} />
        </div>
      )}
    </aside>
  );
}

export default SidebarPanel;
