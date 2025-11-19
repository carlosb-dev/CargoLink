import { useEffect, useState } from "react";

type ConductorOption = {
  id: number;
  nombre: string;
};

type VehiculoOption = {
  id: number;
  placa: string;
  modelo: string;
};

type FormValues = {
  conductorId: number;
  vehiculoId: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: FormValues) => void | Promise<void>;
  conductores: ConductorOption[];
  vehiculos: VehiculoOption[];
};

function ModalAsignaFlota({ open, onClose, onCreate, conductores, vehiculos }: Props) {
  const [selectedConductorId, setSelectedConductorId] = useState<number | null>(null);
  const [selectedVehiculoId, setSelectedVehiculoId] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      setSelectedConductorId(conductores[0]?.id ?? null);
      setSelectedVehiculoId(vehiculos[0]?.id ?? null);
    }
  }, [open, conductores, vehiculos]);

  if (!open) return null;

  const canSubmit =
    selectedConductorId !== null &&
    selectedVehiculoId !== null &&
    conductores.length > 0 &&
    vehiculos.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    void onCreate({ conductorId: selectedConductorId, vehiculoId: selectedVehiculoId });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Asignar vehículo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Conductor</label>
            <select
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={selectedConductorId ?? ""}
              disabled={conductores.length === 0}
              onChange={(e) =>
                setSelectedConductorId(e.target.value === "" ? null : Number(e.target.value))
              }
            >
              {conductores.map((conductor) => (
                <option key={conductor.id} value={conductor.id}>
                  {conductor.nombre}
                </option>
              ))}
            </select>
            {conductores.length === 0 && (
              <p className="mt-2 text-sm text-slate-400">
                Todos los conductores tienen vehículo asignado. Desvincula uno para reasignarlo.
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">Vehículo</label>
            <select
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={selectedVehiculoId ?? ""}
              disabled={vehiculos.length === 0}
              onChange={(e) =>
                setSelectedVehiculoId(e.target.value === "" ? null : Number(e.target.value))
              }
            >
              {vehiculos.map((vehiculo) => (
                <option key={vehiculo.id} value={vehiculo.id}>
                  {vehiculo.placa} · {vehiculo.modelo}
                </option>
              ))}
            </select>
            {vehiculos.length === 0 && (
              <p className="mt-2 text-sm text-slate-400">
                Todos los vehículos están asignados. Desvincula uno para reasignarlo.
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-slate-700 text-slate-200 hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-105"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export type { FormValues };
export default ModalAsignaFlota;
