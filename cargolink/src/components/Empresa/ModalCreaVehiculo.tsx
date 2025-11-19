import { useState } from "react";

type FormValues = {
  Matricula: string;
  Tipo: string;
  Modelo: string;
  Cantidad_paquetes: string;
  Capacidad: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: FormValues) => Promise<boolean> | boolean;
};

const getInitialFormValues = (): FormValues => ({
  Matricula: "",
  Tipo: "",
  Modelo: "",
  Cantidad_paquetes: "",
  Capacidad: "",
});

function ModalCreaVehiculo({ open, onClose, onCreate }: Props) {
  const [form, setForm] = useState<FormValues>(getInitialFormValues());
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    if (
      !form.Matricula ||
      !form.Tipo ||
      !form.Modelo ||
      !form.Cantidad_paquetes ||
      !form.Capacidad
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = onCreate({
        ...form,
        Matricula: form.Matricula.toUpperCase(),
      });
      const wasCreated =
        typeof result === "boolean" ? result : await result;

      if (wasCreated) {
        setForm(getInitialFormValues());
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Nuevo vehiculo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Matricula</label>
            <input
              type="text"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.Matricula}
              onChange={(e) =>
                setForm((f) => ({ ...f, Matricula: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Modelo</label>
            <input
              type="text"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.Modelo}
              onChange={(e) =>
                setForm((f) => ({ ...f, Modelo: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Tipo</label>
            <input
              type="text"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.Tipo}
              onChange={(e) =>
                setForm((f) => ({ ...f, Tipo: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Cantidad de paquetes</label>
            <input
              type="number"
              min="1"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.Cantidad_paquetes}
              onChange={(e) =>
                setForm((f) => ({ ...f, Cantidad_paquetes: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Capacidad (kg)</label>
            <input
              type="number"
              min="1"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.Capacidad}
              onChange={(e) =>
                setForm((f) => ({ ...f, Capacidad: e.target.value }))
              }
              required
            />
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
              disabled={isSubmitting}
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:scale-105 transition-all duration-100 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export type { FormValues };
export default ModalCreaVehiculo;
