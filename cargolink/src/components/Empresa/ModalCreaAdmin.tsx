import { useState } from "react";

type FormValues = {
  Nombre: string;
  Email: string;
  Contrasena: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: FormValues) => Promise<boolean> | boolean;
};

const getInitialFormValues = (): FormValues => ({
  Nombre: "",
  Email: "",
  Contrasena: "",
});

function ModalCreaAdmin({ open, onClose, onCreate }: Props) {
  const [form, setForm] = useState<FormValues>(getInitialFormValues());
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    if (!form.Nombre || !form.Email || !form.Contrasena) return;

    setIsSubmitting(true);
    try {
      const result = onCreate(form);
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
        <h2 className="text-xl font-semibold mb-4">Nuevo administrador</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nombre</label>
            <input
              type="text"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.Nombre}
              onChange={(e) =>
                setForm((f) => ({ ...f, Nombre: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.Email}
              onChange={(e) =>
                setForm((f) => ({ ...f, Email: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Contrasena</label>
            <input
              type="password"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.Contrasena}
              onChange={(e) =>
                setForm((f) => ({ ...f, Contrasena: e.target.value }))
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
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:scale-105 transition-all duration-100"
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
export default ModalCreaAdmin;

