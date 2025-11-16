import React, { useState } from "react";
import type { FormValues } from "../../pages/administrador/ListaPedidos";

const estadoOptions = ["Preparando", "Despachado", "En camino", "Recibido"];

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: FormValues) => void;
};

function ModalCreaPedido({ open, onClose, onCreate }: ModalProps) {
  const [form, setForm] = useState<FormValues>({
    nombrePedido: "",
    destino: "",
    estadoActual: estadoOptions[0],
  });

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombrePedido || !form.destino || !form.estadoActual) return;
    onCreate(form);
    setForm({
      nombrePedido: "",
      destino: "",
      estadoActual: estadoOptions[0],
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Nuevo pedido</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nombre del pedido</label>
            <input
              type="text"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.nombrePedido}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, nombrePedido: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Destino</label>
            <input
              type="text"
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.destino}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, destino: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Estado actual</label>
            <select
              className="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-600"
              value={form.estadoActual}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, estadoActual: e.target.value }))
              }
            >
              {estadoOptions.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
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

export default ModalCreaPedido;