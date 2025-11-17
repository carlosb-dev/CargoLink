import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import ModalCreaVehiculo from "../../components/Empresa/ModalCreaVehiculo";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import type { FormValues } from "../../components/Empresa/ModalCreaVehiculo";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import { defaultVehiculos } from "../../data/empresaTablas";

type Vehiculo = {
  id: number;
  placa: string;
  modelo: string;
};

function Vehiculos() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>(defaultVehiculos);

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "placa", label: "Placa" },
      { key: "modelo", label: "Modelo" },
      { key: "acciones", label: "Acciones" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      vehiculos.map((v) => ({
        id: v.id,
        placa: v.placa,
        modelo: v.modelo,
        acciones: (
          <button
            onClick={() => handleDelete(v.id)}
            className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-950"
          >
            Eliminar
          </button>
        ),
      })),
    [vehiculos]
  );

  // Luego cambiar por DELETE en API
  function handleDelete(id: number) {
    setVehiculos((prev) => prev.filter((x) => x.id !== id));
  }

  // Luego cambiar por POST en API
  function handleCreate(data: FormValues) {
    const nextId = vehiculos.length
      ? Math.max(...vehiculos.map((v) => v.id)) + 1
      : 0;
    setVehiculos((prev) => [
      ...prev,
      {
        id: nextId,
        placa: data.placa,
        modelo: data.modelo,
        estado: data.estado,
      },
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
                Vehículos
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:scale-105 transition-all duration-100"
            >
              Agregar vehículo
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

      <ModalCreaVehiculo
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default Vehiculos;
