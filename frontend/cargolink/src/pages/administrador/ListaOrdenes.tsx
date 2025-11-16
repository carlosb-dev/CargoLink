import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import Tabla from "../../components/Empresa/Tabla";
import { ADMIN_NAV_ITEMS } from "../../data/navLinks";
import { defaultOrdenes } from "../../data/empresaTablas";

type Orden = {
  id: number;
  nombre: string;
  destino: string;
  peso: string;
  estadoActual: string;
};

const ordenesIniciales: Orden[] = defaultOrdenes.map(
  ({ id, nombre, destino, peso, estadoActual }) => ({
    id,
    nombre,
    destino,
    peso,
    estadoActual,
  })
);

function ListaOrdenes() {
  const [open, setOpen] = useState(false);
  const [ordenes] = useState<Orden[]>(ordenesIniciales);

  const ordenesVisibles = useMemo(
    () =>
      ordenes.filter(
        (orden) => orden.estadoActual.toLowerCase() !== "Recibido"
      ),
    [ordenes]
  );

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "nombre", label: "Orden" },
      { key: "destino", label: "Destino" },
      { key: "peso", label: "Peso" },
      { key: "estadoActual", label: "Estado actual" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      ordenesVisibles.map((orden) => ({
        id: orden.id,
        nombre: orden.nombre,
        destino: orden.destino,
        peso: orden.peso,
        estadoActual: orden.estadoActual,
      })),
    [ordenesVisibles]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header
        open={open}
        setOpen={setOpen}
        mostrarNav={true}
        items={ADMIN_NAV_ITEMS}
      />

      <DropdownMenu
        open={open}
        mostrarNav={true}
        items={ADMIN_NAV_ITEMS}
      />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Lista de órdenes
            </h1>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Órdenes activas</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <Tabla columns={columns} rows={rows} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ListaOrdenes;
