import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import ModalCreaAdmin from "../../components/Empresa/ModalCreaAdmin";
import type { FormValues } from "../../components/Empresa/ModalCreaAdmin";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import { defaultAdmins } from "../../data/empresaTablas";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";

type Admin = {
  id: number;
  nombre: string;
  email: string;
};

function Administradores() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>(defaultAdmins);

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "nombre", label: "Nombre" },
      { key: "email", label: "Email" },
      { key: "acciones", label: "Acciones" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      admins.map((a) => ({
        id: a.id,
        nombre: a.nombre,
        email: a.email,
        acciones: (
          <button
            onClick={() => handleDelete(a.id)}
            className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-950"
          >
            Eliminar
          </button>
        ),
      })),
    [admins]
  );

  // Luego cambiar por DELETE en API
  function handleDelete(id: number) {
    setAdmins((prev) => prev.filter((x) => x.id !== id));
  }

  // Luego cambiar por POST en API
  function handleCreate(data: FormValues) {
    const nextId = admins.length ? Math.max(...admins.map((a) => a.id)) + 1 : 0;
    setAdmins((prev) => [
      ...prev,
      { id: nextId, nombre: data.nombre, email: data.email },
    ]);
    setIsModalOpen(false);
  }

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
                Administradores
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:scale-105 transition-all duration-100"
            >
              Agregar admin
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Lista</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              <Tabla columns={columns} rows={rows} />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ModalCreaAdmin
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default Administradores;
