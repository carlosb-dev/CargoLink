import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import SidebarPanel from "../../components/Empresa/SidebarPanel";
import Tabla from "../../components/Empresa/Tabla";
import ModalAsignaFlota from "../../components/Empresa/ModalAsignaFlota";
import type { FormValues } from "../../components/Empresa/ModalAsignaFlota";
import { RUTAS } from "../../data/rutas";
import {
  defaultConductores,
  defaultVehiculos,
  defaultFlotaAsignaciones,
} from "../../data/empresaTablas";

type Conductor = {
  id: number;
  nombre: string;
};

type Vehiculo = {
  id: number;
  placa: string;
  modelo: string;
  estado: string;
};

type Asignacion = {
  id: number;
  conductorId: number;
  vehiculoId: number;
};

const conductores: Conductor[] = defaultConductores.map(({ id, nombre }) => ({
  id,
  nombre,
}));

const vehiculos: Vehiculo[] = defaultVehiculos.map(({ id, placa, modelo, estado }) => ({
  id,
  placa,
  modelo,
  estado,
}));

const defaultAsignaciones: Asignacion[] = defaultFlotaAsignaciones;

function Flota() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>(defaultAsignaciones);

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "conductor", label: "Conductor" },
      { key: "vehiculo", label: "Vehículo" },
      { key: "modelo", label: "Modelo" },
      { key: "estado", label: "Estado" },
      { key: "acciones", label: "Acciones" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      asignaciones.map((asignacion) => {
        const conductor = conductores.find((c) => c.id === asignacion.conductorId);
        const vehiculo = vehiculos.find((v) => v.id === asignacion.vehiculoId);

        return {
          id: asignacion.id,
          conductor: conductor?.nombre ?? "—",
          vehiculo: vehiculo?.placa ?? "—",
          modelo: vehiculo?.modelo ?? "—",
          estado: vehiculo?.estado ?? "—",
          acciones: (
            <button
              onClick={() => handleDesvincular(asignacion.id)}
              className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-950"
            >
              Desvincular
            </button>
          ),
        };
      }),
    [asignaciones]
  );

  const vehiculosDisponibles = useMemo(
    () => vehiculos.filter((vehiculo) => !asignaciones.some((a) => a.vehiculoId === vehiculo.id)),
    [asignaciones]
  );

  const conductoresDisponibles = useMemo(
    () =>
      conductores.filter((conductor) => !asignaciones.some((a) => a.conductorId === conductor.id)),
    [asignaciones]
  );

  const sinVehiculosDisponibles = vehiculosDisponibles.length === 0;
  const sinConductoresDisponibles = conductoresDisponibles.length === 0;

  // Luego cambiar por DELETE en API
  function handleDesvincular(id: number) {
    setAsignaciones((prev) => prev.filter((x) => x.id !== id));
  }

  // Luego cambiar por POST en API
  function handleCreate(data: FormValues) {
    const nextId = asignaciones.length ? Math.max(...asignaciones.map((a) => a.id)) + 1 : 0;
    setAsignaciones((prev) => [
      ...prev,
      { id: nextId, conductorId: data.conductorId, vehiculoId: data.vehiculoId },
    ]);
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#071029] to-black text-slate-100 flex flex-col pl-64">
      <SidebarPanel
        mostrarVolver={true}
        items={[
          { to: RUTAS.ADMINISTRADORES, label: "Administradores" },
          { to: RUTAS.CONDUCTORES, label: "Conductores" },
          { to: RUTAS.VEHICULOS, label: "Vehículos" },
          { to: RUTAS.FLOTA, label: "Flota" },
        ]}
      />

      <Header open={open} setOpen={setOpen} />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Flota</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={sinVehiculosDisponibles || sinConductoresDisponibles}
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-105"
            >
              Asignar vehículo
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Relaciones</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <Tabla columns={columns} rows={rows} />
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
