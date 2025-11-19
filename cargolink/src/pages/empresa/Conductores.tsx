import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import Tabla from "../../components/Empresa/Tabla";
import ModalCreaConductor from "../../components/Empresa/ModalCreaConductor";
import DropdownMenu from "../../components/Dropdown/DropdownMenu";
import type { FormValues } from "../../components/Empresa/ModalCreaConductor";
import EmptyStateCard from "../../components/Globals/EmptyStateCard";
import { EMPRESA_NAV_ITEMS } from "../../data/navLinks";
import { getStoredUserFromCookie } from "../../utils/cookies";
import {
  crearConductor,
  eliminarConductor,
  fetchConductores,
  getConductorEstadoLabel,
  type Conductor,
  type CrearConductorPayload,
} from "../../utils/empresa";

function Conductores() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const storedUser = getStoredUserFromCookie();
  const empresaId = storedUser?.idEmpresa;

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "nombre", label: "Nombre" },
      { key: "email", label: "Email" },
      { key: "licencia", label: "Licencia" },
      { key: "estado", label: "Estado" },
      { key: "acciones", label: "Acciones" },
    ],
    []
  );

  const rows = useMemo(
    () =>
      conductores.map((c) => ({
        id: c.idConductor,
        email: c.Email ?? "NA",
        nombre: c.Nombre ?? "NA",
        licencia: c.Licencia ?? "NA",
        estado: getConductorEstadoLabel(c.Estado ?? ""),
        acciones: (
          <button
            onClick={() => void handleDelete(c.idConductor)}
            className="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-950"
          >
            Eliminar
          </button>
        ),
      })),
    [conductores]
  );

  const hasConductores = rows.length > 0;

  // -------------------------------
  //    GET CONDUCTOR
  // -------------------------------

  useEffect(() => {
    if (!empresaId) {
      setConductores([]);
      setIsLoading(false);
      return;
    }

    let isActive = true;
    setIsLoading(true);

    fetchConductores(empresaId)
      .then((data) => {
        if (!isActive) return;
        setConductores(data);
      })
      .catch(() => {
        if (!isActive) return;
        setConductores([]);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [empresaId, reloadKey]);

  // -------------------------------
  //    POST CONDUCTOR
  // -------------------------------

  async function handleCreate(data: FormValues): Promise<boolean> {
    if (!empresaId || isCreating) {
      if (!empresaId) {
        window.alert("No se pudo identificar la empresa actual.");
      }
      return false;
    }

    setIsCreating(true);

    const payload: CrearConductorPayload = {
      Nombre: data.Nombre.trim(),
      Licencia: data.Licencia.trim(),
      Email: data.Email.trim(),
      idEmpresa: empresaId,
    };

    try {
      const result = await crearConductor(payload);

      if (!result.success) {
        window.alert(result.message ?? "No se pudo crear el conductor");
        return false;
      }

      setReloadKey((prev) => prev + 1);
      setIsModalOpen(false);
      return true;
    } finally {
      setIsCreating(false);
    }
  }

  // -------------------------------
  //    DELETE CONDUCTOR
  // -------------------------------

  async function handleDelete(idConductor: number | undefined) {
    if (!idConductor) {
      window.alert("No se pudo identificar el conductor a eliminar.");
      return;
    }

    const result = await eliminarConductor(idConductor);

    if (!result.success) {
      window.alert(result.message ?? "No se pudo eliminar el conductor.");
      return;
    }

    setConductores((prev) =>
      prev.filter((conductor) => conductor.idConductor !== idConductor)
    );
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
                Conductores
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded bg-gradient-to-br from-cyan-400 to-blue-600 text-white hover:scale-105 transition-all duration-100"
            >
              Agregar conductor
            </button>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold">Lista</h3>
            </div>
            <div className="p-4 overflow-x-auto">
              {isLoading ? (
                <p className="text-sm text-slate-400">
                  Cargando conductores...
                </p>
              ) : hasConductores ? (
                <Tabla columns={columns} rows={rows} />
              ) : (
                <EmptyStateCard
                  title="No hay conductores"
                  description="No se encontraron conductores para esta empresa."
                  buttonLabel="Agregar conductor"
                  onButtonClick={() => setIsModalOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ModalCreaConductor
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}

export default Conductores;
