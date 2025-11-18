import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import ModalCreaVehiculo from "../../components/Empresa/ModalCreaVehiculo";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import type { FormValues } from "../../components/Empresa/ModalCreaVehiculo";
import EmptyStateCard from "../../components/Globals/EmptyStateCard";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import { getStoredUserFromCookie } from "../../utils/cookies";
import { fetchVehiculos, type Vehiculo } from "../../utils/empresa";

function Vehiculos() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;

  useEffect(() => {
    if (!empresaId) {
      setVehiculos([]);
      setIsLoading(false);
      return;
    }

    let isActive = true;
    setIsLoading(true);

    fetchVehiculos(empresaId)
      .then((data) => {
        if (!isActive) return;
        setVehiculos(data);
      })
      .catch(() => {
        if (!isActive) return;
        setVehiculos([]);
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [empresaId]);

  const columns = useMemo(
    () => [
      { key: "placa", label: "Placa" },
      { key: "modelo", label: "Modelo" },
      { key: "estado", label: "Estado" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      vehiculos.map((v) => ({
        placa: v.placa,
        modelo: v.modelo,
        estado: v.estado ?? "Sin estado",
      })),
    [vehiculos]
  );

  function handleCreate(data: FormValues) {
    const nextId =
      vehiculos.length > 0
        ? Math.max(
            ...vehiculos.map((v) => (typeof v.id === "number" ? v.id : 0))
          ) + 1
        : 1;

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

  const hasVehiculos = rows.length > 0;

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
