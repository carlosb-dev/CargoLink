import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import EmptyStateCard from "../../components/Globals/EmptyStateCard";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import { getStoredUserFromCookie } from "../../utils/cookies";
import {
  fetchHistorialPedidos,
  type HistorialPedido,
} from "../../utils/empresa";

function EmpresaHistorial() {
  const [open, setOpen] = useState(false);
  const [historial, setHistorial] = useState<HistorialPedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;

  useEffect(() => {
    if (!empresaId) {
      setHistorial([]);
      setIsLoading(false);
      return;
    }

    let isActive = true;
    setIsLoading(true);

    fetchHistorialPedidos(empresaId)
      .then((data) => {
        if (!isActive) return;
        setHistorial(data);
      })
      .catch(() => {
        if (isActive) {
          setHistorial([]);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [empresaId]);

  function handleReload() {
    if (!empresaId) return;
    setIsLoading(true);

    fetchHistorialPedidos(empresaId)
      .then((data) => setHistorial(data))
      .catch(() => setHistorial([]))
      .finally(() => setIsLoading(false));
  }

  const columns = useMemo(
    () => [
      { key: "conductor", label: "Conductor" },
      { key: "matricula", label: "Vehiculo" },
      { key: "estadoAnterior", label: "Estado anterior" },
      { key: "estadoActual", label: "Estado actual" },
      { key: "fechaModificacion", label: "Fecha modificacion" },
      { key: "nombrePedido", label: "Pedido" },
      { key: "destino", label: "Destino" },
      { key: "tipo", label: "Tipo" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      historial.map((item) => ({
        tipo:
          item.tipo?.toLowerCase() === "orden"
            ? "Orden"
            : "Pedido",
        conductor: item.conductor || "Sin asignar",
        matricula: item.matricula || "Sin matricula",
        estadoAnterior: item.estadoAnterior || "Sin datos",
        estadoActual: item.estadoActual || "Sin estado",
        fechaModificacion: item.fechaModificacion || "-",
        nombrePedido: item.nombrePedido || "Pedido sin nombre",
        destino: item.destino || "Sin destino",
      })),
    [historial]
  );

  const hasHistorial = rows.length > 0;

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
                Historial
              </h1>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Movimientos recientes</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              {isLoading ? (
                <p className="text-sm text-slate-400">Cargando historial...</p>
              ) : hasHistorial ? (
                <Tabla columns={columns} rows={rows} />
              ) : (
                <EmptyStateCard
                  title="No hay movimientos"
                  description="Todavia no hay pedidos registrados en el historial."
                  buttonLabel={empresaId ? "Reintentar" : undefined}
                  onButtonClick={empresaId ? handleReload : undefined}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default EmpresaHistorial;
