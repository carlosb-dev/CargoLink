import { useCallback, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import ModalAsignaFlota from "../../components/Empresa/ModalAsignaFlota";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import type { FormValues } from "../../components/Empresa/ModalAsignaFlota";
import EmptyStateCard from "../../components/Globals/EmptyStateCard";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import useConductores from "../../hooks/useConductores";
import useVehiculos from "../../hooks/useVehiculos";  
import useVinculos from "../../hooks/useVinculos";
import {
  crearVinculo,
  eliminarVinculo,
  getConductorEstadoLabel,
  type FlotaAsignacion,
} from "../../utils/empresa";

function Flota() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { conductores, isLoading: isConductoresLoading } = useConductores();
  const { vehiculos, isLoading: isVehiculosLoading } = useVehiculos();
  const {
    asignaciones,
    isLoading: isAsignacionesLoading,
    setAsignaciones,
  } = useVinculos();

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "conductor", label: "Conductor" },
      { key: "vehiculo", label: "Vehiculo" },
      { key: "modelo", label: "Modelo" },
      { key: "estado", label: "Estado" },
      { key: "acciones", label: "Acciones" },
    ],
    []
  );

  const handleDesvincular = useCallback(
    async (asignacion: FlotaAsignacion) => {
      try {
        setDeletingId(asignacion.id);
        const result = await eliminarVinculo({
          idVehiculo: asignacion.vehiculoId,
          idConductor: asignacion.conductorId,
        });

        if (!result.success) {
          window.alert(
            result.message ?? "No se pudo eliminar la vinculacion."
          );
          return;
        }

        setAsignaciones((prev) =>
          prev.filter((item) => item.id !== asignacion.id)
        );
      } catch (error) {
        console.error("Error al eliminar vinculo:", error);
        window.alert("Error al eliminar la vinculacion.");
      } finally {
        setDeletingId(null);
      }
    },
    [setAsignaciones]
  );

  const handleCreate = useCallback(
    async (data: FormValues) => {
      try {
        const result = await crearVinculo({
          idVehiculo: data.vehiculoId,
          idConductor: data.conductorId,
        });

        if (!result.success) {
          window.alert(
            result.message ?? "No se pudo crear la vinculacion."
          );
          return;
        }

        setAsignaciones((prev) => {
          const maxId = prev.reduce(
            (max, asignacion) => (asignacion.id > max ? asignacion.id : max),
            -1
          );
          const nextId = maxId + 1;
          return [
            ...prev,
            {
              id: nextId,
              conductorId: data.conductorId,
              vehiculoId: data.vehiculoId,
            },
          ];
        });
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error al crear vinculo:", error);
        window.alert("Error al crear la vinculacion.");
      }
    },
    [setAsignaciones, setIsModalOpen]
  );

  const rows = useMemo(
    () =>
      asignaciones.map((asignacion) => {
        const conductor = conductores.find(
          (c) => c.idConductor === asignacion.conductorId
        );
        const vehiculo = vehiculos.find(
          (v) => v.idVehiculo === asignacion.vehiculoId
        );

        return {
          id: asignacion.id,
          conductor: conductor?.Nombre ?? "-",
          vehiculo: vehiculo?.Matricula ?? "-",
          modelo: vehiculo?.Modelo ?? "-",
          estado: getConductorEstadoLabel(conductor?.Estado ?? ""),
          acciones: (
            <button
              onClick={() => {
                void handleDesvincular(asignacion);
              }}
              disabled={deletingId === asignacion.id}
              className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-950 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deletingId === asignacion.id ? "Desvinculando..." : "Desvincular"}
            </button>
          ),
        };
      }),
    [asignaciones, conductores, vehiculos, handleDesvincular, deletingId]
  );

  const conductoresDisponibles = useMemo(() => {
    const ocupados = new Set(asignaciones.map((a) => a.conductorId));
    return conductores
      .filter((conductor) => !ocupados.has(conductor.idConductor))
      .map((conductor) => ({
        id: conductor.idConductor,
        nombre: conductor.Nombre,
      }));
  }, [conductores, asignaciones]);

  const vehiculosDisponibles = useMemo(() => {
    const ocupados = new Set(asignaciones.map((a) => a.vehiculoId));
    return vehiculos
      .filter((vehiculo) => {
        const idVehiculo = vehiculo.idVehiculo;
        return typeof idVehiculo === "number" && !ocupados.has(idVehiculo);
      })
      .map((vehiculo) => ({
        id: vehiculo.idVehiculo as number,
        placa: vehiculo.Matricula,
        modelo: vehiculo.Modelo,
      }));
  }, [vehiculos, asignaciones]);

  const sinVehiculosDisponibles = vehiculosDisponibles.length === 0;
  const sinConductoresDisponibles = conductoresDisponibles.length === 0;
  const isLoadingData =
    isConductoresLoading || isVehiculosLoading || isAsignacionesLoading;
  const hasAsignaciones = rows.length > 0;

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
                Flota
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={
                sinVehiculosDisponibles ||
                sinConductoresDisponibles ||
                isLoadingData
              }
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-105"
            >
              {sinVehiculosDisponibles
                ? "No hay vehículos disponibles"
                : sinConductoresDisponibles
                  ? "No hay conductores disponibles"
                  : "Asignar vehículo"
              }
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Relaciones</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              {isLoadingData ? (
                <p className="text-sm text-slate-400">
                  Cargando vinculos de flota...
                </p>
              ) : hasAsignaciones ? (
                <Tabla columns={columns} rows={rows} />
              ) : (
                <EmptyStateCard
                  title="No hay vinculos"
                  description="Aun no se registran conductores con vehiculos asignados."
                  buttonLabel="Asignar vehiculo"
                  onButtonClick={() => setIsModalOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ModalAsignaFlota
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        conductores={conductoresDisponibles}
        vehiculos={vehiculosDisponibles}
      />
    </div>
  );
}

export default Flota;
