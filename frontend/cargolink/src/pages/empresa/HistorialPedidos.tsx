import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import { defaultHistorialPedidos } from "../../data/empresaTablas";

type HistorialItem = {
  id: number;
  conductor: string;
  matricula: string;
  estadoAnterior: string;
  estadoActual: string;
  fechaModificacion: string;
  nombrePedido: string;
  destino: string;
};

function HistorialPedidos() {
  const [open, setOpen] = useState(false);
  const [historial] = useState<HistorialItem[]>(defaultHistorialPedidos);

  const columns = useMemo(
    () => [
      { key: "conductor", label: "Conductor" },
      { key: "matricula", label: "Vehículo" },
      { key: "estadoAnterior", label: "Estado Anterior" },
      { key: "estadoActual", label: "Estado Actual" },
      { key: "fechaModificacion", label: "Fecha modificación" },
      { key: "nombrePedido", label: "Pedido" },
      { key: "destino", label: "Destino" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      historial.map((item) => ({
        conductor: item.conductor,
        matricula: item.matricula,
        estadoAnterior: item.estadoAnterior,
        estadoActual: item.estadoActual,
        fechaModificacion: item.fechaModificacion,
        nombrePedido: item.nombrePedido,
        destino: item.destino,
      })),
    [historial]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header
        open={open}
        setOpen={setOpen}
        mostrarNav={true}
        items={EMPRESA_NAV_ITEMS}
      />

      <DropdownMenu open={open} mostrarNav={true} items={EMPRESA_NAV_ITEMS} />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Historial de pedidos
              </h1>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Movimientos recientes</h3>
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

export default HistorialPedidos;
