import { useState } from "react";

type FormValues = {
  placa: string;
  modelo: string;
  estado: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: FormValues) => void;
};

const estadoOptions = ["En camino", "Despachado", "Recibido"];

function ModalCreaVehiculo({ open, onClose, onCreate }: Props) {
  const [form, setForm] = useState<FormValues>({
    placa: "",
    modelo: "",
    estado: estadoOptions[0],
  });

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.placa || !form.modelo || !form.estado) return;
    onCreate(form);
    setForm({ placa: "", modelo: "", estado: estadoOptions[0] });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Nuevo vehículo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Placa</label>
            <input
              type="text"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.placa}
              onChange={(e) => setForm((f) => ({ ...f, placa: e.target.value.toUpperCase() }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Modelo</label>
            <input
              type="text"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.modelo}
              onChange={(e) => setForm((f) => ({ ...f, modelo: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Estado</label>
            <select
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.estado}
              onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))}
              required
            >
              {estadoOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:scale-105 transition-all duration-100"
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
export default ModalCreaVehiculo;
