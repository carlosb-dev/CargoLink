import { useCallback, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import ModalCreaVehiculo from "../../components/Empresa/ModalCreaVehiculo";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import type { FormValues } from "../../components/Empresa/ModalCreaVehiculo";
import EmptyStateCard from "../../components/Globals/EmptyStateCard";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import useVehiculos from "../../hooks/useVehiculos";
import { getStoredUserFromCookie } from "../../utils/cookies";
import {
  crearVehiculo,
  eliminarVehiculo,
  type CrearVehiculoPayload,
} from "../../utils/empresa";
import useVinculos from "../../hooks/useVinculos";

function Vehiculos() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;
  const { vehiculos, isLoading, refetch, setVehiculos } = useVehiculos();
  const { asignaciones } = useVinculos();

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "matricula", label: "Matricula" },
      { key: "modelo", label: "Modelo" },
      { key: "tipo", label: "Tipo" },
      { key: "capacidad", label: "Capacidad" },
      { key: "acciones", label: "Acciones" },
    ],
    []
  );

  const vehiculosDisponibles = useMemo(() => {
    const ocupados = new Set(asignaciones.map((a) => a.vehiculoId));
    return vehiculos.filter((vehiculo) => {
      const idVehiculo = vehiculo.idVehiculo;
      return typeof idVehiculo === "number" && !ocupados.has(idVehiculo);
    });
  }, [vehiculos, asignaciones]);

  // -------------------------------
  //    DELETE VEHICULO
  // -------------------------------

  const handleDelete = useCallback(
    async (idVehiculo: number | undefined) => {
      if (!idVehiculo) {
        window.alert("No se pudo identificar el vehiculo a eliminar.");
        return;
      }

      const estaDisponible = vehiculosDisponibles.some(
        (vehiculo) => vehiculo.idVehiculo === idVehiculo
      );

      if (!estaDisponible) {
        window.alert("Debe desvincular el vehiculo antes de eliminarlo.");
        return;
      }

      setDeletingId(idVehiculo);

      try {
        const result = await eliminarVehiculo(idVehiculo);

        if (!result.success) {
          window.alert(result.message ?? "No se pudo eliminar el vehiculo.");
          return;
        }

        setVehiculos((prev) =>
          prev.filter((vehiculo) => vehiculo.idVehiculo !== idVehiculo)
        );
      } finally {
        setDeletingId(null);
      }
    },
    [setVehiculos, vehiculosDisponibles]
  );

  const rows = useMemo(
    () =>
      vehiculos.map((v) => ({
        id: v.idVehiculo ?? "NA",
        matricula: v.Matricula ?? "NA",
        modelo: v.Modelo ?? "NA",
        tipo: v.Tipo ?? "NA",
        capacidad:
          typeof v.Capacidad === "number" ? `${v.Capacidad} kg` : "NA",
        acciones: (
          <button
            onClick={() => void handleDelete(v.idVehiculo)}
            disabled={deletingId === v.idVehiculo}
            className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-950 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deletingId === v.idVehiculo ? "Eliminando..." : "Eliminar"}
          </button>
        ),
      })),
    [vehiculos, handleDelete, deletingId]
  );

  const hasVehiculos = rows.length > 0;

  // -------------------------------
  //    POST VEHICULO
  // -------------------------------

  async function handleCreate(data: FormValues): Promise<boolean> {
    if (!empresaId || isCreating) {
      if (!empresaId) {
        window.alert("No se pudo identificar la empresa actual.");
      }
      return false;
    }

    const cantidad = Number(data.Cantidad_paquetes);
    const capacidad = Number(data.Capacidad);

    if (Number.isNaN(cantidad) || Number.isNaN(capacidad)) {
      window.alert("Cantidad y capacidad deben ser valores numericos.");
      return false;
    }

    setIsCreating(true);

    const payload: CrearVehiculoPayload = {
      Matricula: data.Matricula.trim(),
      Tipo: data.Tipo.trim(),
      Modelo: data.Modelo.trim(),
      Cantidad_paquetes: cantidad,
      Capacidad: capacidad,
      idEmpresa: empresaId,
    };

    try {
      const result = await crearVehiculo(payload);

      if (!result.success) {
        window.alert(result.message ?? "No se pudo crear el vehiculo.");
        return false;
      }

      await refetch();
      setIsModalOpen(false);
      return true;
    } finally {
      setIsCreating(false);
    }
  }

  // -------------------------------
  //    RENDER
  // -------------------------------

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
                Vehiculos
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:scale-105 transition-all duration-100"
            >
              Agregar vehiculo
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Lista</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              {isLoading ? (
                <p className="text-sm text-slate-400">Cargando vehiculos...</p>
              ) : hasVehiculos ? (
                <Tabla columns={columns} rows={rows} />
              ) : (
                <EmptyStateCard
                  title="No hay vehiculos"
                  description="No se encontraron vehiculos para esta empresa."
                  buttonLabel="Agregar vehiculo"
                  onButtonClick={() => setIsModalOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ModalCreaVehiculo
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default Vehiculos;
