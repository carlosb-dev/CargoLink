import { useMemo, useState } from "react";
import CardResumen from "../../components/Administrador/CardResumen";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import { ADMIN_NAV_ITEMS } from "../../data/navLinks";
import { RUTAS } from "../../data/rutas";
import { defaultHistorialPedidos, defaultOrdenes } from "../../data/empresaTablas";

function PanelAdministrador() {
  const [open, setOpen] = useState(false);

  const pedidosActivos = useMemo(
    () => defaultHistorialPedidos.filter((p) => p.estadoActual.toLowerCase() !== "recibido"),
    []
  );

  const ordenesActivas = useMemo(
    () => defaultOrdenes.filter((o) => o.estadoActual.toLowerCase() !== "recibido"),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col">
      <Header open={open} setOpen={setOpen} mostrarNav={true} items={ADMIN_NAV_ITEMS} />

      <DropdownMenu open={open} mostrarNav={true} items={ADMIN_NAV_ITEMS} />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          <section className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">Panel de Administrador</h1>
            <p className="text-slate-300 mt-2 max-w-2xl">
              Revisa el estado de los pedidos y órdenes en curso.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardResumen
              titulo="Pedidos activos"
              descripcion="Pedidos que aún no llegan a destino."
              cantidad={pedidosActivos.length}
              botonLabel="Ir a pedidos"
              to={RUTAS.ADMIN_LISTA_PEDIDOS}
            />
            <CardResumen
              titulo="Órdenes activas"
              descripcion="Órdenes en producción o tránsito."
              cantidad={ordenesActivas.length}
              botonLabel="Ir a órdenes"
              to={RUTAS.ADMIN_LISTA_ORDENES}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PanelAdministrador;
