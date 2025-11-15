import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import { ADMIN_NAV_ITEMS } from "../../data/navLinks";
import {
  defaultAdmins,
  defaultVehiculos,
  defaultPedidos,
} from "../../data/empresaTablas";

import DropdownMenu from "../../components/Dropdown/DropdownMenu";

type PedidoPorEntregar = {
  id: number;
  nombre: string;
  destino: string;
  peso: string;
  vehiculo: string;
  administrador: string;
};

const vehiculosPorId = new Map(
  defaultVehiculos.map((vehiculo) => [vehiculo.id, vehiculo])
);
const administradoresPorId = new Map(
  defaultAdmins.map((admin) => [admin.id, admin])
);

const pedidosPorEntregar: PedidoPorEntregar[] = defaultPedidos.map((pedido) => {
  const vehiculo = vehiculosPorId.get(pedido.vehiculoId);
  const administrador = administradoresPorId.get(pedido.administradorId);

  return {
    id: pedido.id,
    nombre: pedido.nombre,
    destino: pedido.destino,
    peso: pedido.peso,
    vehiculo: vehiculo
      ? `${vehiculo.placa} - ${vehiculo.modelo}`
      : `Vehiculo #${pedido.vehiculoId}`,
    administrador:
      administrador?.nombre ?? `Administrador #${pedido.administradorId}`,
  };
});

function Administrador() {
  const [open, setOpen] = useState(false);
  const [pedidos, setPedidos] =
    useState<PedidoPorEntregar[]>(pedidosPorEntregar);

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "nombre", label: "Pedido" },
      { key: "destino", label: "Destino" },
      { key: "peso", label: "Peso" },
      { key: "vehiculo", label: "Vehiculo" },
      { key: "administrador", label: "Administrador" },
      { key: "acciones", label: "Acciones" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      pedidos.map((pedido) => ({
        id: pedido.id,
        nombre: pedido.nombre,
        destino: pedido.destino,
        peso: pedido.peso,
        vehiculo: pedido.vehiculo,
        administrador: pedido.administrador,
        acciones: (
          <button
            onClick={() => handleMarcarEntregado(pedido.id)}
            className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition cursor-pointer"
          >
            Marcar como entregado
          </button>
        ),
      })),
    [pedidos]
  );

  function handleMarcarEntregado(id: number) {
    setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header
        open={open}
        setOpen={setOpen}
        items={ADMIN_NAV_ITEMS}
        mostrarNav={true}
      />

      <DropdownMenu open={open} mostrarNav={true} items={ADMIN_NAV_ITEMS} />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <section className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Bienvenido al panel de administradores, Jhon Doe.
              </h1>
              <p className="text-slate-300 mt-1">
                Revisa los pedidos por entregar y coordina cada envio con tu
                equipo.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
              <div className="p-4 border-b border-slate-800">
                <h3 className="text-lg font-semibold">Pedidos por entregar</h3>
              </div>
              <div className="p-4 overflow-x-auto">
                <Tabla columns={columns} rows={rows} />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Administrador;
