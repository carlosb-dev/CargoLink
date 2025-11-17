import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import Tabla from "../../components/Empresa/Tabla";
import { ADMIN_NAV_ITEMS } from "../../data/navLinks";
import { defaultHistorialPedidos } from "../../data/empresaTablas";
import ModalCreaPedido from "../../components/Administrador/ModalCreaPedido";

type Pedido = {
  id: number;
  nombrePedido: string;
  destino: string;
  estadoActual: string;
  fechaModificacion: string;
};

export type FormValues = {
  nombrePedido: string;
  destino: string;
  estadoActual: string;
};


const pedidosIniciales: Pedido[] = defaultHistorialPedidos.map(
  ({ id, nombrePedido, destino, estadoActual, fechaModificacion }) => ({
    id,
    nombrePedido,
    destino,
    estadoActual,
    fechaModificacion,
  })
);

function ListaPedidos() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);

  const pedidosVisibles = useMemo(
    () =>
      pedidos.filter(
        (pedido) => pedido.estadoActual.toLowerCase() !== "recibido"
      ),
    [pedidos]
  );

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "nombrePedido", label: "Pedido" },
      { key: "destino", label: "Destino" },
      { key: "estadoActual", label: "Estado actual" },
      { key: "fechaModificacion", label: "Última actualización" },
      { key: "acciones", label: "Acciones" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      pedidosVisibles.map((pedido) => ({
        id: pedido.id,
        nombrePedido: pedido.nombrePedido,
        destino: pedido.destino,
        estadoActual: pedido.estadoActual,
        fechaModificacion: pedido.fechaModificacion,
        acciones: (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleMarcarRecibido(pedido.id)}
              className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Marcar como recibido
            </button>
          </div>
        ),
      })),
    [pedidosVisibles]
  );

  function handleCrearPedido(data: FormValues) {
    const nextId = pedidos.length
      ? Math.max(...pedidos.map((p) => p.id)) + 1
      : 0;
    const nuevoPedido: Pedido = {
      id: nextId,
      nombrePedido: data.nombrePedido,
      destino: data.destino,
      estadoActual: data.estadoActual,
      fechaModificacion: new Date()
        .toISOString()
        .replace("T", " ")
        .slice(0, 16),
    };
    setPedidos((prev) => [...prev, nuevoPedido]);
    setIsModalOpen(false);
  }

  function handleMarcarRecibido(id: number) {
    setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header
        open={open}
        setOpen={setOpen}
        mostrarNav={true}
        items={ADMIN_NAV_ITEMS}
      />

      <DropdownMenu open={open} mostrarNav={true} items={ADMIN_NAV_ITEMS} />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Lista de pedidos
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:scale-105 transition-all duration-100"
            >
              Crear pedido
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Pedidos activos</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <Tabla columns={columns} rows={rows} />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ModalCreaPedido
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCrearPedido}
      />
    </div>
  );
}


export default ListaPedidos;
